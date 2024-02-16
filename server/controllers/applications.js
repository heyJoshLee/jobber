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