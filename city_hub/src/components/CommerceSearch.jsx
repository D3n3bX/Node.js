'use client'
import React, { useState } from 'react'
import Modal from './Modal' // Asegúrate de importar correctamente el componente Modal

/*
  FUNCION
    SearchCommerce({ apiRoute, routeDir })
    Componente de búsqueda de comercios que permite buscar un comercio por su CIF
    Parámetros:
      - apiRoute: Ruta de la API utilizada para realizar la búsqueda del comercio
      - routeDir: Dirección a la que se redirigirá después de realizar la búsqueda
    Return:
      - Formulario de búsqueda de comercios por CIF y resultados de búsqueda mostrados en pantalla
*/
function SearchCommerce({ apiRoute, routeDir }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:3001/api/comercios/${searchTerm}`, {
        method: 'GET',
      })
      const data = await response.json()
      
      if (response.ok) {
        setSearchResult(data.data || null)
        setShowModal(false) // Ocultar el modal si la búsqueda es exitosa
      } else {
        setModalMessage('El CIF no es válido') // Establecer el mensaje del modal con el mensaje de error
        setShowModal(true) // Mostrar el modal
        setSearchResult(null) // Reiniciar el resultado de búsqueda
      }

    } catch (error) {
      console.error('Error al realizar la búsqueda:', error)
    }
  }

  return (
    <div className='flex justify-center items-center p-6 bg-tertiary'>
      <div className='max-w-sm p-6 bg-quaternary shadow-md rounded-md'>
        <h2 className="text-2xl font-semibold mb-4">Buscador</h2>
        <form onSubmit={handleSearch} className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Buscar por CIF"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white rounded-r-md py-2 px-4 ml-2 hover:bg-primary-dark transition duration-300"
          >
            Buscar
          </button>
        </form>

        {searchResult && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">{searchResult.nombre}</h2>
            <p className="text-gray-600">CIF: {searchResult.CIF}</p>
            <p className="text-gray-600">Dirección: {searchResult.direccion}</p>
            <p className="text-gray-600">Correo: {searchResult.correo}</p>
            <p className="text-gray-600">Teléfono: {searchResult.telefono}</p>
          </div>
        )}

        {!searchResult && searchTerm && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Sin resultados</h2>
          </div>
        )}

        {/* Mostrar el modal si showModal es true */}
        {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
      </div>
    </div>
  )
}

export default SearchCommerce
