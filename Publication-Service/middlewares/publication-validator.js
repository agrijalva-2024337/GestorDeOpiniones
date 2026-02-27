import { body, param } from 'express-validator';
import { validateJWT } from 'validate-JWT.js';
import { checkValidators } from './check-validators.js';
// Validaciones para crear una publicación
export const validateCreatePublication = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('El título de la publicación es obligatorio')
    .isLength({ min: 2, max: 200 })
    .withMessage('El título debe tener entre 2 y 200 caracteres'),

  body('category')
    .notEmpty()
    .withMessage('La categoría es obligatoria')
    .isIn(['DEPORTES', 'NOTICIAS', 'EVENTOS'])
    .withMessage('Categoría no válida'),

  body('text')
    .notEmpty()
    .withMessage('El texto de la publicación es obligatorio')
    .isLength({ min: 10 })
    .withMessage('El texto debe tener al menos 10 caracteres'),

  body('author')
    .notEmpty()
    .withMessage('El autor es obligatorio')
    .isLength({ min: 2, max: 100 })
    .withMessage('El autor debe tener entre 2 y 100 caracteres'),

  body('date')
    .notEmpty()
    .withMessage('La fecha de la publicación es obligatoria')
    .isISO8601()
    .toDate()
    .withMessage('La fecha debe tener un formato válido ISO 8601'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive debe ser true o false'),

  checkValidators,
];

// Validaciones para actualizar una publicación
export const validateUpdatePublication = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),

  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('El título debe tener entre 2 y 200 caracteres'),

  body('category')
    .optional()
    .isIn(['DEPORTES', 'NOTICIAS', 'EVENTOS'])
    .withMessage('Categoría no válida'),

  body('text')
    .optional()
    .isLength({ min: 10 })
    .withMessage('El texto debe tener al menos 10 caracteres'),

  body('author')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('El autor debe tener entre 2 y 100 caracteres'),

  body('date')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('La fecha debe tener un formato válido ISO 8601'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive debe ser true o false'),

  checkValidators,
];

// Validación para obtener publicación por ID
export const validateGetPublicationById = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),
  checkValidators,
];

// Validación para eliminar publicación por ID
export const validateDeletePublication = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),
  body('author')
    .notEmpty()
    .withMessage('El autor es obligatorio para eliminar la publicación'),
  checkValidators,
];