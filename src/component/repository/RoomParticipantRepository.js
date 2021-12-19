import { RoomParticipant } from '../model/RoomParticipant';

export const createManyRoomParticipants = async (userIds, roomId) => {
    let createObj = []
    for (const userId of userIds) {
        createObj.push({
            user_id: userId,
            room_id: roomId
        })
    }
    const roomParticipants = await RoomParticipant.insertMany(createObj)
    return roomParticipants
};


export const getAllParticipantInRoom = async (roomId) => {
    const roomParticipants = await RoomParticipant.find({ room_id: roomId })
    let userIds = []
    for (const roomParticipant of roomParticipants) {
        userIds.push(roomParticipant.user_id)
    }
    return userIds
}
