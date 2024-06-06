import { ITodo } from '../models/Todo';

export default function checkUserAccess(todo: ITodo, userId?: string) {
  if (!userId) {
    throw new Error('Authorization required');
  }
  return todo.userId.toString() === userId.toString();
}
