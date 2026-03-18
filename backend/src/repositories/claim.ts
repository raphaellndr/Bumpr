import { prisma } from "../db/prisma";
import { Prisma, Status } from "../generated/prisma/client";

export const ClaimRepository = {
  findAll: async (status?: string, sortBy?: string, order?: string) => {
    return prisma.claim.findMany({
      where: status ? { status: status as Status } : undefined,
      orderBy: sortBy ? { [sortBy]: order ?? "asc" } : undefined,
    });
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
