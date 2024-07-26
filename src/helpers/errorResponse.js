export class ErrorResponse extends Error {
    constructor(status, message , error) {
      super();
      this.message = message ;
      this.statusCode = status;
      this.error = error;
    }
  }
  