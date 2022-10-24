import { Router } from "express";
import tryCatch from '../../middlewares/tryCatch';
import errorHandler from "../../middlewares/errorHandler";
import { isExist } from "../../middlewares/isExistTodo";
import { JoiValidator } from "../../middlewares/joiValidator";
import { joiTodoSchema } from "../../models/JoiTodo";
import todoController from "../../controllers/todo.controller";
import { checkToken } from "../../middlewares/checkToken";
const todosRouter: Router = Router();

todosRouter.get("", checkToken(), tryCatch(todoController.getAllTodo.bind(todoController)));
todosRouter.get(
	"/:id",
	checkToken(),
	isExist(),
	tryCatch(todoController.getTodo.bind(todoController)),
	errorHandler
);
todosRouter.post(
	"/",
	checkToken(),
	JoiValidator(joiTodoSchema),
	tryCatch(todoController.addTodo.bind(todoController)),
	errorHandler
);
todosRouter.put(
	"/:id",
	checkToken(),
	JoiValidator(joiTodoSchema),
	isExist(),
	tryCatch(todoController.updateTodo.bind(todoController)),
	errorHandler
);
todosRouter.delete(
	"/:id",
	checkToken(),
	isExist(),
	tryCatch(todoController.deleteTodo.bind(todoController)),
	errorHandler
);

export default todosRouter;
