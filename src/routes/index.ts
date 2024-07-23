import { Router } from 'express';
import { getExample } from '../controllers';
/*
import userRoutes from './users';
import productRoutes from './products';
*/
const router = Router();

router.use('/example', getExample);
/* 
Usar las rutas con sus respectivos prefijos 
router.use('/users', userRoutes);
router.use('/products', productRoutes);
*/

export default router;
