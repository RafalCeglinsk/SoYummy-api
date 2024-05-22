import { getRecipeFavorite } from "../../services/favorite.service.js";

export const getFavorite = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { limit = 4, page = 1 } = req.query;
    const result = await getRecipeFavorite(_id, Number(limit), Number(page));

    return res.status(200).json({
      code: 200,
      status: `OK`,
      result,
    });
  } catch (error) {
    next(error);
  }
};
