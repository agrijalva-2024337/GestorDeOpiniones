import Publication from './publication.model.js';


export const fetchPublications = async ({
  page = 1,
  limit = 10,
  isActive,
  category,
}) => {
  const filter = {};

  // Validar estado activo
  if (typeof isActive !== 'undefined') {
    filter.isActive = isActive === 'true';
  } else {
    filter.isActive = true; 
  }

  if (category) {
    filter.category = category;
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);


  const publications = await Publication.find(filter)
    .limit(limitNumber)
    .skip((pageNumber - 1) * limitNumber)
    .sort({ createdAt: -1 });

  const totalPublications = await Publication.countDocuments(filter);

  return {
    publications,
    pagination: {
      currentPage: pageNumber,
      totalPages: Math.ceil(totalPublications / limitNumber),
      totalRecords: totalPublications,
      limit: limitNumber,
    },
  };
};


export const fetchPublicationById = async (id) => {
  return Publication.findById(id);
};


export const createPublicationRecord = async ({ publicationData }) => {
  const publication = new Publication(publicationData);
  await publication.save();
  return publication;
};

export const updatePublicationRecord = async ({ id, updateData }) => {
  const publication = await Publication.findById(id);

  if (!publication) {
    throw new Error('Publicación no encontrada');
  }

  if (updateData.author && publication.author !== updateData.author) {
    throw new Error('Solo el autor puede editar esta publicación');
  }

  Object.assign(publication, updateData);

  await publication.save();
  return publication;
};

// Eliminar publicación (solo autor)
export const deletePublicationRecord = async ({ id, author }) => {
  const publication = await Publication.findById(id);

  if (!publication) {
    throw new Error('Publicación no encontrada');
  }

  if (publication.author !== author) {
    throw new Error('Solo el autor puede eliminar esta publicación');
  }

  await Publication.findByIdAndDelete(id);
  return { message: 'Publicación eliminada correctamente' };
};