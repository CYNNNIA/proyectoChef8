const Receta = require('../models/recetas')
const { cloudinary, upload } = require('../config/cloudinary')

const getRecetas = async (req, res) => {
  try {
    const recetas = await Receta.find().populate('chef')
    return res.status(200).json(recetas)
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

const postReceta = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
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

const updateReceta = async (req, res) => {
  try {
    const { id } = req.params
    const receta = await Receta.findById(id)

    if (!receta)
      return res.status(404).json({ message: 'Receta no encontrada' })

    if (req.file) {
      if (receta.imagenId) await cloudinary.uploader.destroy(receta.imagenId)

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'recipes'
      })
      req.body.imagen = result.secure_url
      req.body.imagenId = result.public_id
    }

    const updatedReceta = await Receta.findByIdAndUpdate(id, req.body, {
      new: true
    })
    return res.status(200).json(updatedReceta)
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

const deleteReceta = async (req, res) => {
  try {
    const { id } = req.params
    const receta = await Receta.findById(id)

    if (!receta)
      return res.status(404).json({ message: 'Receta no encontrada' })

    if (receta.imagenId) await cloudinary.uploader.destroy(receta.imagenId)

    await receta.remove()
    return res.status(204).json({ message: 'Receta eliminada' })
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

module.exports = {
  getRecetas,
  postReceta: [upload.single('imagen'), postReceta],
  updateReceta: [upload.single('imagen'), updateReceta],
  deleteReceta
}
