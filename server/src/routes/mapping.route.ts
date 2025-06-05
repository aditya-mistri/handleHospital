import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  getMappings,
  getMappingsByPatient,
  createMapping,
  deleteMapping,
} from '../controllers/mapping.controller';

const router = Router();

router.use(authenticate);

router.get('/', getMappings);
router.get('/patient/:patientId', getMappingsByPatient);
router.post('/', createMapping);
router.delete('/:id', deleteMapping);

export default router;
