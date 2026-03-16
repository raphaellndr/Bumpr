import { NextFunction, Request, Response } from "express";
import z, { ZodType } from "zod";

const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({ error: z.treeifyError(parsedData.error) });
    }

    req.body = parsedData.data;
    next();
  };
};

export default validate;
