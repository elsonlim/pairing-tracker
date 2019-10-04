import { Schema, Model, model } from "mongoose";
import { IUserDoc } from "../interfaces/IUser";
import { string } from "prop-types";
import { stringify } from "querystring";

const userSchema: Schema = new Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    required: [true, "email cannot be blank"],
  },
  username: {
    type: String,
    index: true,
    unique: true,
    required: [true, "username cannot be blank"],
  },
  password: string,
});

export const PairMatrix: Model<IUserDoc> = model<IUserDoc>("User", userSchema);
