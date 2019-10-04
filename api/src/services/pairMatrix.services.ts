import { IPair } from "../interfaces/IPairMatrix";
import pairService from "./pair.services";
import { PairMatrix } from "../models/PairMatrix";

export const create = async () => {
  const pairMatrix = new PairMatrix({
    members: [],
    pairs: [],
  });
  const matrix = await pairMatrix.save();
  return matrix;
};

const generatePairs = (names: string[], newName: string): IPair[] => {
  const pairs: IPair[] = [];

  names.forEach((cur: string) => {
    pairs.push(pairService.createPair(cur, newName));
  });

  return pairs;
};

export const addMember = async (id: string, newMember: string) => {
  const matrix = await PairMatrix.findById(id);
  if (!matrix) {
    return false;
  }
  if (matrix.members.includes(newMember)) {
    return false;
  }

  const newPairsCreated = generatePairs(matrix.members, newMember);
  matrix.pairs = [...matrix.pairs, ...newPairsCreated];
  matrix.members.push(newMember);
  return await matrix.save();
};

export const getPairs = async (id: string) => {
  const matrix = await PairMatrix.findById(id);
  if (!matrix) {
    return false;
  }
  return matrix.pairs;
};

export const increaseCount = async (id: string, pairId: string) => {
  const matrix = await PairMatrix.findById(id);
  if (!matrix) {
    return false;
  }

  const pair = matrix.pairs.find(curPair => curPair.id === pairId);
  if (!pair) {
    return false;
  }

  pairService.addCount(pair);

  return await matrix.save();
};

export default {
  create,
  generatePairs,
  addMember,
  getPairs,
  increaseCount,
};
