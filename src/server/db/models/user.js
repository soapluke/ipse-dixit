const bcrypt = require('bcryptjs')

module.exports = (sequelize, type) => {
    const User = sequelize.define('user', {
        id: {
            type: type.UUID,
            primaryKey: true
        },
        name: {
            type: type.STRING,
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
        }
    });

    User.beforeCreate(async (user, options) => {
        user.password = await bcrypt.hash(user.password, 8)
    });

    return User;
}