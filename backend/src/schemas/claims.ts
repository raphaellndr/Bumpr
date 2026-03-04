import * as z from "zod";

export const Status = z.enum(["open", "under_review", "in_repair", "closed"]);

export const createClaimsSchema = z.object({
  policyNumber: z.string(),
  driverName: z.string(),
  vehicle: z.string(),
  accidentDate: z.string(),
  description: z.string(),
  estimatedAmount: z.int().optional(),
})

export const updateClaimsSchema = createClaimsSchema.extend({
  status: Status,
}).partial()
