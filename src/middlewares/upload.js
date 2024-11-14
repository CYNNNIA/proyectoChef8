const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary').cloudinary

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Cambiar la carpeta de almacenamiento según el tipo de imagen
    let folder = 'uploads' // Carpeta por defecto

    // Intento de reutilización del storage cambiando la carpeta según el tipo de archivo
    if (file.fieldname === 'profileImage') {
      folder = 'chefs' // Carpeta para imágenes de chefs
    } else if (file.fieldname === 'imagen') {
      folder = 'recipes' // Carpeta para imágenes de recetas
    }

    // Si deseas probar otra carpeta, puedes cambiar el valor aquí
    // folder = 'otra_carpeta'; // Intenta con esta carpeta si fuera necesario

    return {
      folder: folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      public_id: `${file.originalname}-${Date.now()}`
    }
  }
})

const upload = multer({ storage })

module.exports = upload
