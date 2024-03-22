// CommonJS
// Forma clásica de imoprtar un módulo (esta casi en desuso)
const sum = require( './sum' )
// Para importarlo como un objeto en caso de exportarlo como tal
const { sum } = require( './sum' )

console.log(sum(1,2))