// Importa el módulo mongoose, que es una biblioteca de modelado de objetos MongoDB para Node.js
const mongoose = require('mongoose')

// Define una función llamada dbConnect que se encarga de conectar a la base de datos
const dbConnect = () => {
    const db_uri = process.env.DB_URI // Obtenemos la uri de la BBDD desde las variables de entorno
    
    mongoose.set('strictQuery', false) // Configuramos mongoose para que no sea estricto en las consiltas (strrictQuery)
    
    try {
        // Intenta conectar a la base de datos utilizando la URI proporcionada
        mongoose.connect(db_uri)
    } catch (error) {
        // Si ocurre un error durante la conexión, muestra un mensaje de error en la consola
        console.err('Error conectando a la BD:', error)
    }

    // Escucha eventos relacionados con la conexión a la base de datos
    mongoose.connection.on('connected',() => console.log('Conectado a la BD'))
}

// Exporta la función dbConnect para que pueda ser utilizada en otros archivos de Node.js
module.exports = dbConnect
