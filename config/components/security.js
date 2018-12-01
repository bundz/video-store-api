const joi = require('joi');

const schema = joi.object({
  APP_SECURITY_BCRYPTLENGTH: joi.number().required(),
});

const { error, value: env } = joi.validate(process.env, schema, { allowUnknown: true });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  bcryptLength: env.APP_SECURITY_BCRYPTLENGTH
};
