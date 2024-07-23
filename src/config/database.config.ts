import { DB } from "@envs";
import { Dialect, Sequelize } from "sequelize";

class Database {
  // Connection instance
  private static instance: Sequelize;

  public database(): Sequelize {
    // Database connection
    const dbName = DB.NAME;
    const dbUser = DB.USER;
    const dbHost = DB.HOST;
    const dbDriver = DB.DRIVER as Dialect;
    const dbPassword = DB.PASSWORD;

    // Initialize connection
    return (Database.instance = new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      dialect: dbDriver,
    }));
  }

  public async connect(): Promise<void> {
    // Auth to database
    return Database.instance
      .authenticate()
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.log("Failed to connected to database: ", err);
        process.exit(1);
      });
  }
}

export default Database;
