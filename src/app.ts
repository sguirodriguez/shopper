import express from "express";
import cors from "cors";
import "dotenv/config";

import configuration from "./config";
import http from "http";
import routes from "./routes";
import errorMiddleware from "./middleware/errorMiddleware";

const app = express();

app.use(cors({ origin: configuration.corsOrigin || "*" }));
app.use(express.json({ limit: "10mb" }));

app.use(routes);

app.use(errorMiddleware);

const server = http.createServer(app);

export { server };
