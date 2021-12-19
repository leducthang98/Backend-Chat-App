import { Room } from '../model/Room';

export const createRoom = async (name, avatar, roomType) => {
    const room = await Room.create({
        name: name,
        avatar: avatar,
        type: roomType
    })
    return room
};