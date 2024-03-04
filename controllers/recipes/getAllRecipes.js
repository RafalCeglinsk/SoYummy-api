import { Recipe } from "../../schemas/recipe.schema.js";

export const getAllRecipes = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find();
    return res.status(200).json(allRecipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
