const bcrypt = require(`bcrypt`);
const UserModel = require(`../models/user`);
const ApiError = require(`../lib/api-error`);
const consts = require(`../config/consts`);
const config = require(`../config`);

const UserController = {};

UserController.create = async ({ name, mail, password }) => {
  const passwordSalt = bcrypt.genSaltSync(config.security.bcryptLength);
  const [user] = await UserModel.findByMail(mail);

  if(user) {
    throw ApiError.BadRequest(`Email already in use.`, {
      errno: consts.ERR_USER_EMAIL_ALREADY_IN_USER
    });
  }

  await UserModel.create({
    name,
    mail,
    password: bcrypt.hashSync(password, passwordSalt),
    password_salt: passwordSalt,
  });

  return true;
};

module.exports = UserController;