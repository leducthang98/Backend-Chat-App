export const error = {
    UNKNOWN_ERROR: {
        code: 9999,
        message: 'Unknown error.',
        status: 500
    },
    INVALID_PASSWORD: {
        code: 1,
        message: 'Password must contains minimum eight characters, at least one letter and one number.',
        status: 400
    },
    USER_EXIST: {
        code: 2,
        message: 'User existed.',
        status: 400
    },
    INVALID_INPUT_PARAM: {
        code: 3,
        message: 'Invalid input param.',
        status: 400
    },
    LOGIN_FAIL: {
        code: 4,
        message: 'Username or password incorrect',
        status: 401
    }
}