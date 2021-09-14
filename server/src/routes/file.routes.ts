import { Router } from 'express';
import multer from 'multer';

import { uploadCtrl } from '../controllers';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/files', upload.single('file'), uploadCtrl.create);
router.delete('/files/:id', uploadCtrl.delete);

export default router;