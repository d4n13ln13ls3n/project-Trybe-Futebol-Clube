import HttpError from './HttpError';

export default class UnauthorizedHttpError extends HttpError {
  constructor(message: string) {
    super({ message, status: 401 });
  }
}
