import { getIngredientsList } from "../../services/ingredients.service.js"

export const ingredientList = async (req, res, next) => {
  try {
    const result = await getIngredientsList()

    return res.status(200).json({
      code: 200,
      status: `OK`,
      result,
    })
  } catch (error) {
    next(error)
  }
}
