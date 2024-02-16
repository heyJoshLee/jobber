export const getApplications = async (request, response) => {
  return response.status(200).json({
    message: "here are your apps"
  })
}

export const getApplication = async (request, response) => {
  const params = request.params
  const { id } = params

  return response.status(200).json({
    message: `Getting application with ID ${id}`
  })
}

export const deleteApplication = async (request, response) => {
  const params = request.params
  const { id } = params

  return response.status(200).json({
    message: `Deleting application with id ${id}`
  })
}

export const updateApplication = async (request, response) => {
  const params = request.params
  const { id } = params
  const values = request.body

  console.log('values')
  console.log(request.body)
  return response.status(200).json({
    message: `Updating application with id ${id}`,
    values: values
  })
}