import express from 'express'
import { addRecipe } from '../../controllers/ownRecipes/addRecipe.js'
import { getRecipes } from '../../controllers/ownRecipes/getRecipes.js'
import { removeRecipe } from '../../controllers/ownRecipes/removeRecipe.js'
import { auth } from '../../middlewares/auth.js'
import { upload } from '../../middlewares/upload.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *  name: OwnRecipes
 *  description: Manage user-created recipes
 */

/**
 * @openapi
 * /ownRecipes:
 *  post:
 *    summary: Allows user to save own recipe
 *    security:
 *      - bearerAuth: []
 *        description: User token
 *    tags: [OwnRecipes]
 *    requestBody:
 *      required: true
 *      content:
 *       multipart/form-data:
 *        schema:
 *         type: object
 *         required: [title, category, description, time, instructions, ingredients]
 *         properties:
 *              title:
 *                  type: string
 *              category:
 *                  type: string
 *              description:
 *                  type: string
 *              time: 
 *                  type: string
 *              instructions:
 *                  payload:
 *                      type: array
 *                      items:
 *                          type: string
 *                      example: [Description of preparation]
 *              ingredients:
 *                  payload:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                              measure:
 *                                  type: string
 *    responses:
 *      201:
 *        description: CREATED
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  $ref: "#/components/schemas/Recipe"
 *      400:
 *        description: Bad request (invalid request body)
 *        content:
 *          application/json:
 *            example: "\"title\" is required"
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            example: Internal Server Error
 */

router.post('/', upload.single('recipeImg'), auth, addRecipe)

/**
 * @openapi
 * /ownRecipes:
 *  get:
 *    summary: Allows user to get all recipes, created by this user
 *    security:
 *      - bearerAuth: []
 *        description: User token
 *    tags: [OwnRecipes]
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                    ownRecipes:
 *                      type: array
 *                      items:
 *                        $ref: "#/components/schemas/Recipe"
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            example: Not found own recipes
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            example: Internal Server Error
 */

router.get('/', auth, getRecipes)

/**
 * @openapi
 * /ownRecipes/{id}:
 *  delete:
 *      summary: Allows user to delete own recipe from DB
 *      security:
 *        - bearerAuth: []
 *          description: User token
 *      tags: [OwnRecipes]
 *      parameters:
 *          - in: path
 *            name: recipeId
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *            description: RECIPE REMOVED FROM OUR
 *          409:
 *            description: Conflict
 *            content:
 *              application/json:
 *                example: Recipe not found
 *          500:
 *            description: Internal Server Error
 *            content:
 *              application/json:
 *                example: Internal Server Error
 *
 */
router.delete('/:recipeId', auth, removeRecipe)

export { router }
