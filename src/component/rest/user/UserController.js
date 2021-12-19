import { commonResponse } from "../../../util/ResponseForm"
import { getAllUsersService, getUserByUserIdService } from "./UserService"

export const getAllUsersController = async (req, res) => {
    const users = await getAllUsersService()
    res.send(commonResponse(users))
}

export const getMeController = async (req, res) => {
    const userId = req.tokenDecoded
    const me = await getUserByUserIdService(userId)
    res.send(commonResponse(me))
}