import { newCategories } from './newCategoryTranslations';

// translations.js
// Complete English and Spanish translations

export const translations = {
  en: {
    // Header
    title: "ER or Urgent Care?",
    subtitle: "Get instant AI-powered guidance on where to seek medical care",
    savingsText: "Save thousands by making the right choice",
    
    // Input Section
    inputLabel: "What symptoms are you experiencing?",
    inputPlaceholder: "Example: I have severe chest pain that radiates to my left arm, shortness of breath, and I'm sweating...",
    inputHelper: "Be as detailed as possible. Include when symptoms started, severity, and any other relevant information.",
    analyzeButton: "Analyze My Symptoms",
    
    // Emergency Warning
    emergencyTitle: "🚨 CALL 911 IMMEDIATELY IF YOU HAVE:",
    emergencyItems: [
      "Chest pain or pressure (especially with arm/jaw pain)",
      "Difficulty breathing or can't catch your breath",
      "Stroke symptoms (face drooping, arm weakness, slurred speech)",
      "Loss of consciousness or severe confusion",
      "Severe bleeding that won't stop",
      "Suspected poisoning or overdose",
      "Severe allergic reaction (throat swelling, can't breathe)"
    ],
    emergencyWarning: "⚠️ DO NOT USE THIS TOOL - CALL 911 NOW",
    
    // 911 Emergency Alert
    emergencyAlert: {
      title: "🚨 MEDICAL EMERGENCY 🚨",
      callButton: "📞 CALL 911 NOW",
      doNotDrive: "⚠️ DO NOT DRIVE YOURSELF",
      stopUsing: "🛑 STOP USING THIS TOOL",
      onlyAction: "Your ONLY action should be calling 911",
      whileWaiting: "While waiting for 911:",
      cardiac: {
        title: "CARDIAC EMERGENCY",
        instruction1: "• Sit down and stay calm",
        instruction2: "• Chew 1 aspirin (325mg) if not allergic",
        instruction3: "• Loosen tight clothing",
        instruction4: "• Do NOT drive yourself to hospital"
      },
      stroke: {
        title: "STROKE EMERGENCY",
        instruction1: "• Note the time symptoms started (critical for treatment)",
        instruction2: "• Sit or lie down",
        instruction3: "• Do NOT give food, drinks, or medication",
        instruction4: "• Stay with the person"
      },
      breathing: {
        title: "BREATHING EMERGENCY",
        instruction1: "• Sit upright",
        instruction2: "• Loosen tight clothing",
        instruction3: "• Use prescribed inhaler if available",
        instruction4: "• Stay calm, slow breathing if possible"
      },
      bleeding: {
        title: "SEVERE BLEEDING",
        instruction1: "• Apply direct pressure to wound",
        instruction2: "• Do NOT remove embedded objects",
        instruction3: "• Elevate injured area above heart if possible",
        instruction4: "• Do NOT remove bandage once applied"
      }
    },
    
    // Follow-Up Questions
    followUp: {
      title: "Let's get more details",
      subtitle: "These questions will help provide a more accurate recommendation",
      progress: "Question",
      of: "of",
      required: "Required question",
      nextButton: "Next Question",
      previousButton: "Previous",
      startOverButton: "Start Over",
      getRecommendationButton: "Get Recommendation",
      selectAll: "Select all that apply",
      
      // Question types and labels
      labels: {
        location: "Pain Location",
        severity: "Pain Severity (1-10)",
        rebound: "Rebound Tenderness",
        associated: "Associated Symptoms",
        duration: "Duration",
        onset: "Onset",
        type: "Type",
        triggers: "Triggers",
        radiates: "Radiates To",
        temperature: "Temperature",
        recent: "Recent Events",
        breathing: 'Breathing Difficulty',
  fatigue: 'Fatigue Level',
  nausea: 'Nausea/Vomiting',
  skin: 'Skin Condition',
  joint: 'Joint/Muscle Pain',
  urinary: 'Urinary Symptoms',
  anxiety: 'Anxiety/Mood',
  sleep: 'Sleep Issues',
  temperatureSymptom: 'Temperature Regulation',
  numbness: 'Tingling/Numbness',
  weight: 'Weight Changes',
  nonspecific: 'General Symptoms',
  vomiting: 'Vomiting Status',
  content: 'Vomit Appearance',
  activities: 'Activity Impact',
  mobility: 'Joint Mobility',
  pain_location: 'Pain Location',
  history: 'Medical History',
  problem: 'Sleep Problem',
  symptom: 'Temperature Symptom',
  timing: 'Timing',
  amount: 'Amount',
  appetite: 'Appetite',
  impact: 'Impact on Daily Life',
  physical: 'Physical Symptoms',
  habits: 'Sleep Habits'
      },
      
      // Abdominal questions
      abdominal: {
        location: {
          question: "Where exactly is the pain?",
          options: [
            "Upper right (below ribs)",
            "Upper left (below ribs)",
            "Lower right",
            "Lower left",
            "Center/around belly button",
            "All over"
          ]
        },
        severity: {
          question: "How severe is the pain?",
          min: "Mild",
          max: "Worst pain ever"
        },
        rebound: {
          question: "Does it hurt MORE when you press down and then quickly release?",
          options: ["Yes", "No", "Not sure"]
        },
        associated: {
          question: "Do you have any of these?",
          options: [
            "Fever/chills",
            "Nausea or vomiting",
            "Diarrhea",
            "Constipation",
            "Blood in stool",
            "Unable to pass gas",
            "None of these"
          ]
        },
        duration: {
          question: "When did the pain start?",
          options: [
            "Within last hour",
            "1-6 hours ago",
            "6-24 hours ago",
            "1-2 days ago",
            "More than 2 days ago"
          ]
        }
      },
      
      // Headache questions
      headache: {
        severity: {
          question: "How severe is the headache?",
          min: "Mild",
          max: "Worst headache ever"
        },
        onset: {
          question: "How did it start?",
          options: [
            "Sudden/thunderclap (worst headache of life)",
            "Gradual over hours",
            "Gradual over days",
            "Woke up with it"
          ]
        },
        location: {
          question: "Where is the pain?",
          options: [
            "One side of head",
            "Both sides",
            "Front/forehead",
            "Back of head/neck",
            "Behind eyes",
            "All over"
          ]
        },
        associated: {
          question: "Do you have any of these?",
          options: [
            "Vision changes",
            "Nausea/vomiting",
            "Sensitivity to light",
            "Fever",
            "Stiff neck",
            "Confusion",
            "None of these"
          ]
        },
        duration: {
          question: "How long have you had it?",
          options: [
            "Less than 1 hour",
            "1-6 hours",
            "6-24 hours",
            "More than 1 day"
          ]
        }
      },
      ...newCategories.en
    },
    
    // Analyzing
    analyzing: "Analyzing your symptoms...",
    analyzingSubtext: "Our AI is reviewing your information",
    
    // Results
    results: {
      recommendation: "Recommendation:",
      severity: "Severity:",
      timeframe: "Timeframe:",
      warningSignsTitle: "Warning Signs Identified:",
      whatToExpect: "What to Expect:",
      importantNote: "Important Note:",
      newAnalysisButton: "Analyze Different Symptoms",
      
      // Cost labels
      emergencyRoom: "Emergency Room",
      urgentCare: "Urgent Care",
      homeCare: "Home Care",
      averageCost: "Average cost",
      otcTelehealth: "OTC/Telehealth",
      
      // CTA Buttons
      talkToDoctor: "Talk to a Doctor Now ($0 with insurance)",
      findFacility: "Find Nearest Facility",
      
      // Amazon Products
      productsTitle: "Recommended Health & Safety Products",
      productsSubtitle: "Be prepared for emergencies with these essential health monitoring and first aid supplies:",
      viewOnAmazon: "View on Amazon →",
      disclosure: "Disclosure: As an Amazon Associate, we earn from qualifying purchases. These recommendations help support our free medical guidance tool.",
      
      firstAidKit: {
        title: "First Aid Kit",
        subtitle: "OSHA-Compliant • 260 Pieces",
        description: "Complete emergency kit for home, car, and workplace. Be prepared for minor injuries and emergencies.",
        badge: "#1 Best Seller"
      },
      thermometer: {
        title: "Digital Thermometer",
        subtitle: "No-Touch • Forehead & Object",
        description: "Accurate fever detection for adults and kids. No-contact technology with fever alarm and silent mode.",
        badge: "Essential for Fevers"
      },
      bloodPressure: {
        title: "Blood Pressure Monitor",
        subtitle: "OMRON • #1 Doctor Recommended",
        description: "Clinically validated home monitor. Easy-to-use upper arm cuff for accurate BP readings.",
        badge: "Clinically Validated"
      }
    },
    
    // Disclaimer
    disclaimer: {
      title: "Medical Disclaimer:",
      text: "This tool provides general guidance only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. If you think you may have a medical emergency, call 911 immediately."
    },
    
    // Stats
    stats: {
      savings: "$2,345",
      savingsText: "Average amount saved by choosing Urgent Care over ER for non-emergencies",
      erVisits: "127M",
      erVisitsText: "Annual ER visits in US",
      treatable: "30%",
      treatableText: "Could be treated at Urgent Care",
      copay: "$1.5K",
      copayText: "Avg ER copay"
    },
    
    // Footer
    footer: {
      aboutUs: "About Us",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      affiliate: "Affiliate Disclosure",
      copyright: "© 2024 ER vs Urgent Care Tool. Not affiliated with any medical facility.",
      note: "This tool provides general information only and is not a substitute for professional medical advice."
    }
  },
  
  es: {
    // Header
    title: "¿Sala de Emergencias o Atención Urgente?",
    subtitle: "Obtenga orientación instantánea con IA sobre dónde buscar atención médica",
    savingsText: "Ahorre miles eligiendo la opción correcta",
    
    // Input Section
    inputLabel: "¿Qué síntomas está experimentando?",
    inputPlaceholder: "Ejemplo: Tengo dolor severo en el pecho que se extiende a mi brazo izquierdo, dificultad para respirar y estoy sudando...",
    inputHelper: "Sea lo más detallado posible. Incluya cuándo comenzaron los síntomas, la gravedad y cualquier otra información relevante.",
    analyzeButton: "Analizar Mis Síntomas",
    
    // Emergency Warning
    emergencyTitle: "🚨 LLAME AL 911 INMEDIATAMENTE SI TIENE:",
    emergencyItems: [
      "Dolor o presión en el pecho (especialmente con dolor en brazo/mandíbula)",
      "Dificultad para respirar o no puede recuperar el aliento",
      "Síntomas de derrame cerebral (cara caída, debilidad del brazo, dificultad al hablar)",
      "Pérdida de conocimiento o confusión severa",
      "Sangrado severo que no se detiene",
      "Sospecha de envenenamiento o sobredosis",
      "Reacción alérgica severa (hinchazón de garganta, no puede respirar)"
    ],
    emergencyWarning: "⚠️ NO USE ESTA HERRAMIENTA - LLAME AL 911 AHORA",
    
    // 911 Emergency Alert
    emergencyAlert: {
      title: "🚨 EMERGENCIA MÉDICA 🚨",
      callButton: "📞 LLAME AL 911 AHORA",
      doNotDrive: "⚠️ NO CONDUZCA USTED MISMO",
      stopUsing: "🛑 DEJE DE USAR ESTA HERRAMIENTA",
      onlyAction: "Su ÚNICA acción debe ser llamar al 911",
      whileWaiting: "Mientras espera al 911:",
      cardiac: {
        title: "EMERGENCIA CARDÍACA",
        instruction1: "• Siéntese y mantenga la calma",
        instruction2: "• Mastique 1 aspirina (325mg) si no es alérgico",
        instruction3: "• Afloje la ropa ajustada",
        instruction4: "• NO conduzca al hospital"
      },
      stroke: {
        title: "EMERGENCIA DE DERRAME CEREBRAL",
        instruction1: "• Anote la hora en que comenzaron los síntomas (crítico para el tratamiento)",
        instruction2: "• Siéntese o acuéstese",
        instruction3: "• NO dé comida, bebidas o medicamentos",
        instruction4: "• Permanezca con la persona"
      },
      breathing: {
        title: "EMERGENCIA RESPIRATORIA",
        instruction1: "• Siéntese erguido",
        instruction2: "• Afloje la ropa ajustada",
        instruction3: "• Use el inhalador recetado si está disponible",
        instruction4: "• Mantenga la calma, respire lentamente si es posible"
      },
      bleeding: {
        title: "SANGRADO SEVERO",
        instruction1: "• Aplique presión directa sobre la herida",
        instruction2: "• NO retire objetos incrustados",
        instruction3: "• Eleve el área lesionada por encima del corazón si es posible",
        instruction4: "• NO retire el vendaje una vez aplicado"
      }
    },
    
    // Follow-Up Questions
    followUp: {
      title: "Obtengamos más detalles",
      subtitle: "Estas preguntas ayudarán a proporcionar una recomendación más precisa",
      progress: "Pregunta",
      of: "de",
      required: "Pregunta requerida",
      nextButton: "Siguiente Pregunta",
      previousButton: "Anterior",
      startOverButton: "Empezar de Nuevo",
      getRecommendationButton: "Obtener Recomendación",
      selectAll: "Seleccione todas las que correspondan",
      
      labels: {
        location: "Ubicación del Dolor",
        severity: "Gravedad del Dolor (1-10)",
        rebound: "Sensibilidad de Rebote",
        associated: "Síntomas Asociados",
        duration: "Duración",
        onset: "Inicio",
        type: "Tipo",
        triggers: "Desencadenantes",
        radiates: "Se Irradia Hacia",
        temperature: "Temperatura",
        recent: "Eventos Recientes",
        breathing: 'Dificultad Respiratoria',
  fatigue: 'Nivel de Fatiga',
  nausea: 'Náusea/Vómito',
  skin: 'Condición de la Piel',
  joint: 'Dolor Articular/Muscular',
  urinary: 'Síntomas Urinarios',
  anxiety: 'Ansiedad/Estado de Ánimo',
  sleep: 'Problemas de Sueño',
  temperatureSymptom: 'Regulación de Temperatura',
  numbness: 'Hormigueo/Entumecimiento',
  weight: 'Cambios de Peso',
  nonspecific: 'Síntomas Generales',
  vomiting: 'Estado de Vómito',
  content: 'Apariencia del Vómito',
  activities: 'Impacto en Actividades',
  mobility: 'Movilidad Articular',
  pain_location: 'Ubicación del Dolor',
  history: 'Historial Médico',
  problem: 'Problema de Sueño',
  symptom: 'Síntoma de Temperatura',
  timing: 'Momento',
  amount: 'Cantidad',
  appetite: 'Apetito',
  impact: 'Impacto en la Vida Diaria',
  physical: 'Síntomas Físicos',
  habits: 'Hábitos de Sueño'
      },
      
      abdominal: {
        location: {
          question: "¿Dónde exactamente está el dolor?",
          options: [
            "Superior derecha (debajo de las costillas)",
            "Superior izquierda (debajo de las costillas)",
            "Inferior derecha",
            "Inferior izquierda",
            "Centro/alrededor del ombligo",
            "Por todas partes"
          ]
        },
        severity: {
          question: "¿Qué tan severo es el dolor?",
          min: "Leve",
          max: "Peor dolor de la vida"
        },
        rebound: {
          question: "¿Duele MÁS cuando presiona y luego suelta rápidamente?",
          options: ["Sí", "No", "No estoy seguro"]
        },
        associated: {
          question: "¿Tiene alguno de estos?",
          options: [
            "Fiebre/escalofríos",
            "Náuseas o vómitos",
            "Diarrea",
            "Estreñimiento",
            "Sangre en las heces",
            "Incapacidad para expulsar gases",
            "Ninguno de estos"
          ]
        },
        duration: {
          question: "¿Cuándo comenzó el dolor?",
          options: [
            "Última hora",
            "Hace 1-6 horas",
            "Hace 6-24 horas",
            "Hace 1-2 días",
            "Hace más de 2 días"
          ]
        }
      },
      
      headache: {
        severity: {
          question: "¿Qué tan severo es el dolor de cabeza?",
          min: "Leve",
          max: "Peor dolor de cabeza de la vida"
        },
        onset: {
          question: "¿Cómo comenzó?",
          options: [
            "Repentino/trueno (peor dolor de cabeza de la vida)",
            "Gradual durante horas",
            "Gradual durante días",
            "Me desperté con él"
          ]
        },
        location: {
          question: "¿Dónde está el dolor?",
          options: [
            "Un lado de la cabeza",
            "Ambos lados",
            "Frente",
            "Parte posterior de la cabeza/cuello",
            "Detrás de los ojos",
            "Por todas partes"
          ]
        },
        associated: {
          question: "¿Tiene alguno de estos?",
          options: [
            "Cambios en la visión",
            "Náuseas/vómitos",
            "Sensibilidad a la luz",
            "Fiebre",
            "Rigidez en el cuello",
            "Confusión",
            "Ninguno de estos"
          ]
        },
        duration: {
          question: "¿Cuánto tiempo lo ha tenido?",
          options: [
            "Menos de 1 hora",
            "1-6 horas",
            "6-24 horas",
            "Más de 1 día"
          ]
        }
      },
            ...newCategories.es
    },
    
    // Analyzing
    analyzing: "Analizando sus síntomas...",
    analyzingSubtext: "Nuestra IA está revisando su información",
    
    // Results
    results: {
      recommendation: "Recomendación:",
      severity: "Gravedad:",
      timeframe: "Plazo:",
      warningSignsTitle: "Signos de Advertencia Identificados:",
      whatToExpect: "Qué Esperar:",
      importantNote: "Nota Importante:",
      newAnalysisButton: "Analizar Síntomas Diferentes",
      
      emergencyRoom: "Sala de Emergencias",
      urgentCare: "Atención Urgente",
      homeCare: "Cuidado en Casa",
      averageCost: "Costo promedio",
      otcTelehealth: "OTC/Telemedicina",
      
      talkToDoctor: "Hable con un Médico Ahora ($0 con seguro)",
      findFacility: "Encontrar Instalación Más Cercana",
      
      productsTitle: "Productos Recomendados de Salud y Seguridad",
      productsSubtitle: "Esté preparado para emergencias con estos suministros esenciales de monitoreo de salud y primeros auxilios:",
      viewOnAmazon: "Ver en Amazon →",
      disclosure: "Divulgación: Como Asociado de Amazon, ganamos con compras calificadas. Estas recomendaciones ayudan a mantener nuestra herramienta de orientación médica gratuita.",
      
      firstAidKit: {
        title: "Kit de Primeros Auxilios",
        subtitle: "Cumple con OSHA • 260 Piezas",
        description: "Kit de emergencia completo para el hogar, automóvil y lugar de trabajo. Esté preparado para lesiones menores y emergencias.",
        badge: "#1 Más Vendido"
      },
      thermometer: {
        title: "Termómetro Digital",
        subtitle: "Sin Contacto • Frente y Objeto",
        description: "Detección precisa de fiebre para adultos y niños. Tecnología sin contacto con alarma de fiebre y modo silencioso.",
        badge: "Esencial para Fiebres"
      },
      bloodPressure: {
        title: "Monitor de Presión Arterial",
        subtitle: "OMRON • #1 Recomendado por Médicos",
        description: "Monitor casero validado clínicamente. Brazalete de brazo superior fácil de usar para lecturas precisas de PA.",
        badge: "Validado Clínicamente"
      }
    },
    
    // Disclaimer
    disclaimer: {
      title: "Aviso Médico:",
      text: "Esta herramienta proporciona orientación general únicamente y no sustituye el consejo médico profesional, el diagnóstico o el tratamiento. Siempre busque el consejo de su médico u otro proveedor de atención médica calificado con cualquier pregunta que pueda tener sobre una condición médica. Si cree que puede tener una emergencia médica, llame al 911 de inmediato."
    },
    
    // Stats
    stats: {
      savings: "$2,345",
      savingsText: "Cantidad promedio ahorrada al elegir Atención Urgente en lugar de Emergencias para no emergencias",
      erVisits: "127M",
      erVisitsText: "Visitas anuales a Emergencias en EE.UU.",
      treatable: "30%",
      treatableText: "Podría tratarse en Atención Urgente",
      copay: "$1.5K",
      copayText: "Copago promedio de Emergencias"
    },
    
    // Footer
    footer: {
      aboutUs: "Sobre Nosotros",
      contact: "Contacto",
      privacy: "Política de Privacidad",
      terms: "Términos y Condiciones",
      affiliate: "Divulgación de Afiliados",
      copyright: "© 2024 Herramienta ER vs Atención Urgente. No afiliado con ninguna instalación médica.",
      note: "Esta herramienta proporciona información general únicamente y no sustituye el consejo médico profesional."
    }
  }
};

// Helper function to get translation
export function getTranslation(language, key) {
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return value || key;
}

export default translations;
