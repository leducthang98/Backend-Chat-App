import { ENUM } from "../../../constant/Enum"
import { error } from "../../../constant/Error"
import { Room } from "../../model/Room"
import { RoomParticipant } from "../../model/RoomParticipant"
import { getUserByUserIdRepository } from "../../repository/UserRepository"
import { getAllRoomRepository, getMyRoomRepository } from "../../repository/RoomRepository"
import { getAllParticipantInRoom } from "../../repository/RoomParticipantRepository"
import { getMessageByRoomIdWithPagination } from "../../repository/MessageRepository"

export const createRoomService = async (userIds) => {
    // let response = await executeTransaction(async (session) => {
    //     const roomCreated = Room.create({
    //         type: userIds.length > 2 ? ENUM.ROOM_TYPE.GROUP : ENUM.ROOM_TYPE.PAIR
    //     }, { session })

    //     for (const userId of userIds) {
    //         const user = await getUserByUserIdRepository(userId)

    //         if (!user) {
    //             throw new Error(error.USER_NOT_EXIST.message)
    //         }
    //         await RoomParticipant.create({
    //             room_id: roomCreated._id,
    //             user_id: userId
    //         }, { session })
    //     }
    //     return roomCreated
    // }) -- transaction can not be used with standalone mongo instance

    const roomCreated = await Room.create({
        type: userIds.length > 2 ? ENUM.ROOM_TYPE.GROUP : ENUM.ROOM_TYPE.PAIR
    })

    for (const userId of userIds) {
        const user = await getUserByUserIdRepository(userId)

        if (!user) {
            throw new Error(error.USER_NOT_EXIST.message)
        }
        await RoomParticipant.create({
            room_id: roomCreated._id,
            user_id: userId
        })
    }

    let response = { ...roomCreated._doc, userIds: userIds }
    delete response.__v

    return response
}

export const getMyRoomService = async (userId) => {
    const rooms = await getMyRoomRepository(userId)
    let data = rooms
    for (let i = 0; i < data.length; i++) {
        let room = data[i]._doc
        let roomId = room._id
        const userIds = await getAllParticipantInRoom(roomId)
        delete room.__v

        let users = []
        for (const userId of userIds) {
            const user = await getUserByUserIdRepository(userId)
            users.push(user)
        }
        room.users = users

    }
    return data
}

export const getChatDataInRoomService = async (roomId, lastMessageTimeStamp, userId) => {
    const userIds = await getAllParticipantInRoom(roomId)
    if (!userIds.includes(userId)) {
        throw new Error(error.PERMISSION_DENY.message)
    }
    const messages = await getMessageByRoomIdWithPagination(roomId, lastMessageTimeStamp)
    let data = []
    for (let i = 0; i < messages.length; i++) {
        let message = messages[i]._doc
        let senderId = message.sender_id
        delete message.sender_id
        message.senderId = senderId
        message.isMyMessage = (userId == senderId)
        data.push(message)
    }
    return data
}

export const getAllParticipantInRoomService = async (roomId, userId) => {
    const userIds = await getAllParticipantInRoom(roomId)
    if (!userIds.includes(userId)) {
        throw new Error(error.PERMISSION_DENY.message)
    }
    const usersInfo = []
    for (const id of userIds) {
        const userData = await getUserByUserIdRepository(id)
        usersInfo.push(userData._doc)
    }
    return usersInfo
}