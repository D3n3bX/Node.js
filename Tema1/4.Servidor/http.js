const http = require('node:http') // Protocolo http
const { findAvailablePort } = require('./findAvailablePort')

// Creamos un server que puede recibir una request (req) y mandar una respuesta (res)
const server = http.createServer((req, res) => {
    console.log('request received')
    res.end('Hola Mundo!')
})

// Escuchamos por el puerto 3000 o el que este libre
findAvailablePort(3000).then(port => {
    server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${server.address().port}`) // Cuando empiece a escuchara se imprime el mensaje

    })
})
