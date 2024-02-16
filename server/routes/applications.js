import express from 'express'
import { getApplications, getApplication, deleteApplication, updateApplication } from '../controllers/applications.js'

const router = express.Router({ mergeParams: true })

router.get('/', getApplications)
router.get('/:id', getApplication)
router.delete('/:id', deleteApplication)
router.put('/:id', updateApplication)

export default router

