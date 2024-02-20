import { Ingredient } from '../schemas/ingredient.schema.js'
import { Recipe } from '../schemas/recipe.schema.js'
import { Types } from 'mongoose'

export const getIngredientsList = async () => {
  return Ingredient.find({})
}

export const getIngredientsSearch = async (ingredients) => {
  const searchIngredient = await Ingredient.find({
    ttl: { $regex: new RegExp(`^${ingredients}`, 'i') },
  })

  const idIngredient = searchIngredient.map((i) => i._id)

  const result = await Recipe.find({
    ingredients: {
      $elemMatch: {
        id: {
          $in: [
            new Types.ObjectId(idIngredient[0]),
            new Types.ObjectId(idIngredient[1]),
          ],
        },
      },
    },
  })

  return result
}
