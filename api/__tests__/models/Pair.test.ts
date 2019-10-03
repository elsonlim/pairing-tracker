import Pair from "../../src/models/Pair";

describe("Pair", () => {
  it("can create pair", () => {
    const pair = new Pair("abc", "bcd");
    expect(pair.id).toBe("abc-bcd");
  });

  it("id of pair is the same no matter order or members", () => {
    const pair = new Pair("bcd", "abc");
    expect(pair.id).toBe("abc-bcd");
  });

  it("should init with count 0", () => {
    const pair = new Pair("bcd", "abc");
    expect(pair.count).toBe(0);
  });

  it("should be able to addCount", () => {
    const pair = new Pair("bcd", "abc");
    pair.addCount();
    expect(pair.count).toBe(1);
    pair.addCount();
    expect(pair.count).toBe(2);
  });

  describe("contains", () => {
    it("should return true if contains member", () => {
      const pair = new Pair("John", "Mary");
      expect(pair.contains("John")).toBeTruthy();
      expect(pair.contains("Mary")).toBeTruthy();
    });

    it("should return true if does not contains member", () => {
      const pair = new Pair("John", "Mary");
      expect(pair.contains("J")).toBeFalsy();
      expect(pair.contains("Jo")).toBeFalsy();
      expect(pair.contains("john")).toBeFalsy();
      expect(pair.contains("Johnny")).toBeFalsy();
    });
  });

  describe("containsPair", () => {
    it("should return true if does not contains member", () => {
      const pair = new Pair("John", "Mary");
      expect(pair.containsPair("John", "Mary")).toBeTruthy();
    });

    it("should return false if does not contains member", () => {
      const pair = new Pair("John", "Mary");
      expect(pair.containsPair("John", "apple")).toBeFalsy();
    });
  });

  describe("addCount", () => {
    it("should increase pair count by 1", () => {
      const pair = new Pair("John", "Mary");
      pair.addCount();
      expect(pair.count).toBe(1);
      pair.addCount();
      expect(pair.count).toBe(2);
    });
  });
});
