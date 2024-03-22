// ROUTES -> comercio.js
/*
    Las routes definen cómo se accede y se interactúa con los recursos de la aplicación a través de URLs específicas, 
    y proporcionan una estructura para manejar las solicitudes HTTP entrantes de manera efectiva y coherente.

    La estructura es router.<peticion>.('URL', <middlewares>, <controlador>)
*/
// ----------------------------------------------------------------------------

// Librerias
const express = require('express')
// Módulos propios
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/comercios")
const { validatorCreateItem, validatorGetItem, validatorModifyItem } = require("../validators/comercios")

//Creamos el router de comercios, gestionará todas las rutas de comercios
const routerComercios = express.Router()

// Obtener la lista de comercios y, opcionalmente (vía parámetro query,) ordenados por el CIF ascendentemente
routerComercios.get('/', getItems) // Indicamos la URL y vamos al controller

// Obtener un comercio por su CIF
// Necesitamos el validador para comprobar que el CIF es correcto
// El CIF lo indicamos como _CIF para no confundirlo con el nombre de CIF de la BD
routerComercios.get('/:_CIF', validatorGetItem, getItem) // Indicamos la URL, vamos al validador y al controller

// Guardar un comercio
// Necesitamos el validador para comprobar que los datos pasados son correctos
routerComercios.post('/', validatorCreateItem, createItem) // Indicamos la URL, vamos al validador y al controller

// Modificar un comercio a partir de su CIF
// Necesitamos el validador para comprobar que los datos pasados son correctos
// El CIF lo indicamos como _CIF para no confundirlo con el nombre de CIF de la BD
routerComercios.patch('/:_CIF', validatorModifyItem, updateItem) // Indicamos la URL, vamos al validatos y al controller

// Borrar un comercio a partir de su CIF, y permite elegir entre un borrado lógico o físico (vía parámetro query)
// Necesitamos el validador para comprobar que el CIF es correcto
// El CIF lo indicamos como _CIF para no confundirlo con el nombre de CIF de la BD
routerComercios.delete('/:_CIF', validatorGetItem, deleteItem) // Indicamos la URL, vamos al validador y al controller

module.exports = routerComercios