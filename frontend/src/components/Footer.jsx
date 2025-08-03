import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="dark-content-container pad-large">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="heading-3">Morello Srl</h3>
            <p className="body-small">
              Specializzati in montaggi meccanici e piping per l'industria 
              metallurgica, chimica, oil & gas ed energia.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-primary" />
                <span className="body-small">Corso Europa 605, 10088 Volpiano (TO)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-primary" />
                <span className="body-small">+39 011 9881112</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-primary" />
                <span className="body-small">info@morello.it</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="heading-3">Servizi</h4>
            <ul className="space-y-2">
              <li><a href="#servizi" className="body-small hover:text-brand-primary transition-colors">Montaggi Meccanici</a></li>
              <li><a href="#servizi" className="body-small hover:text-brand-primary transition-colors">Manutenzione H24</a></li>
              <li><a href="#servizi" className="body-small hover:text-brand-primary transition-colors">Servizi Accessori</a></li>
              <li><a href="#servizi" className="body-small hover:text-brand-primary transition-colors">Officina</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="heading-3">Link Rapidi</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="body-small hover:text-brand-primary transition-colors">Home</a></li>
              <li><a href="#servizi" className="body-small hover:text-brand-primary transition-colors">Servizi</a></li>
              <li><a href="#azienda" className="body-small hover:text-brand-primary transition-colors">Azienda</a></li>
              <li><a href="#contatti" className="body-small hover:text-brand-primary transition-colors">Contatti</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="body-small text-gray-400">
              © 2024 Morello Srl. Tutti i diritti riservati.
            </p>
            <p className="body-small text-gray-400">
              Servizio di emergenza H24 disponibile
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;