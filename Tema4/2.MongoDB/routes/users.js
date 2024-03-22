const express = require("express")
const { getItems, getItem, createItem, modifyItem } = require("../controllers/users")
const customHeader = require('../middleware/customHeader')

const routerUsuario = express.Router()

// Petición GET a la url 
routerUsuario.get("/", customHeader, getItems)
routerUsuario.get("/:id", getItem)
routerUsuario.post("/", createItem)
routerUsuario.patch("/:id", modifyItem)

module.exports = routerUsuario