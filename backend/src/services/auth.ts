import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/user";

const saltRounds = 10;

export const AuthService = {
  register: async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return await UserRepository.create({ email, password: hashedPassword });
  },

  login: async (email: string, password: string) => {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new Error(`No user found with email ${email}`);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Passwords do not correspond");
    }

    return jwt.sign({ id: user.id, email }, process.env.JWT_SECRET!, { expiresIn: "24h" });
  },
};
