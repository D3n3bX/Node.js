const path = require( 'node:path' )

// Barra de sepación segun el SO
console.log(path.sep) // \ para Windows y / para Linux

// Podemos unir rutas
const filePath = path.join('content', 'subfolder', 'text.txt') // Indicamos las rutas que queremos unir
console.log(filePath)

// Podemos saber el nombre del fichero
const base = path.basename('tmp/hello/world/index.html')
console.log(base)

// Si solo queremos el nombre sin la extensión
const fileName = path.basename('tmp/hello/world/index.html', 'html')
console.log(fileName)

// Podemos ver la extensión de un archivo
const extension = path.extname('image.jpg')
console.log(extension)