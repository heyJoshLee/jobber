import express from 'express'
import { getApplications, getApplication } from '../controllers/applications.js'

const router = express.Router({ mergeParams: true })

router.get('/', getApplications)
router.get('/:id', getApplication)
export default router

