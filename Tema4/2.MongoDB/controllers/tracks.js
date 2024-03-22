/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */

const { tracksModel } = require('../models') 
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError') 
 
const getItems = async (req, res) => {
    try {
        const data = await tracksModel.find({})
        res.send(data)
    } catch (err) {
        //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS', 403)
    }
}

const createItem = async (req, res) => {
    try {
        const body = matchedData(req) //El dato filtrado por el modelo (probar con body=req)
        const data = await tracksModel.create(body)
        res.send(data)
    } catch(err) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

const getItem =  async (req, res) => {
    const id  = req.params.id

    try {
        const data = await tracksModel.findById(id)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM')
    }
}

const updateItem = async (req, res) => {
    const { id } = req.params.id

    try {  
        const body = matchedData(req)
        const data = await tracksModel.findOneAndReplace(id, body)
        console.log(data)
        res.send(data)

    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM')

    }
}

const deleteItem = async (req, res) => {
    
    const id = req.params.id

    try {
        const { id } = matchedData(req)

        const data = await tracksModel.delete({ _id:id })
        
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_DELETE_ITEMS')
    } 
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }