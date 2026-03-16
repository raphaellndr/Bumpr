import { NextFunction, Request, Response } from "express";

import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Record not found" });
    }
  }

  res.status(500).json({ error: err.message });
};

export default errorHandler;
