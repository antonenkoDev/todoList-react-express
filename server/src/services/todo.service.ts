import { ITodo } from '../models/Todo';
import Todo from '../models/Todo';
import { ObjectId } from 'mongoose';

export default class TodoService {
  async findAll(userId: string) {
    return Todo.find({ userId });
  }

  async findTodoById(id: string) {
    return Todo.findById(id);
  }

  async addTodo(todoItem: ITodo) {
    return Todo.create(todoItem);
  }

  async updateTodo(id: string, updateData: ITodo) {
    await Todo.updateOne({ _id: id }, updateData);
    return Todo.findById(id);
  }

  async deleteTodo(id: string) {
    return Todo.deleteOne({ _id: id });
  }
}
