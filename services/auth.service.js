import { User } from '../schemas/user.schema.js'
import bcrypt from 'bcryptjs'
import gravatar from 'gravatar'
import { nanoid } from 'nanoid'

// Register user
export const registerUser = async (data) => {
  const { name, password, email } = data

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  const avatarURL = gravatar.url(email, { protocol: 'https' })
  const verificationToken = nanoid()

  //find an existing user
  const checkUser = await User.findOne({ email })
  if (checkUser) {
    return {message: 'User already registered'}
  }

  const user = new User({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verify: false,
    verificationToken,
  })
  await user.save()

  return user
}
