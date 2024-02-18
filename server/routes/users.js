import express from 'express'
import { getUser, createUser, updateUser } from '../controllers/users.js'

const router = express.Router({ mergeParams: true })

router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)

export default router