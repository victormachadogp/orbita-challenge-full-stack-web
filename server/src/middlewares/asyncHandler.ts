import { Request, Response, NextFunction } from "express";

type AsyncControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

const asyncHandler = (fn: AsyncControllerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
