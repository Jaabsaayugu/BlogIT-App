import { Router } from "express";
import verifyPasswordStrength from "../middleware/verifyPassStrength";
import verifyUserInformation from "../middleware/verifyUserInformation";
import checkUsernameAndEmailReuse from "../middleware/checkEmailAndUsernameReuse";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router: Router = Router();

router.post(
  "/register",
  verifyUserInformation,
  checkUsernameAndEmailReuse,
  verifyPasswordStrength,
  registerUser,
);
router.post("/login", loginUser);

export default router;
