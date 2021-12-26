
import { logger } from '../../util/Logger';
import { SocketApp } from '../../singleton/Socket';
import * as JwtUtil from '../../util/Jwt'
import { delSocketUserPair, setSocketUserPair, getSocketIdByUserId } from '../../config/Redis';
import { createRoomRepository, updateLastMessageInRoomRepository } from '../repository/RoomRepository';
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
            try {
                const { roomId, senderId, receiversId, content, type } = data
                let userRoomId = roomId
                if (!userRoomId && receiversId && receiversId.length) {
                    const room = await createRoomRepository(null, null, receiversId.length === 1 ? ENUM.ROOM_TYPE.PAIR : ENUM.ROOM_TYPE.GROUP)
                    await createManyRoomParticipants([senderId, ...receiversId], room.id)
                    userRoomId = room.id
                }

                const message = await createMessage(userRoomId, senderId, content, type)

                // update lastmessage in room
                updateLastMessageInRoomRepository(userRoomId, type === ENUM.MESSAGE_TYPE.MESSAGE ? content : 'media sent')

                const userIds = await getAllParticipantInRoom(userRoomId)

                for (const userId of userIds) {
                    const socketId = await getSocketIdByUserId(userId)
                    if (socketId) {
                        SocketApp.getInstance().to(socketId).emit('server-new-message', genMessage(senderId, userRoomId, content, message.createdAt, type, senderId == userId))
                    } else {
                        // notification
                    }
                }
            } catch (e) {
                logger.error(e)
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

