import express from 'express';
import User from '../controllers/userController';
import authenticate from '../middleware/authenticate';
import Validation from '../middleware/validation';


const userController = new User();

const router = express.Router();

router.get('/me', authenticate, userController.me);
router.post('/signup', Validation.signUpvalidation, userController.signUp);
router.post('/signin', Validation.signInValidation, userController.signIn);
router.put('/update-profile', authenticate, userController.editUser);
router.post('/verify-user', userController.checkEmail);
router.put('/reset-password', authenticate, userController.resetPassword);
router.put('/change-password', authenticate, Validation.changePasswordValidation, userController.changePassword);


export default router;
