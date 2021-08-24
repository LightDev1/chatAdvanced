import { Router } from 'express';
import { messageCtrl } from '../controllers';

const router = Router();

router.get('/messages', messageCtrl.index);
router.post('/messages', messageCtrl.create);
router.delete('/messages/:id', messageCtrl.delete);

export default router;