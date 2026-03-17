import z from "zod";

export const StatusEnum = z.enum(["OPEN", "UNDER_REVIEW", "IN_REPAIR", "CLOSED"]);

export const ClaimSchema = z.object({
  id: z.number(),
  reference: z.string(),
  vehicle: z.string(),
  driverName: z.string(),
  policyNumber: z.string(),
  estimatedAmount: z.number().nullable(),
  status: StatusEnum,
  description: z.string().nullable(),
  expertId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateClaimSchema = z.object({
  reference: z.string(),
  vehicle: z.string(),
  driverName: z.string(),
  policyNumber: z.string(),
  estimatedAmount: z.number().optional(),
  expertId: z.number(),
  description: z.string().optional(),
});

export const UpdateClaimSchema = CreateClaimSchema.extend({
  status: StatusEnum.optional(),
}).partial();

export type Status = z.infer<typeof StatusEnum>
export type Claim = z.infer<typeof ClaimSchema>;
export type CreateClaimDTO = z.infer<typeof CreateClaimSchema>;
export type UpdateClaimDTO = z.infer<typeof UpdateClaimSchema>;