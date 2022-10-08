import * as multer from 'multer';
import * as path from 'path';

const uploader = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, callback) => {
    let ext = path.extname(file.originalname);

    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      callback(new Error('File type is not supported') as any, false);
      return;
    }

    callback(null, true);
  },
});

export default uploader;
