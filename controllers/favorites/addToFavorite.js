import { ApiError } from '../../utils/errors/ApiError.js'
import { favoriteSchema } from '../../schemas/recipe.schema.js'
import { isRecipeInFavorite } from '../../services/favorite.service.js'
import { addRecipeFavorite } from '../../services/favorite.service.js'

export const addToFavorite = async (req, res, next) => {
  const validationResult = favoriteSchema.validate(req.body)
  if (validationResult.error) {
    return next(ApiError.badRequest(validationResult.error.details[0].message))
  }

  try {
    const { recipeId } = req.body
    const { id } = req.user

    if (await isRecipeInFavorite(recipeId, id)) {
      return next(
        ApiError.conflict(
          `Recipe already in favorites. Delete it or add another one`
        )
      )
    }

    const result = await addRecipeFavorite(recipeId, id)

    if (!result) {
      return next(ApiError.notFound("Sorry, we don't have such a recipe"))
    }

    return res.status(200).json({
      code: 200,
      status: `RECIPES ADDED TO FAVORITE`,
      result,
    })
    
  } catch (error) {
    next(error)
  }
}
