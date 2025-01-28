import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";
import {
  ValidationError as SequelizeValidationError,
  UniqueConstraintError,
} from "sequelize";

interface ErrorResponse {
  status: string;
  message: string;
  code?: string;
  details?: any;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  let errorResponse: ErrorResponse = {
    status: "error",
    message: "Erro interno do servidor",
  };

  let statusCode = 500;

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    errorResponse = {
      status: "error",
      message: err.message,
      code: err.code,
    };
  } else if (err instanceof UniqueConstraintError) {
    statusCode = 409;
    errorResponse = {
      status: "error",
      message: "Dados já existentes no sistema",
      code: "UNIQUE_CONSTRAINT_ERROR",
      details: err.errors.map((e) => ({
        field: e.path,
        message: `${e.path} já está em uso`,
      })),
    };
  } else if (err instanceof SequelizeValidationError) {
    statusCode = 400;
    errorResponse = {
      status: "error",
      message: "Erro de validação",
      code: "VALIDATION_ERROR",
      details: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    };
  }

  // Apenas inclui stack trace em ambiente de desenvolvimento
  if (process.env.NODE_ENV === "development") {
    errorResponse.details = {
      ...errorResponse.details,
      stack: err.stack,
    };
  }

  res.status(statusCode).json(errorResponse);
};
