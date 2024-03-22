'use client'
import React, { useState, useEffect } from 'react';

function CommerceInfoCard({ CIF }) {
    const [commerceData, setCommerceData] = useState(null);
    
    useEffect(() => {
        const fetchCommerceData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/comercios/${CIF}`, {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    setCommerceData(data); // Establecer los datos del comercio
                } else {
                    throw new Error('Error al obtener los datos del comercio');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCommerceData();
    }, [CIF]); // Se ejecutará cada vez que CIF cambie

    useEffect(() => {
        console.log('Los comercios commerceData son')
        console.log(commerceData); // Impresión de commerceData después de que se actualice
    }, [commerceData]); // Se ejecutará cada vez que commerceData cambie

    return (
        <div className='bg-gray-200 p-4 rounded-md'>
            {commerceData ? (
                <>
                    <h3 className='text-xl font-semibold mb-2'>{commerceData.nombre}</h3>
                    <p className='text-gray-600'>CIF: {commerceData.CIF}</p>
                    <p className='text-gray-600'>Dirección: {commerceData.direccion}</p>
                    <p className='text-gray-600'>Correo: {commerceData.correo}</p>
                    <p className='text-gray-600'>Teléfono: {commerceData.telefono}</p>
                </>
            ) : (
                <p>Cargando información del comercio...</p>
            )}
        </div>
    );
}

export default CommerceInfoCard;
