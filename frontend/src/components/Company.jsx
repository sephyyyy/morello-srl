import React from 'react';
import { Award, Shield, Zap, Leaf } from 'lucide-react';

const Company = () => {
  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Esperienza Trentennale",
      description: "Oltre 30 anni di progetti completati con successo nei settori più esigenti dell'industria italiana."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Affidabilità Garantita",
      description: "Standard qualitativi elevati e certificazioni che garantiscono la massima sicurezza dei nostri interventi."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Velocità di Esecuzione",
      description: "Tempi di risposta rapidi e pianificazione efficiente per minimizzare i fermi produttivi."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sostenibilità Ambientale",
      description: "Impegnati nella tutela dell'ambiente con processi eco-sostenibili e tecnologie a basso impatto."
    }
  ];

  return (
    <section id="azienda" className="dark-container pad-xxlarge">
      <div className="dark-content-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="display-large">
                Chi Siamo
              </h2>
              
              <div className="space-y-4">
                <p className="body-large">
                  Morello Srl è un'azienda leader nel settore dei montaggi meccanici e piping, 
                  specializzata in soluzioni innovative per l'industria metallurgica, chimica, 
                  oil & gas ed energia.
                </p>
                
                <p className="body-medium">
                  La nostra esperienza trentennale ci ha permesso di sviluppare competenze 
                  specialistiche e di costruire rapporti di fiducia duraturi con i nostri clienti. 
                  Operiamo con la massima professionalità, garantendo qualità, sicurezza e 
                  rispetto dei tempi di consegna.
                </p>
              </div>
            </div>

            <button className="btn-primary">
              Scopri di Più
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-gray-900 p-6 border border-gray-800 space-y-4 dark-hover"
              >
                <div className="text-brand-primary">
                  {value.icon}
                </div>
                <h3 className="heading-3">{value.title}</h3>
                <p className="body-small">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;