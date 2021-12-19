import { User } from '../model/User';

export const getAllUserRepository = async () => {
    try {
        const users = await User.find({}, { password: 0 });
        return users
    } catch (e) {
        throw e
    }
};

export const isUserExistRepository = async (username) => {
    const user = await User.findOne({ username: username })
    if (user) {
        return true
    }
    return false
}

export const getUserByUsernameRepository = async (username) => {
    const user = await User.findOne({ username: username }, { password: 0 })
    return user
}

export const getUserByUserIdRepository = async (id) => {
    const user = await User.findOne({ id: id }, { password: 0 })
    return user
}

export const signUpUserRepository = async (username, password) => {
    const user = await User.create({
        username: username,
        password: password
    })
    return user
}

