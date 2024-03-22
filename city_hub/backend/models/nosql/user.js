// Importa el módulo mongoose, que es una biblioteca de modelado de objetos MongoDB para Node.js
const mongoose = require('mongoose')

// Definimos el esquema que van a tener todos los usuarios
const UserScheme = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        edad: {
            type: Number
        },
        correo: {
            type: String,
            unique: true
        },
        password:{
            type: String 
        },
        rol:{
            type: ['user', 'admin', 'comercio'], // Indicamos los tipos de usaurio
            default: 'user'
        }
    },
    {
        timestamps: true, 
        versionKey: false
    }
)

module.exports = mongoose.model('users', UserScheme) // “users” es el nombre de la colección en mongoDB (o de la tabla en SQL)