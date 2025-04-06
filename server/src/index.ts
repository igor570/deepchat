import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import router from './routes/router'

import { createUser, loginUser } from './handlers/user'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

/**
 * Middleware
 */
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/**
 * Router
 */
app.use('/api', router)

/**
 * Auth Endpoints
 */
app.post('/signup', createUser)
app.post('/signin', loginUser)

/**
 * Launch Server
 */
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
