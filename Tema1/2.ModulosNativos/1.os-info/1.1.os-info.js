// Para importa módulos nativos es recomedable requerirlo con node:
const os = require( 'node:os' )

console.log('Información del SO')
console.log('Nombre del SO: ', os.platform())
console.log('Versión del SO: ', os.release())
console.log('Arquitectura: ', os.arch())
console.log('CPUs: ', os.cpus()) // Con esto podemos escalar procesos en Node
console.log('Memoria libre: ', os.freemem()  / 1024 / 1024, 'MB')
console.log('Memoria total: ', os.totalmem() / 1024 / 1024 , ' MB')
console.log('Uptime: ', os.uptime() / 60 / 60, 'horas')