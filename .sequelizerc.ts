// Make env variables available
require("dotenv").config()

import { resolve } from "path";

export default {
    // Current environment for example development or production
    "env": process.env.APP_ENV,
    // Folder to seeders
    "seeders-path": resolve("src/db", "src/db/seeders"),
    // Folder to migrations
    "migrations-path": resolve("src/db", "src/db/migrations"),
    // Model path
    'models-path': resolve('src/db', 'src/db/models'),
};
