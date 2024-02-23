import multer from 'multer'
import path from 'path'

const tempDir = path.resolve('../temp')

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, callBack) => {
    const { originalName } = file
    const uniquePrefix = Math.round(Math.random() * 1e9)
    const fileName = `${uniquePrefix}-${originalName}`
    callBack(null, fileName)
  },
})

export const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, callBack) => {
    if (file.mimetype.includes('image')) {
      callBack(null, true)
      return
    }
    callBack(null, false)
  },
})
