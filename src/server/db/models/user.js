module.exports = (sequelize, type) => {
    return sequelize.define('user', {
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
    })
}