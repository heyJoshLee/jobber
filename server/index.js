import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

// ROUTES IMPORT
import applicationRoutes from './routes/applications.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'

// ENV VARS
dotenv.config({ path: '../.env' })

const app = express()

// MIDDLEWARE
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

// CONFIGURE ROUTES
app.get('/', (request, response) => {
  console.log('getting /')
  response.send("hi there")
})

app.use('/applications', applicationRoutes)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)

// CONNECT TO MONGO DB
const CONNECTION_URL = process.env.MONGO_URI
const DBNAME = process.env.MONGO_DBNAME
const PORT = process.env.PORT || 3001
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, dbName: DBNAME })
  .then(() => app.listen(PORT, () => {
    console.log(`server running on port ${PORT}.`)
  }))
  .catch((error) => console.log(error.message))
