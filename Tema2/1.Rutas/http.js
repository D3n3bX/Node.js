const http = require('node:http') // Protocolo http

const desirePort = process.env.PORT ?? 3000

// Procesamos la request
const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/plain') // Indicamos que es un texto plano

    if (req.url == '/') {
        res.statusCode = 200 // OK
        res.end('Hola Mundo!')
    } else if (req.url == '/Contacto') {
        req.statusCode = 200
        req.end('Contacto')
    } else {
        req.statusCode = 404 // Not found
        res.end('ERROR 404: Not Found')
    }
}

const server = http.createServer(processRequest)

server.listen(desirePort, () => {
    console.log(`server listening on port htttp://localhost:${desirePort}`)
})
