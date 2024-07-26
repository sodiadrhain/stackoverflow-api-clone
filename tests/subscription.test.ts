import request from "supertest";
import { app } from "../src/config/server.config";
import { APP } from "@envs";
import { generateRandomEmail, generateStrongPassword } from "@utils";

describe("Subscription", () => {
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

  it("should allow a logged-in user to subscribe to a question", async () => {
    const response = await request(app())
      .post("/subscription")
      .set(APP.AUTH_HEADER, token)
      .send({ questionId });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Subscribed to question successfully");
  });

  it("should notify subscribed users when a question is answered", async () => {
    // Create User 2 and auth
    const emailUser2 = generateRandomEmail();
    const passwordUser2 = generateStrongPassword(10);
    await request(app())
      .post("/auth/register")
      .send({ email: emailUser2, password: passwordUser2 });

    const loginResponseUser2 = await request(app())
      .post("/auth/login")
      .send({ email: emailUser2, password: passwordUser2 });

    const tokenUser2 = loginResponseUser2.body?.data?.token?.accessToken;

    // Create User 3 and auth
    const emailUser3 = generateRandomEmail();
    const passwordUser3 = generateStrongPassword(10);
    await request(app())
      .post("/auth/register")
      .send({ email: emailUser3, password: passwordUser3 });

    const loginResponse3 = await request(app())
      .post("/auth/login")
      .send({ email: emailUser3, password: passwordUser3 });

    const tokenUser3 = loginResponse3.body?.data?.token?.accessToken;

    // User 1 creates a question
    const questionResponse = await request(app())
      .post("/question")
      .set(APP.AUTH_HEADER, token)
      .send({ title: "Test question reply", description: "Testing a question reply description" });

    const user1questionId = questionResponse.body?.data?.id;

    // User 2 subscribes to user 1 question
    const subscribe = await request(app())
      .post("/subscription")
      .set(APP.AUTH_HEADER, tokenUser2)
      .send({ questionId: user1questionId });

    expect(subscribe.status).toBe(200);
    expect(subscribe.body.message).toBe("Subscribed to question successfully");

    // User 3 replies to user 1 question
    const response = await request(app())
      .post("/reply")
      .set(APP.AUTH_HEADER, tokenUser3)
      .send({ reply: "Reply to test question", questionId: user1questionId });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Reply created successfully");

    // User 2 gets notification of the question he subscribed to
    const response2 = await request(app())
      .get("/subscription/notification")
      .set(APP.AUTH_HEADER, tokenUser2);

    expect(response2.status).toBe(200);
    expect(response2.body?.data?.data?.[0]?.questionId).toBe(user1questionId);
    expect(response2.body?.data?.data?.[0]?.replyId).toBe(response.body?.data?.id);
    expect(response2.body.message).toBe("Subscription notifications fetched successfully");
  });
});
