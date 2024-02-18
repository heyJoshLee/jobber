import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// CREATE
export const createUser = async (require, response) => {
  const userParams = require.body
  userParams.email = userParams.email.toLowerCase()
  console.log('userParams')
  console.log(userParams)

  // See if user already exsists
  try {
    const existingUser = await User.findOne({ email: userParams.email.toLowerCase() })
    console.log(existingUser)
    if (existingUser) {
      return response.status(500).json({
        message: 'User already exsists'
      })
    }

    // Hash password
    const newUser = new User(userParams)
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(userParams.password, salt)
    await newUser.save()

    console.log('newUser')
    console.log(newUser)

    // Sign in user with JWT
    const payload = {
      user: {
        id: newUser.id
      }
    }


    jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
      if (error) throw error
      console.log('Successfully logged in')
      return response.status(200).json({
        token,
        user: newUser,
        loggedIn: true
      })
    })
  } catch (error) {
    console.log(error.message)
    return response.status(404).json({
      message: error.message
    })
  }
}

// GET /:id
export const getUser = async (request, response) => {
  const id = req.params.id
  try {
    const user = await User.findById(id)
    response.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = async (request, require) => {
  const id = request.params.id
  const userParams = request.body
  try {
    const user = await User.findByIdAndUpdate(id, userParams, { new: true })
    request.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
}