const fs = require( 'node:fs/promises' )
const path = require( 'node:path' )
const pc = require( 'picocolors' )

// Al ejecutar el node <nombreArchivo.js> podemos poner más argumentos y los podemos coger con process.arg[]
const folder = process.argv[2] ?? '.' // Por defecto si no se indica nada ponemos el directorio actual

async function ls (directory) {

    let files
    
    // Hacemos un try catch para leer el direrctorio
    try {
        files = await fs.readdir(folder)
    } catch {
        console.error(pc.red(`No se pudo leer el directorio ${folder}`)) // Con picocolors podemos cambiar el color del texto
        process.exit(1) // Salimos de la ejecución con un 1, ha habido algún error
    }

    // Mapeamos todos los file que hay en files
    const filePromises = files.map(async file => {
        
        const filePath = path.join(folder, file) // Obtenemos el path del file
        let stats
        
        // Hacemos un try catch para leer el archivo
        try {
            stats = await fs.stat(filePath) // Obtenemos información del arrchivo 
        } catch {
            console.error(pc.red(`No se pudo leer el archivo ${filePath}`))
            process.exit(1) // Salimos de la ejecución con un 1, ha habido algún error
        }

        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? 'd' : 'f' // Si es un directorio lo indicamos con una d, en caso contrario wa un fichero, f
        const fileSize = stats.size
        const fileModified = stats.mtime.toLocaleString() // Indicamos cuando se modificó el archivo

        return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.toString().padStart(10))} ${pc.yellow(fileModified)}`
    })

    const filesInfo = await Promise.all(filePromises)

    filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)
