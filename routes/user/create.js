const Joi = require(`joi`);
const UserModel = require(`../../models/user`);
const UserController = require(`../../controllers/user`);

const schema = Joi.object().keys({
  body: Joi.object().keys({
    name: UserModel.schema.name.required(),
    mail: UserModel.schema.mail.required(),
    password: UserModel.schema.password.required()
  })
});

const responseSchema = Joi.boolean().required();

const route = async (req, res, next) => {
  res.body = await UserController.create(req.body);
  return next();
};

module.exports = {
  schema,
  route,
  responseSchema
};
