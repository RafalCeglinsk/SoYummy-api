import multer, { memoryStorage } from 'multer'
// import path from 'path'

// const tempDir = path.resolve('../temp')

// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tempDir)
//   },
//   filename: (req, file, callBack) => {
//     const { originalname } = file
//     const uniquePrefix = Math.round(Math.random() * 1e9)
//     const fileName = `${uniquePrefix}-${originalname}`
//     callBack(null, fileName)
//   },
// })

const multerConfig = multer.memoryStorage()

export const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, callBack) => {
    if (file.mimetype.includes('image')) {
      callBack(null, true)
    } else {
      callBack(new Error('Invalid file format. Send only iamges.'))
    }
  },
  filename: (req, file, callBack) => {
    const { originalname } = file
    const uniquePrefix = Math.round(Math.random() * 1e9)
    const fileName = `${uniquePrefix}-${originalname}`
    callBack(null, fileName)
  },
})
