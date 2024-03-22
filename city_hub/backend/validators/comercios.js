// VALIDATOR -> comercio.js
/*
    El validator es un mecanismo utilizado para asegurar la integridad 
    y la calidad de los datos dentro de una aplicación, ayudando a prevenir errores 
    y garantizando que los datos sean consistentes y confiables.
*/
// ----------------------------------------------------------------------------

// Librerias
const { check } = require('express-validator')
// Módulos propios
const validateResults = require('../utils/handleValidator')

// Creamos un validador para crear un nuevo comercio
// Indicamos los campos que debe tener así como un mensaje explicando el error en caso de no cumplir con los requisitos
// Por ahora todos los campos que hay para crear un comercio son obligatorios
const validatorCreateItem = [
    check('nombre').exists().notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 3, max: 99 }).withMessage('El nombre debe tener entre 3 y 99 caracteres'),
    check('CIF').exists().notEmpty().withMessage('El CIF es obligatorio').isLength({ min: 9, max: 9 }).withMessage('El CIF debe tener 9 caracteres'),
    check('direccion').exists().notEmpty().withMessage('La dirección es obligatoria'),
    check('correo').exists().notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('El correo electrónico no es válido'),
    check('telefono').exists().notEmpty().withMessage('El teléfono es obligatorio').isNumeric().withMessage('El teléfono debe ser numérico').isLength({ min: 9, max: 9 }).withMessage('El teléfono debe tener 9 dígitos'),

    (req, res, next) => {
        return validateResults(req, res, next) // Mandamos los datos a validateResults y validamos los resultados, es importante pasar el next como parametro para que pueda pasar al siguiente middleware o acción
    }
]

// Creamos un validador para obtener un comercio a partir de su CIF
// Indicamos los campos que debe tener así como un mensaje explicando el error en caso de no cumplir con los requisitos
// En este caso el CIF esta puesto como _CIF ya que lo recogemos de la URL y no del body
const validatorGetItem = [
    check('_CIF').exists().notEmpty().isLength( {min: 9, max: 9}).withMessage('El CIF debe tener 9 caracteres'), // La longitud de un CIF es de 9
    
    (req, res, next) => {
        return validateResults(req, res, next) // Mandamos los datos a validateResults y validamos los resultados, es importante pasar el next como parametro para que pueda pasar al siguiente middleware o acción
    }
]

// Creamos un validador para modificar un comercio a partir de su CIF
// Indicamos los campos que debe tener y que estos pueden ser opcionales así como un mensaje explicando el error en caso de no cumplir con los requisitos
// En este caso el CIF esta puesto como _CIF ya que lo recogemos de la URL y no del body
const validatorModifyItem = [
    check('nombre').exists().optional().notEmpty().isLength({ min:3, max:99 }),
    check('_CIF').exists().notEmpty().isLength( {min: 9, max: 9}).withMessage('El CIF debe tener 9 caracteres'),
    check('direccion').exists().optional().notEmpty(),
    check('correo').exists().optional().notEmpty().isEmail().withMessage('El correo electrónico no es válido'),
    check('telefono').exists().optional().notEmpty().isNumeric().isLength( {min: 9, max: 9}), // Un número de teléfono esta compuesto por 9 números

    (req, res, next) => {
        return validateResults(req, res, next) // Mandamos los datos a validateResults y validamos los resultados, es importante pasar el next como parametro para que pueda pasar al siguiente middleware o acción
    }
]

module.exports = { validatorCreateItem, validatorGetItem, validatorModifyItem }