import { IPair } from "../interfaces/IPairMatrix";

const createPair = (m1: string, m2: string): IPair => {
  return {
    id: m1 < m2 ? `${m1}-${m2}` : `${m2}-${m1}`,
    members: [m1, m2],
    count: 0,
  };
};

const contains = (pair: IPair, name: string): boolean => {
  return pair.members.includes(name);
};

const containsPair = (pair: IPair, name1: string, name2: string): boolean => {
  return contains(pair, name1) && contains(pair, name2);
};

const addCount = (pair: IPair): IPair => {
  pair.count = pair.count + 1;
  return pair;
};

export default {
  createPair,
  contains,
  containsPair,
  addCount,
};
