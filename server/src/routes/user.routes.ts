import { Router } from 'express';
import { userCtrl } from '../controllers';
import { LoginValidation } from '../utils/validators';

const router = Router();

router.get('/user/me', userCtrl.getMe);
router.get('/user/:id', userCtrl.show);
router.post('/user/registration', userCtrl.create);
router.delete('/user/:id', userCtrl.delete);
router.post('/user/login', LoginValidation, userCtrl.login);

export default router;