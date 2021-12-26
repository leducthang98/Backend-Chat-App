import mongoose from 'mongoose';

const room = new mongoose.Schema({
    name: String,
    type: String,
    avatar: String,
    last_message: String,
}, { timestamps: true });

export const Room = mongoose.model('Room', room);
