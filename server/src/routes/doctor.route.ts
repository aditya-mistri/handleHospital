import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctor.controller';

const router = Router();

router.use(authenticate);
router.get('/', getDoctors);
router.post('/', createDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

export default router;
