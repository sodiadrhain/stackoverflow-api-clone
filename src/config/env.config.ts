import { config } from "dotenv";

config();

const e = process.env;

const configuration = {
  APP: {
    NAME: e.APP_NAME || "STACKOVERFLOW-API",
    PORT: e.PORT || e.APP_PORT || 3000,
    ENV: e.APP_ENV || "development",
    URL: e.APP_URL || "http://localhost:3000",
    AUTH_HEADER: e.APP_AUTH_HEADER || "sof-auth-token",
  },
  LOGS: {
    PATH: e.LOGS_PATH || "logs/",
    TOKEN: e.LOGS_TOKEN || "",
  },
  DB: {
    HOST: e.DB_HOST,
    PORT: e.DB_PORT,
    USER: e.DB_USER,
    PASSWORD: e.DB_PASSWORD,
    NAME: e.DB_NAME,
    DRIVER: e.DB_DRIVER,
  },
  JWT: {
    SECRET: e.JWT_SECRET || "SOF@00***!!!!-00*&^%",
    EXPIRY: e.JWT_EXPIRY || 3600, // set in seconds
    REFRESH_EXPIRY: e.JWT_REFRESH_EXPIRY || 48, // set in hours
    REFRESH_SECRET: e.JWT_REFRESH_SECRET || "SOF746@##@100!!!",
  },
};

const APP = configuration.APP;
const LOGS = configuration.LOGS;
const DB = configuration.DB;
const JWT = configuration.JWT;

export { APP, LOGS, DB, JWT };
