import HttpError from './HttpError';

export default class BadRequestHttpError extends HttpError {
  constructor(message: string) {
    super({ message, status: 400 });
  }
}
