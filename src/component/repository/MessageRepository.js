import moment from 'moment';
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

export const getMessageByRoomIdWithPagination = async (roomId, lastMessageTimeStamp) => {
    const messages = await Message.find({
        room_id: roomId,
        createdAt: { $lt: lastMessageTimeStamp || moment().add(30, 'day').toISOString() }
    }, { room_id: 0, __v: 0 }).sort({ createdAt: -1 }).limit(10);

    return messages
}