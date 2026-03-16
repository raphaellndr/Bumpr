import { prisma } from "../db/prisma";
import { Prisma } from "../generated/prisma/client";

export const UserRepository = {
  create: async (data: Prisma.UserCreateInput) => {
    return prisma.user.create({ data });
  },

  findByEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },
};
