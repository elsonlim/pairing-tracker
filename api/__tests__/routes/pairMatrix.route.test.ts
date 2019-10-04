import app from "../../src/app";
import request from "supertest";
const mongoose = require("mongoose");
import { MongoClient } from "mongodb";

declare var global: {
  __MONGO_URI__: string;
  __MONGO_DB_NAME__: string;
};

describe("Pair Matrix", () => {
  let connection;
  let db;
  let matrixId;

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

  beforeEach(async () => {
    const response = await request(app)
      .post("/pair-matrix")
      .set("Content-Type", "application/json")
      .send();
    matrixId = response.body.id;
  });

  const getMatrixById = async (id: string) => {
    const collection = db.collection("pairmatrixes");
    return await collection.findOne({
      _id: mongoose.Types.ObjectId(id),
    });
  };

  describe("/pair-matrix", () => {
    it("POST should return id of newly created matrix", async () => {
      const response = await request(app)
        .post("/pair-matrix")
        .set("Content-Type", "application/json")
        .send();

      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(expect.any(String));

      const matrixId = response.body.id;
      const newMatrix = await getMatrixById(matrixId);
      expect(newMatrix).toMatchObject({
        _id: mongoose.Types.ObjectId(matrixId),
        pairs: [],
        members: [],
      });
    });
  });

  describe("/pair-matrix/<id>/members", () => {
    it("POST - should add new memebrs to the object", async () => {
      const response = await request(app)
        .post(`/pair-matrix/${matrixId}/members`)
        .set("Content-Type", "application/json")
        .send({
          name: "John",
        });

      expect(response.status).toBe(200);

      const matrix = await getMatrixById(matrixId);
      expect(matrix.members).toEqual(expect.arrayContaining(["John"]));
      expect(matrix.pairs).toEqual([]);
    });

    it("should create pairs when more than 2 membes are added in", async () => {
      await request(app)
        .post(`/pair-matrix/${matrixId}/members`)
        .set("Content-Type", "application/json")
        .send({
          name: "John",
        });
      await request(app)
        .post(`/pair-matrix/${matrixId}/members`)
        .set("Content-Type", "application/json")
        .send({
          name: "Alice",
        });

      const matrix = await getMatrixById(matrixId);
      expect(matrix.members).toEqual(expect.arrayContaining(["John"]));
      expect(matrix.pairs).toHaveLength(1);
      expect(matrix.pairs[0]).toMatchObject({
        id: "Alice-John",
        members: expect.arrayContaining(["Alice", "John"]),
        count: 0,
      });
    });
  });

  describe("/pair-matrix/<id>/pairs/Alice-John", () => {
    describe("without pair", () => {
      it("/increase-count POST should increase count for the pair", async () => {
        const resopnse = await request(app)
          .post(`/pair-matrix/${matrixId}/pairs/Alice-John/increase-count`)
          .send();

        expect(resopnse.status).toBe(404);
      });
    });

    describe("with pair created", () => {
      beforeEach(async () => {
        await request(app)
          .post(`/pair-matrix/${matrixId}/members`)
          .set("Content-Type", "application/json")
          .send({
            name: "John",
          });
        await request(app)
          .post(`/pair-matrix/${matrixId}/members`)
          .set("Content-Type", "application/json")
          .send({
            name: "Alice",
          });
      });

      it("GET should be able to get pair", async () => {
        const response = await request(app)
          .get(`/pair-matrix/${matrixId}/pairs`)
          .send();

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(matrixId);

        expect(response.body.pairs[0]).toMatchObject({
          id: "Alice-John",
          members: expect.arrayContaining(["Alice", "John"]),
          count: 0,
        });
      });

      it("/increase-count POST should increase count for the pair", async () => {
        await request(app)
          .post(`/pair-matrix/${matrixId}/pairs/Alice-John/increase-count`)
          .send();

        await request(app)
          .post(`/pair-matrix/${matrixId}/pairs/Alice-John/increase-count`)
          .send();

        const matrix = await getMatrixById(matrixId);
        expect(matrix.members).toEqual(expect.arrayContaining(["John"]));
        expect(matrix.pairs).toHaveLength(1);
        expect(matrix.pairs[0]).toMatchObject({
          id: "Alice-John",
          members: expect.arrayContaining(["Alice", "John"]),
          count: 2,
        });
      });
    });
  });
});
