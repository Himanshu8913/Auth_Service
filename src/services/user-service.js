const jwt = require('jsonwebtoken');

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong on service layer");
            throw {error};
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {
                expiresIn: '1d'
            });
            return result;
        } catch (error) {
            console.log("Something went wrong on token creation");
            throw {error};
        }
    }

    verifyToken(token) {
        try {
            const result = jwt.verify(token, JWT_KEY);
            return result;
        } catch (error) {
            console.log("Something went wrong on token verification", error);
            throw {error};
        }
    }
}

module.exports = UserService;