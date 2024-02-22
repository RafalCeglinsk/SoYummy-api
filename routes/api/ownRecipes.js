import express from 'express'
import { addRecipe } from '../../controllers/ownRecipes/addRecipe.js'
import { getRecipes } from '../../controllers/ownRecipes/getRecipes.js'
import { removeRecipe } from '../../controllers/ownRecipes/removeRecipe.js'
import { auth } from '../../middlewares/auth.js'

const router = express.Router()

router.post('/', auth, addRecipe)
router.get('/', auth, getRecipes)
router.delete('/:recipeId', auth, removeRecipe)

export { router }
