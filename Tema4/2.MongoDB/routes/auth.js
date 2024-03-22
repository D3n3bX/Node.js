const express = require('express')
const { matchedData } = require('express-validator')
const { encrypt, compare } = require('../utils/handdlePassword')
const {usersModel} = require('../models')
const router = express.Router()
const {validatorRegister, validatorLogin} = require('../validators/auth')
const { tokenSign, verifyToken } = require("../utils/handdleJwt")
const authMiddleware = require('../middleware/session')
const checkRol = require("../middleware/rol")

// Posteriormente, llevaremos la lógica al controller
router.post('/register', validatorRegister, async (req, res) => {
    req = matchedData(req)
    const password = await encrypt(req.password)
    const body = {...req, password} // Con '...' duplicamos el objeto y le añadimos o sobreescribimos una propiedad
    const dataUser = await usersModel.create(body)
    dataUser.set('password', undefined, { strict: false })
    
    const data = {
        token: await tokenSign(dataUser),
        user: dataUser
    }

    res.send(data)
})

router.post("/login", validatorLogin, async (req, res) => {
    try {
      // Extraer y validar los datos de la solicitud utilizando el middleware matchedData de express-validator
      const requestData = matchedData(req);
  
      // Buscar el usuario en la base de datos utilizando el correo electrónico proporcionado
      const user = await usersModel.findOne({ email: requestData.email });
  
      // Verificar si el usuario existe
      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
  
      // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
      const passwordMatch = await compare(requestData.password, user.password);
  
      // Verificar si las contraseñas coinciden
      if (!passwordMatch) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
  
      // Eliminar la contraseña del objeto de usuario antes de enviar la respuesta
      user.set('password', undefined, { strict: false });

      const data = {
        token: await tokenSign(user),
        user: user
      }

      // En este punto, la autenticación ha tenido éxito
      // Puedes generar y enviar un token de sesión, o simplemente enviar la información del usuario
      res.status(200).send(data);
    } catch (error) {
      // Manejar errores y responder con un mensaje de error
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  })

  router.patch("/:id", authMiddleware, checkRol(['admin']), async (req, res) => {
    const id = req.params.id
    try{
        const body = req.body
        const data = await usersModel.findOneAndUpdate({"_id": id}, body)                //FindeOneAndUpdate modifica solo los parametros existentes y findOneAndReplace se carga todo
        res.send(data)
    }catch(err){
        console.log(err)
        //Ya hay uno por defecto
        handleHttpError(res, 'ERROR_UPDATE_ITEM', 403)
    }
});

module.exports = router
