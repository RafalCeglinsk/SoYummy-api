import { getRecipesByCategoryName } from "../../services/recipes.service.js";

export const getRecipeByCategory = async (req, res, next) => {
  const { categoryName } = req.params;
  const { limit = 10, page = 1 } = req.query;
  const pageLimit = parseInt(limit) > 50 ? 50 : parseInt(limit);

  const recipes = await getRecipesByCategoryName(categoryName, pageLimit, parseInt(page));

  res.status(200).json({recipes});
};