const express = require('express')

const {
  getRecetas,
  getRecetaById,
  getRecetaByCategoria,
  getRecetaByIngredientes,
  getRecetaByPreparacion,
  getRecetaByTiempo,
  putReceta,
  postReceta,
  deleteReceta
} = require('../controllers/recetas')

const recetasRouter = express.Router()

recetasRouter.get('/', getRecetas)

recetasRouter.get('/:id', getRecetaById)
recetasRouter.get('/categoria/:categoria', getRecetaByCategoria)
recetasRouter.get('/ingredientes/:ingredientes', getRecetaByIngredientes)
recetasRouter.get('/preparacion/:preparacion', getRecetaByPreparacion)
recetasRouter.get('/tiempo/:tiempo', getRecetaByTiempo)
recetasRouter.put('/:id', putReceta)
recetasRouter.post('/', postReceta)
recetasRouter.delete('/:id', deleteReceta)

module.exports = recetasRouter
