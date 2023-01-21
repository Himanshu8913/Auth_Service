const UserService = require('../services/user-service');
const { SuccessCodes } = require('../utils/error-codes');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password,
        });
        return res.status(SuccessCodes.CREATED).json({
            message: 'User created successfully',
            data: response,
            success: true,
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            error: error
        });
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(SuccessCodes.OK).json({
            message: 'Sign in successfully',
            data: response,
            success: true,
            error: {}
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            error: error
        });
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(SuccessCodes.OK).json({
            success: true,
            err: {},
            data: response,
            message: 'user is authenticated and token is valid'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(SuccessCodes.OK).json({
            message: 'Success fetched whether user is admin or not',
            data: response,
            success: true,
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}