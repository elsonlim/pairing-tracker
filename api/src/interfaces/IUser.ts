import { Document } from "mongoose";

export interface IUser {
  email: string;
  username: string;
  password: string;
}

export interface IUserDoc extends IUser, Document {}
