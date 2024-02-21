import { getTitleSearch } from "../../services/search.service.js"

export const search = async (req, res, next) => {
      try {
        const { title = '' } = req.query

        const result = await getTitleSearch(title)

        return res.status(200).json({
          code: 200,
          status: `OK`,
          result,
        })
      } catch (error) {
        next(error)
      }
}
