const consts = require(`../config/consts`);
const httpErrors = require(`../lib/http-errors`);

const Auth = {};

Auth.isAuthenticated = () => (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next({
      errno: consts.ERR_USER_NOT_AUTHENTICATED,
      message: `Not authenticated`,
      status: httpErrors.UNAUTHORIZED
    });
  }

  return next();
};

module.exports = Auth;