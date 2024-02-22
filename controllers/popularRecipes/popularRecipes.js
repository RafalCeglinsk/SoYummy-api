import { getPopularRecipes } from "../../services/popularRecipes.service.js";

export const popularRecipes = async (req, res, next) => {
  let { page = 1, limit = 10 } = req.query;
  limit = +limit > 50 ? 50 : +limit;
  console.log(req.query);
  const recipes = await getPopularRecipes(page, limit);
  console.log(recipes);
  res.json({
    code: 200,
    ...recipes,
  });
};
