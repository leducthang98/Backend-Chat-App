import { Room } from '../model/Room';

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