import { Request, Response, NextFunction } from "express";
import { getErrorByType } from "../config/errors";

interface CustomError extends Error {
  type?: string;
}

const errorMiddleware = (
  error: CustomError,
  request: Request,
  response: Response,
  _next: NextFunction
) => {
  const errorProperties = getErrorByType(error.type || "GENERAL");

  console.error({
    errorMessage: error?.message,
    statusCode: errorProperties.statusCode,
    endpoint: request.baseUrl + request.path,
    method: request.method,
    body: request.body,
    params: request.params,
    queryParams: request.query,
    headers: request.headers
  });

  return response.status(errorProperties.statusCode).json({
    code: errorProperties.code,
    error_code: errorProperties.error,
    error_description: error.type
      ? error.message
      : `Internal server error: ${JSON.stringify(
          error?.message || error || "not found"
        )}`
  });
};

export default errorMiddleware;
