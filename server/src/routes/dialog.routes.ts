import { Router } from 'express';
import { dialogCtrl } from '../controllers';

const router = Router();

router.get('/dialogs', dialogCtrl.index);
router.delete('/dialogs/:id', dialogCtrl.delete);
router.post('/dialogs', dialogCtrl.create);

export default router;