import { Recipe } from "../schemas/recipe.schema.js";

export const createRecipe = async (data) => {
  const recipe = await Recipe.create(data);
  return recipe;
};

export const showRecipes = async (_id, limit = 10, page = 1) => {
  const skip = (page - 1) * limit;
  const result = await Recipe.find({ owner: _id }).limit(limit).skip(skip);
  return result;
};

export const deleteRecipe = async (recipeID, _id) => {
  const result = await Recipe.findByIdAndDelete({
    _id: recipeID,
    owner: _id,
  });
  return result;
};
