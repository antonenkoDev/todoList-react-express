import TodoService from '../todo.service';
import Todo from '../../models/Todo';
import mongoose from 'mongoose';
import { ITodo } from '../../models/Todo';

// Подключение к тестовой базе данных
beforeAll(async () => {
  const mongoURI =
    process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/test';
  await mongoose.connect(mongoURI, {});
});

// Отключение от базы данных после всех тестов
afterAll(async () => {
  await mongoose.disconnect();
});

// Очистка коллекции перед каждым тестом
beforeEach(async () => {
  await Todo.deleteMany({});
});

describe('TodoService', () => {
  let todoService: TodoService;

  beforeAll(() => {
    todoService = new TodoService();
  });

  it('should create a new todo', async () => {
    const todoData: ITodo = {
      description: 'Test todo',
      isCompleted: false,
      userId: new mongoose.Types.ObjectId().toString(),
    };
    const todo = await todoService.addTodo(todoData);
    expect(todo).toMatchObject(todoData);
  });

  it('should fetch all todos for a user', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    await todoService.addTodo({
      description: 'Test todo 1',
      isCompleted: false,
      userId,
    });
    await todoService.addTodo({
      description: 'Test todo 2',
      isCompleted: false,
      userId,
    });
    const todos = await todoService.findAll(userId);
    expect(todos.length).toBe(2);
  });

  it('should fetch a todo by ID', async () => {
    const todoData: ITodo = {
      description: 'Test todo',
      isCompleted: false,
      userId: new mongoose.Types.ObjectId().toString(),
    };
    const todo = await todoService.addTodo(todoData);
    const foundTodo = await todoService.findTodoById(todo._id.toString());
    expect(foundTodo).toMatchObject(todoData);
  });

  it('should update a todo', async () => {
    const todoData: ITodo = {
      description: 'Test todo',
      isCompleted: false,
      userId: new mongoose.Types.ObjectId().toString(),
    };
    const todo = await todoService.addTodo(todoData);
    const updatedData = {
      description: 'Updated todo',
      isCompleted: true,
      userId: todo.userId,
    };
    const updatedTodo = await todoService.updateTodo(
      todo._id.toString(),
      updatedData,
    );
    expect(updatedTodo).toMatchObject(updatedData);
  });

  it('should delete a todo', async () => {
    const todoData: ITodo = {
      description: 'Test todo',
      isCompleted: false,
      userId: new mongoose.Types.ObjectId().toString(),
    };
    const todo = await todoService.addTodo(todoData);
    await todoService.deleteTodo(todo._id.toString());
    const foundTodo = await todoService.findTodoById(todo._id.toString());
    expect(foundTodo).toBeNull();
  });
});
