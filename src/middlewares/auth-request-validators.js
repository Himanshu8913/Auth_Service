
const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            error: 'Please provide email and password'
        });
    }
    next();
}

const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            error: 'Please provide user id'
        });
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}