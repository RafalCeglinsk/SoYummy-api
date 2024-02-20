import express from 'express'
import { ingredientList } from '../../controllers/ingredients/ingredientList.js'

const router = express.Router()

router.get('/', ingredientList)

export { router }
