require('dotenv').config()

const express = require('express')
const connectDB = require('./src/config/db')
const chefRouter = require('./src/api/routes/chef.js')
const recetasRouter = require('./src/api/routes/recetas.js')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/recetas', recetasRouter)
app.use('/api/chef', chefRouter)

app.use('*', (req, res, next) => {
  return res.json({ message: 'ruta no encontrada' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
