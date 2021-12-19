import mongoose from 'mongoose';

const message = new mongoose.Schema({
    room_id: String,
    sender: String,
    content: String,
    type: String
});

export const Message = mongoose.model('Message', message);
