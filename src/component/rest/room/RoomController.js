import { error } from "../../../constant/Error"
import { createRoomService, getMyRoomService, getChatDataInRoomService } from "./RoomService"
import { commonResponse } from "../../../util/ResponseForm"

export const createRoomController = async (req, res) => {
    const { userIds } = req.body
    const { userId } = req.tokenDecoded
    if (userIds.length === 0) {
        throw new Error(error.INVALID_INPUT_PARAM.message)
    }

    const response = await createRoomService([...userIds, userId])
    res.send(commonResponse(response))
}

export const getMyRoomsController = async (req, res) => {
    const { userId } = req.tokenDecoded
    const response = await getMyRoomService(userId)
    res.send(commonResponse(response))
}

export const getChatDataInRoomController = async (req, res) => {
    const roomId = req.params.id
    const lastMessageTimeStamp = req.query.timestamp
    const { userId } = req.tokenDecoded
    const response = await getChatDataInRoomService(roomId, lastMessageTimeStamp, userId)
    res.send(commonResponse(response))
}