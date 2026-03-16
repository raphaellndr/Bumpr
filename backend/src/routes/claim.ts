import { Router } from "express";

import { createClaim, deleteClaim, getClaim, getClaims, updateClaim } from "../controllers/claim";
import validate from "../middlewares/validate";
import { claimValidator } from "../validators/claim";

const router = Router();

router.get("/", getClaims);
router.get("/:id", getClaim);
router.post("/", validate(claimValidator), createClaim);
router.patch("/:id", validate(claimValidator.partial()), updateClaim);
router.delete("/:id", deleteClaim);

export default router;
