import { z } from "zod";

export const claimValidator = z.object({
  reference: z.string(),
  vehicle: z.string(),
  driverName: z.string(),
  policyNumber: z.string(),
  estimatedAmount: z.number().optional(),
  expertId: z.number(),
  description: z.string().optional(),
});
