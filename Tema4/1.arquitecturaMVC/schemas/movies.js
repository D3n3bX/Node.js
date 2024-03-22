const z = require('zod')

// Creamos el esquema de la movie para poder validar los datos
const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        rerquired_error: 'Movie title is required'
    }),
    year: z.number().int().min(1900).max(2024),
    direrctor: z.string(),
    duration: z.number().int().positive(),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crime'])),
    rate: z.number().min(0).max(10).default(0)
})

// Validamos la movie
function validateMovie (object) {
    return movieSchema.safeParse(object)
}

// Validamos algunos campos de la movie
function validatePartialMovie (object) {
    return movieSchema.partial().safeParse(object)
}

module.exports = { validateMovie, validatePartialMovie }