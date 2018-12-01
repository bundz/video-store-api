const router = require(`express`).Router();
const route = require(`../../middlewares/route`);
const validate = require(`../../middlewares/validate`);
const sanitize = require(`../../middlewares/sanitize`);
const create = require(`./create`);

router.post(`/`, validate(create.schema), route(create.route), sanitize(create.responseSchema));

module.exports = router;
