const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  it("should login user with valid credentials", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com", password: "123456" });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
