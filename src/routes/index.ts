import { Express } from "express";
import v1 from "./v1/";

export default (app: Express) => {
  app.use(v1);
};
