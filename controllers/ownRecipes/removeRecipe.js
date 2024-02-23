import { ApiError } from '../../utils/errors/ApiError.js'
import { deleteRecipe } from '../../services/ownRecipes.service.js'

export const removeRecipe = async (req, res, next) => {
  try {
    const { _id } = req.user
    const { recipeId } = req.params

    const result = await deleteRecipe(recipeId, _id)
    console.log(result)

    if (!result) {
      return next(ApiError.conflict(`Recipe: ${recipeId} not found`))
    }

    return res.status(200).json({
      code: 200,
      status: `RECIPE REMOVED FROM OUR`,
      //result,
    })
  } catch (error) {
    next(error)
  }
}
