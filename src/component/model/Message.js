import mongoose from 'mongoose';

const message = new mongoose.Schema({
    room_id: String,
    sender_id: String,
    content: String,
    type: String,
}, { timestamps: true });

export const Message = mongoose.model('Message', message);

