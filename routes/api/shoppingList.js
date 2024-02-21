import express from 'express'
import { getShoppingList } from '../../controllers/shoppingList/getShoppingList.js'
import { addToShoppingList } from '../../controllers/shoppingList/addToShoppingList.js'
import { removeFromShoppingList } from '../../controllers/shoppingList/removeFromShoppingList.js'

import { auth } from '../../middlewares/auth.js'

const router = express.Router()

router.get('/', auth, getShoppingList)
router.post('/', auth, addToShoppingList)
router.delete('/:id', auth, removeFromShoppingList)

export { router }
