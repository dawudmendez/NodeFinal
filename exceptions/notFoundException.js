class NotFound extends Error {
    constructor(mensaje, httpCode = 404) {
      super(mensaje);
      this.status = httpCode;
    }
}
  
module.exports = NotFound;