const Joi = require(`joi`);

const sanitize = schema => async (req, res, next) => {
  const result = Joi.validate(res.body, schema, { stripUnknown: true });

  if (result.error) {
    return next(result.error);
  }

  return res.reply(result.value);
};

module.exports = sanitize;
