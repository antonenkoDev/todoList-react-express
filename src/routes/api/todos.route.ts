import { Router } from "express";
import tryCatch from '../../middlewares/tryCatch';
import errorHandler from "../../middlewares/errorHandler";
import { isExist } from "../../middlewares/isExist";
import { JoiValidator } from "../../middlewares/joiValidator";
import { joiTodoSchema } from "../../models/JoiTodo";
import todoController from "../../controllers/todo.controller";
import Todo from "../../models/Todo";
console.log('router');
const todosRouter: Router = Router();

todosRouter.get("", todoController.getAllTodo.bind(todoController));
todosRouter.get(
	"/:id",
	isExist(Todo),
	tryCatch(todoController.getTodo.bind(todoController)),
	errorHandler
);
todosRouter.post(
	"/",
	JoiValidator(joiTodoSchema),
	tryCatch(todoController.addTodo.bind(todoController)),
	errorHandler
);
todosRouter.put("/:id",
	JoiValidator(joiTodoSchema),
	isExist(Todo),
	tryCatch(todoController.updateTodo.bind(todoController)),
	errorHandler
);
todosRouter.delete("/:id",
	isExist(Todo),
	tryCatch(todoController.deleteTodo.bind(todoController)),
	errorHandler
);

export default todosRouter;
