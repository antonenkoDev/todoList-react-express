import { Model, model, ObjectId, Schema } from "mongoose";

export interface ITodo extends Document {
	description: string;
	isCompleted: boolean;
	userId: ObjectId;
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
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Todo: Model<ITodo> = model<ITodo>("Todo", todoSchema);

export default Todo;
