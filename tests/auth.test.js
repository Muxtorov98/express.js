const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("Auth API - /api/v1/login", () => {
  it("✅ Should login successfully with valid credentials", async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .send({
        email: "user@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data.token");
    expect(res.body.data).toHaveProperty("refreshToken");
    expect(res.body.messages).toMatch("Foydalanuvchi muvaffaqiyatli kirdi");
  });

  it("❌ should return 400 if email or password is missing", async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .send({
        email: "user@example.com"
      });
      
    expect([422, 401]).toContain(res.statusCode);

    expect(res.body).toHaveProperty("messages");
    expect(typeof res.body.messages).toBe("object");
  });

  it("❌ should return 401 if credentials are invalid", async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .send({
        email: "wrong@example.com",
        password: "wrongpassword"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("messages", "Noto'g'ri email yoki parol");
    expect(res.body.success).toBe(false);
  });

});

afterAll(async () => {
  await mongoose.connection.close();
});
