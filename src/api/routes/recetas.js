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
const upload = require('../../middlewares/upload')

const recetasRouter = express.Router()

recetasRouter.get('/', getRecetas)
recetasRouter.get('/:id', getRecetaById)
recetasRouter.get('/categoria/:categoria', getRecetaByCategoria)
recetasRouter.get('/ingredientes/:ingredientes', getRecetaByIngredientes)
recetasRouter.get('/preparacion/:preparacion', getRecetaByPreparacion)
recetasRouter.get('/tiempo/:tiempo', getRecetaByTiempo)
recetasRouter.post('/', upload.single('imagen'), postReceta)
recetasRouter.put('/:id', upload.single('imagen'), putReceta)
recetasRouter.delete('/:id', deleteReceta)

module.exports = recetasRouter
