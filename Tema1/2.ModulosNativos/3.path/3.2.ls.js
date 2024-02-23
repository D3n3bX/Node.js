const fs = require( 'node:fs/promises' )

// Al ejecutar el node <nombreArchivo.js> podemos poner más argumentos y los podemos coger con process.arg[]
const folder = process.argv[2] ?? '.' // Por defecto si no se indica nada ponemos el directorio actual

fs.readdir(folder)
    // Cuando se cumpla la promesa
    .then(files => {
        // Por cada file en files
        files.forEach(file => {
            console.log(file) // Mostramos el file
        })
    })
    // En caso de no cumplirse la promesa    
    .catch(err => {
        if (err) {
            console.log('Error al leer el directorio: ', err) // Lo indicamos
            return // Y paramos de ejecutar el código
        }
    })
