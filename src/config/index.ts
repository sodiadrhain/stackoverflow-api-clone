import Database from "./database.config";

const db = new Database().database();

export { db };
