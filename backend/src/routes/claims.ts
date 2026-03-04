import { Router } from "express";

import {
  createClaim,
  deleteClaim,
  getAllClaims,
  getClaimById,
  updateClaim,
} from "../controllers/claims";

const router = Router();

router.get("/", getAllClaims);
router.get("/:id", getClaimById);
router.post("/", createClaim);
router.patch("/:id", updateClaim);
router.delete("/:id", deleteClaim);

export default router;
