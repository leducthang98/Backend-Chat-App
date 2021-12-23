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
        room.userIds = userIds
    }
    return data
}

export const getChatDataInRoomService = async (roomId, lastMessageTimeStamp) => {
    const messages = await getMessageByRoomIdWithPagination(roomId, lastMessageTimeStamp)
    return messages
}