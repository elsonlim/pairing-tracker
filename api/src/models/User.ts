import { Schema, Model, model } from "mongoose";
import { IUserDoc } from "../interfaces/IUser";

const userSchema: Schema = new Schema({
  email: {
    type: String,
    unique: [true, "email needs to be unique"],
    required: [true, "email cannot be blank"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "username cannot be blank"],
  },
  password: String,
});

export const User: Model<IUserDoc> = model<IUserDoc>("User", userSchema);
