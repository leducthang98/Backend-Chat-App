import { commonResponse } from "../../../util/ResponseForm"
import { getAllUsersService } from "./UserService"

export const getAllUsersController = async (req, res) => {
    const users = await getAllUsersService()
    res.send(commonResponse(users))
}