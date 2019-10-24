import http from "http";
import express from "express";
import middleware, { errorHandlers } from "./internal/middleware";
import routes from "./internal/services";
import { applyMiddleware } from "./internal/platform/web/middleware";
import { applyRoutes } from "./internal/platform/web/applyRoutes";
import { Init } from "./internal/platform/db";
import dotenv from "dotenv";

dotenv.config()

// validate required env
const envs = ["DATABASE_HOST", "DATABASE_USERNAME", "DATABASE_PASSWORD", "DATABASE_PORT", "DATABASE_NAME"]

envs.forEach(element => {
  if (!process.env[element]) {
    console.error("Required ", element)
    process.exit(1)
  }
});

Init()
const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});
