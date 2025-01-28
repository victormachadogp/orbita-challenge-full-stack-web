export class CustomError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(400, message, "VALIDATION_ERROR");
  }
}

export class ConflictError extends CustomError {
  constructor(message: string) {
    super(409, message, "CONFLICT_ERROR");
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(404, message, "NOT_FOUND_ERROR");
  }
}
