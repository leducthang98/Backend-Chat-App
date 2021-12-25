import { Room } from '../model/Room';
import { RoomParticipant } from '../model/RoomParticipant';

export const createRoomRepository = async (name, avatar, roomType) => {
    const room = await Room.create({
        name: name,
        avatar: avatar,
        type: roomType
    })
    return room
};

export const getAllRoomRepository = async () => {
    const rooms = await Room.find();
    return rooms
}

export const getMyRoomRepository = async (userId) => {
    const roomParticipants = await RoomParticipant.find({
        user_id: userId
    })
    if (!roomParticipants.length) {
        return []
    }

    const roomIds = roomParticipants.map((e) => {
        return e.room_id
    })
    const rooms = await Room.find({
        _id: {
            $in: roomIds
        }
    })
    return rooms
}