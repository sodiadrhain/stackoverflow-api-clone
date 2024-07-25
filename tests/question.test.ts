import request from "supertest";
import { app } from "../server";
import { APP } from "@envs";
import { generateRandomEmail, generateStrongPassword } from "@utils";

describe("Questions", () => {
  let token: string;

  beforeAll(async () => {
    // Login
    const email = generateRandomEmail();
    const password = generateStrongPassword(10);
    await request(app()).post("/auth/register").send({ email, password });

    const loginResponse = await request(app()).post("/auth/login").send({ email, password });

    token = loginResponse.body?.data?.token?.accessToken;
  });

  it("should allow a logged-in user to ask a question", async () => {
    const response = await request(app())
      .post("/question")
      .set(APP.AUTH_HEADER, token)
      .send({ title: "Test question", description: "Testing a question description" });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Question created successfully");
  });

  it("should allow a logged-in user to reply to a question", async () => {
    const questionResponse = await request(app())
      .post("/question")
      .set(APP.AUTH_HEADER, token)
      .send({ title: "Test question reply", description: "Testing a question reply description" });

    const questionId = questionResponse.body?.data?.id;

    const response = await request(app())
      .post(`/reply`)
      .set(APP.AUTH_HEADER, token)
      .send({ reply: "Reply to test question", questionId });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Reply created successfully");
  });
});
