import pairService from "../../src/services/pairMatrix.services";
import "../../src/db";
const mongoose = require("mongoose");
import { MongoClient } from "mongodb";

declare var global: {
  __MONGO_URI__: string;
  __MONGO_DB_NAME__: string;
};

describe("PairMatrix Service", () => {
  let connection;
  let db;
  let matrixId;
  const fakeId = "7d96f9b971ca6e43f3bf3fd1";

  beforeAll(async () => {
    const dbParams = global.__MONGO_URI__.split("/");
    const dbName = dbParams[dbParams.length - 1];
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await connection.close();
    await mongoose.connection.close();
    await db.close();
  });

  beforeEach(async () => {
    await db.dropDatabase();
  });

  let mockMatrix;
  beforeEach(async () => {
    mockMatrix = await pairService.create();
  });

  describe("addMember", () => {
    it("should return false when add same member second time", async () => {
      await pairService.addMember(mockMatrix.id, "John");
      expect(await pairService.addMember(mockMatrix.id, "John")).toBe(false);
    });

    it("should return false if invalid matrix id", async () => {
      expect(await pairService.addMember(fakeId, "John")).toBe(false);
    });
  });

  describe("getPairs", () => {
    it("should fail if invalid matrix id passed in", async () => {
      expect(await pairService.getPairs(fakeId)).toBe(false);
    });
  });

  describe("increaseCount", () => {
    beforeEach(async () => {
      await pairService.addMember(mockMatrix.id, "Alice");
      await pairService.addMember(mockMatrix.id, "John");
    });

    it("should increase count of pair", async () => {
      await pairService.increaseCount(mockMatrix, "Alice-John");
      const collection = db.collection("pairmatrixes");
      const matrix = await collection.findOne({
        _id: mongoose.Types.ObjectId(mockMatrix.id),
      });
      expect(matrix.pairs[0]).toMatchObject({
        id: "Alice-John",
        count: 1,
      });
    });

    it("should fail if invalid matrix id passed in", async () => {
      expect(await pairService.increaseCount(fakeId, "Alice-John")).toBe(false);
    });

    it("should fail if invalid pair id passed in", async () => {
      expect(
        await pairService.increaseCount(mockMatrix.id, "Alice-Peter"),
      ).toBe(false);
    });
  });
});
