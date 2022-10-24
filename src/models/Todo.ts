import { Model, model, Schema } from "mongoose";

export interface ITodo extends Document {
	description: string;
	isCompleted: boolean;
}

const todoSchema: Schema = new Schema({
	description: {
		unique: true,
		type: String,
		required: true,
	},
	isComplete: {
		type: Boolean,
		required: true,
	},
});

const Todo: Model<ITodo> = model<ITodo>("Todo", todoSchema);

export default Todo;