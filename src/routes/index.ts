import { Router } from 'express';
import { getExample } from '../controllers';

const router = Router();

router.use('/example', getExample);

export default router;
