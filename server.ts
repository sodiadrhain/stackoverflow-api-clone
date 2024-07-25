import "reflect-metadata";
import Express from "express";
import { APP } from "@envs";
import Cors from "cors";
import { HttpHandler } from "@utils";
import passport from "passport";
import { jwtMiddleware } from "@middlewares";
import Routes from "./src/routes";
// import Database from "src/config/database.config";

export const app = () => {
  const server = Express();

  // Middleware
  server.use(Cors());
  server.use(Express.json({ limit: "25mb" }));
  server.use(Express.urlencoded({ extended: false, limit: "25mb" }));
  server.use(HttpHandler);
  server.use(passport.initialize());
  jwtMiddleware(passport);

  // Routes
  server.get("/", (_, res) => res.status(200).json("Server is running 🚀"));

  // Server Status and Healthcheck
  server.get("/ping", (_, res) => res.status(200).json({ message: "ok" }));
  server.get("/status", (_, res) => res.status(200).json({ message: "ok" }));

  // Mount other routes
  Routes(server);

  return server;
};

export const start = () => {
  const server = app();

  // // Check DB connection
  // const db = new Database();
  // db.connect();

  // Run server
  const port = APP.PORT;
  server.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  });
};

start();
