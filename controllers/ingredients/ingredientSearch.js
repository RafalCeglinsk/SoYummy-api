import { getIngredientsSearch } from '../../services/ingredients.service.js'

export const ingredientSearch = async (req, res, next) => {
  try {
    const { ingredients = '' } = req.query

    const result = await getIngredientsSearch(ingredients)

    return res.status(200).json({
      code: 200,
      status: `OK`,
      result,
    })
  } catch (error) {
    next(error)
  }
}
