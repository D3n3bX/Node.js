const express = require('express')
const crypto = require('node:crypto')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')
app.use(express.json()) 

// Petición GET para la raíz
app.get('/', (req, res) => {
    res.json({ message: 'Hola Mundo' })
})

// Petición GET para la url de /movies
app.get('/movies', (req, res) => {
    const { genre } = req.query // Recuperamos el genre de la query en la url
    
    // Si hay un genre
    if (genre) {
        // Filtramos por el genre indicado
        const filteredMovies = movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()) // Comparamos todo en minúscula
      )
      return res.json(filteredMovies) // Devolvemos las movies filtradas
    }

    res.json(movies) // Devolvemos todas las movies
})

// Petición GET para la url /movies/:id -> :id es un parámetro
app.get('/movies/:id', (req, res) => {
    const { id } = req.params // Recuperamos el id  del parámetro en la url
    const movie = movies.find(movie => movie.id == id) // Buscamos la movie con el id indicado
    
    // Si encontramos la movie
    if (movie) {
        return res.json(movie) // La deolvemos
    }

    res.status(404).json({ message: 'Movie not found'}) // Si no, indicamos que no ha sido encontrada
})

// Petición POST para la url /movies
app.post('/movies', (req, res) => {
    
    const result = validateMovie(req.body) // Guardamos la movie validada
    
    // Si ha habido algún error en la validación
    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) }) // Lo indicamos
    }

    // Creamos la nueva movie
    const newMovie = {
        id: crypto.randomUUID(), // Creamos un UUID v4
        ...result.data // Pasamos a newMovie todos los datos validados
    }
    
    movies.push(newMovie) // Esto no es REST
    res.status(201).json(newMovie)
})

// Petición PATCH para la url /movie/:id
app.patch('/movie/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id == id)
    const result = validatePartialMovie(req.body)

    if (!result.success) {
        return res.satatus(400).json({ error: JSON.parse(result.error.message) })
    }
    // Si no se ha encontrado
    if (movieIndex == -1) {
        return res.status(404).json({ message: 'Movie not found' }) // lo indicamos
    }

    const updateMovie = {
        ...movies[movieIndex], // La información que no se ha actualizado
        ...result.data // La información actualizada
    }

    movies[movieIndex] = updateMovie // Actualizamos la movie

    return res.json(updateMovie) 
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})