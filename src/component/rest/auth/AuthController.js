import { validatePassword } from "../../../util/Validation"
import { error } from '../../../constant/Error'
import { loginService, signUpService } from "./AuthService"
import { commonResponse } from "../../../util/ResponseForm"

export const signUpController = async (req, res) => {
    const { username, password } = req.body

    if (!validatePassword(password)) {
        throw new Error(error.INVALID_PASSWORD.message)
    }

    const userSignUp = await signUpService(username, password)

    res.send(commonResponse(userSignUp))
}

export const loginController = async (req, res) => {
    const { username, password } = req.body

    if (!(username && password)) {
        throw new Error(error.INVALID_INPUT_PARAM.message)
    }

    const authResponse = await loginService(username, password)

    res.send(commonResponse(authResponse))
}