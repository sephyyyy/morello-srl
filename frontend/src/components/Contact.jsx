import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Integrate with backend
    alert('Grazie per il tuo messaggio! Ti contatteremo presto.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Indirizzo",
      details: ["Corso Europa 605", "10088 Volpiano (TO)"]
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefono",
      details: ["+39 011 9881112"]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@morello.it"]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Orari",
      details: ["Lun-Ven: 8:00-18:00", "Emergenze: H24"]
    }
  ];

  return (
    <section id="contatti" className="dark-container pad-xxlarge">
      <div className="dark-content-container">
        <div className="text-center space-y-6 mb-16">
          <h2 className="display-large">Contattaci</h2>
          <p className="body-large max-w-3xl mx-auto">
            Siamo pronti ad ascoltare le tue esigenze e fornire soluzioni personalizzate 
            per i tuoi progetti industriali.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="bg-gray-900 p-6 border border-gray-800 space-y-4"
                >
                  <div className="text-brand-primary">
                    {info.icon}
                  </div>
                  <h3 className="heading-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="body-small">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 p-8 border border-gray-800">
              <h3 className="heading-2 mb-4">Servizio di Emergenza H24</h3>
              <p className="body-medium mb-6">
                Garantiamo interventi di manutenzione straordinaria 24 ore su 24, 
                7 giorni su 7, per supportare la continuità produttiva dei nostri clienti.
              </p>
              <button className="btn-primary">
                <Phone className="w-5 h-5" />
                Chiamata di Emergenza
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-8 border border-gray-800">
            <h3 className="heading-2 mb-6">Richiedi un Preventivo</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block body-small mb-2">Nome *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-black border border-gray-700 text-white focus:border-brand-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block body-small mb-2">Telefono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-black border border-gray-700 text-white focus:border-brand-primary focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block body-small mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-black border border-gray-700 text-white focus:border-brand-primary focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block body-small mb-2">Messaggio *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full p-3 bg-black border border-gray-700 text-white focus:border-brand-primary focus:outline-none resize-vertical"
                  placeholder="Descrivi il tuo progetto o le tue esigenze..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary w-full group">
                <Send className="w-5 h-5" />
                Invia Richiesta
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;