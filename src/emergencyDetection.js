// emergencyDetection.js
// Comprehensive 911 Emergency Detection System

/**
 * Emergency symptom patterns that require immediate 911 call
 * Based on medical triage protocols and emergency care guidelines
 */

const EMERGENCY_PATTERNS = {
  // Cardiac/Chest emergencies
  cardiac: [
    'chest pain',
    'heart attack',
    'crushing chest',
    'pressure in chest',
    'tight chest',
    'squeezing chest',
    'chest discomfort',
    'pain radiating to arm',
    'pain in left arm',
    'jaw pain with chest',
    'chest pain and sweating',
    'chest and shortness of breath',
    'angina',
    'heart racing and chest pain'
  ],

  // Respiratory emergencies
  respiratory: [
    'can\'t breathe',
    'cannot breathe',
    'difficulty breathing',
    'hard to breathe',
    'gasping for air',
    'choking',
    'blue lips',
    'blue skin',
    'cyanosis',
    'severe shortness of breath',
    'can\'t catch breath',
    'wheezing severely'
  ],

  // Neurological emergencies (Stroke - FAST)
  neurological: [
    'stroke',
    'face drooping',
    'one side of face numb',
    'arm weakness',
    'can\'t lift arm',
    'slurred speech',
    'confused speech',
    'sudden confusion',
    'trouble speaking',
    'sudden severe headache',
    'worst headache of life',
    'thunderclap headache',
    'loss of vision',
    'sudden blindness',
    'double vision sudden',
    'loss of balance',
    'sudden dizziness severe'
  ],

  // Consciousness/Mental status
  consciousness: [
    'unconscious',
    'passed out',
    'unresponsive',
    'not waking up',
    'seizure',
    'convulsions',
    'altered mental status',
    'extremely confused',
    'hallucinating',
    'suicidal',
    'want to die',
    'going to hurt myself'
  ],

  // Severe bleeding/trauma
  bleeding: [
    'severe bleeding',
    'bleeding won\'t stop',
    'heavy bleeding',
    'spurting blood',
    'arterial bleeding',
    'bleeding profusely',
    'severe head injury',
    'head trauma',
    'major accident',
    'severe burn',
    'amputation',
    'impalement'
  ],

  // Allergic/Anaphylaxis
  allergic: [
    'anaphylaxis',
    'throat swelling',
    'tongue swelling',
    'severe allergic reaction',
    'hives and difficulty breathing',
    'throat closing',
    'can\'t swallow',
    'severe allergy'
  ],

  // Poisoning/Overdose
  poisoning: [
    'overdose',
    'took too many pills',
    'poisoning',
    'poisoned',
    'drank poison',
    'chemical exposure',
    'carbon monoxide',
    'drug overdose'
  ],

  // Pregnancy emergencies
  pregnancy: [
    'pregnant and severe pain',
    'pregnant and bleeding heavily',
    'miscarriage',
    'baby not moving',
    'pregnancy and chest pain',
    'eclampsia',
    'severe headache pregnant'
  ],

  // Severe pain/acute abdomen
  acute: [
    'excruciating pain',
    'worst pain of my life',
    'pain 10 out of 10',
    'unbearable pain',
    'ruptured',
    'burst appendix'
  ]
};

/**
 * Check if symptoms contain emergency keywords
 * @param {string} symptoms - User's symptom description
 * @returns {object} - Emergency detection result
 */
export function detectEmergency(symptoms) {
  if (!symptoms || typeof symptoms !== 'string') {
    return { isEmergency: false };
  }

  const symptomsLower = symptoms.toLowerCase().trim();
  
  // Check each emergency category
  for (const [category, patterns] of Object.entries(EMERGENCY_PATTERNS)) {
    for (const pattern of patterns) {
      if (symptomsLower.includes(pattern)) {
        return {
          isEmergency: true,
          category: category,
          matchedPattern: pattern,
          severity: 'LIFE_THREATENING'
        };
      }
    }
  }

  return { isEmergency: false };
}

/**
 * Get emergency response configuration
 * @param {string} category - Emergency category detected
 * @returns {object} - Emergency response details
 */
export function getEmergencyResponse(category) {
  const responses = {
    cardiac: {
      title: "CARDIAC EMERGENCY",
      icon: "❤️‍🩹",
      action: "CALL 911 IMMEDIATELY",
      specificInstructions: [
        "Do NOT drive yourself to the hospital",
        "Sit down and rest immediately",
        "Chew an aspirin if available (unless allergic)",
        "Stay calm and wait for paramedics"
      ],
      warning: "Heart attacks can be fatal within minutes. Every second counts."
    },
    respiratory: {
      title: "BREATHING EMERGENCY",
      icon: "🫁",
      action: "CALL 911 IMMEDIATELY",
      specificInstructions: [
        "Sit upright to help breathing",
        "Loosen tight clothing",
        "Use rescue inhaler if you have one",
        "Do NOT lie down"
      ],
      warning: "Severe breathing problems can be life-threatening."
    },
    neurological: {
      title: "STROKE EMERGENCY",
      icon: "🧠",
      action: "CALL 911 IMMEDIATELY",
      specificInstructions: [
        "Note the time symptoms started (critical for treatment)",
        "Do NOT give food, drink, or medication",
        "Keep person comfortable and calm",
        "Do NOT let them drive"
      ],
      warning: "Time = Brain. Treatment within 3 hours can prevent permanent damage."
    },
    consciousness: {
      title: "CONSCIOUSNESS EMERGENCY",
      icon: "⚠️",
      action: "CALL 911 IMMEDIATELY",
      specificInstructions: [
        "If unconscious, check if breathing",
        "Turn person on their side if breathing (recovery position)",
        "Do NOT leave person alone",
        "If not breathing, start CPR if trained"
      ],
      warning: "Loss of consciousness is always a medical emergency."
    },
    bleeding: {
      title: "SEVERE BLEEDING EMERGENCY",
      icon: "🩸",
      action: "CALL 911 IMMEDIATELY",
      specificInstructions: [
        "Apply direct pressure to wound",
        "Keep person lying down",
        "Elevate injured area if possible",
        "Do NOT remove objects impaled in body"
      ],
      warning: "Severe bleeding can lead to shock and death within minutes."
    },
    allergic: {
      title: "ALLERGIC EMERGENCY (ANAPHYLAXIS)",
      icon: "💉",
      action: "CALL 911 IMMEDIATELY",
      specificInstructions: [
        "Use EpiPen immediately if available",
        "Person should lie down with legs elevated",
        "Loosen tight clothing",
        "Be prepared to perform CPR if needed"
      ],
      warning: "Anaphylaxis can be fatal within minutes without treatment."
    },
    poisoning: {
      title: "POISONING EMERGENCY",
      icon: "☠️",
      action: "CALL 911 AND POISON CONTROL (1-800-222-1222)",
      specificInstructions: [
        "Do NOT make person vomit unless told by poison control",
        "Keep container of substance if safe to do so",
        "Note time of exposure",
        "Keep person calm and still"
      ],
      warning: "Some poisons work quickly. Immediate treatment is critical."
    },
    pregnancy: {
      title: "PREGNANCY EMERGENCY",
      icon: "🤰",
      action: "CALL 911 IMMEDIATELY",
      specificInstructions: [
        "Keep person lying down",
        "Note timing and severity of symptoms",
        "Keep person calm",
        "Do NOT give anything by mouth"
      ],
      warning: "Pregnancy emergencies require immediate obstetric care."
    },
    acute: {
      title: "SEVERE PAIN EMERGENCY",
      icon: "⚡",
      action: "CALL 911 IMMEDIATELY",
      specificInstructions: [
        "Keep person still and comfortable",
        "Note location and type of pain",
        "Do NOT give food or drink",
        "Watch for signs of shock (pale, sweating, rapid pulse)"
      ],
      warning: "Severe, sudden pain can indicate life-threatening conditions."
    }
  };

  return responses[category] || {
    title: "MEDICAL EMERGENCY",
    icon: "🚨",
    action: "CALL 911 IMMEDIATELY",
    specificInstructions: [
      "Stay with the person",
      "Keep them calm",
      "Do NOT drive to hospital",
      "Wait for emergency services"
    ],
    warning: "These symptoms require immediate emergency medical attention."
  };
}

/**
 * Generate emergency result object for display
 * @param {object} detection - Emergency detection result
 * @returns {object} - Complete emergency result
 */
export function generateEmergencyResult(detection) {
  const response = getEmergencyResponse(detection.category);
  
  return {
    recommendation: "EMERGENCY_911",
    severity: "LIFE_THREATENING",
    emergencyType: response.title,
    icon: response.icon,
    action: response.action,
    reasoning: "Your symptoms suggest a medical emergency that requires immediate attention.",
    specificInstructions: response.specificInstructions,
    warning: response.warning,
    redFlags: [
      "Symptoms indicate potentially life-threatening condition",
      "Time is critical - every minute matters",
      "Emergency services have specialized equipment and training",
      "Do NOT attempt to drive yourself"
    ],
    timeframe: "IMMEDIATELY - Call 911 Now",
    estimatedCost: {
      emergency911: "Varies by insurance - life-saving treatment is priority",
      er: "Varies - but your life is priceless",
      urgentCare: "NOT APPROPRIATE - This is an emergency",
      homeCare: "DANGEROUS - Do not attempt"
    },
    whatToExpect: `Emergency Medical Services (EMS) will arrive with specialized equipment and trained paramedics. They will provide immediate treatment and transport you safely to the emergency room. Time is critical - do not delay calling 911.`,
    alternatives: "There are NO alternatives. Call 911 immediately. Do not use this tool further, do not drive yourself, do not wait to see if symptoms improve.",
    phoneNumbers: {
      emergency: "911",
      poisonControl: "1-800-222-1222",
      suicidePrevention: "988"
    }
  };
}

// Export detectEmergency as detect911Emergency for compatibility
export const detect911Emergency = detectEmergency;

// Default export for convenience
export default {
  detect911Emergency: detectEmergency,
  detectEmergency,
  getEmergencyResponse,
  generateEmergencyResult,
  EMERGENCY_PATTERNS
};
