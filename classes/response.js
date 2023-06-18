/**
 * @description - General Response
 * @param {string} statusMessage
 * @param {number} statusCode
 * @param {array|object} data
 */
class Response {
  status = {
    code: 200,
    message: 'success'
  };
  data;

  constructor(statusCode = 200, statusMessage = 'success', data = []) {
    this.status.code = statusCode;
    this.status.message = statusMessage;
    if (Array.isArray(data)) {
      if (data.length > 0) {
        this.data = data;
      }
    } else {
      this.data = data;
    }
  }

}

/**
 * @description - Response for 400 Error
 * @param {string} statusMessage
 */
class BadRequestResponse {
  status = {
    code: 400,
    message: 'success'
  };

  constructor(message = 'Bad Request') {
    this.status.message = message;
  }
}

exports.Response = Response;
exports.BadRequestResponse = BadRequestResponse;
