const express = require('express')
const { getChefs, postChef, deleteChef } = require('../controllers/chef')

const chefRouter = express.Router()

chefRouter.get('/', getChefs)
chefRouter.post('/', postChef)
chefRouter.delete('/:id', deleteChef)

module.exports = chefRouter
