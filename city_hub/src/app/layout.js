import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CityHub',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <NavBar />  
        </header>

        {children}
        
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
