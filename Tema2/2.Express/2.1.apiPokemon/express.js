const express = require('express')
const dittoJSON = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 3000

// Creamos una app
const app = express()

// Podemos ocultar la cabecera donde indican que se usa Express para mayor seguridad
app.disable('x-powered-by')

// Middleware
app.use(express.json()) // Esto es lo mismo que lo de abajo

// app.use((req, res, next) => {
//     if (req.method != 'POST') {
//         return next()
//     }
//     if (req.headers['content-type'] != 'application/json') {
//         return next()
//     }

//     // Solo llegan request que son POST y tienen el header Content-Type: application/json
//     let body = ''
                    
//     req.on('data', chunk => {
//         body += chunk.toString() // Convertimos a string el chunk recibido
//     })
    
//     // Cuando finaliza la recogida de data
//     req.on('end', () => {
//         const data = JSON.parse(body) // Parseamos el body y lo guardamos en data
//         req.body = data // Mutamos la request y metemos data en el req.body
//         return next()
//     })
// })

// Las peticiones se van a intentar ejecutar por orden
// Petición GET para la ruta /
app.get('/', (req, res) => {
    res.send('Hola Mundo!')
})

// Petición POST para la ruta /pokemon/ditto
app.get('/pokemon/ditto', (req, res) => {
    res.send(JSON.stringify (dittoJSON))
})

// Petición POST para la ruta /pokemon
app.post('/pokemon', (req, res) => {
    res.status(201).json(req.body)
})

// Para gestionar el erro 404
app.use((req, res) => {
    res.status(404).send('404 Not Found')
})
// Indicamos en el puerto en el que esta escuchando el server
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})