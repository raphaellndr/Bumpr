export type Status = "open" | "under_review" | "in_repair" | "closed";

export interface Claim {
  id: string;
  policyNumber: string;
  driverName: string;
  vehicle: string;
  accidentDate: string;
  description: string;
  status: Status;
  estimatedAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateClaimDTO = Omit<Claim, "id" | "createdAt" | "updatedAt" | "status">;
export type UpdateClaimDTO = Partial<Omit<Claim, "id" | "createdAt" | "updatedAt">>;
