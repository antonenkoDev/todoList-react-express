import { ITodo } from "../models/Todo";
import Todo from "../models/Todo";
import { ObjectId } from "mongoose";
import checkUserAccess from "../utils/checkUserAccess";

export default class TodoService {
	async findAll(userId: ObjectId) {
		return await Todo.find({ userId: userId });
	}
	async findTodoById(id: string) {
		return await Todo.findById(id);
	}

	async addTodo(todoItem: ITodo) {
		return await Todo.create(todoItem);
	}
	async updateTodo(id: string, updateData: ITodo) {
		return await Todo.updateOne({ _id: id }, updateData);
	}
	async deleteTodo(id: string) {
		return await Todo.deleteOne({ _id: id });
	}
}
