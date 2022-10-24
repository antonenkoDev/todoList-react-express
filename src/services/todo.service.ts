import { ITodo } from '../types/todos.type';
import Todo from '../models/Todo';

export default class TodoService {
	async findAll() {
		return await Todo.find();
	}
	async findTodoById(id: string) {
		return await Todo.findById(id);
	}
	async addTodo(todoItem: ITodo) {
		console.log('adding to DB');
		return await Todo.create(todoItem);
	}
	async updateTodo(id: string, updateData: ITodo) {
		return await Todo.updateOne({ _id: id }, updateData);
	}
	async deleteTodo(id: string) {
		return await Todo.deleteOne({ _id: id });
	}
}