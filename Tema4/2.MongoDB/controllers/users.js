/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */

const { usersModel } = require('../models')  
               //no hace falta ../models/index.js ya que coge index por defecto
const getItems = async (req, res) => {
    const data = await usersModel.find({})                  //Llamada a la funcion find de mongoous
    res.send(data)
}

const createItem = async (req, res) => {
    const { body } = req
    
    //console.log(body)
    const data = await
    usersModel.create(body)                                 //Crea un usuario con el modelo de datos especificado
    res.send(data)
}

const getItem = (req, res) => {
    const data = "ok getItem"
    res.send({data})
}

const updateItem = (req, res) => {
    res.send("ok updateItem")
}

const deleteItem = (req, res) => {
    res.send("ok deleteItem")
}

const modifyItem = async (req, res) => {
    const { id } = req.params.id

    try {  
        const body = matchedData(req)
        const data = await usersModel.findOneAndUpdate(id, body)
        console.log(data)
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM')

    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, modifyItem }