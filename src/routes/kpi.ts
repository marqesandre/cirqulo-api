import { Router } from 'express';
import { getKPIs, createKPI, createMultipleKPIs, updateKPI, deleteKPI } from '../controllers/kpiController';

const router: Router = Router();

router.get('/', getKPIs);
router.post('/', createKPI);
router.post('/bulk', createMultipleKPIs);
router.put('/:id', updateKPI);
router.delete('/:id', deleteKPI);

export default router;