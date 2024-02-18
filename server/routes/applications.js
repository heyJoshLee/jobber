import express from 'express'
import auth from '../middleware/auth.js'
import { getApplications, getApplication, deleteApplication, updateApplication, createApplication } from '../controllers/applications.js'

const router = express.Router({ mergeParams: true })

router.get('/', auth, getApplications)
router.get('/:id', auth, getApplication)
router.post('/', auth, createApplication)
router.delete('/:id', auth, deleteApplication)
router.put('/:id', auth, updateApplication)

export default router

