module.exports = (sequelize, type) => {
    const Post = sequelize.define('post', {
        id: {
            type: type.UUID,
            primaryKey: true
        },
        title: {
            type: type.STRING,
            allowNull: false
        },
        body: {
            type: type.STRING,
            allowNull: false
        },
        userId: {
            type: type.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    });

    Post.associate = (models) => {
        Post.belongsTo(models.User, { foreignkey: 'userId', as: 'user' })
    }

    return Post;
}