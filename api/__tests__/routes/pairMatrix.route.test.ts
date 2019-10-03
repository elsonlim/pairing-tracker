jest.mock("uuid/v1", () => {
  return () => "fakeUUID";
});

import app from "../../src/app";
import request from "supertest";

describe("Pair Matrix", () => {
  it("POST /pair-matrix", async () => {
    const response = await request(app)
      .post("/pair-matrix")
      .set("Content-Type", "application/json")
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: "fakeUUID" });
  });

  it("POST /pair-matrix/fakeUUID/members", async () => {
    await request(app)
      .post("/pair-matrix")
      .set("Content-Type", "application/json")
      .send();

    const response = await request(app)
      .post("/pair-matrix/fakeUUID/members")
      .set("Content-Type", "application/json")
      .send({
        name: "John",
      });

    expect(response.status).toBe(200);
  });

  describe("/pair-matrix route", () => {
    it("should return pairs with counts", async () => {
      await request(app)
        .post("/pair-matrix")
        .set("Content-Type", "application/json")
        .send();

      await request(app)
        .post("/pair-matrix/fakeUUID/members")
        .set("Content-Type", "application/json")
        .send({
          name: "Alice",
        });

      await request(app)
        .post("/pair-matrix/fakeUUID/members")
        .set("Content-Type", "application/json")
        .send({
          name: "John",
        });

      const response = await request(app)
        .get("/pair-matrix/fakeUUID/pairs")
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: "fakeUUID",
        pairs: [
          {
            id: "Alice-John",
            members: expect.arrayContaining(["Alice", "John"]),
            count: 0,
          },
        ],
      });
    });

    it("POST /pairMatrix/fakeUUID/pairs/Alice-John/increase-count", async () => {
      await request(app)
        .post("/pair-matrix")
        .set("Content-Type", "application/json")
        .send();

      await request(app)
        .post("/pair-matrix/fakeUUID/members")
        .set("Content-Type", "application/json")
        .send({
          name: "Alice",
        });

      await request(app)
        .post("/pair-matrix/fakeUUID/members")
        .set("Content-Type", "application/json")
        .send({
          name: "John",
        });

      await request(app)
        .post("/pair-matrix/fakeUUID/pairs/Alice-John/increase-count")
        .send();

      const response = await request(app)
        .get("/pair-matrix/fakeUUID/pairs")
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: "fakeUUID",
        pairs: [
          {
            id: "Alice-John",
            members: expect.arrayContaining(["Alice", "John"]),
            count: 1,
          },
        ],
      });
    });
  });
});
