import { error } from "../../../constant/Error"
import { JWT } from "../../../constant/Token";
import { compare, hash } from "../../../util/Bcrypt"
import * as jwtUtil from '../../../util/Jwt';
import { getUserByUsernameRepository, isUserExistRepository, signUpUserRepository } from "../user/UserRepository"

export const signUpService = async (username, password) => {
    const isUserExist = await isUserExistRepository(username)

    if (isUserExist) {
        throw new Error(error.USER_EXIST.message)
    }
    const passwordHashed = hash(password)

    const userRegisted = await signUpUserRepository(username, passwordHashed)

    return userRegisted
}

export const loginService = async (username, password) => {
    const user = await getUserByUsernameRepository(username);

    if (user) {
        const isPasswordValid = await compare(password, user.password);
        if (isPasswordValid) {
            let data = {
                userId: user.id,
            }
            const token = await jwtUtil.generateToken(data, { expiresIn: JWT.ACCESS_TOKEN_EXPIRED })
            let tokenInfo = {
                token: token,
                timeExpireMs: JWT.ACCESS_TOKEN_EXPIRED
            }
            return tokenInfo
        } else {
            throw new Error(error.LOGIN_FAIL.message)
        }
    } else {
        throw new Error(error.LOGIN_FAIL.message)
    }
}