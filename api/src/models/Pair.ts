export interface IPair {
  id: string;
  members: string[];
  count: number;
}

export default class Pair implements IPair {
  private _id = "";
  private _members: Set<string> = new Set();
  private _count = 0;

  constructor(m1: string, m2: string) {
    this.id = m1 < m2 ? `${m1}-${m2}` : `${m2}-${m1}`;
    this._members.add(m1);
    this._members.add(m2);
  }

  get id(): string {
    return this._id;
  }

  set id(idToSet) {
    this._id = idToSet;
  }

  get count(): number {
    return this._count;
  }

  contains(member: string): boolean {
    return this._members.has(member);
  }

  containsPair(m1: string, m2: string): boolean {
    return this.contains(m1) && this.contains(m2);
  }

  addCount() {
    this._count = this._count + 1;
  }
}
