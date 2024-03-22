const fs = require ( 'node:fs/promises' );

// IIFE - Inmediately Involved Function Expression: Mientras creamos l función se ejecuta
(
    async () => {
        // Forma asíncrona
        console.log('Leyendo el primer fichero...')
        const text1 = await fs.readFile('./fichero.txt', 'utf8')
        console.log(text1)
    
        // Mientras se esta leyendo el fichero podedmos ejecutar otras lineas
        console.log('Hacer cosas mientras lee el archivo...')

        console.log('Leyendo el segundo fichero...')
        const text2 = await fs.readFile('./fichero2.txt', 'utf8')
        console.log(text2)
    }
)

// La IIFE equivale a esto
async function init () {
    // Forma asíncrona
    console.log('Leyendo el primer fichero...')
    const text1 = await fs.readFile('./fichero.txt', 'utf8')
    console.log(text1)

    // Mientras se esta leyendo el fichero podedmos ejecutar otras lineas
    console.log('Hacer cosas mientras lee el archivo...')

    console.log('Leyendo el segundo fichero...')
    const text2 = await fs.readFile('./fichero2.txt', 'utf8')
    console.log(text2)
}
init()
