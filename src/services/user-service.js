const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

    async signIn(email, plainPassword) {
        try {
            // Step 1 -> fetch the user usiing email address
            const user = await this.userRepository.getByEmail(email);
            if (!user) {
                throw {error: 'User not found'};
            }

            // Step 2 -> compare incoming plain password with the hashed password or stored encryped password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordsMatch) {
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }
            // Step 3 -> if password match then create a token and set it to user
            const newJWT = this.createToken({ email: user.email, id: user.id});
            return newJWT;
        }
        catch (error) {
            console.log("Something went wrong in the sign in process");
            throw {error};
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
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

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw {error};
        }
    }
}

module.exports = UserService;