import { Recipe } from '../schemas/recipe.schema.js'

export const createRecipe = async (data) => {
  const recipe = await Recipe.create(data)
  return recipe
}

export const showRecipes = async (_id) => {
    const result = await Recipe.find({owner: _id})
    return result 
}