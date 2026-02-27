import Comment from './comments.model.js';
import Publication from '../publications/publication.model.js';

// Listar comentarios de una publicación
export const listComments = async (req, res) => {
  try {
    const { id: publicationId } = req.params; // id de la publicación
    const comments = await Comment.find({ publicationId }).sort({ createdAt: -1 });

    res.json({ success: true, data: comments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al listar comentarios', error: error.message });
  }
};

// Crear comentario
export const createComment = async (req, res) => {
  try {
    const { id: publicationId } = req.params;
    const { author, text } = req.body;

    const comment = new Comment({
      publicationId, 
      author,
      text
    });

    await comment.save();

    return res.status(201).json({
      success: true,
      message: 'Comentario creado correctamente',
      data: comment
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error al crear comentario',
      error: error.message
    });
  }
};

// Editar comentario
export const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const updateData = req.body;

  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ success: false, message: 'Comentario no encontrado' });

  Object.assign(comment, updateData);
  await comment.save();
  res.json({ success: true, data: comment });
};

// Eliminar comentario
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  await Comment.findByIdAndDelete(commentId);
  res.json({ success: true, message: 'Comentario eliminado' });
};