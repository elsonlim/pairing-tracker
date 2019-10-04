import pairService from "../../src/services/pair.services";

describe("PairService", () => {
  describe("create", () => {
    it("should generate id base on name", () => {
      const pair = pairService.createPair("Alice", "John");
      expect(pair.id).toBe("Alice-John");

      const pair2 = pairService.createPair("Bob", "Alice");
      expect(pair2.id).toBe("Alice-Bob");
    });
  });

  describe("Contains", () => {
    it("should return false if Peter is not in Pair", () => {
      const pair = {
        id: "Alice-John",
        members: ["Alice", "John"],
        count: 0,
      };
      expect(pairService.contains(pair, "Peter")).toBe(false);
    });
  });

  describe("ContainsPair", () => {
    it("should return false if at least one member not in pair", () => {
      const pair = {
        id: "Alice-John",
        members: ["Alice", "John"],
        count: 0,
      };
      expect(pairService.containsPair(pair, "Alice", "Peter")).toBe(false);
      expect(pairService.containsPair(pair, "John", "Peter")).toBe(false);
    });
  });
});
