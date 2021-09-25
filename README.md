# BackendOCR-Angular
API REST from Angular OCR APP

This API works for the Angular App OCR application, is built with aws-sdk, bcrypt, dotenv, multer-S3, NodeJS, ExpressJS, and JSON Web Token. It manages both the information of the saved images and that of the registered users and saves the data in MongoDB Atlas using Mongoose.

This API saves the images it receives from the Front end in the AWS S3 service.

The deployment of this REST API is in the Heroku service.

This API Uses the JSON Web Token library to manage user sessions and their data, uses bcrypt to encrypt user login passwords when saving them in the database in MongoDB Atlas.

Visit the site here: https://backend-angular-apps.herokuapp.com/ocrApp