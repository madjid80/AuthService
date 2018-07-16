module.exports = class ApiErrorResponse extends Error {
  constructor (message, status) { 
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    //generate a traceId here
    this.traceId = 0;
    this.status = status || 500;
  }
}
