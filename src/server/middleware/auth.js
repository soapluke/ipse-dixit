const passportJWT = require('passport-jwt');
const User = require('../db/sequelize')

// JWT setup
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tokenkey';

let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    console.log('payload received', jwt_payload);
    let user = User.findOne({ id: jwt_payload.id });
  
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

module.exports = {
    strategy,
    jwtOptions   
};