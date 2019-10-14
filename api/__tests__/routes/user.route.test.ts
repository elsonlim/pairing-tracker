import app from "../../src/app";
import request from "supertest";
const mongoose = require("mongoose");
import { MongoClient } from "mongodb";

declare var global: {
  __MONGO_URI__: string;
  __MONGO_DB_NAME__: string;
};

describe("User", () => {
  let connection;
  let db;

  beforeAll(async () => {
    const dbParams = global.__MONGO_URI__.split("/");
    const dbName = dbParams[dbParams.length - 1];
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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

  describe("/user", () => {
    it("Post should create user", async () => {
      const mockUser = {
        email: "John@email.com",
        username: "John",
      };
      const response = await request(app)
        .post(`/user`)
        .set("Content-Type", "application/json")
        .send({
          email: "John@email.com",
          username: "John",
          password: "password",
        });

      expect(response.body).toMatchObject(mockUser);

      const collection = db.collection("users");
      const user = await collection.findOne(mockUser);
      const allUser = await collection.find().next();
      console.log(user);
      console.log(allUser);
      expect(user).toMatchObject({
        email: "John@email.com",
        username: "John",
      });
      expect(user.password).toMatch(/\$2b\$10\$.+/);
    });
  });
});
