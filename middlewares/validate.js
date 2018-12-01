const Joi = require(`joi`);
const ApiError = require(`../lib/api-error`);
const consts = require(`../config/consts`);

const validate = schema => (req, res, next) => {
  const result = Joi.validate({ query: req.query, body: req.body, params: req.params }, schema, { allowUnknown: true });

  if (result.error) {
    result.error.details.errno = consts.ERR_JOI_VALIDATE;
    throw ApiError.BadRequest(result.error.message, result.error.details);
  }

  req.query = result.value.query;
  req.body = result.value.body;
  return next();
};

module.exports = validate;
