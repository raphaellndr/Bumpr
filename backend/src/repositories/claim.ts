import { prisma } from "../db/prisma";
import { Prisma } from "../generated/prisma/client";

export const ClaimRepository = {
  findAll: async () => {
    return prisma.claim.findMany();
  },

  findById: async (id: number) => {
    return prisma.claim.findUnique({ where: { id }, include: { expert: true } });
  },

  create: async (data: Prisma.ClaimCreateInput) => {
    return prisma.claim.create({ data });
  },

  update: async (id: number, data: Prisma.ClaimUpdateInput) => {
    return prisma.claim.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return prisma.claim.delete({ where: { id } });
  },
};
