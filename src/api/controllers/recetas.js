const Receta = require('../models/recetas')

const getRecetas = async (req, res, next) => {
  try {
    const recetas = await Receta.find().populate('chef')
    return res.status(200).json(recetas)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getRecetaById = async (req, res, next) => {
  try {
    const { id } = req.params
    const receta = await Receta.findById(id).populate('chef')
    return res.status(200).json(receta)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getRecetaByCategoria = async (req, res, next) => {
  try {
    const { categoria } = req.params
    const recetas = await Receta.find({ categoria })
    return res.status(200).json
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getRecetaByIngredientes = async (req, res, next) => {
  try {
    const { ingredientes } = req.params
    const recetas = await Receta.find({ ingredientes: { $in: ingredientes } })
    return res.status(200).json(recetas)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getRecetaByPreparacion = async (req, res, next) => {
  try {
    const { preparacion } = req.params
    const recetas = await Receta.find({
      preparacion: { $regex: preparacion, $options: 'i' }
    })
    return res.status(200).json
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getRecetaByTiempo = async (req, res, next) => {
  try {
    const { tiempo } = req.params
    const recetas = await Receta.find({ tiempo: { $lte: tiempo } })
    return res.status(200).json(recetas)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const putReceta = async (req, res, next) => {
  try {
    const { id } = req.params
    const newReceta = new Receta(req.body)
    newReceta._id = id
    const recetaUpdated = await Receta.findByIdAndUpdate(id, newReceta, {
      new: true
    })
    return res.status(200).json(recetaUpdated)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const postReceta = async (req, res, next) => {
  try {
    const receta = new Receta(req.body)
    await receta.save()
    return res.status(201).json(juegoSaved)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const deleteReceta = async (req, res, next) => {
  try {
    const { id } = req.params
    const recetaDeleted = await Receta.findByIdAndDelete(id)
    return res.status(204).json(juegoDeleted)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

module.exports = {
  getRecetas,
  getRecetaById,
  getRecetaByCategoria,
  getRecetaByIngredientes,
  getRecetaByPreparacion,
  getRecetaByTiempo,
  putReceta,
  postReceta,
  deleteReceta
}
