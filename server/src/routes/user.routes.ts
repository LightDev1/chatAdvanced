import { Router } from 'express';
import { userCtrl } from '../controllers';
import { loginValidation, registerValidation } from '../utils/validators';

const router = Router();

router.get('/user/me', userCtrl.getMe);
router.get('/user/verify', userCtrl.verify);
router.post('/user/registration', registerValidation, userCtrl.create);
router.post('/user/login', loginValidation, userCtrl.login);
router.get('/user/find', userCtrl.findUsers);
router.delete('/user/:id', userCtrl.delete);
router.get('/user/:id', userCtrl.show);

export default router;