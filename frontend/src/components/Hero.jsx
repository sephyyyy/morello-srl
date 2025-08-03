import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="dark-container min-h-screen flex items-center">
      <div className="dark-content-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="display-huge">
                Montaggi Meccanici e Piping
                <span className="block text-brand-primary">di Precisione</span>
              </h1>
              
              <p className="body-large max-w-2xl">
                Da oltre 30 anni realizziamo montaggi meccanici e sistemi di piping 
                per l'industria metallurgica, chimica, oil & gas ed energia. 
                Affidabilità, velocità e sostenibilità ambientale sono i nostri pilastri.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary group">
                Scopri i Nostri Servizi
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="btn-secondary">
                Contattaci Ora
              </button>
            </div>

            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-primary" />
                <span className="body-medium">30+ Anni di Esperienza</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-primary" />
                <span className="body-medium">Servizio H24</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-primary" />
                <span className="body-medium">Sostenibilità Ambientale</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-brand-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl font-bold text-black">30+</span>
                </div>
                <p className="heading-3">Anni di Esperienza</p>
                <p className="body-medium text-gray-400">
                  Nel settore dei montaggi industriali
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;