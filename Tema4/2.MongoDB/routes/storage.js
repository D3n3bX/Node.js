const express = require("express")
const uploadMiddleware = require("../utils/handdleStorage")
const { createItem, getItems, deleteItem } = require("../controllers/storage")

const routerStorage = express.Router()

// Petición POST a la url http:localhost:3000/api/storage
routerStorage.post("/", uploadMiddleware.single("image"), createItem)

// Peitición GET a la url http:localhot:3000/api/storage
routerStorage.get("/", getItems) // Usamos la función getItems para obtener todo lo que haya en la coleccion storage

// Peitición DELETE a la url http:localhot:3000/api/storage/:id
routerStorage.delete('/:id', deleteItem)

module.exports = routerStorage

