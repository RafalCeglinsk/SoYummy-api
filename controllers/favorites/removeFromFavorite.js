import { ApiError } from '../../utils/errors/ApiError.js'
import { removeRecipeFavorite } from '../../services/favorite.service.js'
import { isRecipeInFavorite } from '../../services/favorite.service.js'

export const removeFromFavorite = async (req, res, next) => {
  try {
    const { recipeId } = req.params
    const { _id } = req.user

    if (await isRecipeInFavorite(recipeId, _id) === null) {
      return next(ApiError.badRequest(`Recipe NotFound in favorites.`))
    }

    const result = await removeRecipeFavorite(recipeId, _id)

    return res.status(200).json({
      code: 200,
      status: `RECIPE REMOVED FROM FAVORITE`,
      //result,
    })
  } catch (error) {
    next(error)
  }
}
