const Joi = require(`joi`);
const UserModel = require(`../../models/user`);
const AuthController = require(`../../controllers/auth`);

const schema = Joi.object().keys({
  body: Joi.object().keys({
    mail: UserModel.schema.mail.required(),
    password: UserModel.schema.password.required()
  })
});

const responseSchema = Joi.object().keys({
  id: Joi.number().integer().required(),
  name: UserModel.schema.name.required()
});

const route = async (req, res, next) => {
  res.body = await AuthController.login(req, res, next);
  return next();
};

module.exports = {
  schema,
  route,
  responseSchema
};
