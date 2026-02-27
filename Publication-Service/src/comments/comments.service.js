import Comment from './comments.model.js';

export const fetchCommentsByPublication = async (publicationId) => {
  return Comment.find({ publicationId, isActive: true }).sort({ date: -1 });
};

export const createComment = async ({ publicationId, author, text }) => {
  const comment = new Comment({ publicationId, author, text });
  await comment.save();
  return comment;
};

export const updateComment = async (id, author, text) => {
  const comment = await Comment.findById(id);
  if (!comment) throw new Error('Comentario no encontrado');
  if (comment.author !== author) throw new Error('Solo el autor puede editar');
  comment.text = text;
  await comment.save();
  return comment;
};

export const removeComment = async (id, author) => {
  const comment = await Comment.findById(id);
  if (!comment) throw new Error('Comentario no encontrado');
  if (comment.author !== author) throw new Error('Solo el autor puede eliminar');
  comment.isActive = false; // soft delete
  await comment.save();
  return comment;
};