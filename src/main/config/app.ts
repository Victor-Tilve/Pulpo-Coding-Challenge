import express from 'express'
import * as dotenv from 'dotenv'
import routes from './routes'
import middlewares from './middlewares'
import { connectToDB } from '../../infra/db/postgreslq/postgresql-connect'

const app = express()
middlewares(app)
// ROUTES INIT
routes(app)
dotenv.config({ path: 'tools/.env.dev' })
void connectToDB()
export default app
