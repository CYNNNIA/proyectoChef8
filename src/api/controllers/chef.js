const Chef = require('../models/chef')
const cloudinary = require('cloudinary').v2

const getChefs = async (req, res) => {
  try {
    const chefs = await Chef.find()
    return res.status(200).json(chefs)
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

const postChef = async (req, res) => {
  try {
    // Subir imagen a Cloudinary y obtener URL y public_id
    const result = await cloudinary.uploader.upload(req.body.profileImage, {
      folder: 'chefs'
    })

    // Crear nuevo chef con la URL de la imagen y el public_id
    const chef = new Chef({
      ...req.body,
      profileImage: result.secure_url,
      profileImageId: result.public_id
    })

    await chef.save()
    return res.status(201).json(chef)
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

const deleteChef = async (req, res) => {
  try {
    const { id } = req.params
    const chef = await Chef.findById(id)

    if (!chef) {
      return res.status(404).json({ message: 'Chef no encontrado' })
    }

    // Eliminar imagen de Cloudinary
    if (chef.profileImageId) {
      await cloudinary.uploader.destroy(chef.profileImageId)
    }

    await chef.remove()
    return res.status(204).json({ message: 'Chef eliminado' })
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

module.exports = {
  getChefs,
  postChef,
  deleteChef
}
