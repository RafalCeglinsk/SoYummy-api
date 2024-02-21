import express from 'express'

const router = express.Router()

import { getRecipeToMainPage } from '../../controllers/recipes/getRecipeToMainPage.js'
import { getAllRecipes } from '../../controllers/recipes/getAllRecipes.js'
import { getCategories } from '../../controllers/recipes/getCategories.js'
import { getRecipeByCategory } from '../../controllers/recipes/getRecipeByCategory.js'
import { getRecipeById } from '../../controllers/recipes/getRecipeById.js'

import { addRecipe } from '../../controllers/ownRecipes/addRecipe.js'
import { getRecipes } from '../../controllers/ownRecipes/getRecipes.js'
import { removeRecipe } from '../../controllers/ownRecipes/removeRecipe.js'

import { popularRecipes } from '../../controllers/popularRecipes/popularRecipes.js'

import { search } from '../../controllers/search/search.js'

router.get('/', getAllRecipes)
router.get('/main-page', getRecipeToMainPage)
router.get('/categories', getCategories)
router.get('/categories/:categoryName', getRecipeByCategory)
router.get('/search', search)
router.get('/:recipeId', getRecipeById)

router.get('/own', getRecipes)
router.post('/own', addRecipe)
router.delete('/own/:recipeId', removeRecipe)

router.get('/popular', popularRecipes)

export { router }
