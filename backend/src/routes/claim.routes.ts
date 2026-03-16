import { Router } from "express";

import {
  createClaim,
  deleteClaim,
  getClaim,
  getClaims,
  updateClaim,
} from "../controllers/claim.controller";

const router = Router();

router.get("/", getClaims);
router.get("/:id", getClaim);
router.post("/", createClaim);
router.patch("/:id", updateClaim);
router.delete("/:id", deleteClaim);

export default router;
