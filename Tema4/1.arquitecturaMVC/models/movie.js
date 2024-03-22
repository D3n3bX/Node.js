const movies = require('../movies.json')

class MovieModel {
    static getAll ({ genre }) {
        if (genre) {
            // Filtramos por el genre indicado
            const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()) // Comparamos todo en minúscula
          )
          return res.json(filteredMovies) // Devolvemos las movies filtradas
        }

        return movies
    }
}