import { error } from '../constant/Error';
import * as jwtUtil from '../util/Jwt';
import { logger } from '../util/Logger';

export const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization && authorization.match(/^Bearer /g)) {
        const token = authorization.split(' ')[1];
        if (token) {
            try {
                const tokenDecoded = await jwtUtil.verifyToken(token)
                req.tokenDecoded = tokenDecoded;
                next();
            } catch (e) {
                logger.error(e)
                next(error.TOKEN_INVALID.message)
            }
        } else {
            next(error.UNAUTHORIZED.message)
        }
    } else {
        next(error.UNAUTHORIZED.message)
    }

};
