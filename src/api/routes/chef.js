const express = require('express')
const {
  postChef,
  getChefs,
  deleteChef,
  updateChef
} = require('../controllers/chef')
const upload = require('../../middlewares/upload')

const router = express.Router()

router.get('/', getChefs)
router.post('/', upload.single('profileImage'), postChef)
router.put('/:id', upload.single('profileImage'), updateChef)
router.delete('/:id', deleteChef)

module.exports = router
