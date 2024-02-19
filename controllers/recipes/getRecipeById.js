import { ApiError } from '../../utils/errors/ApiError.js'
import { getRecipeId } from '../../services/recipes.service.js'

export const getRecipeById = async (req, res, next) => {
  try {
    const { recipeId } = req.params

    const recipe = await getRecipeId(recipeId)

    if (!recipe) {
      return next(ApiError.notFound(`Recipe with id "${recipeId}" not found`))
    }

    return res.status(200).json({
      code: 200,
      status: `OK`,
      recipe,
    })
  } catch (error) {
    next(error)
  }
}
