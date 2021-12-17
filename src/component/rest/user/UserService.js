import { getAllUserRepository } from "./UserRepository"

export const getAllUsersService = async () => {
    const users = await getAllUserRepository()
    return users
}