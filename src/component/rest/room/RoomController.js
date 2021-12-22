import { error } from "../../../constant/Error"
import { createRoomService, getAllRoomService } from "./RoomService"
import { commonResponse } from "../../../util/ResponseForm"

export const createRoomController = async (req, res) => {
    const { userIds } = req.body
    if (userIds < 2) {
        throw new Error(error.INVALID_INPUT_PARAM.message)
    }

    const response = await createRoomService(userIds)
    res.send(commonResponse(response))
}

export const getAllRoomsController = async (req, res) => {
    const response = await getAllRoomService()
    res.send(commonResponse(response))
}