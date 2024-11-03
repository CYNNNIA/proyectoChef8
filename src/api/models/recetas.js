const mongoose = require('mongoose')

const recetasSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    ingredientes: {
      type: [String],
      required: true
    },
    preparacion: {
      type: String,
      required: true
    },
    tiempo: {
      type: Number,
      required: true
    },
    categoria: {
      type: String,
      required: true,
      enum: ['Desayuno', 'Almuerzo', 'Cena', 'Merienda']
    },
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chef',
      required: true
    },
    imagen: {
      type: String,
      required: true
    },
    imagenId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Receta', recetasSchema, 'recetas')
