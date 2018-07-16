const randomString = require('random-strr');

module.exports = class ApiErrorResponse extends Error {
  constructor (status, message) { 
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    //generate a traceId here
    this.traceId = randomString({ min: 12, max: 20 })
    this.status = status || 500;
    global.db.store(this.traceId, JSON.stringify(this.toJson()), "errors") 
  }
  toJson () {
    return {
      error_code: this.status,
      error_message: this.message, 
      trace_id: this.traceId
    }
  }
}
