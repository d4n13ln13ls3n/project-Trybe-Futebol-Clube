import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'joi';
import { AppError, AppErrorTypes } from '../errors/AppError';
import HttpError from '../errors/httpErrors/HttpError';

const httpStatusByJoiErrorType: Record<string, number> = {
  'string.min': 422,
};

const getErrorResponse = (joiError: ValidationError) => {
  const [detail] = joiError.details;
  // gets the first element of the array inside joiError.details

  const status = httpStatusByJoiErrorType[detail.type] || 400;
  // this const checks if the error 'number.min' is the one displayed inside detail.type. If so, it displays the error number, otherwise it shows 400

  return {
    status,
    message: joiError.message,
  };
};

const joiErrorHandlerMiddleware: ErrorRequestHandler = async (
  err: AppError | ValidationError,
  req,
  res,
  _next,
) => {
  if ('type' in err && err.type === AppErrorTypes.HTTP) {
    const { status, message } = err as HttpError;
    return res.status(status).send({ message });
  }

  if ('isJoi' in err && err.isJoi) {
    const joiError = err as ValidationError;
    const { message, status } = getErrorResponse(joiError);
    return res.status(status).send({ message });
  }

  return res.status(500).send({ message: err.message });
};

export default joiErrorHandlerMiddleware;
