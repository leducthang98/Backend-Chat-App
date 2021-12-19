import mongoose from 'mongoose';

const room = new mongoose.Schema({
    name: String,
    type: String,
    avatar: String
});

export const Room = mongoose.model('Room', room);
