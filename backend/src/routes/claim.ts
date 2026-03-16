import { Router } from "express";

import { createClaim, deleteClaim, getClaim, getClaims, updateClaim } from "../controllers/claim";
import requireAuth from "../middlewares/auth";
import validate from "../middlewares/validate";
import { claimValidator } from "../validators/claim";

const router = Router();

router.get("/", requireAuth, getClaims);
router.get("/:id", requireAuth, getClaim);
router.post("/", requireAuth, validate(claimValidator), createClaim);
router.patch("/:id", requireAuth, validate(claimValidator.partial()), updateClaim);
router.delete("/:id", requireAuth, deleteClaim);

export default router;
