import { Prisma } from "../generated/prisma/client";
import { ClaimRepository } from "../repositories/claim";

function _checkId(id: number) {
  if (id <= 0) throw new Error("'id' cannot be negative");
}

export const ClaimService = {
  findAll: async (status?: string, sortBy?: string, order?: string) => {
    return ClaimRepository.findAll(status, sortBy, order);
  },

  findById: async (id: number) => {
    _checkId(id);

    return ClaimRepository.findById(id);
  },

  create: async (data: Prisma.ClaimCreateInput) => {
    return ClaimRepository.create(data);
  },

  update: async (id: number, data: Prisma.ClaimUpdateInput) => {
    _checkId(id);

    return ClaimRepository.update(id, data);
  },

  delete: async (id: number) => {
    _checkId(id);

    return ClaimRepository.delete(id);
  },
};
