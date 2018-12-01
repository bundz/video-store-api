const Joi = require(`joi`);
const AuthController = require(`../../controllers/auth`);

const responseSchema = Joi.boolean().required();

const route = async (req, res, next) => {
  res.body = await AuthController.logout(req, res, next);
  return next();
};

module.exports = {
  route,
  responseSchema
};
