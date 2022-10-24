import { Response, Request } from "express";
import checkUserAccess from "../utils/checkUserAccess";
import { ITodo } from "../models/Todo";
import TodoService from "../services/todo.service";

export class TodoController {
	constructor(private todoService: TodoService) {}
	async getAllTodo(_: Request, res: Response) {
		const todos: Array<ITodo> = await this.todoService.findAll(_.tokenData.userId);
		return todos;
	}
	async getTodo(_: Request, res: Response) {
		const id = _.params.id;
		const todo = await this.todoService.findTodoById(String(id));
		if (todo && checkUserAccess(todo, _.tokenData.userId)) {
			return todo;
		} else {
			res.status(403).json({ message: "Access Denied" });
		}
	}
	async addTodo(_: Request, res: Response) {
		const todoItem = _.body;
		todoItem.userId = _.tokenData.userId;
		const todo = await this.todoService.addTodo(todoItem);
		return todo;
	}
	async updateTodo(_: Request, res: Response) {
		const id = _.params.id;
		const item = _.body;
		const todo = await this.todoService.findTodoById(String(id));

		if (todo && checkUserAccess(todo, _.tokenData.userId)) {
			return await this.todoService.updateTodo(todo._id.toString(), item);
		} else {
			res.status(403).json({ message: "Access Denied" });
		}
	}
	async deleteTodo(_: Request, res: Response) {
		const id = _.params.id;
		const todo = await this.todoService.findTodoById(String(id));
		if (todo && checkUserAccess(todo, _.tokenData.userId)) {
			return await this.todoService.deleteTodo(id);
		} else {
			res.status(403).json({ message: "Access Denied" });
		}
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;