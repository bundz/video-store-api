const response = function(req, res, next) {
  res.reply = function(body) {
    const resp = { data: body };

    if (body && body.pagination) {
      resp.pagination = body.pagination;
      resp.data = body.data;
    }

    return res.send(resp);
  };

  return next();
};

module.exports = response;
