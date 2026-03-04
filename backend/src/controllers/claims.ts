import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { Claim, CreateClaimDTO, UpdateClaimDTO } from "../types/claims";
import { createClaimsSchema, updateClaimsSchema } from "../schemas/claims";

// In-memory database - replace with PostgreSQL in production
let claims: Claim[] = [
  {
    id: "1",
    policyNumber: "POL-2024-001",
    driverName: "Marie Dupont",
    vehicle: "Renault Clio 2021",
    accidentDate: "2024-11-15",
    description: "Rear collision on A35 highway",
    status: "under_review",
    estimatedAmount: 3200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    policyNumber: "POL-2024-002",
    driverName: "Jean Martin",
    vehicle: "Peugeot 308 2019",
    accidentDate: "2024-12-02",
    description: "Parking lot scrape",
    status: "open",
    estimatedAmount: 850,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET /api/claims
export const getAllClaims = (req: Request, res: Response): void => {
  function compare(a: Claim, b: Claim, property: keyof Claim, order: string): number {
    const valA = a[property] ?? "";
    const valB = b[property] ?? "";

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  }

  const { status, sortBy, order } = req.query;

  let result = status ? claims.filter((c) => c.status === status) : claims;
  result = sortBy
    ? result.sort((a, b) => compare(a, b, sortBy as keyof Claim, order as string))
    : result;

  res.json({ data: result, total: result.length });
};

// GET /api/claims/:id
export const getClaimById = (req: Request, res: Response): void => {
  const claim = claims.find((c) => c.id === req.params.id);

  if (!claim) {
    res.status(404).json({ error: "Claim not found" });
    return;
  }

  res.json({ data: claim });
};

// POST /api/claims
export const createClaim = (req: Request, res: Response): void => {
  const body: CreateClaimDTO = req.body;

  const result = createClaimsSchema.safeParse(body)
  if (!result.success) {
    res.status(400).json({ error: result.error.issues })
    return;
  }

  const newClaim: Claim = {
    ...result.data,
    id: uuidv4(),
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  claims.push(newClaim);
  res.status(201).json({ data: newClaim });
};

// PATCH /api/claims/:id
export const updateClaim = (req: Request, res: Response): void => {
  const index = claims.findIndex((c) => c.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: "Claim not found" });
    return;
  }

  const body: UpdateClaimDTO = req.body;

  const result = updateClaimsSchema.safeParse(body)
  if (!result.success) {
    res.status(400).json({ error: result.error.issues })
    return;
  }

  claims[index] = {
    ...claims[index],
    ...result.data,
    updatedAt: new Date().toISOString(),
  };

  res.json({ data: claims[index] });
};

// DELETE /api/claims/:id
export const deleteClaim = (req: Request, res: Response): void => {
  const index = claims.findIndex((c) => c.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: "Claim not found" });
    return;
  }

  claims.splice(index, 1);
  res.status(204).send();
};
