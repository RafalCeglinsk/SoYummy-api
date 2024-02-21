import express from 'express'
import { addToFavorite } from '../../controllers/favorites/addToFavorite.js'
import { removeFromFavorite } from '../../controllers/favorites/removeFromFavorite.js'
import { getFavorite } from '../../controllers/favorites/getFavorite.js'
import { auth } from '../../middlewares/auth.js'

const router = express.Router()

router.post('/', auth, addToFavorite)
router.get('/', auth, getFavorite)
router.delete('/', auth, removeFromFavorite)

export { router }
