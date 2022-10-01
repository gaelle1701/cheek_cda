require('dotenv').config()

import * as multer from 'multer';
import * as path from 'path';

export const uploader = multer({
  storage: multer.diskStorage({}),  
  fileFilter: (req, file, callback) => {
      let ext = path.extname(file.originalname);

      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
          return callback(null, false);
      }
      callback(null, true);
  },
}).single('image');

export default uploader;


