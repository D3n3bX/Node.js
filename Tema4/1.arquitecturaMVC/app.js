const express = require('express')

const corsMiddleware = require('./middlewares/cors')
const moviesRouter = require('./routes/movies')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')

// Middlewares
app.use(express.json()) 
app.use(corsMiddleware()) // Usamos el middleware de cors

// Métodos normales: GET/HEAD/POST
// Métodos complejos: PUT/PATCH/DELETE
// Cuando la petición es del mismo ORIGIN (http://localhot:3000 -> http://localhot:3000) no nos devuelve el origin

// Cuando accedamos a /movies cargamos todas las rutas que hay en moviesRouter
app.use('/movies', moviesRouter) 

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})