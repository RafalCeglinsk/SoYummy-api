import express from 'express'
import { ingredientList } from '../../controllers/ingredients/ingredientList.js'
import { ingredientSearch } from '../../controllers/ingredients/ingredientSearch.js'
import { auth } from '../../middlewares/auth.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *  name: Ingredients
 *  description: Ingredients list
 */

/**
 * @openapi
 * /ingredients/list:
 *   get:
 *      tags: [Ingredients]
 *      summary: Returns a list ingredients
 *      responses:
 *       200:
 *          description: Array of ingredients
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          code:
 *                              type: integer
 *                          message:
 *                              type: string
 *                          data:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Ingredient"
 *                          qty:
 *                              type: integer
 *       404:
 *          description: Not Found
 *          content:
 *              application/json:
 *                  example: Not Found
 *       500:
 *          description: Internal Server Error
 *          content:
 *              application/json:
 *                  example: Internal Server Error
 */
router.get('/list', ingredientList)

/**
 * @openapi
 *  /ingredients:
 *      post:
 *          tags: [Search]
 *          summary: Search recipes by ingredients
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ingredients:
 *                                  type: string
 *          responses:
 *            200:
 *              description: OK
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/Recipe"
 *            404:
 *              description: Not Found
 *              content:
 *                application/json:
 *                  example: Not Found
 *            500:
 *              description: Internal Server Error
 *              content:
 *                application/json:
 *                  example: Internal Server Error
 */
router.get('/', auth, ingredientSearch)

export { router }
