const fs = require ( 'node:fs/promises' )

// Forma asíncrona
console.log('Leyendo el primer fichero...')
fs.readFile('./fichero.txt', 'utf8')
    .then(text => { // Cuando se cumpla la promesa, leer el fichero, se ejecuta el código indicado
        console.log(text)
    })

// Mientras se esta leyendo el fichero podedmos ejecutar otras lineas
console.log('Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo fichero...')
fs.readFile('./fichero2.txt', 'utf8')
    .then(text => {
        console.log(text)
    })
