import { Model, model, ObjectId, Schema } from 'mongoose';

export interface ITodo {
  description: string;
  isCompleted: boolean;
  userId: string;
}

const todoSchema: Schema = new Schema({
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Todo: Model<ITodo> = model<ITodo>('Todo', todoSchema);

export default Todo;
