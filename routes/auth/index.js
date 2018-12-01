const router = require(`express`).Router();
const route = require(`../../middlewares/route`);
const validate = require(`../../middlewares/validate`);
const sanitize = require(`../../middlewares/sanitize`);
const login = require(`./login`);
const logout = require(`./logout`);

router.post(`/login`, validate(login.schema), route(login.route), sanitize(login.responseSchema));
router.get(`/logout`, route(logout.route), sanitize(logout.responseSchema));

module.exports = router;
