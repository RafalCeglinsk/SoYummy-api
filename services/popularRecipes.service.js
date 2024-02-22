import { Recipe } from "../schemas/recipe.schema.js";

export const getPopularRecipes = async (page, limit) => {
  const recipes = await Recipe.aggregate([
    { $match: { "favorites.0": { $exists: true } } },
    { $addFields: { favoriteCount: { $size: "$favorites" } } },
    { $sort: { favoriteCount: -1 } },
    {
      $facet: {
        recipes: [{ $skip: page * limit - limit }, { $limit: limit }],
        count: [{ $count: "total" }],
      },
    },
    {
      $project: {
        recipes: 1,
        total: { $arrayElemAt: ["$count.total", 0] },
        page: { $literal: page },
        limit: { $literal: limit },
      },
    },
  ]).exec();

  console.log(recipes[0])
  return recipes[0];
};
