import Application from "../models/application.js"

// GET /
export const getApplications = async (request, response) => {
  console.log('getting applications...')
  try {
    const applications = await Application.find({})
    console.log(applications)
    return response.status(200).json(applications)
  } catch (error) {
    console.log(error)
    return response.status(500).json({
      message: 'Error. Cannot fetch applications.'
    })
  }
}

// GET /:id
export const getApplication = async (request, response) => {
  const params = request.params
  const { id } = params

  try {

    console.log('getting app')
    const application = await Application.findById(id)
    return response.status(200).json(application)

  } catch (error) {
    console.log(error)
    return response.status(500).json({
      message: 'Error. Cannot fetch application.'
    })
  }
}

// CREATE 
export const createApplication = async (request, response) => {
  const applicationParams = request.body

  try {
    const newApplication = await new Application(applicationParams)
    console.log(newApplication)
    await newApplication.save()
    return response.status(200).json(newApplication)
  } catch (error) {
    console.log(error)
    return response.status(500).json({
      message: "Application could not be created."
    })
  }
}

// UPDATE /:id
export const updateApplication = async (request, response) => {
  const params = request.params
  const { id } = params
  const applicationParams = request.body


  console.log('values')
  console.log(applicationParams)

  try {
    const application = await Application.findByIdAndUpdate(id, applicationParams, { new: true })
    response.status(200).json(application)
  } catch (error) {
    console.log(error)
    response.status(500).json({
      message: "Application was not updated"
    })
  }


}

//DELETE /:id
export const deleteApplication = async (request, response) => {
  const params = request.params
  const { id } = params

  try {
    const application = await Application.findByIdAndDelete(id)

    response.status(200).json(application)


  } catch (error) {
    console.log(error)
    response.status(500).json({
      message: 'Application was not deleted.'
    })
  }
}


