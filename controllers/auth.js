const bcrypt = require(`bcrypt`);
const passport = require(`passport`);
const config = require(`../config`);
const consts = require(`../config/consts`);
const ApiError = require(`../lib/api-error`);

const AuthController = {};

AuthController.isValidPassword = (passwordAttempted, passwordHash) => {
  return bcrypt.compareSync(passwordAttempted, passwordHash);
};

AuthController.login = async (req, res, next) => {
  const user = await AuthController.authenticate(req, res, next);
  return user;
};

AuthController.authenticate = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(`local`, (err, user, info) => {
      try {
        if(err) {
          throw ApiError.Unauthorized();
        }
    
        if(!user) {
          throw ApiError.Unauthorized(`Login failed.`, {
            errno: consts.ERR_LOGIN_FAILED
          });
        }
        
        req.login(user, (err) => {
    
          if(err) {
            throw ApiError.Unauthorized();
          }
    
          return resolve(user);
  
        })  
      } catch (err) {
        reject(err);
      }
    })(req, res, next)
  });
};

AuthController.logout = async (req) => {
  if(req.session) {
    req.session.destroy();
  }
  req.logout();
  return true;
};

module.exports = AuthController;