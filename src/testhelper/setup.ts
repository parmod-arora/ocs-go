import { Init, closePool } from "../internal/platform/db";
import { config } from "dotenv";
export const setup = () => {
  config()
  Init()
}

export const teardown = () => {
  closePool()
}