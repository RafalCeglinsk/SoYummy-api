import { removeIngredients } from '../../services/shoppingList.service.js'
import { ApiError } from '../../utils/errors/ApiError.js'

export const removeFromShoppingList = async (req, res, next) => {
  if (!req.user) {
    return next(ApiError.unauthorized())
  }

  try {
    const user = req.user
    const user_id = req.user._id
    const { id: ingredientId } = req.params
    const { measure } = req.query

    const result = await removeIngredients(user_id, user, ingredientId, measure)

    if (result === -1) {
      return next(ApiError.notFound(`No found product in shopping list`))
    }

    return res.status(200).json({
      code: 200,
      status: `DELETED`,
    })
  } catch (error) {
    next(error)
  }
}
