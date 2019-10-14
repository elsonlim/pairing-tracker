import express from "express";
import { createUser, loginUser } from "../handlers/user.handler";

const router = express.Router();

router.post("/", createUser);
router.post("/signin", loginUser);

export default router;
