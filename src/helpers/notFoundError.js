export class NotFoundError extends Error {
  constructor(message = '') {
    super();
    this.message = message ? message : 'Not found !!!';
    this.statusCode = 404;
  }
}
