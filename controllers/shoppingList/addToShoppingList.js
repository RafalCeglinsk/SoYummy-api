import { addIngredients } from '../../services/shoppingList.service.js'
import { ApiError } from '../../utils/errors/ApiError.js'
import { shoppingListSchema } from '../../schemas/user.schema.js'

export const addToShoppingList = async (req, res, next) => {
  const validationResult = shoppingListSchema.validate(req.body)

  if (validationResult.error) {
    return next(ApiError.badRequest(validationResult.error.details[0].message))
  }

  if (!req.user) {
    return next(ApiError.unauthorized())
  }

  try {
    const shoppingList = await addIngredients(req.user.id, req.body)

    return res.status(201).json({
      code: 201,
      status: `CREATED`,
      shoppingList,
    })
  } catch (error) {
    next(error)
  }
}
