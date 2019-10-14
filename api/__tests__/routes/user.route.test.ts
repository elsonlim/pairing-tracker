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
    describe("Post", () => {
      const mockUser = {
        email: "John@email.com",
        username: "John",
      };

      it("should response with the user and email", async () => {
        const response = await request(app)
          .post(`/user`)
          .set("Content-Type", "application/json")
          .send({
            email: "John@email.com",
            username: "John",
            password: "password",
          });

        expect(response.body).toMatchObject(mockUser);
      });

      it("should be able to find user in db after create", async () => {
        await request(app)
          .post(`/user`)
          .set("Content-Type", "application/json")
          .send({
            email: "John@email.com",
            username: "John",
            password: "password",
          });

        const collection = db.collection("users");
        const user = await collection.findOne(mockUser);
        expect(user).toMatchObject({
          email: "John@email.com",
          username: "John",
        });
        expect(user.password).toMatch(/\$2b\$10\$.+/);
      });
    });

    describe("/signin", () => {
      beforeEach(async () => {
        await request(app)
          .post(`/user`)
          .set("Content-Type", "application/json")
          .send({
            email: "John@email.com",
            username: "John",
            password: "password",
          });
      });

      it("post should sign in user", async () => {
        const response = await request(app)
          .post(`/user/signin`)
          .set("Content-Type", "application/json")
          .send({
            email: "John@email.com",
            password: "password",
          });

        expect(response.status).toBe(200);
      });

      it("Post should not sign in user if password is wrong", async () => {
        const response = await request(app)
          .post(`/user/signin`)
          .set("Content-Type", "application/json")
          .send({
            email: "John@email.com",
            password: "wrgpw",
          });

        expect(response.status).toBe(401);
      });

      it("Post should not sign in user does not exist", async () => {
        const response = await request(app)
          .post(`/user/signin`)
          .set("Content-Type", "application/json")
          .send({
            email: "Doe@email.com",
            password: "password",
          });

        expect(response.status).toBe(401);
      });
    });
  });
});
