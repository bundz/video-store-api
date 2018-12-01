const router = require(`express`).Router();
const route = require(`../../middlewares/route`);
const validate = require(`../../middlewares/validate`);
const sanitize = require(`../../middlewares/sanitize`);
const auth = require(`../../middlewares/auth`);
const list = require(`./list`);
const rent = require(`./rent`);
const returnRoute = require(`./return`);

router.get(`/`, validate(list.schema), route(list.route), sanitize(list.responseSchema));
router.post(`/:id/rent`, auth.isAuthenticated(), validate(rent.schema), route(rent.route), sanitize(rent.responseSchema));
router.post(`/:id/return`, auth.isAuthenticated(), validate(returnRoute.schema), route(returnRoute.route), sanitize(returnRoute.responseSchema));

module.exports = router;
