import React from 'react';
import { Wrench, Cog, Building, Phone } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Building className="w-8 h-8" />,
      title: "Montaggi",
      description: "Specializzati in montaggi meccanici e piping in diversi settori, tra cui l'industria metallurgica, chimica, oil & gas, e l'energia.",
      features: ["Montaggi Meccanici", "Sistemi di Piping", "Installazioni Industriali"]
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Manutenzione",
      description: "Garantiamo la manutenzione ordinaria e straordinaria degli impianti, offrendo una risposta immediata alle chiamate di intervento h24.",
      features: ["Manutenzione Ordinaria", "Manutenzione Straordinaria", "Interventi H24"]
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Servizi Accessori",
      description: "Possiamo fornire soluzioni per sollevamenti necessari, controlli NDT, allineamento con tecnologia laser tracker e flussaggi delle tubazioni.",
      features: ["Controlli NDT", "Laser Tracker", "Flussaggi Tubazioni"]
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Officina",
      description: "Le officine sono attrezzate con macchine e strumenti per lavorazioni meccaniche e prefabbricazione di tubazioni e mezzi per il sollevamento.",
      features: ["Lavorazioni Meccaniche", "Prefabbricazione", "Attrezzature Sollevamento"]
    }
  ];

  return (
    <section id="servizi" className="dark-container pad-xxlarge">
      <div className="dark-content-container">
        <div className="text-center space-y-6 mb-16">
          <h2 className="display-large">I Nostri Servizi</h2>
          <p className="body-large max-w-3xl mx-auto">
            Offriamo soluzioni complete per tutti i vostri progetti industriali, 
            garantendo qualità, precisione e rispetto dell'ambiente.
          </p>
        </div>

        <div className="dark-grid">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-900 p-8 border border-gray-800 dark-hover group cursor-pointer"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-brand-primary">
                    {service.icon}
                  </div>
                  <h3 className="heading-2">{service.title}</h3>
                </div>
                
                <p className="body-medium">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                      <span className="body-small">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;