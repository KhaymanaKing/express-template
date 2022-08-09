const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
    static async create({ email, password }) {
        if(email.email<= 6) {
            throw new Error('invalid email');
        }

        if(password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        const passwordHash = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS)
        );

        const user = await User.Insert({
            email, 
            passwordHash
        });
        return user;
    }

}