import { Recipe } from "../schemas/recipe.schema.js";

export const getRecipesByCategoryName = async (categoryName, limit, page) => {
  const recipe = await Recipe.aggregate([
    {
      $match: {
        category: new RegExp(categoryName, "i"),
      },
    },
    {
      $facet: {
        recipes: [
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: limit,
          },
        ],
        count: [
          {
            $count: "total",
          },
        ],
      },
    },
    {
      $project: {
        recipes: {
          _id: 1,
          title: 1,
          category: 1,
          description: 1,
          thumb: 1,
          preview: 1,
        },
        total: {
          $arrayElemAt: ["$count.total", 0],
        },
        page: {
          $literal: page,
        },
        limit: {
          $literal: limit,
        },
      },
    },
  ]);

  return recipe[0];
};
