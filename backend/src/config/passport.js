const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("../../models");

// 🔹 Local Strategy (for Login)
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const userFound = await db.user.findOne({ where: { email } });
        if (!userFound) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, userFound);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// 🔹 JWT Strategy (for Protected Routes)
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const userFound = await db.user.findByPk(jwtPayload.id);
      if (!userFound) {
        return done(null, false, { message: "Token is invalid" });
      }
      return done(null, userFound);
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
