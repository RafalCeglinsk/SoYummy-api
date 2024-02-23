import express from 'express'
const router = express.Router()

import { popularRecipes } from '../../controllers/popularRecipes/popularRecipes.js'

router.get('/', popularRecipes)

export { router }
