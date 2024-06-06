import { Request, Response } from 'express';
import checkUserAccess from '../utils/checkUserAccess';
import { ITodo } from '../models/Todo';
import TodoService from '../services/todo.service';
import { CustomRequest } from '../@types/express';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: CustomRequest, res: Response) {
    if (!req.tokenData) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const todos: ITodo[] = await this.todoService.findAll(req.tokenData.userId);
    return res.json(todos);
  }

  async getTodo(req: CustomRequest, res: Response) {
    const id = req.params.id;
    if (!req.tokenData) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const todo = await this.todoService.findTodoById(String(id));
    if (todo && checkUserAccess(todo, req.tokenData.userId)) {
      return res.json(todo);
    } else {
      return res.status(403).json({ message: 'Access Denied' });
    }
  }

  async addTodo(req: CustomRequest, res: Response) {
    if (!req.tokenData) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const todoItem = req.body;
    if (!todoItem) {
      return res.status(400).json({ message: 'Bad Request' });
    }
    todoItem.userId = req.tokenData.userId;
    const todo = await this.todoService.addTodo(todoItem);
    return res.json(todo);
  }

  async updateTodo(req: CustomRequest, res: Response) {
    const id = req.params.id;
    if (!req.tokenData) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const item = req.body;
    const todo = await this.todoService.findTodoById(String(id));

    if (todo && checkUserAccess(todo, req.tokenData.userId)) {
      const updatedTodo = await this.todoService.updateTodo(
        todo._id.toString(),
        item,
      );
      return res.json(updatedTodo);
    } else {
      return res.status(403).json({ message: 'Access Denied' });
    }
  }

  async deleteTodo(req: CustomRequest, res: Response) {
    const id = req.params.id;
    if (!req.tokenData) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const todo = await this.todoService.findTodoById(String(id));
    if (todo && checkUserAccess(todo, req.tokenData.userId)) {
      await this.todoService.deleteTodo(id);
      return res.json({ message: 'Todo deleted successfully' });
    } else {
      return res.status(403).json({ message: 'Access Denied' });
    }
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
