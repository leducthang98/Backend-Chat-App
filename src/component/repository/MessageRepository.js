import { Message } from '../model/Message';

export const createMessage = async (roomId, senderId, content, type) => {
    const message = await Message.create({
        room_id: roomId,
        sender_id: senderId,
        content: content,
        type: type
    });
    return message
};