import mongoose from 'mongoose';

const user = new mongoose.Schema({
    username: { type: String, lowercase: true },
    firstname: String,
    lastname: String,
    password: String,
    avatar: String,
    email: { type: String, lowercase: true },
    is_active: { type: Boolean, default: false },
});

export const User = mongoose.model('User', user);