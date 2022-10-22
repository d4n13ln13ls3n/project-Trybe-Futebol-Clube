import { AppError, AppErrorTypes } from '../AppError';

interface HttpErrorParams {
  message: string;
  status: number;
}

export default class HttpError extends Error implements AppError {
  public status: number;

  public readonly type: AppErrorTypes;

  constructor({ message, status }: HttpErrorParams) {
    super(message);

    this.type = AppErrorTypes.HTTP;
    this.status = status;
  }
}
