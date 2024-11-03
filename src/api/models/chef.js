const mongoose = require('mongoose')

const chefSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    experiencia: {
      type: Number,
      required: true
    },
    profileImage: {
      type: String,
      required: true
    },
    profileImageId: {
      type: String,
      required: true
    }
  },
  { timestamps: true, collection: 'chefs' }
)

module.exports = mongoose.model('Chef', chefSchema, 'chefs')
