import request from "supertest";
import { app } from "../src/config/server.config";
import { APP } from "@envs";
import { generateRandomEmail, generateStrongPassword } from "@utils";

describe("Ratings", () => {
  let token: string;
  let questionId: number;

  beforeAll(async () => {
    // Auth
    const email = generateRandomEmail();
    const password = generateStrongPassword(10);
    await request(app()).post("/auth/register").send({ email, password });

    const loginResponse = await request(app()).post("/auth/login").send({ email, password });

    token = loginResponse.body?.data?.token?.accessToken;

    const questionResponse = await request(app())
      .post("/question")
      .set(APP.AUTH_HEADER, token)
      .send({ title: "Test question", description: "Testing a question description" });

    questionId = questionResponse.body?.data?.id;
  });

  it("should allow a logged-in user to upvote a question", async () => {
    const response = await request(app())
      .post("/rating/question")
      .set(APP.AUTH_HEADER, token)
      .send({ rate: true, questionId });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Upvoted successfully");
  });

  it("should allow a logged-in user to downvote a question", async () => {
    const response = await request(app())
      .post("/rating/question")
      .set(APP.AUTH_HEADER, token)
      .send({ rate: false, questionId });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Downvoted successfully");
  });
});
