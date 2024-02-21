import { displayIngredients } from '../../services/shoppingList.service.js'
import { ApiError } from '../../utils/errors/ApiError.js'

export const getShoppingList = async (req, res, next) => {
  if (!req.user) {
    return next(ApiError.unauthorized())
  }

  try {
    const shoppingList = await displayIngredients(req.user.id)
    console.log(shoppingList.length)

    if (shoppingList.length === 0) {
      return next(ApiError.notFound())
    }

    return res.status(200).json({
      code: 200,
      status: `OK`,
      shoppingList,
    })
  } catch (error) {
    next(error)
  }
}
