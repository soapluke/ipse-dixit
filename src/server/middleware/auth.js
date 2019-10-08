const jwt = require('jsonwebtoken');
const { User } = require('../db/sequelize');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.TOKEN);
        const user = await User.findOne({
            where: { id: decoded.id, token }
        });

        if (!user) {
            throw new Error()
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

module.exports = auth;