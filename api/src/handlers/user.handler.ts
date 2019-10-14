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
