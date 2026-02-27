import { Router } from 'express';
import {
  createPublication,
  listPublications,
  getPublicationById,
  updatePublication,
  deletePublication
} from './publication.controller.js';

import commentRoutes from '../comments/comments.routes.js'; // import router de comentarios


const router = Router();

router.get('/', listPublications);

router.get('/:id', getPublicationById);

router.post('/', createPublication);

router.put('/:id', updatePublication);

router.delete('/:id', deletePublication);

// Aquí se conectan los comentarios como subrutas
router.use('/:id/comments', commentRoutes);

export default router;