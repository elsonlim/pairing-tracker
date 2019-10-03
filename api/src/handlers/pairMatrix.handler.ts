import PairMatrix from "../models/PairMatrix";
import e = require("express");

const pairMatrixes: PairMatrix[] = [];
export const create = (req: e.Request, res: e.Response) => {
  const pairMatrix = new PairMatrix();
  pairMatrixes.push(pairMatrix);
  res.json({ id: pairMatrix.id });
};

export const addMember = (req: e.Request, res: e.Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const matrixToAddPairs = pairMatrixes.find(matrix => matrix.id === id);
  if (!matrixToAddPairs) {
    return res.sendStatus(404);
  }

  if (matrixToAddPairs.addMember(name)) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(204);
  }
};

export const getPairs = (req: e.Request, res: e.Response) => {
  const { id } = req.params;

  const matrixToAddPairs = pairMatrixes.find(matrix => matrix.id === id);
  if (!matrixToAddPairs) {
    return res.sendStatus(404);
  }

  return res.json({
    id: matrixToAddPairs.id,
    pairs: matrixToAddPairs.getPairs(),
  });
};

export const increaseCount = (req: e.Request, res: e.Response) => {
  const { id, pairId } = req.params;

  const matrixToAddPairs = pairMatrixes.find(matrix => matrix.id === id);
  if (!matrixToAddPairs) {
    return res.sendStatus(404);
  }

  const pair = matrixToAddPairs.getPairById(pairId);
  if (!pair) {
    return res.sendStatus(404);
  }
  pair.addCount();

  return res.json();
};
