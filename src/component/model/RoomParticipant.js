import mongoose from 'mongoose';

const roomParticipant = new mongoose.Schema({
    room_id: String,
    user_id: String,
});

export const RoomParticipant = mongoose.model('RoomParticipant', roomParticipant);
