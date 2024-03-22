const express = require('express')
// Loading process.env
require('dotenv').config()

// Routes
const routerProgramacion = require('./routes/programacion')
const routerMatematicas = require('./routes/matematicas')

//Simulamos una base de datos con el archivo de cursos.js anterior
const infoCursos = require('./datos/cursos.json')

const app = express()

// Petición GET para la raíz
app.get('/', (req, res) => {
    res.send('Hello World' )
})

// Petición GET para la url /cursos
app.get('/cursos', (req, res) => {
    res.json(infoCursos)
})

// Usamos los routers creados de Prgramación y Matemáticas
app.use('/cursos/programacion', routerProgramacion)
app.use('/cursos/matematicas', routerMatematicas)

// Listening
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})