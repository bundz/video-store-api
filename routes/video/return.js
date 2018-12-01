const Joi = require(`joi`);
const VideoController = require(`../../controllers/video`);

const schema = Joi.object().keys({
  params: Joi.object().keys({
    id: Joi.number().integer().required()
  })
});

const responseSchema = Joi.boolean();

const route = async (req, res, next) => {
  res.body = await VideoController.return(req.user, req.params.id);
  return next();
};

module.exports = {
  schema,
  route,
  responseSchema
};
