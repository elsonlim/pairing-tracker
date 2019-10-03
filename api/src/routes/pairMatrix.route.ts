import express from "express";
const router = express.Router();
import {
  create,
  addMember,
  getPairs,
  increaseCount,
} from "../handlers/pairMatrix.handler";

router.post("/", create);

router.post("/:id/members", addMember);

router.get("/:id/pairs", getPairs);

router.post("/:id/pairs/:pairId/increase-count", increaseCount);

export default router;
