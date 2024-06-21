import { Pool } from 'pg'
import * as dotenv from 'dotenv'
dotenv.config({ path: 'tools/.env.dev' })
/* Creating a new pool of connections to the database. */
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.TEST !== 'TRUE' ? process.env.DB_HOST : 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

/**
 * It connects to the database
 */
export const connectToDB = async (): Promise<void> => {
  try {
    await pool.connect()
    console.log('Connected to DB')
  } catch (err) {
    console.log('connectToDB::err', err)
  }
}
