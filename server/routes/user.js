import express from 'express';
import User from '../controllers/users';
import authenticate from '../middleware/authenticate';


const userController = new User();

const router = express.Router();


router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/me', authenticate, userController.me);
router.put('/update-profile', authenticate, userController.editUser);
router.post('/verify-user', userController.checkEmail);
router.put('/reset-password', authenticate, userController.resetPassword);
router.put('/change-password', authenticate, userController.changePassword);


export default router;
