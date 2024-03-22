// MODEL -> comercio.js
/*
    El modelo representa la capa de datos y lógica de negocio de la aplicación, proporcionando una abstracción de los datos subyacentes
    y garantizando que la aplicación funcione de manera coherente y eficiente.
*/
// ----------------------------------------------------------------------------

// Librerías
// Importa el módulo mongoose, que es una biblioteca de modelado de objetos MongoDB para Node.js
const mongoose = require('mongoose')
const mongooseDelete = require("mongoose-delete")

// Definimos el esquema que van a tener todos los comercios
const ComercioSchema = new mongoose.Schema( 
    {
        nombre: { 
            type: String
        },
        CIF: {
            type: String,
            unique: true // El CIF es único
        },
        direccion: {
            type: String
        },
        correo: {
            type: String,
            unique: true // El correo también es único
        },
        telefono: {
            type: Number
        }
    },
    {
        timestamps: true, // Muestra  cuando se creó o se actualizó un comercio
        versionKey: false //  No muestra la clave de versión
    }
)

// Para poder hacer un soft delete
ComercioSchema.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true })

// Para exportar el módulo indicamos el nombre de la colección de MongoDB y a continuación el nombre de la variable
module.exports = mongoose.model("comercio", ComercioSchema)