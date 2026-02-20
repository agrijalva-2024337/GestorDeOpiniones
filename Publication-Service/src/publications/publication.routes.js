import { Router } from 'express';
import {
  createPublication,
  listPublications,
  getPublicationById,
  updatePublication,
  deletePublication
} from './publication.controller.js';

const router = Router();

router.get('/', listPublications);

router.get('/:id', getPublicationById);

router.post('/', createPublication);

router.put('/:id', updatePublication);

router.delete('/:id', deletePublication);

export default router;