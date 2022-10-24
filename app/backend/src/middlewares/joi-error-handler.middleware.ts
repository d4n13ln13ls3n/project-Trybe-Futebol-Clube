import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'joi';

const httpStatusByJoiErrorType: Record<string, number> = {
  // 'number.min': 422,
  'string.min': 422,
  'unauthorized': 401,
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

// module.exports = (err, req, res, next): RequestHandler => {
const joiErrorHandlerMiddleware: ErrorRequestHandler = async (err, req, res, next) => {
  if (!err.isJoi) {
    return next(err);
  }

  const { message, status } = getErrorResponse(err);

  return res.status(status).json({ message });
};

export default joiErrorHandlerMiddleware;
