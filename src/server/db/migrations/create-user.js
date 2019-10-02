module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Users', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            lowercase: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
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
    },
    down: (queryInterface) => {
      return queryInterface.dropTable('Users');
    }
};