const http = require('node:http')
// Podemos inmportar ficheros JSON
const dittoJSON = require('./pokemon/ditto.json')

// Procesamos la request
const processRequest = (req, res) => {
    const { method, url} = req // Guardamos el method y la url de la request

    switch (method) {
        // Petición GET
        case 'GET':
            switch (url) {
                // url -> http://localhost:3000/pokemon/ditto
                case '/pokemon/ditto':

                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    return res.end(JSON.stringify(dittoJSON))
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('ERROR 404: Not Found')
            }
        // Petición POST
        case 'POST':
            switch (url) {
                // url -> http://localhost:3000/pokemon
                case '/pokemon': {
                    let body = ''
                    
                    req.on('data', chunk => {
                        body += chunk.toString() // Convertimos a string el chunk recibido
                    })
                    
                    // Cuando finaliza la recogida de data
                    req.on('end', () => {
                        const data = JSON.parse(body) // Parseamos el body y lo guardamos en data
                        res.writeHead(201, {'Content-Type':'application/json'}) // Estable
                        res.end(JSON.stringify(data))
                    })

                    break
                    
                }
                default: 
                    res.statusCode = 404
                    res.setHeader( 'Content-Type', 'text/html; charset=utf8')
                    return res.end('ERROR 404: Not Found')
            }
    }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
    console.log('server listening on port http://localhost:3000')
})