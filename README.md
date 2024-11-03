# Proyecto Chef8

Este proyecto es una API RESTful para gestionar chefs y recetas. Utiliza Node.js, Express y MongoDB como base de datos, y almacena imágenes en Cloudinary.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Seed Data](#seed-data)
- [Consideraciones](#consideraciones)

## Características

- CRUD para chefs y recetas.
- Almacenamiento de imágenes de chefs y recetas en Cloudinary.
- Base de datos alojada en MongoDB Atlas.
- Relación entre chefs y recetas (cada receta tiene un chef asociado).
- Limpieza automática de archivos en Cloudinary cuando se elimina un dato.

## Tecnologías

- **Node.js**
- **Express**
- **MongoDB Atlas**
- **Mongoose**
- **Cloudinary**
- **Multer** (para el manejo de archivos)
- **dotenv**

## Requisitos

- Node.js y npm
- Una cuenta en MongoDB Atlas
- Una cuenta en Cloudinary

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/CYNNNIA/proyectoChef8.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

   ```env
   DB_URL=mongodb+srv://cynthialorenzolopez:VrZVUfTkkdeo45BV@cluster0.hagak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

CLOUDINARY_CLOUD_NAME=dqyguxnf2
CLOUDINARY_API_KEY=821753565946865
CLOUDINARY_API_SECRET=qdagYblMthBRycGEZILXF4Nd5XI
PORT=3000

2. Configura tu base de datos en MongoDB Atlas con acceso público (IP `0.0.0.0/0`).

## Estructura del Proyecto

```plaintext
proyectoChef8/
├── assets/               # Carpeta con las imágenes locales para pruebas
├── src/
│   ├── api/
│   │   ├── controllers/  # Controladores de chefs y recetas
│   │   ├── models/       # Modelos de Mongoose para chefs y recetas
│   │   ├── routes/       # Rutas de la API
│   │   └── utils/        # Archivos de utilidad, como seed.js
│   └── config/           # Configuración de la base de datos y Cloudinary
├── .env                  # Variables de entorno
├── README.md             # Documentación
└── package.json          # Dependencias y scripts
```

## Uso

### Ejecución en Desarrollo

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`.

### Seed Data

Para poblar la base de datos con datos de ejemplo, ejecuta:

```bash
npm run seed
```

Este comando eliminará todos los datos existentes en la colección y agregará los datos de muestra.

### Endpoints

#### Chefs

- **GET /api/chef**: Obtiene todos los chefs.
- **GET /api/chef/:id**: Obtiene un chef por ID.
- **POST /api/chef**: Crea un nuevo chef.
- **PUT /api/chef/:id**: Actualiza un chef por ID.
- **DELETE /api/chef/:id**: Elimina un chef por ID.

#### Recetas

- **GET /api/recetas**: Obtiene todas las recetas.
- **GET /api/recetas/:id**: Obtiene una receta por ID.
- **GET /api/recetas/categoria/:categoria**: Obtiene recetas por categoría.
- **GET /api/recetas/ingredientes/:ingredientes**: Obtiene recetas por ingredientes.
- **POST /api/recetas**: Crea una nueva receta.
- **PUT /api/recetas/:id**: Actualiza una receta por ID.
- **DELETE /api/recetas/:id**: Elimina una receta por ID.

### Ejemplos de Uso con `curl`

Obtener todos los chefs:

```bash
curl -X GET http://localhost:3000/api/chef
```

Crear un nuevo chef:

```bash
curl -X POST http://localhost:3000/api/chef -H "Content-Type: application/json" -d '{"nombre":"Gordon Ramsay","experiencia":20}'
```

Obtener todas las recetas:

```bash
curl -X GET http://localhost:3000/api/recetas
```

---

¡Gracias por utilizar el proyecto! Asegúrate de seguir las instrucciones de configuración y contacta si necesitas más ayuda.
