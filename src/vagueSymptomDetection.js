// vagueSymptomDetection.js - IMPROVED VERSION
// WITH: Spanish patterns, Fuzzy matching, Input validation

/**
 * Simple Levenshtein distance for fuzzy matching
 * Returns the number of character differences between two strings
 */
function levenshteinDistance(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[len1][len2];
}

/**
 * Check if two strings are similar enough (fuzzy match)
 * Allows for typos/misspellings BUT prioritizes exact matches
 */
function isFuzzyMatch(input, pattern) {
  // EXACT MATCH - highest priority
  if (input.includes(pattern)) {
    return { match: true, score: 100, exact: true };
  }

  // For very short patterns (< 5 chars), require exact match only
  if (pattern.length < 5) {
    return { match: false, score: 0, exact: false };
  }

  // For single-word patterns, check direct similarity
  if (!pattern.includes(' ')) {
    const inputWords = input.split(' ');
    
    for (const iWord of inputWords) {
      // Skip if word length difference is too big
      if (Math.abs(iWord.length - pattern.length) > 2) continue;
      
      const distance = levenshteinDistance(pattern, iWord);
      // More forgiving thresholds for common typos
      let maxAllowed;
      if (pattern.length <= 4) {
        maxAllowed = 1;  // 4 chars or less: allow 1 typo
      } else if (pattern.length <= 6) {
        maxAllowed = 2;  // 5-6 chars: allow 2 typos (handles "tierd" -> "tired")
      } else {
        maxAllowed = 2;  // 7+ chars: allow 2 typos
      }
      
      if (distance <= maxAllowed) {
        const score = 50 - (distance * 10); // Lower score for fuzzy matches
        return { match: true, score: score, exact: false };
      }
    }
    return { match: false, score: 0, exact: false };
  }

  // For multi-word patterns, ALL words must match (exact or fuzzy)
  const patternWords = pattern.split(' ');
  const inputWords = input.split(' ');
  let totalScore = 0;
  let matchedWords = 0;

  for (const pWord of patternWords) {
    // Skip very short words (like "in", "of", "to")
    if (pWord.length < 3) {
      matchedWords++;
      continue;
    }
    
    let wordMatched = false;
    for (const iWord of inputWords) {
      // Check exact match first
      if (iWord === pWord) {
        wordMatched = true;
        totalScore += 10;
        break;
      }
      
      // Skip if length difference is too large
      if (Math.abs(iWord.length - pWord.length) > 2) continue;
      
      // Check fuzzy match
      const distance = levenshteinDistance(pWord, iWord);
      // More forgiving for longer words
      let maxAllowed;
      if (pWord.length <= 4) {
        maxAllowed = 1;
      } else if (pWord.length <= 6) {
        maxAllowed = 2;
      } else {
        maxAllowed = 2;
      }
      
      if (distance <= maxAllowed) {
        wordMatched = true;
        totalScore += (5 - distance);
        break;
      }
    }
    
    if (wordMatched) {
      matchedWords++;
    }
  }

  // ALL pattern words must match
  const allWordsMatched = matchedWords === patternWords.length;
  return { 
    match: allWordsMatched, 
    score: allWordsMatched ? totalScore : 0,
    exact: false 
  };
}

/**
 * Validate that input is legitimate medical symptoms
 * Reject nonsense input like numbers, random characters, etc.
 */
function isValidInput(input) {
  if (!input || typeof input !== 'string') {
    return false;
  }

  const trimmed = input.trim();
  
  // Too short (less than 3 characters)
  if (trimmed.length < 3) {
    return false;
  }

  // Mostly numbers (80%+ digits)
  const digitCount = (trimmed.match(/\d/g) || []).length;
  if (digitCount / trimmed.length > 0.8) {
    return false;
  }

  // Repeated characters (like "aaaaaaa" or "111111")
  const uniqueChars = new Set(trimmed.replace(/\s/g, '')).size;
  if (uniqueChars <= 2 && trimmed.length > 5) {
    return false;
  }

  // Random keyboard mashing (like "asdfghjkl", "qwerty")
  const keyboardPatterns = [
    'asdf', 'qwer', 'zxcv', 'hjkl', 'uiop',
    '1234', '5678', '9012', 'abcd'
  ];
  const lowerInput = trimmed.toLowerCase();
  for (const pattern of keyboardPatterns) {
    if (lowerInput.includes(pattern) && lowerInput.length < 15) {
      return false;
    }
  }

  // Must contain at least one vowel (medical terms have vowels)
  if (!/[aeiouáéíóúAEIOUÁÉÍÓÚ]/.test(trimmed)) {
    return false;
  }

  // Common test phrases to reject
  const testPhrases = [
    'test', 'testing', 'asdf', 'qwerty', 'hello', 'hi there',
    'prueba', 'probando', 'hola'
  ];
  const lowerTrimmed = trimmed.toLowerCase();
  for (const phrase of testPhrases) {
    if (lowerTrimmed === phrase) {
      return false;
    }
  }

  return true;
}

/**
 * Vague symptom patterns in BOTH English and Spanish
 */
const VAGUE_PATTERNS = {
  // Abdominal - BILINGUAL
  abdominal: {
    patterns: [
      // English
      'stomach pain', 'stomach ache', 'belly pain', 'tummy hurts',
      'abdominal pain', 'stomach hurts', 'pain in stomach', 'pain in belly',
      'stomach discomfort', 'upset stomach', 'stomach uneasiness',
      'mild abdominal cramps', 'feel bloated', 'bloated all the time',
      'lower abdomen discomfort',
      // Spanish
      'dolor de estómago', 'dolor de barriga', 'dolor abdominal',
      'me duele el estómago', 'dolor de panza', 'estómago me duele',
      'malestar estomacal', 'hinchazón', 'inflamado', 'vientre duele'
    ],
    questions: [
      {
        id: 'location',
        type: 'choice',
        question: 'Where exactly is the discomfort?',
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
        question: 'How severe is it?',
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
          'Loss of appetite',
          'Heartburn',
          'None of these'
        ],
        required: true
      },
      {
        id: 'duration',
        type: 'choice',
        question: 'When did it start?',
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

  // Fatigue - BILINGUAL
  fatigue: {
    patterns: [
      // English
      'tired', 'fatigue', 'exhausted', 'no energy', 'weakness',
      'weak', 'feel weak', 'very tired', 'extremely tired', 'always tired',
      'tired all the time', 'not feeling like myself', 'low energy',
      'always sleepy', 'easily tired', 'tired after small tasks',
      'wake up tired', 'sleeping too much', 'restless sleep',
      'trouble falling asleep', 'feel weak in legs', 'feel weak in arms',
      'loss of motivation', 'general laziness', 'no motivation',
      // Spanish
      'cansado', 'cansada', 'fatigado', 'fatigada', 'agotado', 'agotada',
      'sin energía', 'debilidad', 'débil', 'muy cansado', 'siempre cansado',
      'cansado todo el tiempo', 'sin fuerzas', 'me siento débil',
      'sin ganas', 'sin ánimo', 'mucho sueño', 'somnoliento'
    ],
    questions: [
      {
        id: 'severity',
        type: 'scale',
        question: 'How severe is the fatigue?',
        min: 1,
        max: 10,
        minLabel: 'Mild',
        maxLabel: 'Extreme',
        required: true
      },
      {
        id: 'duration',
        type: 'choice',
        question: 'How long have you felt this way?',
        options: [
          'Just today',
          '2-3 days',
          '1-2 weeks',
          'Several weeks',
          'Months',
          'Always/chronic'
        ],
        required: true
      },
      {
        id: 'onset',
        type: 'choice',
        question: 'Did it come on suddenly or gradually?',
        options: [
          'Suddenly (within hours/days)',
          'Gradually over time',
          'Has been constant',
          'Comes and goes'
        ],
        required: true
      },
      {
        id: 'activities',
        type: 'choice',
        question: 'How does it affect daily activities?',
        options: [
          'Cannot do normal activities',
          'Can do some but not all',
          'Can do everything but more tired',
          'Minimal impact',
          'Tired after small tasks'
        ],
        required: true
      },
      {
        id: 'associated',
        type: 'checkbox',
        question: 'Do you have any of these?',
        options: [
          'Fever',
          'Weight loss',
          'Weight gain',
          'Shortness of breath',
          'Chest pain',
          'Confusion',
          'Muscle weakness',
          'Depression/sadness',
          'Sleep problems',
          'Loss of interest in things',
          'None of these'
        ],
        required: true
      }
    ]
  },

  // Sleep - BILINGUAL
  sleep: {
    patterns: [
      // English
      'trouble sleeping', 'cant sleep', 'cannot sleep', 'insomnia',
      'trouble falling asleep', 'wake up tired', 'sleeping too much',
      'sleep too much', 'restless sleep', 'poor sleep', 'not sleeping well',
      // Spanish
      'no puedo dormir', 'no duermo', 'insomnio', 'problemas para dormir',
      'duermo mal', 'no descanso', 'me despierto cansado', 'duermo mucho'
    ],
    questions: [
      {
        id: 'problem',
        type: 'checkbox',
        question: 'What sleep issues are you having?',
        options: [
          'Trouble falling asleep',
          'Wake up during night',
          'Wake up too early',
          'Sleeping too much',
          'Restless/unrefreshing sleep',
          'Nightmares',
          'Snoring/breathing stops'
        ],
        required: true
      },
      {
        id: 'duration',
        type: 'choice',
        question: 'How long has this been happening?',
        options: [
          'Just recently',
          '1-2 weeks',
          '3-4 weeks',
          'Months',
          'Years'
        ],
        required: true
      },
      {
        id: 'impact',
        type: 'choice',
        question: 'How does it affect your day?',
        options: [
          'Severely - cannot function well',
          'Moderately - tired but managing',
          'Mildly - slightly tired',
          'No daytime impact'
        ],
        required: true
      },
      {
        id: 'associated',
        type: 'checkbox',
        question: 'Do you have any of these?',
        options: [
          'Stress/worry',
          'Pain keeping you awake',
          'Frequent urination at night',
          'Snoring',
          'Gasping for air',
          'Leg movements',
          'Anxiety/depression',
          'None of these'
        ],
        required: true
      },
      {
        id: 'habits',
        type: 'checkbox',
        question: 'Sleep habits:',
        options: [
          'Irregular sleep schedule',
          'Screen time before bed',
          'Caffeine in evening',
          'Alcohol before bed',
          'Exercise close to bedtime',
          'Good sleep hygiene'
        ],
        required: false
      }
    ]
  },

  // Anxiety - BILINGUAL
  anxiety: {
    patterns: [
      // English
      'anxious', 'anxiety', 'feeling anxious', 'nervous',
      'feel down', 'low mood', 'mood changes', 'irritated',
      'irritated quickly', 'loss of interest', 'depressed',
      'depression', 'feeling nervous', 'panic', 'worried', 'stressed',
      // Spanish
      'ansioso', 'ansiosa', 'ansiedad', 'nervioso', 'nerviosa',
      'estresado', 'estresada', 'preocupado', 'preocupada',
      'triste', 'deprimido', 'deprimida', 'pánico', 'angustia'
    ],
    questions: [
      {
        id: 'severity',
        type: 'scale',
        question: 'How severe are these feelings?',
        min: 1,
        max: 10,
        minLabel: 'Mild',
        maxLabel: 'Extreme',
        required: true
      },
      {
        id: 'duration',
        type: 'choice',
        question: 'How long have you felt this way?',
        options: [
          'Just today',
          'Few days',
          '1-2 weeks',
          'Several weeks',
          'Months or longer'
        ],
        required: true
      },
      {
        id: 'symptoms',
        type: 'checkbox',
        question: 'What are you experiencing?',
        options: [
          'Anxious/nervous without knowing why',
          'Feeling down/sad',
          'Mood changes without reason',
          'Irritability',
          'Loss of interest in activities',
          'Panic attacks',
          'Constant worry',
          'None of these'
        ],
        required: true
      },
      {
        id: 'physical',
        type: 'checkbox',
        question: 'Any physical symptoms?',
        options: [
          'Heart racing',
          'Shortness of breath',
          'Chest tightness',
          'Sweating',
          'Trembling',
          'Sleep problems',
          'Fatigue',
          'None of these'
        ],
        required: true
      },
      {
        id: 'impact',
        type: 'choice',
        question: 'How does it affect daily life?',
        options: [
          'Cannot do normal activities',
          'Struggling but managing',
          'Manageable with effort',
          'Minimal impact'
        ],
        required: true
      }
    ]
  },

  // Headache - BILINGUAL
  headache: {
    patterns: [
      // English
      'headache', 'head hurts', 'head pain', 'pain in head',
      'my head', 'headaches', 'dull headache', 'brain fog',
      'trouble concentrating', 'feel confused', 'forgetfulness', 'foggy head',
      // Spanish
      'dolor de cabeza', 'me duele la cabeza', 'cabeza me duele',
      'jaqueca', 'migraña', 'cefalea'
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
          'Woke up with it',
          'Chronic/ongoing'
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
          'Trouble concentrating',
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
          'More than 1 day',
          'Weeks or longer'
        ],
        required: true
      }
    ]
  },

  // Breathing - BILINGUAL
  breathing: {
    patterns: [
      // English
      'short of breath', 'shortness of breath', 'hard to breathe',
      'breathing problem', 'breathing difficult', 'cannot breathe well',
      'trouble breathing', 'breathless', 'out of breath', 'winded',
      'shortness of breath sometimes', 'cant take deep breath',
      'cannot take deep breath', 'little cough', 'cough for weeks',
      // Spanish
      'falta de aire', 'dificultad para respirar', 'no puedo respirar bien',
      'me falta el aire', 'ahogo', 'me ahogo', 'respiración difícil'
    ],
    questions: [
      {
        id: 'severity',
        type: 'scale',
        question: 'How severe is the breathing difficulty?',
        min: 1,
        max: 10,
        minLabel: 'Mild',
        maxLabel: 'Severe',
        required: true
      },
      {
        id: 'onset',
        type: 'choice',
        question: 'When did it start?',
        options: [
          'Suddenly (within minutes)',
          'Over past few hours',
          'Gradually over days',
          'Chronic (weeks/months)',
          'Comes and goes'
        ],
        required: true
      },
      {
        id: 'triggers',
        type: 'checkbox',
        question: 'When does it happen?',
        options: [
          'At rest',
          'With activity/exercise',
          'When lying down',
          'All the time',
          'Comes and goes',
          'After small tasks'
        ],
        required: true
      },
      {
        id: 'associated',
        type: 'checkbox',
        question: 'Do you have any of these?',
        options: [
          'Chest pain/discomfort',
          'Cough',
          'Wheezing',
          'Fever',
          'Leg swelling',
          'Blue lips/fingers',
          'Anxiety/nervousness',
          'None of these'
        ],
        required: true
      },
      {
        id: 'history',
        type: 'checkbox',
        question: 'Do you have any of these conditions?',
        options: [
          'Asthma',
          'COPD/emphysema',
          'Heart problems',
          'Allergies',
          'Anxiety disorder',
          'None of these'
        ],
        required: false
      }
    ]
  },

  // FEVER/CHILLS
  fever: {
    patterns: [
      'fever', 'chills', 'fiebre', 'escalofrios', 'hot and cold',
      'running a fever', 'temperature', 'feeling feverish', 'shaking chills'
    ],
    questions: [
      {
        id: 'temperature',
        type: 'choice',
        question: 'What is your temperature?',
        options: [
          'Below 100.4°F (38°C)',
          '100.4-102°F (38-39°C)',
          '102-104°F (39-40°C)',
          'Above 104°F (40°C)',
          "Haven't measured"
        ],
        required: true
      },
      {
        id: 'duration',
        type: 'choice',
        question: 'How long have you had fever/chills?',
        options: [
          'Less than 24 hours',
          '1-3 days',
          '4-7 days',
          'More than a week'
        ],
        required: true
      },
      {
        id: 'other_symptoms',
        type: 'checkbox',
        question: 'What other symptoms do you have?',
        options: [
          'Cough',
          'Sore throat',
          'Body aches',
          'Headache',
          'Nausea/vomiting',
          'Diarrhea',
          'Rash',
          'Confusion',
          'None of these'
        ],
        required: true
      },
      {
        id: 'severity',
        type: 'scale',
        question: 'How sick do you feel overall?',
        min: 1,
        max: 10,
        minLabel: 'Mild discomfort',
        maxLabel: 'Very sick',
        required: true
      },
      {
        id: 'exposure',
        type: 'checkbox',
        question: 'Any recent exposure or travel?',
        options: [
          'Traveled recently',
          'Been around sick people',
          'Insect/tick bite',
          'Started new medication',
          'None of these'
        ],
        required: false
      }
    ]
  },

  // NAUSEA
  nausea: {
    patterns: [
      'nausea', 'nauseous', 'feel sick', 'want to throw up', 'vomit',
      'vomiting', 'throwing up', 'upset stomach', 'queasy', 'náuseas'
    ],
    questions: [
      {
        id: 'vomiting',
        type: 'choice',
        question: 'Are you vomiting?',
        options: [
          'No, just nauseous',
          'Yes, once or twice',
          'Yes, multiple times',
          'Yes, cannot keep anything down'
        ],
        required: true
      },
      {
        id: 'duration',
        type: 'choice',
        question: 'How long has this been happening?',
        options: [
          'Less than 6 hours',
          '6-24 hours',
          '1-3 days',
          'More than 3 days'
        ],
        required: true
      },
      {
        id: 'associated',
        type: 'checkbox',
        question: 'What other symptoms do you have?',
        options: [
          'Abdominal pain',
          'Diarrhea',
          'Fever',
          'Headache',
          'Dizziness',
          'Blood in vomit',
          'Chest pain',
          'None of these'
        ],
        required: true
      },
      {
        id: 'triggers',
        type: 'checkbox',
        question: 'When does it happen?',
        options: [
          'After eating',
          'In the morning',
          'All the time',
          'With certain foods',
          'When moving/standing',
          'No clear pattern'
        ],
        required: true
      },
      {
        id: 'recent',
        type: 'checkbox',
        question: 'Any of these apply?',
        options: [
          'Pregnant or could be pregnant',
          'Recently ate questionable food',
          'Others around me are sick',
          'Started new medication',
          'Had head injury recently',
          'None of these'
        ],
        required: false
      }
    ]
  },

  // SKIN/RASH
  skin: {
    patterns: [
      'rash', 'skin rash', 'itchy skin', 'skin irritation', 'hives',
      'red skin', 'bumps on skin', 'skin problem', 'piel', 'sarpullido'
    ],
    questions: [
      {
        id: 'appearance',
        type: 'checkbox',
        question: 'What does the rash look like?',
        options: [
          'Red spots or patches',
          'Raised bumps',
          'Blisters',
          'Flat and red',
          'Scaly or flaky',
          'Looks like a burn'
        ],
        required: true
      },
      {
        id: 'location',
        type: 'checkbox',
        question: 'Where is the rash?',
        options: [
          'Face',
          'Arms/hands',
          'Legs/feet',
          'Trunk/torso',
          'All over body',
          'Just one small area'
        ],
        required: true
      },
      {
        id: 'symptoms',
        type: 'checkbox',
        question: 'How does it feel?',
        options: [
          'Very itchy',
          'Painful',
          'Burning sensation',
          'No discomfort',
          'Swollen',
          'Warm to touch'
        ],
        required: true
      },
      {
        id: 'onset',
        type: 'choice',
        question: 'When did it start?',
        options: [
          'Within past few hours',
          'Yesterday',
          '2-7 days ago',
          'More than a week ago'
        ],
        required: true
      },
      {
        id: 'triggers',
        type: 'checkbox',
        question: 'Any possible triggers?',
        options: [
          'New soap/detergent/cosmetic',
          'New medication',
          'Insect bite',
          'Sun exposure',
          'Contact with plants',
          'Fever or feeling sick',
          'None/Unknown'
        ],
        required: false
      }
    ]
  }
};

/**
 * Check if symptoms are vague and need clarification
 * WITH: Fuzzy matching, Spanish support, Input validation
 */
export function detectVagueSymptom(symptoms) {
  if (!symptoms || typeof symptoms !== 'string') {
    return { isVague: false };
  }

  // Validate input first
  if (!isValidInput(symptoms)) {
    return { 
      isVague: false,
      invalidInput: true,
      message: 'Please describe your symptoms in words. For example: "headache", "stomach pain", "feeling tired"'
    };
  }

  // Normalize symptoms: lowercase, trim, and remove apostrophes
  const symptomsLower = symptoms.toLowerCase().trim().replace(/[''']/g, '');
  
  let bestMatch = null;
  let bestScore = 0;
  
  // Check each vague category with fuzzy matching
  for (const [category, data] of Object.entries(VAGUE_PATTERNS)) {
    for (const pattern of data.patterns) {
      // Normalize the pattern
      const normalizedPattern = pattern.toLowerCase().replace(/[''']/g, '');
      
      // Try fuzzy match (handles typos) with scoring
      const matchResult = isFuzzyMatch(symptomsLower, normalizedPattern);
      
      if (matchResult.match) {
        // Prioritize exact matches (score 100) over fuzzy matches
        if (matchResult.score > bestScore) {
          bestScore = matchResult.score;
          bestMatch = {
            category: category,
            matchedPattern: pattern,
            questions: data.questions,
            exact: matchResult.exact
          };
          
          // If exact match, stop searching (highest priority)
          if (matchResult.exact) {
            return {
              isVague: true,
              ...bestMatch
            };
          }
        }
      }
    }
  }

  // Return best match found (if any)
  if (bestMatch) {
    return {
      isVague: true,
      ...bestMatch
    };
  }

  return { isVague: false };
}

/**
 * Format follow-up answers into text for AI
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
  VAGUE_PATTERNS,
  isValidInput
};
