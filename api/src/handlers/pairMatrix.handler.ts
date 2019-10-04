import e from "express";
import pairMatrixService from "../services/pairMatrix.services";

export const create = async (req: e.Request, res: e.Response) => {
  const matrix = await pairMatrixService.create();
  res.json({
    id: matrix.id,
  });
};

export const addMember = async (req: e.Request, res: e.Response) => {
  const { id } = req.params;
  const newName = req.body.name;
  await pairMatrixService.addMember(id, newName);
  res.sendStatus(200);
};

export const getPairs = async (req: e.Request, res: e.Response) => {
  const { id } = req.params;
  const pairs = await pairMatrixService.getPairs(id);

  return res.json({
    id,
    pairs,
  });
};

export const increaseCount = async (req: e.Request, res: e.Response) => {
  const { id, pairId } = req.params;

  const matrix = await pairMatrixService.increaseCount(id, pairId);
  if (!matrix) {
    return res.sendStatus(404);
  }
  return res.sendStatus(200);
};
