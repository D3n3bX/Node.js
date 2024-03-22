const multer = require("multer")

const storage = multer.diskStorage({
    destination:__dirname + "/../storage",
    filename:function(req, file, callback){ //Sobreescribimos o renombramos
        //Tienen extensión jpg, pdf, mp4
        const ext = file.originalname.split(".").pop() //el último valor
        const filename = "file-" + Date.now() + "." + ext
        callback(null, filename)
    }
})

const uploadMiddleware = multer({storage}) //Middleware entre la ruta y el controlador

module.exports = uploadMiddleware