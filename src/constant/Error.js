export const error = {
    UNKNOWN_ERROR: {
        code: 9999,
        message: 'Server error.',
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
    },
    UNAUTHORIZED: {
        code: 5,
        message: 'Unauthorized',
        status: 401
    },
    TOKEN_INVALID: {
        code: 6,
        message: 'Invalid token',
        status: 401
    },
    USER_NOT_EXIST: {
        code: 7,
        message: 'User not exist.',
        status: 400
    },
    PERMISSION_DENY: {
        code: 8,
        message: 'Permission denied',
        status: 403
    }
}