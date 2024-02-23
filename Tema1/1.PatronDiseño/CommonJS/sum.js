function sum (a, b) {
    return a + b
}

// CommonJS
// Forma clásica de exportar un módulo (esta casi en desuso)
module.exports = sum
// También podemos exportarlo como un objeto
module.exports = {sum}