import express from 'express'
import { ingredientList } from '../../controllers/ingredients/ingredientList.js'
import { ingredientSearch } from '../../controllers/ingredients/ingredientSearch.js'
import { auth } from '../../middlewares/auth.js'

const router = express.Router()

router.get('/list', ingredientList)
router.get('/', auth, ingredientSearch)

export { router }
