import express from 'express'
import { getShoppingList } from '../../controllers/shoppingList/getShoppingList.js'
import { addToShoppingList } from '../../controllers/shoppingList/addToShoppingList.js'
import { removeFromShoppingList } from '../../controllers/shoppingList/removeFromShoppingList.js'

import { auth } from '../../middlewares/auth.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *  name: Shopping-Lists
 *  description: Allows user to create shoplist of ingredients of recipes
 */

/**
 * @openapi
 * /shopping-lists:
 *   get:
 *     summary: Allows a logged user to view ingredients their shopping list
 *     tags: [Shopping-Lists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ingredientId:
 *                   type: string
 *                   description: Id ingredientns from table Ingredients
 *                   example: 640c2dd963a319ea671e3758
 *                 recipeId:
 *                   type: string
 *                   description: Id Recipe from table Recipe
 *                   example: 640cd5ac2d9fecf12e889800
 *                 measure:
 *                   type: string
 *                   example: 500g
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example: Not Found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: Internal Server Error
 */
router.get('/', auth, getShoppingList)

/**
 * @openapi
 * /shopping-lists:
 *   post:
 *     summary: Allows a logged user to add ingredients to shopping list
 *     tags: [Shopping-Lists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ingredientId:
 *                   type: string
 *                   description: Id ingredientns from table Ingredients
 *                   example: 640c2dd963a319ea671e3758
 *                 recipeId:
 *                   type: string
 *                   description: Id Recipe from table Recipe
 *                   example: 640cd5ac2d9fecf12e889800
 *                 measure:
 *                   type: string
 *                   example: 500g
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example: "\"ingredientId\" is required"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: Unauthorized
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example: Not Found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: Internal Server Error
 */
router.post('/', auth, addToShoppingList)

/**
 * @openapi
 * /shopping-lists/{id}:
 *   delete:
 *     summary: Allows a logged user to remove ingredient from the shopping list
 *     tags: [Shopping-Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ingredientId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: DELETED
 *         content:
 *           application/json:
 *                   example: Deketed
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: Unauthorized
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example: No found product in shopping list
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: Internal Server Error
 */
router.delete('/:id', auth, removeFromShoppingList)

export { router }
