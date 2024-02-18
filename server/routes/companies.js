import express from 'express'
import auth from '../middleware/auth.js'
import { getCompanies, getCompany, deleteCompany, updateCompany, createCompany } from '../controllers/companies.js'

const router = express.Router({ mergeParams: true })

router.get('/', auth, getCompanies)
router.get('/:id', auth, getCompany)
router.post('/', auth, createCompany)
router.delete('/:id', auth, deleteCompany)
router.put('/:id', auth, updateCompany)

export default router