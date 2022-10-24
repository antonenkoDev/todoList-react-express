import { Document, Model, model, Schema } from "mongoose";
export interface IUser extends Document {
  name: string;
  password: string;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
