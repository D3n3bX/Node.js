const mongoose = require("mongoose")

const UserScheme = new mongoose.Schema(
    {
        filename: {
            type: String
        },
        url: {
            type: String,   
            unique: true
        }
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)

module.exports = mongoose.model("storage", UserScheme) // storage es el nombre de la colección en mongoDB (o de la tabla en SQL)