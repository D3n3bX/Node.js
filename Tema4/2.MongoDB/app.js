require('dotenv').config()
const dbConnect = require('./config/mongo')
const routerGlobal = require("./routes")
// const routerStorage = require("./routes/storage.js");
const uploadMiddleware = require("./utils/handdleStorage");

// Añadir estos dos al proyecto final
const morganBody = require("morgan-body")
const loggerStream = require("./utils/handleLogger")

const express = require("express")
const cors = require("cors")

const app = express()

// Añadir esto al proyecto final
const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

// Añadir estas dos cosas al pryecto 
morganBody(app, {
    noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
    skip: function(req, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)
        return res.statusCode < 400
    },
    stream: loggerStream
})


// Middelwares
app.use(cors())
app.use(express.json())

app.use(express.static("storage")) // Almacenamos aqui las imágenes

app.use("/api", routerGlobal)

dbConnect() // Nos conectamos a MongoDB




   


// Listening
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})