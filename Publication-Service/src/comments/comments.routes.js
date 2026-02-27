import { Router } from 'express';
import { listComments, createComment, updateComment, deleteComment } from './comments.controller.js';

const router = Router({ mergeParams: true }); // importante para acceder a :id de la publicación

router.get('/', listComments);        // GET /publications/:id/comments
router.post('/', createComment);      // POST /publications/:id/comments
router.put('/:commentId', updateComment);  // PUT /publications/:id/comments/:commentId
router.delete('/:commentId', deleteComment); // DELETE /publications/:id/comments/:commentId

export default router;