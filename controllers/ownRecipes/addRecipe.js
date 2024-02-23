import { ApiError } from '../../utils/errors/ApiError.js'
import { ownRecipesSchema } from '../../schemas/recipe.schema.js'
import { createRecipe } from '../../services/ownRecipes.service.js'
import { Types } from 'mongoose'

export const addRecipe = async (req, res, next) => {
  const validationResult = ownRecipesSchema.validate(req.body)
  if (validationResult.error) {
    return next(ApiError.conflict(validationResult.error.details[0].message))
  }

  try {
    const { _id } = req.user
    const { title, category, instructions, description, time, ingredients } =
      req.body

    let parsedIngredients = null

    if (Array.isArray(ingredients)) {
      // This is an array of objects, so there is no need to parse
      parsedIngredients = ingredients
    } else {
      // This is not an array of objects, so parse it as a JSON string
      parsedIngredients = JSON.parse(ingredients)
    }

    const objData = {
      preview : null,
      thumb : null,
      title,
      category,
      description,
      time,
      ingredients: parsedIngredients.map((ingredient) => ({
        id: new Types.ObjectId(ingredient.id),
        measure: ingredient.measure,
      })),
      instructions,
      owner: new Types.ObjectId(_id),
    }

    const recipe = await createRecipe(objData)

    return res.status(201).json({
      code: 201,
      status: `CREATED`,
      recipe,
    })
  } catch (error) {
    next(error)
  }
}
