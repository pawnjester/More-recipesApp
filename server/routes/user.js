import express from 'express';
import User from '../controllers/users';
import authenticate from '../middleware/authenticate';


const userController = new User();

const router = express.Router();


router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/me', authenticate, userController.me);


export default router;
