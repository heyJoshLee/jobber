import express from 'express'

import bodyParser from 'body-parser'

// ROUTES IMPORT
import applicationRoutes from './routes/applications.js'
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


const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`)
})