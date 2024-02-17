import { loginSchema } from '../../schemas/user.schema.js'
import { loginUser } from '../../services/auth.service.js'

export const login = async (req, res, next) => {
  // Login validation error
  const validationResult = loginSchema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({
      status: 400,
      ResponseBody: validationResult.error.details[0].message,
    })
  }
  try {
    const { token, user } =  await loginUser(req.body)
    return res.status(200).json({
      RequestBody: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}
