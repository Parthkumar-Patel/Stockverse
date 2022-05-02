// Author : Sai Rahul Kodumuru (B00875628)
const express = require('express');

const registerController = require('../controllers/registerController');
const signInController = require('../controllers/signInController');
const securityQuestionController = require('../controllers/securityQuestionController');
const userController = require('../controllers/userController');
const forgetPasswordController = require('../controllers/forgetPasswordController');
const userRouter = express.Router();

userRouter.post('/register',registerController.createUser);
userRouter.post('/signin', signInController.checkUser);
userRouter.get('/getRandomQuestion',securityQuestionController.getRandomQuestion);
userRouter.post('/checkUser',forgetPasswordController.verifyUser);
userRouter.get('/getQuestion/:Userid',forgetPasswordController.getSecurityQuestionOfUser);
userRouter.post('/updatePassword/:Userid',forgetPasswordController.updatePassword);
userRouter.get('/getRole/:Userid',userController.getRoleById);
userRouter.post('/getRoleByEmail',userController.getRoleByEmail);
userRouter.post('/verifyAnswer',forgetPasswordController.verifyAnswer);
userRouter.get('/getDetails/:Userid',userController.getUserDetailsById);
// Author : Pallavi Cherukupalli (B00887062)
userRouter.get('/userList', userController.getAllusers);

module.exports = userRouter;
