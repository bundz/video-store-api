const router = require(`express`).Router();

router.use(`/user`, require(`./user`));
router.use(`/auth`, require(`./auth`));
// router.use(`/video`, require(`./role`));

module.exports = router;
