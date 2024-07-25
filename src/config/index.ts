import Database from "./database.config";

const db = new Database().database();
const dbTrx = new Database().database().transaction();

export { db, dbTrx };
