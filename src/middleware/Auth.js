export const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization && authorization.match(/^Bearer /g)) {
        const token = authorization.split(' ')[1];
        if (token) {
            try {
                console.log(token)
            } catch (error) {
                next(error)
            }
        }
    }
    next();
};
