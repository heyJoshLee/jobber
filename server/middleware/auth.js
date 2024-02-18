import jwt from 'jsonwebtoken'

const auth = (request, response, next) => {
  // Get token from header
  const token = request.header('x-auth-token')
  try {
    // Is token valid?
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // If so, pass user to request object
    request.user = decoded.user
    next()
  } catch (erorr) {
    response.status(401).json({
      message: 'Invalid credentials'
    })
  }
}

export default auth