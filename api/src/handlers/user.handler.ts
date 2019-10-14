import express from "express";
import { User } from "../models/User";
import { hash, compare } from "../services/encryption.service";

export const createUser = async (
  req: express.Request,
  res: express.Response,
) => {
  const { email, username, password } = req.body;
  const passwordHash = await hash(password);

  const user = new User({
    email,
    username,
    password: passwordHash,
  });
  await user.save();
  res.json({ email, username });
};

export const loginUser = async (
  req: express.Request,
  res: express.Response,
) => {
  const { email, password } = req.body;

  const userFromDb = await User.findOne({
    email,
  });

  if (!userFromDb) {
    console.log("user not in db");
    return res.sendStatus(401);
  }

  const isUser = await compare(password, userFromDb.password);

  if (!isUser) {
    console.log("password does not match");
    return res.sendStatus(401);
  }

  res.sendStatus(200);
};
