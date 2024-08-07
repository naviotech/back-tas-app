import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import { routerProject } from './routes/projectRoutes'
import { routerAuth } from './routes/authRoutes'
import cors from 'cors'
import { corsConfig } from './config/cors' 

dotenv.config()

connectDB()

const app = express()
app.use(express.json())
app.use(cors(corsConfig))

//routes
app.use("/api/auth", routerAuth)
app.use("/api/projects", routerProject)

export default app