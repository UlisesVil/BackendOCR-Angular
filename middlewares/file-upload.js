const aws = require('aws-sdk');
   const multer = require('multer');
   const multerS3 = require('multer-s3');
   const dotenv = require('dotenv');
   dotenv.config();

   aws.config.update({
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      accessKeyId: process.env.ACCESS_KEY_ID,
      region: 'us-east-2'
   });

   const s3 = new aws.S3();

   const fileFilter = (req, file, cb) => {
      if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ){
         cb(null, true);
      }else{
         cb(
            new Error('Wrong file type, only upload JPEG, JPG or PNG images'), 
            false
         );
      }
   };

   const upload = multer({
      fileFilter: fileFilter,
      storage: multerS3({
         acl: 'public-read',
         s3,
         bucket: 'ocr-angular-app',
         key: function(req, file, cb){
            req.file = Date.now() + file.originalname;
            cb(null, Date.now() + file.originalname);
         }
      })
   });

   module.exports = upload;