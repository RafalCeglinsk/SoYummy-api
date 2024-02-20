import { Ingredient } from '../schemas/ingredient.schema.js'

export const getIngredientsList = async (i) => {
  return Ingredient.find({})
}
