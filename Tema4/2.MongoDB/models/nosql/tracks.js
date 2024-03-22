const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const TracksScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        cover: {
            type: String            //Imagen
        },
        artist: {
            name: {
                type: String
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            }
        },
        duration:{
            start: {
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId:{
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)

TracksScheme.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true })

module.exports = mongoose.model("tracks", TracksScheme) // tracks es el nombre de la colección en mongoDB (o de la tabla en SQL)