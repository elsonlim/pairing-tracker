import uuidv1 from "uuid/v1";
import Pair, { IPairData } from "./Pair";

export interface IPairMatrix {
  id: string;
  members: Set<string>;
  pairs: Pair[];
}

class PairMatrix implements IPairMatrix {
  id: string;
  members: Set<string> = new Set();
  pairs: Pair[] = [];

  constructor() {
    this.id = uuidv1();
  }

  addMember = (newMember: string): boolean => {
    if (this.members.has(newMember)) {
      return false;
    }

    if (this.members.size > 0) {
      Array.from(this.members).forEach(member => {
        this.pairs.push(new Pair(member, newMember));
      });
    }

    this.members.add(newMember);
    return true;
  };

  getMembers = () => {
    return Array.from(this.members);
  };

  getPairs = (): IPairData[] => {
    return this.pairs.map(pair => pair.format());
  };

  getPair(m1: string, m2: string): Pair | undefined {
    return this.pairs.find(pairs => pairs.containsPair(m1, m2));
  }

  getPairById(id: string): Pair | undefined {
    return this.pairs.find(pairs => pairs.id === id);
  }

  addPairCount(m1: string, m2: string): number {
    const pair = this.getPair(m1, m2);
    if (!pair) {
      return -1;
    }
    pair.addCount();
    return pair.count;
  }

  getPairCount(m1: string, m2: string): number {
    const pair = this.getPair(m1, m2);
    if (!pair) {
      return -1;
    }
    return pair.count;
  }
}

export default PairMatrix;
