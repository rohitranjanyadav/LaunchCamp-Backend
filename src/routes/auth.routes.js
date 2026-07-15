import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controllers.js";
import { login, registerUser } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);

export default router;
