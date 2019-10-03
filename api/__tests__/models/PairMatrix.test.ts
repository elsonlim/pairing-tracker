import PairMatrix from "../../src/models/PairMatrix";

describe("PairMatrix", () => {
  it("should be able to add member", () => {
    const newMember = "John";
    const pairingMatrix = new PairMatrix();
    pairingMatrix.addMember(newMember);

    const members = pairingMatrix.getMembers();
    expect(members[0]).toBe(newMember);
  });

  it("should not be able to add member if member already exist", () => {
    const newMember = "John";
    const pairingMatrix = new PairMatrix();
    pairingMatrix.addMember(newMember);
    pairingMatrix.addMember(newMember);
    pairingMatrix.addMember(newMember);

    const members = pairingMatrix.getMembers();
    expect(members).toHaveLength(1);
  });

  it("should generate pair when have more than 2 members", () => {
    const pairingMatrix = new PairMatrix();
    pairingMatrix.addMember("John");
    expect(pairingMatrix.getPairs()).toHaveLength(0);

    pairingMatrix.addMember("Mary");
    expect(pairingMatrix.getPairs()).toHaveLength(1);

    const pair = pairingMatrix.getPairs()[0];
    expect(pair.members).toEqual(expect.arrayContaining(["Mary", "John"]));
    expect(pair.count).toBe(0);
  });

  describe("addPairCount and getPairCount", () => {
    it("should find the pair and add and return the count", () => {
      const pairingMatrix = new PairMatrix();
      pairingMatrix.addMember("John");
      pairingMatrix.addMember("Mary");
      expect(pairingMatrix.addPairCount("Mary", "John")).toBe(1);
      expect(pairingMatrix.addPairCount("John", "Mary")).toBe(2);
    });

    it("should return -1 if pair not found", () => {
      const pairingMatrix = new PairMatrix();
      pairingMatrix.addMember("John");
      pairingMatrix.addMember("Mary");
      expect(pairingMatrix.addPairCount("unknown", "John")).toBe(-1);
    });
  });

  describe("getPairCount", () => {
    it("shoudl return the correct pair count", () => {
      const pairingMatrix = new PairMatrix();
      pairingMatrix.addMember("John");
      pairingMatrix.addMember("Mary");
      pairingMatrix.addPairCount("Mary", "John");
      pairingMatrix.addPairCount("John", "Mary");
      expect(pairingMatrix.getPairCount("John", "Mary")).toBe(2);
      expect(pairingMatrix.getPairCount("Mary", "John")).toBe(2);
    });
    it("should return -1 if pair not Found", () => {
      const pairingMatrix = new PairMatrix();
      expect(pairingMatrix.getPairCount("abc", "John")).toBe(-1);
    });
  });
});
