function customHeader (req, res, next) {
    try {
        const apiKey = req.headers.api_key // Obtenemos del header la api_key

        if(apiKey === process.env.API_KEY) { //Probar con otra para ver el error
            next()
        } else {
            res.status(403).send("api key no es correcto")
        }
    } catch(err) {
            res.status(403).send(err)
    }
}

module.exports = customHeader
