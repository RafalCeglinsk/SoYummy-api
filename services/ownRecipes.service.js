import { Recipe } from '../schemas/recipe.schema.js'

export const createRecipe = async (data) => {
  const recipe = await Recipe.create(data)
  return recipe
}
