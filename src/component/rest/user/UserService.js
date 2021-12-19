import { getAllUserRepository, getUserByUserIdRepository } from "./UserRepository"

export const getAllUsersService = async () => {
    const users = await getAllUserRepository()
    return users
}

export const getUserByUserIdService = async (id) => {
    let user = await getUserByUserIdRepository(id)
    return user
}