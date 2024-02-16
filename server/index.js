import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

// ROUTES IMPORT
import applicationRoutes from './routes/applications.js'


// ENV VARS
dotenv.config({ path: '../.env' })
console.log(process.env.MONGO_URI)

const app = express()


// MIDDLEWARE
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

// ROUTES
app.get('/', (request, response) => {
  console.log('getting /')
  response.send("hi there")
})

app.use('/applications', applicationRoutes)


// CONNECT TO MONGO DB
const CONNECTION_URL = process.env.MONGO_URI
const PORT = process.env.PORT || 3001
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => {
    console.log(`server running on port ${PORT}.`)
  }))
  .catch((error) => console.log(error.message))
