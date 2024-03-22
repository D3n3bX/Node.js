const express = require('express')
const  infoCursos  = require('../datos/cursos')

const app = express()
const routerMatematicas = express.Router()
routerMatematicas.use(express.json())

// Ahora cuando usemos routerMatematicas estaá por defecto /cursos/matematicas
app.use('/cursos/matematicas ' , routerMatematicas)

routerMatematicas.get( '/' , (req,res) => {
    res.json(infoCursos.matematicas)
})

routerMatematicas.get('/:tema', (req, res) => {
    const { tema } = req.params
    const cursos = infoCursos.matematicas.filter(curso => curso.tema === tema)

    // Si encontramos los cursos
    if (cursos) {
        return res.json(cursos) // Los devolvemos
    }
    res.status(404).json({ message: 'Course not found'}) // Si no, indicamos que no ha sido encontrada
})

module.exports = routerMatematicas
