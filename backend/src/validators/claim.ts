import { z } from "zod";

import { Status } from "../generated/prisma/client";

export const claimValidator = z.object({
  reference: z.string(),
  vehicle: z.string(),
  driverName: z.string(),
  policyNumber: z.string(),
  estimatedAmount: z.number().optional(),
  expertId: z.number(),
  description: z.string().optional(),
  status: z.enum(Status).optional(),
});
