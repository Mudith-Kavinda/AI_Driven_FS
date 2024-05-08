import ForbiddenError from "../../domain/errors/forbidden-error";
import { NextFunction, Request, Response } from "express";
import { sessions } from "@clerk/clerk-sdk-node";

const AuthorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  if (sessions.publicMetadata.role !== "admin") {
    throw new ForbiddenError("Admin only route");
  }
  next();
};

export default AuthorizationMiddleware;