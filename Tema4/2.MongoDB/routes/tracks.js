const { getItems, getItem, createItem, deleteItem } = require("../controllers/tracks")
const { updateItem } = require("../controllers/tracks")
const customHeader = require('../middleware/customHeader')
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const authMiddleware = require('../middleware/session')
const checkRol = require("../middleware/rol")

const express = require("express")

//Creacion del router
const routerTracks = express.Router()

routerTracks.get("/", authMiddleware, getItems)
routerTracks.get("/:id", validatorGetItem, getItem)
routerTracks.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem)
routerTracks.put('/:id', validatorGetItem, validatorCreateItem, updateItem )
routerTracks.delete('/:id', validatorGetItem, deleteItem)

module.exports = routerTracks