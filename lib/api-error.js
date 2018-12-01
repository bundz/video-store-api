const httpError = require(`./http-errors`);

class ApiError extends Error {
  constructor({ message, data, status }) {
    super(message);
    this.message = message;
    this.data = data;
    this.status = status;
    this.errno = data.errno;
  }

  static BadRequest(message, data) {
    return new ApiError({ message, data, status: httpError.BAD_REQUEST });
  }

  static Unauthorized(message = `Unauthorized`, data) {
    return new ApiError({ message, data, status: httpError.UNAUTHORIZED });
  }

  static NotFound(message = `Not Found`, data) {
    return new ApiError({ message, data, status: httpError.NOT_FOUND });
  }

  static Conflict(message = `Conflict`, data) {
    return new ApiError({ message, data, status: httpError.CONFLICT });
  }

  static InternalServerError(message = `Internal Server Error`, data) {
    return new ApiError({ message, data, status: httpError.INTERNAL_SERVER_ERROR });
  }
}

module.exports = ApiError;
