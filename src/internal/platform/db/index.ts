import { Pool } from "pg";
import { ApplicationError } from "../web/error";

export let pool: Pool;

export const Init = () => {
  pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    max: 1
  });
  pool.query('select 1').then((rs) => {
    console.log("Database connected");
  }).catch(err => {
    console.error("DB connection fails ", err);
  });
}
export const query = async (sql: string, params?: Array<any>) => {
  try {
    return await pool.query(sql, params);
  } catch (error) {
    throw new ApplicationError(500, "database-error", error.message);
  }
};

export const closePool = () => {
  pool.end()
}