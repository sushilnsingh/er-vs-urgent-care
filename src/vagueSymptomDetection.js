// vagueSymptomDetection.js
// Detects vague symptoms that need clarifying questions

/**
 * Vague symptom patterns that need more information
 * Organized by body system/symptom type
 */

const VAGUE_PATTERNS = {
  // Abdominal/Stomach
  abdominal: {
    patterns: [
      'stomach pain',
      'stomach ache',
      'belly pain',
      'tummy hurts',
      'abdominal pain',
      'stomach hurts',
      'pain in stomach',
      'pain in belly',
      'stomach discomfort',
      'upset stomach'
    ],
    questions: [
      {
        id: 'location',
        type: 'choice',
        question: 'Where exactly is the pain?',
        options: [
          'Upper right (below ribs)',
          'Upper left (below ribs)', 
          'Lower right',
          'Lower left',
          'Center/around belly button',
          'All over'
        ],
        required: true
      },
      {
        id: 'severity',
        type: 'scale',
        question: 'How severe is the pain?',
        min: 1,
        max: 10,
        minLabel: 'Mild',
        maxLabel: 'Worst pain ever',
        required: true
      },
      {
        id: 'rebound',
        type: 'choice',
        question: 'Does it hurt MORE when you press down and then quickly release?',
        options: ['Yes', 'No', 'Not sure'],
        required: true
      },
      {
        id: 'associated',
        type: 'checkbox',
        question: 'Do you have any of these?',
        options: [
          'Fever/chills',
          'Nausea or vomiting',
          'Diarrhea',
          'Constipation',
          'Blood in stool',
          'Unable to pass gas',
          'None of these'
        ],
        required: true
      },
      {
        id: 'duration',
        type: 'choice',
        question: 'When did the pain start?',
        options: [
          'Within last hour',
          '1-6 hours ago',
          '6-24 hours ago',
          '1-2 days ago',
          'More than 2 days ago'
        ],
        required: true
      }
    ]
  },

  // Headache
  headache: {
    patterns: [
      'headache',
      'head hurts',
      'head pain',
      'pain in head',
      'my head',
      'headaches'
    ],
    questions: [
      {
        id: 'severity',
        type: 'scale',
        question: 'How severe is the headache?',
        min: 1,
        max: 10,
        minLabel: 'Mild',
        maxLabel: 'Worst headache ever',
        required: true
      },
      {
        id: 'onset',
        type: 'choice',
        question: 'How did it start?',
        options: [
          'Sudden/thunderclap (worst headache of life)',
          'Gradual over hours',
          'Gradual over days',
          'Woke up with it'
        ],
        required: true
      },
      {
        id: 'location',
        type: 'choice',
        question: 'Where is the pain?',
        options: [
          'One side of head',
          'Both sides',
          'Front/forehead',
          'Back of head/neck',
          'Behind eyes',
          'All over'
        ],
        required: true
      },
      {
        id: 'associated',
        type: 'checkbox',
        question: 'Do you have any of these?',
        options: [
          'Vision changes',
          'Nausea/vomiting',
          'Sensitivity to light',
          'Fever',
          'Stiff neck',
          'Confusion',
          'None of these'
        ],
        required: true
      },
      {
        id: 'duration',
        type: 'choice',
        question: 'How long have you had it?',
        options: [
          'Less than 1 hour',
          '1-6 hours',
          '6-24 hours',
          'More than 1 day'
        ],
        required: true
      }
    ]
  },

  // Chest discomfort (non-emergency level)
  chest: {
    patterns: [
      'chest discomfort',
      'chest tightness',
      'chest feels',
      'uncomfortable chest',
      'chest pressure light',
      'mild chest'
    ],
    questions: [
      {
        id: 'severity',
        type: 'scale',
        question: 'How severe is it?',
        min: 1,
        max: 10,
        minLabel: 'Mild',
        maxLabel: 'Severe',
        required: true
      },
      {
        id: 'location',
        type: 'choice',
        question: 'Where exactly?',
        options: [
          'Center of chest',
          'Left side',
          'Right side',
          'All over chest'
        ],
        required: true
      },
      {
        id: 'radiates',
        type: 'choice',
        question: 'Does the discomfort spread anywhere?',
        options: [
          'No, stays in one place',
          'To arm (left or right)',
          'To jaw/neck',
          'To back',
          'To shoulder'
        ],
        required: true
      },
      {
        id: 'triggers',
        type: 'checkbox',
        question: 'What makes it worse?',
        options: [
          'Deep breathing',
          'Moving/changing position',
          'Exercise/activity',
          'Eating',
          'Nothing specific',
          'Gets worse at rest'
        ],
        required: true
      },
      {
        id: 'associated',
        type: 'checkbox',
        question: 'Do you have any of these?',
        options: [
          'Shortness of breath',
          'Sweating',
          'Nausea',
          'Dizziness',
          'Heart racing',
          'None of these'
        ],
        required: true
      }
    ]
  },

  // Back pain
  back: {
    patterns: [
      'back pain',
      'back hurts',
      'sore back',
      'back ache',
      'pain in back'
    ],
    questions: [
      {
        id: 'location',
        type: 'choice',
        question: 'Where is the back pain?',
        options: [
          'Upper back (shoulders/neck)',
          'Middle back',
          'Lower back',
          'All along spine'
        ],
        required: true
      },
      {
        id: 'severity',
        type: 'scale',
        question: 'How severe?',
        min: 1,
        max: 10,
        minLabel: 'Mild',
        maxLabel: 'Severe',
        required: true
      },
      {
        id: 'onset',
        type: 'choice',
        question: 'How did it start?',
        options: [
          'Sudden (after lifting/movement)',
          'Gradual over time',
          'After injury/fall',
          'Woke up with it'
        ],
        required: true
      },
      {
        id: 'radiates',
        type: 'choice',
        question: 'Does pain go down your leg?',
        options: [
          'Yes, down one leg',
          'Yes, down both legs',
          'No, stays in back'
        ],
        required: true
      },
      {
        id: 'associated',
        type: 'checkbox',
        question: 'Do you have any of these?',
        options: [
          'Numbness/tingling in legs',
          'Weakness in legs',
          'Loss of bladder/bowel control',
          'Fever',
          'None of these'
        ],
        required: true
      }
    ]
  },

  // Dizziness
  dizziness: {
    patterns: [
      'dizzy',
      'dizziness',
      'lightheaded',
      'light headed',
      'feel faint',
      'spinning',
      'vertigo'
    ],
    questions: [
      {
        id: 'type',
        type: 'choice',
        question: 'What does the dizziness feel like?',
        options: [
          'Room spinning',
          'Lightheaded/about to faint',
          'Off balance/unsteady',
          'Floating feeling'
        ],
        required: true
      },
      {
        id: 'triggers',
        type: 'checkbox',
        question: 'When does it happen?',
        options: [
          'When standing up',
          'When moving head',
          'All the time',
          'Comes and goes',
          'Only when walking'
        ],
        required: true
      },
      {
        id: 'severity',
        type: 'scale',
        question: 'How severe?',
        min: 1,
        max: 10,
        minLabel: 'Mild',
        maxLabel: 'Severe',
        required: true
      },
      {
        id: 'associated',
        type: 'checkbox',
        question: 'Do you have any of these?',
        options: [
          'Nausea/vomiting',
          'Hearing loss/ringing',
          'Headache',
          'Vision changes',
          'Chest pain',
          'None of these'
        ],
        required: true
      },
      {
        id: 'duration',
        type: 'choice',
        question: 'How long has this been happening?',
        options: [
          'Just started (within hours)',
          '1-2 days',
          'Several days',
          'Weeks or longer'
        ],
        required: true
      }
    ]
  },

  // Fever
  fever: {
    patterns: [
      'fever',
      'temperature',
      'feel hot',
      'burning up',
      'have a temp'
    ],
    questions: [
      {
        id: 'temperature',
        type: 'choice',
        question: 'What is your temperature (if measured)?',
        options: [
          'Below 100.4°F (38°C)',
          '100.4-102°F (38-39°C)',
          '102-104°F (39-40°C)',
          'Above 104°F (40°C)',
          'Haven\'t measured'
        ],
        required: true
      },
      {
        id: 'duration',
        type: 'choice',
        question: 'How long have you had fever?',
        options: [
          'Less than 24 hours',
          '1-2 days',
          '3-5 days',
          'More than 5 days'
        ],
        required: true
      },
      {
        id: 'associated',
        type: 'checkbox',
        question: 'What other symptoms do you have?',
        options: [
          'Cough',
          'Sore throat',
          'Body aches',
          'Chills/shaking',
          'Rash',
          'Confusion',
          'Difficulty breathing',
          'Severe headache',
          'Stiff neck',
          'None of these'
        ],
        required: true
      },
      {
        id: 'recent',
        type: 'checkbox',
        question: 'Any recent (past 2 weeks)?',
        options: [
          'Travel outside country',
          'Sick contacts',
          'Surgery/procedure',
          'Tick bite',
          'None of these'
        ],
        required: false
      }
    ]
  }
};

/**
 * Check if symptoms are vague and need clarification
 * @param {string} symptoms - User's symptom description
 * @returns {object} - Vague symptom detection result
 */
export function detectVagueSymptom(symptoms) {
  if (!symptoms || typeof symptoms !== 'string') {
    return { isVague: false };
  }

  const symptomsLower = symptoms.toLowerCase().trim();
  
  // Check each vague category
  for (const [category, data] of Object.entries(VAGUE_PATTERNS)) {
    for (const pattern of data.patterns) {
      if (symptomsLower.includes(pattern)) {
        return {
          isVague: true,
          category: category,
          matchedPattern: pattern,
          questions: data.questions
        };
      }
    }
  }

  return { isVague: false };
}

/**
 * Format follow-up answers into text for AI
 * @param {object} answers - User's answers to follow-up questions
 * @returns {string} - Formatted text
 */
export function formatFollowUpAnswers(answers) {
  let formatted = '\n\nAdditional clarifying information:\n';
  
  for (const [questionId, answer] of Object.entries(answers)) {
    if (Array.isArray(answer)) {
      formatted += `${questionId}: ${answer.join(', ')}\n`;
    } else {
      formatted += `${questionId}: ${answer}\n`;
    }
  }
  
  return formatted;
}

export default {
  detectVagueSymptom,
  formatFollowUpAnswers,
  VAGUE_PATTERNS
};
