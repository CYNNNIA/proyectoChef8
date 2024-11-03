const Receta = require('../models/recetas')
const cloudinary = require('cloudinary').v2

const getRecetas = async (req, res) => {
  try {
    const recetas = await Receta.find().populate('chef')
    return res.status(200).json(recetas)
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

const getRecetaById = async (req, res) => {
  try {
    const { id } = req.params
    const receta = await Receta.findById(id).populate('chef')
    return res.status(200).json(receta)
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

const getRecetaByCategoria = async (req, res) => {
  try {
    const { categoria } = req.params
    const recetas = await Receta.find({ categoria })
    return res.status(200).json(recetas)
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

const getRecetaByIngredientes = async (req, res) => {
  try {
    const { ingredientes } = req.params
    const recetas = await Receta.find({ ingredientes: { $in: ingredientes } })
    return res.status(200).json(recetas)
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

const getRecetaByPreparacion = async (req, res) => {
  try {
    const { preparacion } = req.params
    const recetas = await Receta.find({
      preparacion: { $regex: preparacion, $options: 'i' }
    })
    return res.status(200).json(recetas)
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

const getRecetaByTiempo = async (req, res) => {
  try {
    const { tiempo } = req.params
    const recetas = await Receta.find({ tiempo: { $lte: tiempo } })
    return res.status(200).json(recetas)
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

const putReceta = async (req, res) => {
  try {
    const { id } = req.params
    const updatedData = req.body

    if (req.body.imagen) {
      const receta = await Receta.findById(id)
      if (receta.imagenId) {
        await cloudinary.uploader.destroy(receta.imagenId)
      }

      const result = await cloudinary.uploader.upload(req.body.imagen, {
        folder: 'recipes'
      })
      updatedData.imagen = result.secure_url
      updatedData.imagenId = result.public_id
    }

    const recetaUpdated = await Receta.findByIdAndUpdate(id, updatedData, {
      new: true
    })
    return res.status(200).json(recetaUpdated)
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

const postReceta = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.imagen, {
      folder: 'recipes'
    })

    const receta = new Receta({
      ...req.body,
      imagen: result.secure_url,
      imagenId: result.public_id
    })

    const recetaSaved = await receta.save()
    return res.status(201).json(recetaSaved)
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

const deleteReceta = async (req, res) => {
  try {
    const { id } = req.params
    const receta = await Receta.findById(id)

    if (!receta) {
      return res.status(404).json({ message: 'Receta no encontrada' })
    }

    if (receta.imagenId) {
      await cloudinary.uploader.destroy(receta.imagenId)
    }

    await receta.remove()
    return res.status(204).json({ message: 'Receta eliminada' })
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
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
