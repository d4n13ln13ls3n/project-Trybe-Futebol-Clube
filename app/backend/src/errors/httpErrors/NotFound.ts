import HttpError from './HttpError';

export default class NotFoundHttpError extends HttpError {
  constructor(message: string) {
    super({ message, status: 404 });
  }
}
