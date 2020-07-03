import passport from 'passport';
var LocalStrategy = require('passport-local').Strategy
import bcrypt from 'bcrypt';

import { User, sequelize } from '../../../models';

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    const user = await User.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('email')),
        sequelize.fn('lower', email.trim())
      )
    })

    if (!user) {
      return done(null, false);
    }
    return bcrypt.compare(password, user.password).then(function (result) {
      if (!result) {
        return done(null, false);
      }

      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findByPk(id).then(user => {
    cb(null, user);
  });
});