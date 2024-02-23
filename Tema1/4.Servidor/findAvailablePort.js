const net = require('node:net') // Protocolo TCP

function findAvailablePort (desirePort) {
    // Devolvemos una promesa
    return new Promise((resolve, reject) => {
        // Creamos un server
        const server = net.createServer()

        // Indicamos por el puerto que queremos que escuche
        server.listen(desirePort, () => {
            const { port } = server.address() // Guardamos el puerto por el que escucha
            // Cerramos el servidor
            server.close(() => {
                resolve(port) // Resolvemos por el puerto que este libre
            })
        })
        
        // Escuchamos el evento de error
        server.on('error', (err) => {
            // Si el código de error es que el puerto esta ocupado
            if (err.code === 'EADDRINUSE') {
                // Usamos la función findAvailablePort para que encuentre uno libre 
                // y resuelva la promesa que devuelve
                findAvailablePort(desirePort + 1).then(port => resolve(port))
            } else {
                reject(err) // Si el error es otro lo deveolvemos
            }
        })
    })
}

module.exports = { findAvailablePort }