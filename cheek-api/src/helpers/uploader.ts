import * as multer from 'multer';
import * as uuid from 'uuid';
import * as path from 'path';

export const uploader = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, process.cwd() + "/uploads/");
    },
    filename: function (req, file, cb) {
      const suffix = uuid.v4();
      const extension = path.extname(file.originalname);

      //  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      cb(null, `${file.fieldname}${extension}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    let ext = path.extname(file.originalname);

    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      callback(null, false);
      return;
    }

    callback(null, true);
  },
});

export default uploader;
