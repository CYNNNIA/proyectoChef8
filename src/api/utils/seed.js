require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('../../config/db')
const Chef = require('../models/chef')
const Receta = require('../models/recetas')
const cloudinary = require('../../config/cloudinary').cloudinary

const seedData = async () => {
  await connectDB()

  await Chef.deleteMany({})
  await Receta.deleteMany({})

  // Subir imágenes de chefs a Cloudinary
  const chefImages = await Promise.all([
    cloudinary.uploader.upload('./assets/gordon.jpg', { folder: 'chefs' }),
    cloudinary.uploader.upload('./assets/jamie.jpg', { folder: 'chefs' }),
    cloudinary.uploader.upload('./assets/ina.jpg', { folder: 'chefs' }),
    cloudinary.uploader.upload('./assets/nigella.jpg', { folder: 'chefs' }),
    cloudinary.uploader.upload('./assets/anthony.jpg', { folder: 'chefs' })
  ])

  console.log('Contenido completo de chefImages:', chefImages)

  // Crear chefs con URLs de Cloudinary
  const chefs = await Chef.create([
    {
      nombre: 'Gordon Ramsay',
      experiencia: 20,
      profileImage: chefImages[0].secure_url,
      profileImageId: chefImages[0].public_id
    },
    {
      nombre: 'Jamie Oliver',
      experiencia: 15,
      profileImage: chefImages[1].secure_url,
      profileImageId: chefImages[1].public_id
    },
    {
      nombre: 'Ina Garten',
      experiencia: 30,
      profileImage: chefImages[2].secure_url,
      profileImageId: chefImages[2].public_id
    },
    {
      nombre: 'Nigella Lawson',
      experiencia: 25,
      profileImage: chefImages[3].secure_url,
      profileImageId: chefImages[3].public_id
    },
    {
      nombre: 'Anthony Bourdain',
      experiencia: 22,
      profileImage: chefImages[4].secure_url,
      profileImageId: chefImages[4].public_id
    }
  ])

  // Subir imágenes de recetas a Cloudinary
  const recipeImages = await Promise.all([
    cloudinary.uploader.upload('./assets/spaguetti.jpg', { folder: 'recipes' }),
    cloudinary.uploader.upload('./assets/tarta.jpg', { folder: 'recipes' }),
    cloudinary.uploader.upload('./assets/huevos.jpg', { folder: 'recipes' }),
    cloudinary.uploader.upload('./assets/paella.jpg', { folder: 'recipes' }),
    cloudinary.uploader.upload('./assets/brownie.jpg', { folder: 'recipes' }),
    cloudinary.uploader.upload('./assets/calabaza.jpg', { folder: 'recipes' }),
    cloudinary.uploader.upload('./assets/pancakes.jpg', { folder: 'recipes' }),
    cloudinary.uploader.upload('./assets/noodles.jpeg', { folder: 'recipes' }),
    cloudinary.uploader.upload('./assets/pollo.jpg', { folder: 'recipes' })
  ])

  console.log(
    'Enlaces de imágenes de recetas:',
    recipeImages.map((img) => img.secure_url)
  )

  // Crear recetas con URLs de Cloudinary
  await Receta.create([
    {
      nombre: 'Spaghetti Carbonara',
      ingredientes: ['spaghetti', 'huevos', 'queso', 'tocino'],
      preparacion: 'Cocinar la pasta y mezclar con los demás ingredientes.',
      tiempo: 20,
      categoria: 'Cena',
      chef: chefs[0]._id,
      imagen: recipeImages[0].secure_url,
      imagenId: recipeImages[0].public_id
    },
    {
      nombre: 'Tarta de Queso',
      ingredientes: ['queso crema', 'huevos', 'azúcar', 'harina', 'vainilla'],
      preparacion:
        'Mezclar todos los ingredientes y hornear hasta que esté dorado.',
      tiempo: 60,
      categoria: 'Merienda',
      chef: chefs[2]._id,
      imagen: recipeImages[1].secure_url,
      imagenId: recipeImages[1].public_id
    },
    {
      nombre: 'Huevos Benedictinos',
      ingredientes: ['huevos', 'jamón', 'pan inglés', 'salsa holandesa'],
      preparacion: 'Cocinar los huevos y servir con jamón y salsa holandesa.',
      tiempo: 15,
      categoria: 'Desayuno',
      chef: chefs[3]._id,
      imagen: recipeImages[2].secure_url,
      imagenId: recipeImages[2].public_id
    },
    {
      nombre: 'Paella de Mariscos',
      ingredientes: [
        'arroz',
        'calamares',
        'gambas',
        'mejillones',
        'pimiento',
        'caldo de pescado'
      ],
      preparacion: 'Cocinar el arroz con el caldo y añadir los mariscos.',
      tiempo: 45,
      categoria: 'Almuerzo',
      chef: chefs[4]._id,
      imagen: recipeImages[3].secure_url,
      imagenId: recipeImages[3].public_id
    },
    {
      nombre: 'Brownies de Chocolate',
      ingredientes: ['chocolate', 'mantequilla', 'azúcar', 'huevos', 'harina'],
      preparacion:
        'Mezclar los ingredientes y hornear hasta que estén cocidos.',
      tiempo: 30,
      categoria: 'Merienda',
      chef: chefs[0]._id,
      imagen: recipeImages[4].secure_url,
      imagenId: recipeImages[4].public_id
    },
    {
      nombre: 'Sopa de Calabaza',
      ingredientes: [
        'calabaza',
        'cebolla',
        'ajo',
        'caldo de verduras',
        'crema'
      ],
      preparacion: 'Cocinar la calabaza y mezclar con el caldo y crema.',
      tiempo: 25,
      categoria: 'Cena',
      chef: chefs[2]._id,
      imagen: recipeImages[5].secure_url,
      imagenId: recipeImages[5].public_id
    },
    {
      nombre: 'Panqueques con Frutas',
      ingredientes: ['harina', 'huevos', 'leche', 'azúcar', 'frutas'],
      preparacion: 'Hacer los panqueques y servir con frutas.',
      tiempo: 15,
      categoria: 'Desayuno',
      chef: chefs[1]._id,
      imagen: recipeImages[6].secure_url,
      imagenId: recipeImages[6].public_id
    },
    {
      nombre: 'Fideos con Verduras',
      ingredientes: [
        'fideos',
        'zanahorias',
        'calabacín',
        'brócoli',
        'salsa de soja'
      ],
      preparacion: 'Cocinar los fideos y saltear con las verduras y la salsa.',
      tiempo: 20,
      categoria: 'Almuerzo',
      chef: chefs[3]._id,
      imagen: recipeImages[7].secure_url,
      imagenId: recipeImages[7].public_id
    },
    {
      nombre: 'Pollo al Curry',
      ingredientes: [
        'pollo',
        'curry en polvo',
        'leche de coco',
        'arroz',
        'verduras'
      ],
      preparacion:
        'Cocinar el pollo con curry y leche de coco, servir con arroz.',
      tiempo: 35,
      categoria: 'Cena',
      chef: chefs[4]._id,
      imagen: recipeImages[8].secure_url,
      imagenId: recipeImages[8].public_id
    }
  ])

  console.log('Datos insertados correctamente')
  mongoose.disconnect()
}

seedData().catch((error) => {
  console.error('Error al insertar datos de ejemplo:', error)
  mongoose.disconnect()
})
