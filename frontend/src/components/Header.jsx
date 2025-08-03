import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="dark-header">
      <div className="flex items-center justify-between w-full">
        <div className="dark-logo-container">
          <h1 className="text-2xl font-bold text-white">Morello Srl</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="dark-nav hidden md:flex">
          <a href="#home" className="dark-nav-link">Home</a>
          <a href="#servizi" className="dark-nav-link">Servizi</a>
          <a href="#azienda" className="dark-nav-link">Azienda</a>
          <a href="#contatti" className="dark-nav-link">Contatti</a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-black border-t border-gray-800">
          <div className="flex flex-col py-4">
            <a href="#home" className="dark-nav-link px-8 py-3">Home</a>
            <a href="#servizi" className="dark-nav-link px-8 py-3">Servizi</a>
            <a href="#azienda" className="dark-nav-link px-8 py-3">Azienda</a>
            <a href="#contatti" className="dark-nav-link px-8 py-3">Contatti</a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;