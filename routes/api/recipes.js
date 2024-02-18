import express from "express";

const router = express.Router()

// recipes Controller
import { getAllRecipes } from "../../controllers/recipes/getAllRecipes.js";
import { getCategories } from "../../controllers/recipes/getCategories.js";
import { getRecipeByCategory } from "../../controllers/recipes/getRecipeByCategory.js";
import { getRecipeById } from "../../controllers/recipes/getRecipeById.js";

// ownRecipes Controller
import { addRecipe } from "../../controllers/ownRecipes/addRecipe.js";
import { getRecipes } from "../../controllers/ownRecipes/getRecipes.js";
import { removeRecipe } from "../../controllers/ownRecipes/removeRecipe.js";

// popularRecipes Controller
import { popularRecipes } from "../../controllers/popularRecipes/popularRecipes.js";

// recipes route
router.get("/", getAllRecipes);
router.get("/categories", getCategories);
router.get("/categories/:categoryName", getRecipeByCategory);
router.get("/:recipeId", getRecipeById);

// own route
router.get("/own", getRecipes);
router.post("/own", addRecipe);
router.delete("/own/:recipeId", removeRecipe);

// popular route
router.get("/popular", popularRecipes);

export { router }
