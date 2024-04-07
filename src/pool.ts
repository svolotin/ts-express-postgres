import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const pool = new pg.Pool({
  user: process.env.PG_USER,
  connectionString: process.env.PG_URL,
  password: process.env.PG_PASSWORD,
  port: 5432,
});
pool.on("error", (err) => console.error(err));

export default pool;
