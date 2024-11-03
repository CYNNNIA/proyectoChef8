const Chef = require('../models/chef')

const getChefs = async (req, res, next) => {
  try {
    const chefs = await Chef.find()
    return res.status(200).json(chefs)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const postChef = async (req, res, next) => {
  try {
    const chef = new Chef(req.body)
    await chef.save()
    return res.status(201).json(chef)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const deleteChef = async (req, res, next) => {
  try {
    const { id } = req.params
    await Chef.findByIdAndDelete(id)
    return res.status(204).json()
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

module.exports = {
  getChefs,
  postChef,
  deleteChef
}
