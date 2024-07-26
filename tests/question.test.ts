import request from "supertest";
import { app } from "../src/config/server.config";
import { APP } from "@envs";
import { generateRandomEmail, generateStrongPassword } from "@utils";

describe("Questions", () => {
  let token: string;

  beforeAll(async () => {
    // Auth
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

  it("should be able to get a created question", async () => {
    const response = await request(app())
      .post("/question")
      .set(APP.AUTH_HEADER, token)
      .send({ title: "Test question", description: "Testing a question description" });

    const questionId = response.body?.data?.id;

    const response2 = await request(app()).get(`/question/${questionId}`);

    expect(response2.status).toBe(200);
    expect(response2.body?.data?.id).toBe(questionId);
    expect(response2.body.message).toBe("Question fetched successfully");
  });

  it("should be able to get many questions", async () => {
    await request(app())
      .post("/question")
      .set(APP.AUTH_HEADER, token)
      .send({ title: "Test question", description: "Testing a question description" });

    await request(app())
      .post("/question")
      .set(APP.AUTH_HEADER, token)
      .send({ title: "Test question", description: "Testing a question description" });

    const response3 = await request(app()).get("/question");

    expect(response3.status).toBe(200);
    expect(response3.body.message).toBe("Questions fetched successfully");
  });

  it("should be able to get user questions", async () => {
    const response = await request(app())
      .post("/question")
      .set(APP.AUTH_HEADER, token)
      .send({ title: "Test question", description: "Testing a question description" });

    const response2 = await request(app()).get("/question");

    expect(response2.status).toBe(200);
    expect(response2.body?.data?.data?.[0]?.userId).toBe(response.body?.data?.userId);
    expect(response2.body.message).toBe("Questions fetched successfully");
  });

  it("should be able to get questions by user Id", async () => {
    const response = await request(app())
      .post("/question")
      .set(APP.AUTH_HEADER, token)
      .send({ title: "Test question", description: "Testing a question description" });

    const response2 = await request(app()).get(`/question/user/${response.body?.data?.userId}`);

    expect(response2.status).toBe(200);
    expect(response2.body?.data?.data?.[0]?.userId).toBe(response.body?.data?.userId);
    expect(response2.body.message).toBe("User questions fetched successfully");
  });
});
