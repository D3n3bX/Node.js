const express = require('express' )
const app = express()

//Simulamos una base de datos con el archivo de cursos.js anterior
const { infoCursos } = require('./cursos.js' )

// Loading process.env
require('dotenv').config()

// Routing
app.get('/', (req, res) => {
    res.send('Hello World!')
})
// Listening
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Servidor iniciado en el puerto' , port)
});