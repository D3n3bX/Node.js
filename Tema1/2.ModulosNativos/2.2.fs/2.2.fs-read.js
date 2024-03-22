const fs = require ( 'node:fs' )

const buffer = fs.readFileSync('./fichero.txt') // Devuelve un buffer, no es legible
// console.log(buffer)

// Forma síncrona: va de forma secuencial y espera hasta que se termine la tarea
console.log('Leyendo el primer fichero...')
const text1 = fs.readFileSync('./fichero.txt', 'utf8') // Devuelve el texto claro
console.log(text1)

console.log('Leyendo el segundo fichero...')
const text2 = fs.readFileSync('./fichero2.txt', 'utf8') // Devuelve el texto claro
console.log(text2)

// Forma asíncrona: no va de forma secuencial por lo que no espera a que se termine una tarea para empezar otra
console.log('Leyendo el primer fichero...')
fs.readFile('./fichero.txt', 'utf8', (err, text) => { // Ejecutamos el callback cuando se termine de leer el fichero
    console.log(text)
}) 

// Mientras se esta leyendo el fichero podedmos ejecutar otras lineas
console.log('Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo fichero...')
fs.readFile('./fichero2.txt', 'utf8', (err, text)=>{
    console.log(text)
})
