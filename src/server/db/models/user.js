const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, type) => {
    const User = sequelize.define('user', {
        id: {
            type: type.UUID,
            primaryKey: true
        },
        username: {
            type: type.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: type.STRING,
            unique: true,
            allowNull: false,
            lowercase: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: type.STRING,
            required: true,
            minlength: 7,
            validate: {
                min: 7
            },
            includesPassword(value) {
                if (value.includes('password')) {
                    throw new Error("Password cannot contain phrase 'password'.")
                }
            }
        },
        token: {
            type: type.STRING,
        }
    });

    User.beforeCreate(async (user, options) => {
        user.password = await bcrypt.hash(user.password, 8);
    });

    User.findByCredentials = async (username, password) => {
        const user = await User.findOne({
            where: { username }
        });

        if (!user) {
            throw new Error('Unable to login.');
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Unable to login.');
        };
    
        return user;
    };

    User.generateAuthToken = async function (username) {
        const user = await User.findOne({
            where: { username }
        });

        let payload = { id: user.id };
        let token = jwt.sign(payload, 'tokenkey');
        user.token = token
        await user.save()

        return token
    };

    return User;
}