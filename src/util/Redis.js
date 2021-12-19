import { createClient } from 'redis';
import { REDIS_SOCKET_USER_KEY_PREFIX } from '../constant/Common';

export const redisConnection = createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
})

redisConnection.connect()

redisConnection.on('error', (err) => {
    console.log("Redis-error " + err);
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
