const express = require ('express')

const app = express()
app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.json({ message: 'Hola Mundo' })
})


const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})