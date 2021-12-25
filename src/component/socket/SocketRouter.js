
import { logger } from '../../util/Logger';
import { SocketApp } from '../../singleton/Socket';
import * as JwtUtil from '../../util/Jwt'
import { delSocketUserPair, setSocketUserPair, getSocketIdByUserId } from '../../config/Redis';
import { createRoom } from '../repository/RoomRepository';
import { ENUM } from '../../constant/Enum';
import { createManyRoomParticipants, getAllParticipantInRoom } from '../repository/RoomParticipantRepository';
import { createMessage } from '../repository/MessageRepository';
import { genMessage } from '../../util/Chat';

SocketApp.getInstance().use(async (socket, next) => {
    try {
        const token = socket.handshake.auth.token
        const tokenDecoded = await JwtUtil.verifyToken(token)
        socket.tokenDecoded = tokenDecoded;
        next();
    } catch (error) {
        next(error)
    }
})

SocketApp.getInstance().on('connection', async (socket) => {
    try {
        const { userId } = socket.tokenDecoded
        logger.info(`socket connect, userId: ${userId}`)

        await setSocketUserPair(userId, socket.id)

        socket.on('client-new-message', async (data) => {
            const { roomId, senderId, receiversId, content, type } = data

            if (!roomId && receiversId && receiversId.length) {
                const room = await createRoom(null, null, receiversId.length === 1 ? ENUM.ROOM_TYPE.PAIR : ENUM.ROOM_TYPE.GROUP)
                await createManyRoomParticipants([senderId, ...receiversId], room.id)
                roomId = room.id
            }

            const message = await createMessage(roomId, senderId, content, type)

            const userIds = await getAllParticipantInRoom(roomId)

            for (const userId of userIds) {
                const socketId = await getSocketIdByUserId(userId)
                if (socketId) {
                    SocketApp.getInstance().to(socketId).emit('server-new-message', genMessage(senderId, roomId, content, message.created_at, type))
                } else {
                    // notification
                }
            }
        })

        socket.on('disconnect', () => {
            logger.info(`socket disconnect, userId: ${userId}`)
            delSocketUserPair(userId)
        })
    } catch (e) {
        logger.error(e)
    }
})

