'use client'
import React, { useState, useEffect } from 'react';
import SearchCommerce from '@/components/CommerceSearch';
import CommerceInfoCard from '@/components/CommerceInfoCard'; // Importa el componente CommerceInfoCard


export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [routeDir, setRouteDir] = useState('');
  const [uniqueCIFs, setUniqueCIFs] = useState(new Set());

  function handleLogin() {
    setLoggedIn(true);
  }

  useEffect(() => {
    // Simulación de obtención de CIFs de algún lugar, como una solicitud fetch inicial
    const cifs = ['A98765432', 'B12345679', 'A18765432'];
    setUniqueCIFs(new Set(cifs));
  }, []);

  return (
    <div className='bg-quaternary min-h-screen flex flex-col justify-between'>
      <section id='banner' className='bg-secondary text-white text-center py-16'>
        <h1 className='text-4xl font-bold mb-4'>Bienvenido a CityHub</h1>
        <p className='text-lg'>Encuentra y promociona comercios locales</p>
      </section>

      <section id='busqueda-comercios' className='text-center py-8'>
        <SearchCommerce />
      </section>

      <section id='comercios-destacados' className='text-center py-8 bg-tertiary text-text'>
        <h2 className='text-2xl font-bold mb-4'>Comercios Destacados de la Semana</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Renderiza el componente CommerceInfoCard para cada CIF único */}
          {[...uniqueCIFs].map(cif => (
            <CommerceInfoCard key={cif} CIF={cif} />
          ))}
        </div>
      </section>
    </div>
  );
}
