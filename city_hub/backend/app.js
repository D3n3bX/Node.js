require('dotenv').config()

// Librerias
const express = require("express")
const cors = require("cors")
// Módulos propios
const routerGlobal = require("./routes")
const dbConnect = require('./config/mongo')

const app = express()

// Middelwares
app.use(cors())
app.use(express.json())

app.use('/api', routerGlobal) // Usamos routerGlobal por lo que todas las URLs empezaron por http://localhost:3001/api

dbConnect() // Nos conectamos a MongoDB

const PORT = process.env.PORT || 3000 // Leemos el puerto que hay en el .env y en caso de que no este definido usamos el 3000 por defecto
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})