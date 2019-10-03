import request from "supertest";
import app from "../src/app";

describe("app", () => {
  it("/status", async () => {
    const response = await request(app).get("/status");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "up" });
  });
});
