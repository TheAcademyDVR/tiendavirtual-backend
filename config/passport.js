const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./keys');
const User = require('../model/user');

module.exports = (passport) => {
    let options = {};

    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    options.secretOrKey = Keys.secretOrKey;

    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id, (err, user) => {
            if (err) { return done(err, false); }
            if (user) { return done(null, user); }
            else { return done(null, false); }

        });
    }));
}