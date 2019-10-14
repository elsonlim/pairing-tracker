import express from "express";
import { createUser } from "../handlers/user.handler";

const router = express.Router();

router.post("/", createUser);

export default router;
