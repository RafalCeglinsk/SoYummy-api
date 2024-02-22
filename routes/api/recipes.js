import express from 'express'

const router = express.Router()

import { getRecipeToMainPage } from '../../controllers/recipes/getRecipeToMainPage.js'
import { getAllRecipes } from '../../controllers/recipes/getAllRecipes.js'
import { getCategories } from '../../controllers/recipes/getCategories.js'
import { getRecipeByCategory } from '../../controllers/recipes/getRecipeByCategory.js'
import { getRecipeById } from '../../controllers/recipes/getRecipeById.js'

import { search } from '../../controllers/search/search.js'

router.get('/', getAllRecipes)
router.get('/main-page', getRecipeToMainPage)
router.get('/categories', getCategories)
router.get('/categories/:categoryName', getRecipeByCategory)
router.get('/search', search)
router.get('/:recipeId', getRecipeById)

export { router }
