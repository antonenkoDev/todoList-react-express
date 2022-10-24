import { ObjectId } from "mongoose";
import { ITodo } from "../models/Todo";
export default function checkUserAccess(todo: ITodo, userId: ObjectId) {
	return todo.userId.toString() === userId.toString();
}
