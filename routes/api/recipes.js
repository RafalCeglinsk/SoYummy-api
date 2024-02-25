import express from 'express'

const router = express.Router()

import { getRecipeToMainPage } from '../../controllers/recipes/getRecipeToMainPage.js'
import { getAllRecipes } from '../../controllers/recipes/getAllRecipes.js'
import { getCategories } from '../../controllers/recipes/getCategories.js'
import { getRecipeByCategory } from '../../controllers/recipes/getRecipeByCategory.js'
import { getRecipeById } from '../../controllers/recipes/getRecipeById.js'

import { search } from '../../controllers/search/search.js'

/**
 * @openapi
 * tags:
 *  name: Recipes
 *  description: Recipes routes to manage recipes
 */

router.get('/', getAllRecipes)

/**
 * @openapi
 * /recipes/main-page:
 *  get:
 *    summary: Return 4 recipes per category
 *    tags: [Recipes]
 *    responses:
 *     200:
 *       description: OK
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: "#/components/schemas/Recipe"
 *     404:
 *       description: Not Found
 *       content:
 *         application/json:
 *           example: Not Found
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           example: Internal Server Error
 */
router.get('/main-page', getRecipeToMainPage)

/**
 * @openapi
 * /recipes/categories:
 *  get:
 *    summary: Get list categories
 *    tags: [Recipes]
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: string
 *              example: ["Beef", "Pork", "Dessert", "Goat", "Lamb"]
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            example: Internal Server Error
 */
router.get('/categories', getCategories)

/**
 * @openapi
 * /recipes/{categoryName}:
 *  get:
 *    summary: Get recipes from the selected category
 *    tags: [Recipes]
 *    parameters:
 *      - in: path
 *        name: categoryId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Category"
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            example: Not Found
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            example: Internal Server Error
 */
router.get('/categories/:categoryName', getRecipeByCategory)

/**
 * @openapi
 * tags:
 *  name: Search
 *  description: Search recipe by title 
 */

/**
 * @openapi
 * /recipe/search:
 *  post:
 *    summary: Search recipes by title
 *    tags: [Search]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      query:
 *                          type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *                $ref: "#/components/schemas/Recipe"
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            example: Not Found
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            example: Internal Server Error
 */
router.get('/search', search)

/**
 * @openapi
 * /recipes/{id}:
 *  get:
 *    summary: Return detailed information about the recipe along with all the ingredients that are required to prepare it
 *    tags: [Recipes]
 *    parameters:
 *      - in: path
 *        name: recipeId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *                $ref: "#/components/schemas/Recipe"
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            example: Not Found
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            example: Internal Server Error
 */
router.get('/:recipeId', getRecipeById)

export { router }
