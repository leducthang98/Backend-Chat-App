export const commonResponse = (pureResponse, code = 200, message = 'ok') => {
    return {
        code: code,
        message: message,
        data: pureResponse
    }
}