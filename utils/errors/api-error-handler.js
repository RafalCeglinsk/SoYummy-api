import { ApiError } from './ApiError.js'

export const apiErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.code).json({
      code: err.code,
      status: err.status,
      message: err.message,
    })
    return
  }

  res.status(500).json({ message: err.message })
}
