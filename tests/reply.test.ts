import request from "supertest";
import { app } from "../src/config/server.config";
import { APP } from "@envs";
import { generateRandomEmail, generateStrongPassword } from "@utils";

describe("Replies", () => {
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
      .send({ title: "Test question reply", description: "Testing a question reply description" });

    questionId = questionResponse.body?.data?.id;
  });

  it("should allow a logged-in user to reply to a question", async () => {
    const response = await request(app())
      .post("/reply")
      .set(APP.AUTH_HEADER, token)
      .send({ reply: "Reply to test question", questionId });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Reply created successfully");
  });

  it("should be able to get a reply", async () => {
    const response = await request(app())
      .post("/reply")
      .set(APP.AUTH_HEADER, token)
      .send({ reply: "Reply to test question", questionId });

    const replyId = response.body?.data?.id;

    const response2 = await request(app()).get(`/reply/${replyId}`);

    expect(response2.status).toBe(200);
    expect(response2.body?.data?.id).toBe(replyId);
    expect(response2.body.message).toBe("Reply fetched successfully");
  });

  it("should be able to get user replies", async () => {
    const response = await request(app())
      .post("/reply")
      .set(APP.AUTH_HEADER, token)
      .send({ reply: "Reply to test question", questionId });

    const response2 = await request(app()).get("/reply/user").set(APP.AUTH_HEADER, token);

    expect(response2.status).toBe(200);
    expect(response2.body?.data?.data?.[0]?.userId).toBe(response.body?.data?.userId);
    expect(response2.body.message).toBe("Replies fetched successfully");
  });

  it("should be able to get replies by question Id", async () => {
    await request(app())
      .post("/reply")
      .set(APP.AUTH_HEADER, token)
      .send({ reply: "Reply to test question", questionId });

    const response2 = await request(app()).get(`/reply/question/${questionId}`);

    expect(response2.status).toBe(200);
    expect(response2.body?.data?.data?.[0]?.questionId).toBe(questionId);
    expect(response2.body.message).toBe("Question replies fetched successfully");
  });
});
