// CONTROLLER -> comercio.js
/*
    El controlador es el componente responsable de manejar las interacciones del usuario y actualizar el modelo y la vista en consecuencia, 
    es decir, actúa como un intermediario entre el modelo y la vista, gestionando las interacciones del usuario y asegurando que el estado 
    de la aplicación se actualice y se presente correctamente al usuario.
*/
// ----------------------------------------------------------------------------

// Librerias
const { matchedData } = require('express-validator')
// Módulos propios
const { comercioModel } = require('../models')
const { handleHttpError } = require('../utils/handleError') 

/*
  FUNCION
    getItems(req, res)
    Obtener la lista de comercios, opcionalmente ordenados por CIF ascendentemente.
    Parámetros:
      - req: Objeto de solicitud de Express
      - res: Objeto de respuesta de Express
    Return:
      - Envía la lista de comercios como respuesta si la operación es exitosa. En caso de error, envía una respuesta de error con código 500.
*/
const getItems = async (req, res) => {
    try {
        let query = comercioModel.find({})
        
        const { orderByCIF } = req.query // Verificamos si se ha solicitado que se ordene por CIF

        // Se ha solicitado que se ordene por CIF
        if (orderByCIF) {
            query = query.sort({ CIF: 1 })
        }

        const data = await query.exec()
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 500)
    }
}

/*
  FUNCION
    getItem(req, res)
    Obtener un comercio por su CIF.
    Parámetros:
      - req: Objeto de solicitud de Express
      - res: Objeto de respuesta de Express
    Return:
      - Envía los datos del comercio como respuesta si la operación es exitosa. Si no se encuentra el comercio, envía una respuesta de error con código 404. 
        En caso de error, envía una respuesta de error con código 500.
*/
const getItem = async (req, res) => {
    try {
        // Recuperamos el CIF de la URL
        const { _CIF } = matchedData(req) 

        // Buscamos si el CIF (_CIF) proporcionado coincide con alguno en la BD
        const data = await comercioModel.findOne({ CIF:_CIF }) // Como en la BD el campo se llama CIF, indicamos que compare CIF con nuestra varible _CIF
        
        // Comprobamos si data es undefined
        if (!data) {
            return handleHttpError(res, 'ERROR_GET_ITEM: No se encontró ningún comercio con el CIF proporcionado', 404) // Indicamos un mensaje así como el código de error
        }

        // Envaimos data
        res.send({ data })
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM', 500)
    }
}

/*
  FUNCION
    createItem(req, res)
    Guardar un nuevo comercio.
    Parámetros:
      - req: Objeto de solicitud de Express
      - res: Objeto de respuesta de Express
    Return:
      - Envía los datos del nuevo comercio creado como respuesta si la operación es exitosa. Si el CIF o el correo ya existen, envía una respuesta de error con código 409. 
        En caso de error, envía una respuesta de error con código 500.
*/
const createItem = async (req, res) => {
    try {
        // Recuperamos la información que hay en el body
        const body = matchedData(req) 

        // Recuperamos el CIF y el correo del body
        const { CIF, correo } = matchedData(req) 
        
        // Buscamos si el CIF coincide con alguno en la BD
        const isCIF = await comercioModel.findOne({ CIF }) // En este caso el nombre del campo, CIF, coincide con el nombre de nuestra variable CIF, por lo que no es necesario { CIF:_CIF }

        // Buscamos si el correo coincide con alguno de la BD
        const isCorreo = await comercioModel.findOne({ correo }) 

        // Comprobamos si isCIF es true
        if (isCIF) {
            return handleHttpError(res, 'ERROR_CREATE_ITEM: El CIF proporcionado ya existe', 409) // Indicamos un mensaje así como el código de error
        }
        
        // Comprobamos si isCorreo es true
        if (isCorreo) {
            return handleHttpError(res, 'ERROR_CREATE_ITEM: El correo proporcionado ya existe', 409) // Indicamos un mensaje así como el código de error
        }

        // Creamos el comercio
        const data = await comercioModel.create(body)
       
        // Enviamos data
        res.send(data)
    } catch(err) {
        handleHttpError(res, 'ERROR_CREATE_ITEM', 500)
    }
}

/*
  FUNCION
    updateItem(req, res)
    Modificar un comercio existente por su CIF (como un PATCH).
    Parámetros:
      - req: Objeto de solicitud de Express
      - res: Objeto de respuesta de Express
    Return:
      - Envía los datos del comercio modificado como respuesta si la operación es exitosa. Si no se encuentra el comercio, envía una respuesta de error con código 404. 
        En caso de error, envía una respuesta de error con código 500.
*/
const updateItem = async (req, res) => {
    try {  
        // Recuperamos la información que hay en el body
        const body = matchedData(req) 

        // Recuperamos el CIF de la URL
        const { _CIF } = matchedData(req) 
        console.log(_CIF)
        
        // Buscamos si el CIF coincide con alguno en la BD
        const isCIF = await comercioModel.findOne({ CIF:_CIF })

        // Comprobomaos si isCIF es nulo
        if (!isCIF) {
            return handleHttpError(res, 'ERROR_UPDATE_ITEM: No se encontró ningún comercio con el CIF proporcionado', 404) // Indicamos un mensaje así como el código de error
        }

        // Actualizamos el comercio con findONEAndUpdate que sólo actualiza los campos que se han indicado
        const data = await comercioModel.findOneAndUpdate({ CIF:_CIF } , body)
        
        // Enviamos data
        res.send(data)

    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM', 500)
    }
}

/*
  FUNCION
    deleteItem(req, res)
    Borrar un comercio por su CIF, permitiendo elegir entre borrado lógico o físico.
    Parámetros:
      - req: Objeto de solicitud de Express
      - res: Objeto de respuesta de Express
    Return:
      - Envía los datos del comercio borrado como respuesta si la operación es exitosa. Si no se encuentra el comercio, envía una respuesta de error con código 404. 
        En caso de error, envía una respuesta de error con código 500.
*/
const deleteItem = async (req, res) => {
    
    try {
        // Recuperamos el CIF de la URL
        const { _CIF } = matchedData(req)

        // Verificamos si se ha solicitado que se haga un borrado lógico
        const { logicalDelete } = req.query
        
        // Inicializamos la variabla data
        let data
        
        // Buscamos si el CIF (_CIF) proporcionado coincide con alguno en la BD
        data = await comercioModel.findOne({ CIF:_CIF }) // Como en la BD el campo se llama CIF, indicamos que compare CIF con nuestra varible _CIF
        
        // Comprobamos si data es undefined
        if (!data) {
            return handleHttpError(res, 'ERROR_DELETE_ITEM: No se encontró ningún comercio con el CIF proporcionado', 404) // Indicamos un mensaje así como el código de error
        }

        // Si se ha solicitado un borrado lógico
        if (logicalDelete) {
            // Hacemos un softDelete, es decir en la BD lo marcamos como deleted
            data = await comercioModel.delete({ CIF: _CIF }) 
        } else {
            // En caso contrario hacemos un borrado físico
            data = await comercioModel.findOneAndDelete({ CIF: _CIF })
        }

        // Envaimos data
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_DELETE_ITEM', 500)
    } 
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }