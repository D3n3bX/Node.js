const z = require('zod')

// Creamos el esquema del programmeCourse para poder validar los datos
const programmeCourseSchema = z.object({
    titulo: z.string({
        invalid_type_error: 'programmeCourse title must be a string',
        rerquired_error: 'programmeCourse title is required'
    }),
    lenguaje: z.string({
        invalid_type_error: 'Programm lenguaje must be a string',
        rerquired_error: 'Programm lenguaje is required'
    }),
    vistas: z.number().int().positive(),
    nivel: z.string({
        invalid_type_error: 'Level must be a string',
        rerquired_error: 'Level is required'
    }),
})

// Validamos la programmeCourse
function validateProgrammeCourse (object) {
    return programmeCourseSchema.safeParse(object)
}

// Validamos algunos campos de la programmeCourse
function validatePartialProgrammeCourse (object) {
    return programmeCourseSchema.partial().safeParse(object)
}

module.exports = { validateProgrammeCourse, validatePartialProgrammeCourse }