const Route = route => async (req, res, next) => {
  try {
    await route(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = Route;
