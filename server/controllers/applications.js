import Application from "../models/application.js"
import User from '../models/user.js'

// GET /
export const getApplications = async (request, response) => {
  try {
    const applications = await Application.find({
      userId: request.user.id
    })
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
    const application = await Application.findById(id)
    if (application.userId !== request.user.id) {
      return response.status(403).json({
        message: 'User does not have the correct permissions for this application'
      })
    }

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
  let applicationParams = request.body

  try {
    applicationParams.userId = request.user.id
    const newApplication = await new Application(applicationParams)
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

  try {
    let application = await Application.findById(id)

    if (application.userId !== request.user.id) {
      return response.status(403).json({
        message: 'User does not have the correct permissions for this application'
      })
    }

    // TODO: refactor updating record
    application = await Application.findByIdAndUpdate(id, applicationParams, { new: true })
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

    let application = await Application.findById(id)

    if (application.userId !== request.user.id) {
      return response.status(403).json({
        message: 'User does not have the correct permissions for this application'
      })
    }

    application = await Application.findByIdAndDelete(id)
    response.status(200).json(application)
  } catch (error) {
    console.log(error)
    response.status(500).json({
      message: 'Application was not deleted.'
    })
  }
}


