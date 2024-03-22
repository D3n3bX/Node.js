import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Modal from './Modal'

/*
  FUNCION
    Login({apiRoute, routeDir, onLogin})
    Cualquier tipo de usuario ya sea admin, comercio o user se puede logar y autenticarse
    Parámetros:
      - apiRoute: ruta de la API que se encarga del login
      - routeDir: direccion a donde redirigira despues de loguearse
      - onLogin: callback que permite devolver variables, en este caso el id
    Return:
      - Formulario para iniciar sesión
*/
function Login({ apiRoute, routeDir, onLogin }) {

  const router = useRouter() // Creo un router que me permitirá redirigir al usuario a una página específica
  
  // Creo un estado credenctials para almacenar el username y passwotrd que se introduzca
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const [isLoading, setLoading] = useState(false) // Creo un estado isLoading para indicar si se esta iniciando sesión o se ha finalizado dicho proceso

  const [isErrorModalVisible, setErrorModalVisible] = useState(false) // Creo un estado isErrorModalVisible para indicar si el modal debe aparece o no
  

  /*
    FUNCION
      handleInputChange(e)
      Maneja el cambio en los campos de entrada del formulario de inicio de sesión
    Parámetros:
      - e: evento de cambio
    Return:
      - Actualiza el estado de las credenciales con los nuevos valores
*/
  function handleInputChange(e) {
    const { name, value } = e.target // Extraigo el nombre y el valor del campo de entrada que ha cambiado
    
    // Actualizo el estado de las credenciales utilizando el valor previo y el nuevo valor
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }))
  }

  /*
  FUNCION (asíncrona)
    handleLogin(e)
    Maneja el intento de inicio de sesión al enviar una solicitud a la API de inicio de sesión
  Parámetros:
    - e: evento de click en el botón de inicio de sesión
  Return:
    - Realiza una solicitud a la API, maneja la respuesta y redirige al usuario si el inicio de sesión es exitoso
*/
  async function handleLogin(e) {
    e.preventDefault()

    setLoading(true) // Setteo el estado de carga mientras se procesa la solicitud de inicio de sesión

    try {
      // Realizo una solicitud POST a la API de inicio de sesión con los credenciales
      const response = await fetch(apiRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials), // Paso los credenciales que se han introducido
      })

      const data = await response.json()

      setLoading(false) // Finalizo el estado de carga después de la solicitud
      
      if (response.ok) { // Los credenciales son correctos
        console.log('Login exitoso')
        console.log(data)
        onLogin(data.id)
        router.push(routeDir) // Redirijo al usuario a la página específica después de iniciar sesión
      } 
      else { // Los credenciales son inválidos
        console.error('Credenciales invalidas')
        setErrorModalVisible(true) // Muestro la ventana emergente para indicar que el usuario o la contraseña son incorrectos
      }
    } catch (error) {
      console.error('Error en la solicitud:', error) // Manejo errores de red u otros errores durante la solicitud
    }
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center p-6 bg-tertiary'>
      <div className='max-w-sm mx-auto p-6 bg-quaternary shadow-md rounded-md'>
        <h2 className='text-2xl font-semibold mb-4'>Iniciar Sesión</h2>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='username'>
            Nombre de usuario:
            <input
              type='text'
              id='username'
              name='username'
              value={credentials.username}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-primary-700 text-sm mb-2' htmlFor='password'>
            Contraseña:
            <input
              type='password'
              id='password'
              name='password'
              value={credentials.password}
              onChange={handleInputChange}
              className='mt-1 p-2 border rounded w-full bg-text'
            />
          </label>
        </div>
        <div className="flex justify-between">
          <Link href="../registerUser" className="align-start text-xs font-thin text-primary hover:underline">¿Aún no tienes una cuenta? Crear una cuenta</Link>
        </div>
        <button
          type='submit'
          onClick={handleLogin}
          disabled={isLoading}
          className='bg-tertiary text-white p-2 rounded hover:bg-secondary transition duration-300'
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>

        {isErrorModalVisible && (
          <Modal message={"Usuario o contraseña incorrectos. Inténtalo de nuevo"} onClose={() => setErrorModalVisible(false)} />
        )}
      </div>
    </div>
  )
}

export default Login
