import { NextFunction, Request, Response } from "express";

import { AuthService } from "../services/auth";
import { AuthInput } from "../validators/auth";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as AuthInput;
    const user = await AuthService.register(email, password);

    const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json({ data: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as AuthInput;
    const jwt = await AuthService.login(email, password);

    return res.status(200).json({ data: jwt });
  } catch (err) {
    next(err);
  }
};
