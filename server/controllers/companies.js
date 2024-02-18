import Company from "../models/company.js"
import User from '../models/user.js'

// GET /
export const getCompanies = async (request, response) => {
  try {
    const companies = await Company.find({
      userId: request.user.id
    })
    return response.status(200).json(companies)
  } catch (error) {
    console.log(error)
    return response.status(500).json({
      message: 'Error. Cannot fetch companies.'
    })
  }
}

// GET /:id
export const getCompany = async (request, response) => {
  const params = request.params
  const { id } = params

  try {
    const company = await Company.findById(id)
    if (company.userId !== request.user.id) {
      return response.status(403).json({
        message: 'User does not have the correct permissions for this Company'
      })
    }

    return response.status(200).json(company)

  } catch (error) {
    console.log(error)
    return response.status(500).json({
      message: 'Error. Cannot fetch company.'
    })
  }
}

// CREATE 
export const createCompany = async (request, response) => {
  let companyParams = request.body

  try {
    companyParams.userId = request.user.id
    const newCompany = await new Company(companyParams)
    await newCompany.save()
    return response.status(200).json(newCompany)
  } catch (error) {
    console.log(error)
    return response.status(500).json({
      message: "Company could not be created."
    })
  }
}

// UPDATE /:id
export const updateCompany = async (request, response) => {
  const params = request.params
  const { id } = params
  const companyParams = request.body

  try {
    let company = await Company.findById(id)

    if (company.userId !== request.user.id) {
      return response.status(403).json({
        message: 'User does not have the correct permissions for this Company'
      })
    }

    // TODO: refactor updating record
    company = await Company.findByIdAndUpdate(id, companyParams, { new: true })
    response.status(200).json(company)
  } catch (error) {
    console.log(error)
    response.status(500).json({
      message: "Company was not updated"
    })
  }
}

//DELETE /:id
export const deleteCompany = async (request, response) => {
  const params = request.params
  const { id } = params

  try {

    let company = await Company.findById(id)

    if (company.userId !== request.user.id) {
      return response.status(403).json({
        message: 'User does not have the correct permissions for this Company'
      })
    }

    company = await Company.findByIdAndDelete(id)
    response.status(200).json(company)
  } catch (error) {
    console.log(error)
    response.status(500).json({
      message: 'Company was not deleted.'
    })
  }
}


