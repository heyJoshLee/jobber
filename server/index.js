import express from 'express'
const app = express()




// ROUTES IMPORT
import applicationRoutes from './routes/applications.js'




app.get('/', (request, response) => {
  console.log('getting /')
  response.send("hi there")
})

app.use('/applications', applicationRoutes)



const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`)
})