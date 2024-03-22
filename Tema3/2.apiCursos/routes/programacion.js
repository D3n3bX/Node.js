const express = require('express')
const crypto = require('node:crypto')
const { validateProgrammeCourse, validatePartialProgrammeCourse } = require ('../schemas/programmeCourse')
const  infoCursos  = require('../datos/cursos')

const app = express()
const routerProgramacion = express.Router()
routerProgramacion.use(express.json())

// Ahora cuando usemos routerProgramacion estaá por defecto /cursos/programacion
app.use('/cursos/programacion' , routerProgramacion)


// Petiticiónn GET a la url /cursos/programcion
routerProgramacion.get( '/', (req, res) => {
    
    res.json(infoCursos.programacion)

    if (req.query.ordenar === 'vistas') {
        //Orden DESC, si lo queremos ASC, sería (a.vistas, b.vistas)
        res.send(JSON.stringify(data.sort((a, b) => b.vistas - a.vistas )));
    } else {
        res.send(JSON.stringify(data))
    }
})

// Petición GET a la url /cursos/programacon/:lenguaje
routerProgramacion.get('/:lenguaje', (req, res) => {
    const { lenguaje } = req.params // Recuperamos el lenguaje del parámetro de la url
    const cursos = infoCursos.programacion.filter(curso => curso.lenguaje == lenguaje) // Filtramos los cursos de programación por el lenguaje
    
    // Si encontramos los cursos
    if (cursos) {
        return res.json(cursos) // Los devolvemos
    }
    res.status(404).json({ message: 'Course not found'}) // Si no, indicamos que no ha sido encontrada
})

// Petición GET a la url /cursos/programacion/:lenguage/:nivel
routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const { lenguaje, nivel } = req.params // Recuperamos el lenguaje y nivel del parámetro de la url
    const cursos = infoCursos.programacion.filter(curso => curso.lenguaje == lenguaje && curso.nivel == nivel) // Filtramos los cursos de programación por el lenguaje y nivel
    
    // Si encontramos los cursos
    if (cursos) {
        return res.json(cursos) // Los devolvemos
    }
    res.status(404).json({ message: 'Course not found'}) // Si no, indicamos que no ha sido encontrada
})

// Petición POST a la url /cursos/programacion
routerProgramacion.post( "/", (req,res)=> {
    const result = validateProgrammeCourse(req.body) // Guardamos el course validado

    // Si ha habido algún error en la validación
    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) }) // Lo indicamos
    }

    const newCourse = {
        id: crypto.randomUUID(), // Generamos un ID único para newCourse
        ...result.data // Pasamos a newCourse los datos validados
    }

    infoCursos.programacion.push(newCourse) // Esto no es REST
    res.status(201).json(newCourse)
})

// Petición PUT a la url /cursos/programcion/:id
routerProgramacion.put("/:id", (req, res) =>{
    const { id } = req.params
    const programmeCourseIndex = infoCursos.programacion.findIndex(course => course.id === id) 
    const result = validatePartialProgrammeCourse(req.body) // Guardamos el course validado

    // Si ha habido algún error en la validación
    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) }) // Lo indicamos
    }

    // Si no se ha encontrado
    if (programmeCourseIndex == -1) {
        return res.status(404).json({ message: 'Course not found' }) // lo indicamos
    }

    const updateCourse = {
        ...result.data
    }

    return res.json(updateCourse)
})

module.exports = routerProgramacion
