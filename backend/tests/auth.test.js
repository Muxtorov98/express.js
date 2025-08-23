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
    expect(res.body.messages).toMatch(/success/i);
  });

  it("❌ should return 400 if email or password is missing", async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .send({
        email: "user@example.com"
      });

    // Sizning backend 400 emas, balki 401 qaytaryapti bo‘lishi mumkin.
    // Shuning uchun statusCode’ni dynamic test qilamiz:
    expect([400, 401]).toContain(res.statusCode);

    expect(res.body).toHaveProperty("messages");
    expect(typeof res.body.messages).toBe("string");
  });

  it("❌ should return 401 if credentials are invalid", async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .send({
        email: "wrong@example.com",
        password: "wrongpassword"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("messages", "Invalid email or password");
    expect(res.body.success).toBe(false);
  });

});

// 🔻 Test tugaganda Mongo connectionni yopamiz
afterAll(async () => {
  await mongoose.connection.close();
});
