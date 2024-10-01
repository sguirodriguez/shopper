const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

interface Config {
  env: string;
  port: number;
  database: {
    name: string;
    username: string;
    password: string;
    host: string;
    port: number;
  };
  corsOrigin: string;
  geminiKey: string;
  fileIoKey: string;
}

const configuration: Config = {
  env: String(process.env.DB_DATABASE),
  port: Number(process.env.PORT),
  database: {
    name: String(process.env.DB_DATABASE),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT)
  },
  corsOrigin: String(process.env.CORS_ORIGIN),
  geminiKey: String(process.env.GEMINI_API_KEY),
  fileIoKey: String(process.env.FILE_IO_API_KEY)
};

export default configuration;
