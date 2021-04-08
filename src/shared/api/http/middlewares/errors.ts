import AppHttpError from '@shared/errors/AppHttpError';
import { Request, Response, NextFunction } from 'express';

const errors = (
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line no-unused-vars
  _: NextFunction,
): Response => {
  if (error instanceof AppHttpError) {
    const errorPayload: {
      status: string;
      message: string;
      type?: string;
    } = {
      status: 'error',
      message: error.message,
    };

    if (
      (error as AppHttpError).errorType &&
      (error as AppHttpError).errorType !== ''
    ) {
      errorPayload.type = (error as AppHttpError).errorType;
    }

    return response.status(error.statusCode).json(errorPayload);
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    internalMessage: error.message,
  });
};

export default errors;
