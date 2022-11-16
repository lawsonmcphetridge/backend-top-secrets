const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

class UserService {
    static async create({ firstname, lastname, email, password }) {
        const passwordHash = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS)
        );
        const user = await User.insertUser({
            firstname,
            lastname,
            email,
            passwordHash
})
        return user;
}

}

module.exports = UserService;