const Joi = require(`joi`);
const VideoController = require(`../../controllers/video`);
const paginate = require(`../../lib/paginate`);

const schema = Joi.object().keys({
  query: Joi.object().keys({
    title: Joi.string()
      .min(0)
      .max(120)
      .allow(``)
      .default(``),
    limit: Joi.number()
      .integer()
      .min(0)
      .default(15),
    offset: Joi.number()
      .integer()
      .min(0)
      .default(0),
    order: Joi.string()
      .valid([`asc`, `desc`])
      .default(`asc`)
  })
});

const responseSchema = Joi.object().keys({
  data: Joi.array().items(
    Joi.object({
      id: Joi.number().integer(),
      title: Joi.string(),
      director: Joi.string()
    })
  ),
  pagination: Joi.any()
});

const route = async (req, res, next) => {
  const { videos, count } = await VideoController.list(req.query);
  const pagination = paginate(count, req.query);

  res.body = {
    data: videos,
    pagination
  };

  return next();
};

module.exports = {
  schema,
  route,
  responseSchema
};
