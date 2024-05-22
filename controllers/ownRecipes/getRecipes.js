import { showRecipes } from "../../services/ownRecipes.service.js";
import { ApiError } from "../../utils/errors/ApiError.js";

export const getRecipes = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { limit = 4, page = 1 } = req.query;

    const result = await showRecipes(_id, Number(limit), Number(page));

    if (result.length === 0) {
      return next(ApiError.notFound("Not found own recipes"));
    }

    return res.status(200).json({
      code: 200,
      status: `OK`,
      result,
    });
  } catch (error) {
    next(error);
  }
};
