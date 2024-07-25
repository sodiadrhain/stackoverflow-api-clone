import request from "supertest";
import { app } from "../server";
import { generateRandomEmail, generateStrongPassword } from "@utils";
import { APP } from "@envs";

describe("Authentication", () => {
  it("should register a new user", async () => {
    const response = await request(app())
      .post("/auth/register")
      .send({
        email: generateRandomEmail(),
        password: generateStrongPassword(10),
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("should log in an existing user", async () => {
    const email = generateRandomEmail();
    const password = generateStrongPassword(10);

    await request(app()).post("/auth/register").send({ email, password });

    const response = await request(app()).post("/auth/login").send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body?.data?.email).toBe(email);
    expect(response.body?.message).toBe("Login successful");
    expect(response.body?.data?.token?.accessToken).toBeDefined();
  });

  it("should access protected route with a valid token", async () => {
    const email = generateRandomEmail();
    const password = generateStrongPassword(10);

    await request(app()).post("/auth/register").send({ email, password });

    const loginResponse = await request(app()).post("/auth/login").send({ email, password });

    const token = loginResponse.body?.data?.token?.accessToken;

    const response = await request(app()).get("/auth/logout").set(APP.AUTH_HEADER, token);

    expect(response.status).toBe(200);
  });
});
