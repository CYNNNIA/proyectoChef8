const Chef = require('../models/chef')
const { cloudinary, upload } = require('../config/cloudinary')

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
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'chefs'
    })

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

const updateChef = async (req, res) => {
  try {
    const { id } = req.params
    const chef = await Chef.findById(id)

    if (!chef) return res.status(404).json({ message: 'Chef no encontrado' })

    if (req.file) {
      if (chef.profileImageId)
        await cloudinary.uploader.destroy(chef.profileImageId)

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'chefs'
      })
      req.body.profileImage = result.secure_url
      req.body.profileImageId = result.public_id
    }

    const updatedChef = await Chef.findByIdAndUpdate(id, req.body, {
      new: true
    })
    return res.status(200).json(updatedChef)
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

const deleteChef = async (req, res) => {
  try {
    const { id } = req.params
    const chef = await Chef.findById(id)

    if (!chef) return res.status(404).json({ message: 'Chef no encontrado' })

    if (chef.profileImageId)
      await cloudinary.uploader.destroy(chef.profileImageId)

    await chef.remove()
    return res.status(204).json({ message: 'Chef eliminado' })
  } catch (error) {
    return res.status(400).json({ message: 'Error en la solicitud' })
  }
}

module.exports = {
  getChefs,
  postChef: [upload.single('profileImage'), postChef],
  updateChef: [upload.single('profileImage'), updateChef],
  deleteChef
}
