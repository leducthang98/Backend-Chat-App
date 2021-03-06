import { createClient } from 'redis';
import { REDIS_SOCKET_USER_KEY_PREFIX } from '../constant/Common';
import { logger } from '../util/Logger';

export const redisConnection = createClient({
    url: process.env.REDIS_URL
});

redisConnection.connect()

redisConnection.on('error', (err) => {
    logger.error("Redis-error " + err);
});

export const getSocketIdByUserId = async (userId) => {
    const redisUserIdKey = REDIS_SOCKET_USER_KEY_PREFIX + userId
    const value = await redisConnection.get(redisUserIdKey)
    return value
}

export const setSocketUserPair = async (userId, socketId) => {
    const redisUserIdKey = REDIS_SOCKET_USER_KEY_PREFIX + userId
    const resp = await redisConnection.set(redisUserIdKey, socketId)
    return resp
}

export const delSocketUserPair = async (userId) => {
    const redisUserIdKey = REDIS_SOCKET_USER_KEY_PREFIX + userId
    const resp = await redisConnection.del(redisUserIdKey)
    return resp
}
