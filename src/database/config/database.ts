import { Options } from "sequelize";
import configuration from "../../config";

const config: Options = {
  database: configuration.database.name,
  username: configuration.database.username,
  password: configuration.database.password,
  host: configuration.database.host,
  port: Number(configuration.database.port),
  dialect: "postgres",
  dialectOptions: {
    ssl:
      process.env.NODE_ENV !== "production"
        ? {
            require: true,
            rejectUnauthorized: false
          }
        : false
  }
};

export = config;
