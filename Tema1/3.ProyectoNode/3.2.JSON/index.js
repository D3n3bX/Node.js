const fs = require('fs')

// Ruta al archivo JSON
const archivo = './ejemplo.json'

// Leemos el archivo JSON
fs.readFile(archivo, 'utf8', (err, data) => {
    // Si hay un error
    if (err) {
    console.error('Error al leer el archivo:', err) // Lo indicamos
    process(1) // Salimos de la ejecución con un 1, ha habido algún error
  }

  // Parseamos el JSON a un objeto de JavaScript
  const curso = JSON.parse(data)

  // Modificamos el campo deseado
  curso.estudiantes += 1

  // Convertimos el objeto modificado de vuelta a una cadena JSON
  const cursoModificado = JSON.stringify(curso, null, 2)

  // Escribimos el JSON modificado de vuelta al archivo
  fs.writeFile(archivo, cursoModificado, 'utf8', (err) => {
    // Si hay un error
    if (err) {
      console.error('Error al escribir en el archivo:', err) // Lo indicamos
      process(1) // Salimos de la ejecución con un 1, ha habido algún error
    }
    console.log('Archivo actualizado con éxito.')
  })

})