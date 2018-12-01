const httpError = require(`../lib/http-errors`);

module.exports = (err, req, res, next) => {
  res.status(err.status || httpError.INTERNAL_SERVER_ERROR);

  if (err.status) {
    delete err.status;
  }

  if (err.message == null) {
    delete err.message;
  }

  if (err instanceof Error) {
    err = {
      errno: err.errno,
      message: err.message,
      trace: err
    };
  }

  const responseResult = {
    err: true
  };

  if (err && Object.keys(err).length > 0) {
    responseResult.data = err;
  }

  return res.send(responseResult);
};
