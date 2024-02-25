import express from 'express'
import { addToFavorite } from '../../controllers/favorites/addToFavorite.js'
import { removeFromFavorite } from '../../controllers/favorites/removeFromFavorite.js'
import { getFavorite } from '../../controllers/favorites/getFavorite.js'
import { auth } from '../../middlewares/auth.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *  name: Favorites
 *  description: Allows logged users add favorite recipe, browse list favorite recipes and delete
 */

/**
 * @openapi
 * /favorites/:
 *   post:
 *     tags: [Favorites]
 *     summary: Allows user to save defined recipe to favorites collection
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: recipeId 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeId:
 *                 type: string
 *       required: true
 *     responses:
 *       200:
 *         description: RECIPES ADDED TO FAVORITE
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Recipe"
 *       400:
 *         description: Bad request (invalid request body)
 *         content:
 *           application/json:
 *             example: "\"recipeId\" is required" 
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: Token is invalid
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example: Sorry, we don't have such a recipe
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             example: Recipe already in favorites. Delete it or add another one
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: Internal Server Error
 */
router.post('/', auth, addToFavorite)

/**
 * @openapi
 * /favorites:
 *  get:
 *     tags: [Favorites]
 *     summary: Returns collection of user's favorite recipes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Recipe"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: Internal Server Error
 */
router.get('/', auth, getFavorite)

/**
 * @openapi
 *  /favorites/{id}:
 *    delete:
 *      tags: [Favorites]
 *      summary: Allows user to delete recipe from favorites collection
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: recipeId
 *            required: true
 *            shema:
 *              type: string
 *      responses:
 *          200:
 *            description: OK
 *            content:
 *              application/json:
 *                example: RECIPE REMOVED FROM FAVORITE
 *          404:
 *            description: Not Found
 *            content:
 *              application/json:
 *                example: Not Found
 *          500:
 *            description: Internal Server Error
 *            content:
 *              application/json:
 *                example: Internal Server Error
 */
router.delete('/:recipeId', auth, removeFromFavorite)

export { router }
