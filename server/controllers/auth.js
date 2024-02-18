import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const logIn = async (request, response) => {

  try {

    const logInParams = request.body
    // Force email to lower case
    const emailParams = logInParams.email.toLowerCase()
    console.log('emailParams')
    console.log(emailParams)

    const user = await User.findOne({ email: emailParams })
    if (!user) {
      console.log('User not found')
      return response.status(501).json({
        message: 'Invalid credentials'
      })
    }

    const passwordMatches = await bcrypt.compare(logInParams.password, user.password)

    if (!passwordMatches) {
      console.log('Wrong password')
      return response.status(400).json({
        message: 'Invalid credentials'
      })
    }

    // Sign in user with jwt
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
      if (error) throw error
      console.log('Successfully logged in')
      return response.status(200).json({
        token,
        user,
        loggedIn: true
      })
    })
  } catch (error) {
    response.status(500).json({
      message: 'Error. Could not login'
    })
  }

}







