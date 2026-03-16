import { Router } from "express";

import { login, register } from "../controllers/auth";
import validate from "../middlewares/validate";
import { authValidator } from "../validators/auth";

const router = Router();

router.post("/register", validate(authValidator), register);
router.post("/login", validate(authValidator), login);

export default router;
