import { NextFunction, Request, Response } from "express";

import { Prisma } from "../generated/prisma/client";
import { ClaimService } from "../services/claim";

export const getClaims = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const claims = await ClaimService.findAll();

    return res.status(200).json({ data: claims });
  } catch (err) {
    next(err);
  }
};

export const getClaim = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const claim = await ClaimService.findById(id);

    if (!claim) {
      return res.status(404).json({ error: `No claim found with id '${id}'` });
    }
    return res.status(200).json({ data: claim });
  } catch (err) {
    next(err);
  }
};

export const createClaim = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const claim = await ClaimService.create(req.body);
    return res.status(201).json({ data: claim });
  } catch (err) {
    next(err);
  }
};

export const updateClaim = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const data = req.body as Prisma.ClaimUpdateInput;
    const claim = await ClaimService.update(id, data);

    return res.status(200).json({ data: claim });
  } catch (err) {
    next(err);
  }
};

export const deleteClaim = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await ClaimService.delete(id);

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
