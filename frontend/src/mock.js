// Mock data for Morello Srl website
// This file contains all the mock data used in the frontend components
// It will be replaced with real backend integration later

export const companyInfo = {
  name: "Morello Srl",
  description: "Specializzati in montaggi meccanici e piping per l'industria metallurgica, chimica, oil & gas ed energia.",
  experience: "30+",
  established: "1994",
  contact: {
    address: {
      street: "Corso Europa 605",
      city: "10088 Volpiano (TO)",
      country: "Italia"
    },
    phone: "+39 011 9881112",
    email: "info@morello.it",
    emergencyService: "H24"
  }
};

export const services = [
  {
    id: 1,
    title: "Montaggi",
    description: "Specializzati in montaggi meccanici e piping in diversi settori, tra cui l'industria metallurgica, chimica, oil & gas, e l'energia.",
    features: ["Montaggi Meccanici", "Sistemi di Piping", "Installazioni Industriali"],
    sectors: ["Industria Metallurgica", "Industria Chimica", "Oil & Gas", "Energia"]
  },
  {
    id: 2,
    title: "Manutenzione",
    description: "Garantiamo la manutenzione ordinaria e straordinaria degli impianti, offrendo una risposta immediata alle chiamate di intervento h24.",
    features: ["Manutenzione Ordinaria", "Manutenzione Straordinaria", "Interventi H24"],
    availability: "24/7"
  },
  {
    id: 3,
    title: "Servizi Accessori",
    description: "Possiamo fornire soluzioni per sollevamenti necessari, controlli NDT, allineamento con tecnologia laser tracker e flussaggi delle tubazioni.",
    features: ["Controlli NDT", "Laser Tracker", "Flussaggi Tubazioni"],
    technologies: ["Laser Tracker", "NDT", "Sollevamenti Specializzati"]
  },
  {
    id: 4,
    title: "Officina",
    description: "Le officine sono attrezzate con macchine e strumenti per lavorazioni meccaniche e prefabbricazione di tubazioni e mezzi per il sollevamento.",
    features: ["Lavorazioni Meccaniche", "Prefabbricazione", "Attrezzature Sollevamento"],
    equipment: ["Macchine CNC", "Mezzi di Sollevamento", "Strumenti di Precisione"]
  }
];

export const companyValues = [
  {
    id: 1,
    title: "Esperienza Trentennale",
    description: "Oltre 30 anni di progetti completati con successo nei settori più esigenti dell'industria italiana.",
    icon: "award"
  },
  {
    id: 2,
    title: "Affidabilità Garantita",
    description: "Standard qualitativi elevati e certificazioni che garantiscono la massima sicurezza dei nostri interventi.",
    icon: "shield"
  },
  {
    id: 3,
    title: "Velocità di Esecuzione",
    description: "Tempi di risposta rapidi e pianificazione efficiente per minimizzare i fermi produttivi.",
    icon: "zap"
  },
  {
    id: 4,
    title: "Sostenibilità Ambientale",
    description: "Impegnati nella tutela dell'ambiente con processi eco-sostenibili e tecnologie a basso impatto.",
    icon: "leaf"
  }
];

export const mockContactSubmissions = [];

export const submitContactForm = (formData) => {
  // Mock function to simulate form submission
  const submission = {
    id: Date.now(),
    ...formData,
    timestamp: new Date().toISOString(),
    status: 'pending'
  };
  
  mockContactSubmissions.push(submission);
  
  // Simulate async operation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Grazie per il tuo messaggio! Ti contatteremo presto.',
        submissionId: submission.id
      });
    }, 1000);
  });
};