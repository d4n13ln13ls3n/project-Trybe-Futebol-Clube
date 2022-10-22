import HttpError from './HttpError';

export default class UnprocessableEntity extends HttpError {
  constructor(message: string) {
    super({ message, status: 422 });
  }
}
