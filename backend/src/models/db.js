// backend/src/db.js
import pkg from "pg";
const { Pool } = pkg;

const {
  POSTGRES_HOST = "localhost",
  POSTGRES_PORT = 5432,
  POSTGRES_USER = "postgres",
  POSTGRES_PASSWORD = "postgres",
  POSTGRES_DB = "automind",
} = process.env;

export const pool = new Pool({
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
});

// articleModel.js şu şekilde kullanıyor:
// import pool from "./db.js";
export default pool;

