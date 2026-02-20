import { 
    fetchPublications,  
    fetchPublicationById,
    createPublicationRecord,
    updatePublicationRecord,
    deletePublicationRecord
} from './publication.service.js';
import Publication from './publication.model.js';


export const listPublications = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive, category } = req.query;

    const { publications, pagination } = await fetchPublications({
      page,
      limit,
      isActive,
      category,
    });

    return res.status(200).json({
      success: true,
      data: publications,
      pagination,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener publicaciones',
      error: error.message,
    });
  }
};


export const getPublicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const publication = await Publication.findById(id);

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada',
      });
    }

    return res.status(200).json({
      success: true,
      data: publication,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener la publicación',
      error: error.message,
    });
  }
};


export const createPublication = async (req, res) => {
  try {
    const publication = new Publication(req.body);
    await publication.save();

    return res.status(201).json({
      success: true,
      message: 'Publicación creada correctamente',
      data: publication,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error al crear la publicación',
      error: error.message,
    });
  }
};


export const updatePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada',
      });
    }


    if (updateData.author && publication.author !== updateData.author) {
      return res.status(403).json({
        success: false,
        message: 'Solo el autor puede editar esta publicación',
      });
    }

    Object.assign(publication, updateData);
    await publication.save();

    return res.status(200).json({
      success: true,
      message: 'Publicación actualizada correctamente',
      data: publication,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error al actualizar la publicación',
      error: error.message,
    });
  }
};


export const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const { author } = req.body;

    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada',
      });
    }

    if (publication.author !== author) {
      return res.status(403).json({
        success: false,
        message: 'Solo el autor puede eliminar esta publicación',
      });
    }

    await Publication.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Publicación eliminada correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la publicación',
      error: error.message,
    });
  }
};