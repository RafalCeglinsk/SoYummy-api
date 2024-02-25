import express from 'express'
const router = express.Router()

import { popularRecipes } from '../../controllers/popularRecipes/popularRecipes.js'

/**
 * @openapi
 * tags:
 *  name: Popular
 *  description: Popular recipes.
 */

/**
 * @openapi
 * /popular:
 *  get:
 *   summary: Returns a list of popular recipes
 *   tags: [Popular]
 *   responses:
 *     200:
 *       description: OK
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Popular"
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           example: Internal Server Error
 */
router.get('/', popularRecipes)

export { router }
