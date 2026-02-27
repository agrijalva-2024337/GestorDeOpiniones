'use strict';
import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título de la publicación es obligatorio'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['DEPORTES', 'NOTICIAS', 'EVENTOS'],
      required: [true, 'La categoría de la publicación es obligatoria'],
      uppercase: true,
      trim: true,
    },
    text: {
      type: String,
      required: [true, 'El texto de la publicación es obligatorio'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'El autor de la publicación es obligatorio'],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

publicationSchema.index({ isActive: 1 });

export default mongoose.model('Publication', publicationSchema);