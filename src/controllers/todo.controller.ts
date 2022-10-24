import { Response, Request } from "express";
import { mongo } from 'mongoose';
import { ITodo } from 'todos.type';
import TodoService from "../services/todo.service";

export class TodoController {
	constructor(private todoService: TodoService) { }
	async getAllTodo(_: Request, res: Response) {
		// TODO: Write your implementation here
		const todos: Array<ITodo> = await this.todoService.findAll();
		return todos;
	}
	async getTodo(_: Request, res: Response) {
		const id = _.params.id;
		const todo = await this.todoService.findTodoById(String(id));
		return todo;
	}
	async addTodo(_: Request, res: Response) {
		const todoItem = _.body
		const todo = await this.todoService.addTodo(todoItem);
		return todo;
	}
	async updateTodo(_: Request, res: Response) {
		const id = _.params.id;
		const item = _.body;
		const todo = await this.todoService.updateTodo(id, item);
		return todo;
	}
	async deleteTodo(_: Request, res: Response) {
		const id = _.params.id;
		const todo = await this.todoService.deleteTodo(id);
		return todo;
	}

}

const todoController = new TodoController(new TodoService());
export default todoController;