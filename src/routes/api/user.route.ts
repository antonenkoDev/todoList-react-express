import { Router } from "express";
import { JoiValidator } from "../../middlewares/joiValidator";
import tryCatch from "../../middlewares/tryCatch";
import { joiUserSchema } from "../../models/JoiUser";
import userController from "../../controllers/user.controller";
import errorHandler from "../../middlewares/errorHandler";
import { checkDuplicateUser } from "../../middlewares/checkDuplicateUser";
import { isExistUser } from "../../middlewares/isExistUser";
const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
	"/register",
	checkDuplicateUser(),
	JoiValidator(joiUserSchema),
	tryCatch(userController.addUser.bind(userController)),
	errorHandler
);
router.post(
	"/login",
	isExistUser(),
	tryCatch(userController.loginUser.bind(userController)),
	errorHandler
);
export default router;
