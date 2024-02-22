import { Recipe } from '../schemas/recipe.schema.js'

export const isRecipeInFavorite = async (recipeId, userId) => {
  const result = await Recipe.findOne({
    _id: recipeId,
    favorites: { $in: [userId] },
  })
  return result
}

export const addRecipeFavorite = async (recipeId, userId) => {
  const recipe = Recipe.findByIdAndUpdate(
    { _id: recipeId },
    {
      $addToSet: { favorites: userId },
    },
    { new: true }
  )
  return recipe
}

export const getRecipeFavorite = async (userId) => {
  const recipes = await Recipe.aggregate([
    {
      $match: {
        favorites: {
          $in: [userId],
        },
      },
    },
  ])
  return recipes
}

export const removeRecipeFavorite = async (recipeId, userId) => {
  const result = await Recipe.findByIdAndUpdate(
    recipeId,
    {
      $pull: { favorites: userId },
    },
    { new: true }
  )
  return result
}
