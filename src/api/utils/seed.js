require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('../../config/db')
const Chef = require('../models/chef')
const Receta = require('../models/recetas')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const seedData = async () => {
  await connectDB()

  await Chef.deleteMany({})
  await Receta.deleteMany({})

  const chefImages = await Promise.all([
    cloudinary.uploader.upload('./assets/gordon.jpg'),
    cloudinary.uploader.upload('./assets/jamie.jpg'),
    cloudinary.uploader.upload('./assets/ina.jpg'),
    cloudinary.uploader.upload('./assets/nigella.jpg'),
    cloudinary.uploader.upload('./assets/anthony.jpg')
  ])

  console.log('Contenido completo de chefImages:', chefImages)

  const chefs = await Chef.create([
    {
      nombre: 'Gordon Ramsay',
      experiencia: 20,
      profileImage: chefImages[0].secure_url
    },
    {
      nombre: 'Jamie Oliver',
      experiencia: 15,
      profileImage: chefImages[1].secure_url
    },
    {
      nombre: 'Ina Garten',
      experiencia: 30,
      profileImage: chefImages[2].secure_url
    },
    {
      nombre: 'Nigella Lawson',
      experiencia: 25,
      profileImage: chefImages[3].secure_url
    },
    {
      nombre: 'Anthony Bourdain',
      experiencia: 22,
      profileImage: chefImages[4].secure_url
    }
  ])

  const recipeImages = await Promise.all([
    cloudinary.uploader.upload('./assets/spaguetti.jpg'),
    cloudinary.uploader.upload('./assets/tarta.jpg'),
    cloudinary.uploader.upload('./assets/huevos.jpg'),
    cloudinary.uploader.upload('./assets/paella.jpg'),
    cloudinary.uploader.upload('./assets/brownie.jpg'),
    cloudinary.uploader.upload('./assets/calabaza.jpg'),
    cloudinary.uploader.upload('./assets/pancakes.jpg'),
    cloudinary.uploader.upload('./assets/noodles.jpeg'),
    cloudinary.uploader.upload('./assets/pollo.jpg')
  ])

  console.log(
    'Enlaces de imágenes de recetas:',
    recipeImages.map((img) => img.secure_url)
  )

  await Receta.create([
    {
      nombre: 'Spaghetti Carbonara',
      ingredientes: ['spaghetti', 'huevos', 'queso', 'tocino'],
      preparacion: 'Cocinar la pasta y mezclar con los demás ingredientes.',
      tiempo: 20,
      categoria: 'Cena',
      chef: chefs[0]._id,
      imagen: recipeImages[0].secure_url
    },
    {
      nombre: 'Tarta de Queso',
      ingredientes: ['queso crema', 'huevos', 'azúcar', 'harina', 'vainilla'],
      preparacion:
        'Mezclar todos los ingredientes y hornear hasta que esté dorado.',
      tiempo: 60,
      categoria: 'Merienda',
      chef: chefs[2]._id,
      imagen: recipeImages[1].secure_url
    },
    {
      nombre: 'Huevos Benedictinos',
      ingredientes: ['huevos', 'jamón', 'pan inglés', 'salsa holandesa'],
      preparacion: 'Cocinar los huevos y servir con jamón y salsa holandesa.',
      tiempo: 15,
      categoria: 'Desayuno',
      chef: chefs[3]._id,
      imagen: recipeImages[2].secure_url
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
      imagen: recipeImages[3].secure_url
    },
    {
      nombre: 'Brownies de Chocolate',
      ingredientes: ['chocolate', 'mantequilla', 'azúcar', 'huevos', 'harina'],
      preparacion:
        'Mezclar los ingredientes y hornear hasta que estén cocidos.',
      tiempo: 30,
      categoria: 'Merienda',
      chef: chefs[0]._id,
      imagen: recipeImages[4].secure_url
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
      imagen: recipeImages[5].secure_url
    },
    {
      nombre: 'Panqueques con Frutas',
      ingredientes: ['harina', 'huevos', 'leche', 'azúcar', 'frutas'],
      preparacion: 'Hacer los panqueques y servir con frutas.',
      tiempo: 15,
      categoria: 'Desayuno',
      chef: chefs[1]._id,
      imagen: recipeImages[6].secure_url
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
      imagen: recipeImages[7].secure_url
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
      imagen: recipeImages[8].secure_url
    }
  ])

  console.log('Datos insertados correctamente')
  mongoose.disconnect()
}

seedData().catch((error) => {
  console.error('Error al insertar datos de ejemplo:', error)
  mongoose.disconnect()
})