import { NotFoundError } from '../helpers/notFoundError.js';

export const notFound = (req, res, next) => {
  next(new NotFoundError('Url Not found !!!'));
};
