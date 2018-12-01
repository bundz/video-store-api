const joi = require('joi');

const schema = joi.object({
  APP_DATABASE_HOST: joi.string().required(),
  APP_DATABASE_USER: joi.string().required(),
  APP_DATABASE_NAME: joi.string().required(),
  APP_DATABASE_PASSWORD: joi.string().required()
});

const { error, value: env } = joi.validate(process.env, schema, { allowUnknown: true });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  host: env.APP_DATABASE_HOST,
  user: env.APP_DATABASE_USER,
  name: env.APP_DATABASE_NAME,
  password: env.APP_DATABASE_PASSWORD
};
