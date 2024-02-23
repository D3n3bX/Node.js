const fs = require ( 'node:fs' )

const stats = fs.statSync ( './fichero.txt' )

console.log(
    stats.isFile(), // Comprueba si es un fichero
    stats.isDirectory(), // Comprueba si es un directorio
    stats.isSymbolicLink(), // Comprueba si es un enlace simbólico
    stats.size // Indica el tamaño en bytes
)