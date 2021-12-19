
import { logger } from '../../util/Logger';
import { SocketApp } from '../../singleton/Socket';
import * as JwtUtil from '../../util/Jwt'
import { delSocketUserPair, setSocketUserPair, getSocketIdByUserId } from '../../util/Redis';
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
    const { userId } = socket.tokenDecoded
    logger.info(`socket connect, userId: ${userId}`)

    await setSocketUserPair(userId, socket.id)

    socket.on('client-new-message', async (data) => {
        // if roomId = null => receiversId must not be null
        // if roomId != null => receiversId can be null
        const { roomId, senderId, receiversId, content, type } = data

        if (!roomId && receiversId && receiversId.length) {
            // create new room
            const room = await createRoom(null, null, receiversId.length === 1 ? ENUM.ROOM_TYPE.PAIR : ENUM.ROOM_TYPE.GROUP)
            await createManyRoomParticipants([senderId, ...receiversId], room.id)
            roomId = room.id
        }

        const message = await createMessage(roomId, senderId, content, type)

        const userIds = await getAllParticipantInRoom(roomId) 

        for (const userId of userIds) {
            const socketId = await getSocketIdByUserId(userId)
            if (socketId) {
                SocketApp.getInstance().to(socketId).emit('server-new-message', genMessage(senderId, roomId, content, message.created_at, messageType))
            } else {
                // notification
            }
        }
    })

    socket.on('disconnect', () => {
        logger.info(`socket disconnect, userId: ${userId}`)
        delSocketUserPair(userId)
    })
})


// Map (socketId, user)
// userId - [socketID1]
// socket.emit('message', "this is a test"); //sending to sender-client only
// socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
// socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
// socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
// socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
// io.emit('message', "this is a test"); //sending to all clients, include sender
// io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
// io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
// socket.emit(); //send to all connected clients
// socket.broadcast.emit(); //send to all connected clients except the one that sent the message
// socket.on(); //event listener, can be called on client to execute on server
// io.sockets.socket(); //for emiting to specific clients
// io.sockets.emit(); //send to all connected clients (same as socket.emit)
// io.sockets.on() ; //initial connection from a client.