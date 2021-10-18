class ValidacionException extends Error {
    constructor(message, httpCode = 400) {
      super(message);
      this.status = httpCode;
    }
}

module.exports = ValidacionException;