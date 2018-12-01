const { Strategy } = require(`passport-local`);
const UserModel = require(`../models/user`);
const AuthController = require(`../controllers/auth`);

module.exports = (passport) => {
  const strategy = new Strategy({ usernameField: `mail` },
  async (mail, password, done) => {
    const [user] = await UserModel.findByMail(mail);

    if (!user) {
      return done(null, false, { message: 'Incorrect mail.' });
    }

    const isValidPassword = await AuthController.isValidPassword(password, user.password);

    if(!isValidPassword) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  });

  passport.use(strategy);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};