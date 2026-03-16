import { z } from "zod";

export const claimValidator = z.object({
  reference: z.string(),
  vehicle: z.string(),
  expertId: z.number(),
  description: z.string().optional(),
});
