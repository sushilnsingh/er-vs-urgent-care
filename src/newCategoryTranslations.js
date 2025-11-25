// newCategoryTranslations.js
// Translations for 12 new symptom categories
// Import this into translations.js

export const newCategories = {
  en: {
    breathing: {
      severity: { question: "How severe is the breathing difficulty?", min: "Mild", max: "Severe" },
      onset: { question: "When did it start?", options: ["Suddenly (within minutes)", "Over past few hours", "Gradually over days", "Chronic (weeks/months)", "Comes and goes"] },
      triggers: { question: "When does it happen?", options: ["At rest", "With activity/exercise", "When lying down", "All the time", "Comes and goes", "After small tasks"] },
      associated: { question: "Do you have any of these?", options: ["Chest pain/discomfort", "Cough", "Wheezing", "Fever", "Leg swelling", "Blue lips/fingers", "Anxiety/nervousness", "None of these"] },
      history: { question: "Do you have any of these conditions?", options: ["Asthma", "COPD/emphysema", "Heart problems", "Allergies", "Anxiety disorder", "None of these"] }
    },
    
    fatigue: {
      severity: { question: "How severe is the fatigue?", min: "Mild", max: "Extreme" },
      duration: { question: "How long have you felt this way?", options: ["Just today", "2-3 days", "1-2 weeks", "Several weeks", "Months", "Always/chronic"] },
      onset: { question: "Did it come on suddenly or gradually?", options: ["Suddenly (within hours/days)", "Gradually over time", "Has been constant", "Comes and goes"] },
      activities: { question: "How does it affect daily activities?", options: ["Cannot do normal activities", "Can do some but not all", "Can do everything but more tired", "Minimal impact", "Tired after small tasks"] },
      associated: { question: "Do you have any of these?", options: ["Fever", "Weight loss", "Weight gain", "Shortness of breath", "Chest pain", "Confusion", "Muscle weakness", "Depression/sadness", "Sleep problems", "Loss of interest in things", "None of these"] }
    },
    
    nausea: {
      severity: { question: "How bad is the nausea/vomiting?", min: "Mild", max: "Severe" },
      vomiting: { question: "Are you vomiting or just nauseous?", options: ["Just nauseous, no vomiting", "Vomiting occasionally", "Vomiting frequently (multiple times)", "Cannot keep anything down", "Nausea on and off"] },
      duration: { question: "How long has this been happening?", options: ["Less than 6 hours", "6-24 hours", "1-2 days", "More than 2 days", "On and off for weeks"] },
      content: { question: "What does the vomit look like? (if vomiting)", options: ["Normal food/liquid", "Green/yellow bile", "Blood or coffee-ground appearance", "Black material", "Not vomiting", "Not sure"] },
      associated: { question: "Do you have any of these?", options: ["Abdominal pain", "Diarrhea", "Fever", "Headache", "Dizziness", "Signs of dehydration (very thirsty, dry mouth)", "Loss of appetite", "None of these"] }
    },
    
    skin: {
      type: { question: "What does it look like?", options: ["Red bumps/hives", "Flat red rash", "Blisters/fluid-filled", "Swelling (no rash)", "Itchy but no visible rash", "Dry/sensitive skin", "Other/not sure"] },
      location: { question: "Where is it located?", options: ["Face", "Arms", "Legs", "Torso/chest/back", "Hands/feet", "Scalp/hair", "All over body"] },
      onset: { question: "When did it start?", options: ["Within last hour", "1-6 hours ago", "6-24 hours ago", "1-2 days ago", "More than 2 days ago", "Comes and goes"] },
      symptoms: { question: "What symptoms does it have?", options: ["Very itchy", "Painful", "Warm to touch", "Spreading rapidly", "No other symptoms", "Feels sensitive"] },
      associated: { question: "Do you have any of these?", options: ["Difficulty breathing", "Throat/tongue swelling", "Fever", "Recent medication change", "Recent insect bite", "Recent new food", "Hair loss", "None of these"] }
    },
    
    joint: {
      location: { question: "Which joint(s)/area hurt?", options: ["Knee", "Ankle", "Shoulder", "Elbow", "Wrist", "Hip", "Multiple joints", "Muscles (not joints)"] },
      severity: { question: "How severe is the pain?", min: "Mild", max: "Severe" },
      onset: { question: "How did it start?", options: ["After injury/trauma", "After exercise/activity", "Gradually over time", "Woke up with it", "Suddenly without injury", "Random/moves around"] },
      mobility: { question: "Can you move the joint?", options: ["Normal range of motion", "Limited but can move it", "Very limited movement", "Cannot move it at all", "Stiff especially in morning"] },
      associated: { question: "Do you have any of these?", options: ["Swelling", "Redness", "Warm to touch", "Fever", "Cannot bear weight (if leg)", "Deformity/looks wrong", "Weakness", "None of these"] }
    },
    
    urinary: {
      symptoms: { question: "What are you experiencing?", options: ["Pain/burning when urinating", "Frequent need to urinate", "Difficulty starting urination", "Blood in urine", "Dark/cloudy urine", "Strong odor", "Urinary urgency (sudden need to go)", "Mild burning sometimes"] },
      severity: { question: "How severe is the discomfort?", min: "Mild", max: "Severe" },
      duration: { question: "How long have you had these symptoms?", options: ["Less than 24 hours", "1-2 days", "3-5 days", "More than 5 days", "On and off"] },
      pain_location: { question: "Where is the pain/discomfort?", options: ["When urinating only", "Lower abdomen/bladder area", "Back/flank (kidney area)", "Pelvic area", "No pain, just other symptoms"] },
      associated: { question: "Do you have any of these?", options: ["Fever/chills", "Back pain", "Nausea/vomiting", "Unable to urinate at all", "Incontinence (cannot hold urine)", "None of these"] }
    },
    
    anxiety: {
      severity: { question: "How severe are these feelings?", min: "Mild", max: "Extreme" },
      duration: { question: "How long have you felt this way?", options: ["Just today", "Few days", "1-2 weeks", "Several weeks", "Months or longer"] },
      symptoms: { question: "What are you experiencing?", options: ["Anxious/nervous without knowing why", "Feeling down/sad", "Mood changes without reason", "Irritability", "Loss of interest in activities", "Panic attacks", "Constant worry", "None of these"] },
      physical: { question: "Any physical symptoms?", options: ["Heart racing", "Shortness of breath", "Chest tightness", "Sweating", "Trembling", "Sleep problems", "Fatigue", "None of these"] },
      impact: { question: "How does it affect daily life?", options: ["Cannot do normal activities", "Struggling but managing", "Manageable with effort", "Minimal impact"] }
    },
    
    sleep: {
      problem: { question: "What sleep issues are you having?", options: ["Trouble falling asleep", "Wake up during night", "Wake up too early", "Sleeping too much", "Restless/unrefreshing sleep", "Nightmares", "Snoring/breathing stops"] },
      duration: { question: "How long has this been happening?", options: ["Just recently", "1-2 weeks", "3-4 weeks", "Months", "Years"] },
      impact: { question: "How does it affect your day?", options: ["Severely - cannot function well", "Moderately - tired but managing", "Mildly - slightly tired", "No daytime impact"] },
      associated: { question: "Do you have any of these?", options: ["Stress/worry", "Pain keeping you awake", "Frequent urination at night", "Snoring", "Gasping for air", "Leg movements", "Anxiety/depression", "None of these"] },
      habits: { question: "Sleep habits:", options: ["Irregular sleep schedule", "Screen time before bed", "Caffeine in evening", "Alcohol before bed", "Exercise close to bedtime", "Good sleep hygiene"] }
    },
    
    temperature: {
      symptom: { question: "What are you experiencing?", options: ["Always feeling hot", "Always feeling cold", "Alternating hot and cold", "Hot flashes", "Cold sweats", "Cannot regulate temperature"] },
      severity: { question: "How bothersome is this?", min: "Mild", max: "Severe" },
      duration: { question: "How long has this been happening?", options: ["Few days", "1-2 weeks", "Few weeks", "Months", "Years"] },
      timing: { question: "When does it happen?", options: ["All the time", "Mostly at night", "Mostly during day", "During activity", "At rest", "Randomly"] },
      associated: { question: "Do you have any of these?", options: ["Sweating", "Shivering", "Fatigue", "Weight changes", "Heart palpitations", "Anxiety", "Menstrual changes (if applicable)", "None of these"] }
    },
    
    numbness: {
      location: { question: "Where do you feel tingling/numbness?", options: ["Hands", "Feet", "Arms", "Legs", "Face", "One side of body", "Multiple areas"] },
      severity: { question: "How bothersome is it?", min: "Mild", max: "Severe" },
      timing: { question: "When does it happen?", options: ["All the time", "Comes and goes", "Only at certain times", "After certain positions", "Randomly"] },
      onset: { question: "How did it start?", options: ["Suddenly", "Gradually over days", "Gradually over weeks", "After injury", "Always had it"] },
      associated: { question: "Do you have any of these?", options: ["Weakness in affected area", "Pain", "Difficulty with balance", "Difficulty with fine movements", "Vision changes", "Dizziness", "Diabetes", "None of these"] }
    },
    
    weight: {
      type: { question: "What is happening with your weight?", options: ["Losing weight without trying", "Gaining weight without trying", "Rapid weight loss", "Rapid weight gain", "Fluctuating weight"] },
      amount: { question: "How much weight change?", options: ["Less than 5 pounds", "5-10 pounds", "10-20 pounds", "More than 20 pounds", "Not sure/significant"] },
      duration: { question: "Over what time period?", options: ["Few days", "1-2 weeks", "Few weeks", "1-2 months", "Several months"] },
      appetite: { question: "How is your appetite?", options: ["Increased appetite", "Decreased appetite", "No change in appetite", "Loss of appetite", "Always hungry"] },
      associated: { question: "Do you have any of these?", options: ["Fatigue", "Fever", "Night sweats", "Changes in bowel habits", "Nausea/vomiting", "Increased thirst", "Frequent urination", "Mood changes", "None of these"] }
    },
    
    nonspecific: {
      severity: { question: "How concerning is this feeling?", min: "Mildly concerning", max: "Very concerning" },
      duration: { question: "How long have you felt this way?", options: ["Just started today", "Few days", "1-2 weeks", "Several weeks", "Longer"] },
      symptoms: { question: "Can you identify any specific symptoms?", options: ["Fatigue/tiredness", "Pain somewhere", "Dizziness", "Nausea", "Headache", "Shortness of breath", "Chest discomfort", "Anxiety/nervousness", "No specific symptoms, just feel off"] },
      location: { question: "Any particular body area feels wrong?", options: ["Head", "Chest", "Stomach/abdomen", "Arms/legs", "All over", "Cannot pinpoint"] },
      impact: { question: "How does it affect your daily activities?", options: ["Cannot do normal activities", "Struggling but managing", "Can function but feel off", "Minimal impact"] }
    }
  },
  
  es: {
    breathing: {
      severity: { question: "¿Qué tan grave es la dificultad para respirar?", min: "Leve", max: "Grave" },
      onset: { question: "¿Cuándo comenzó?", options: ["De repente (en minutos)", "En las últimas horas", "Gradualmente durante días", "Crónico (semanas/meses)", "Va y viene"] },
      triggers: { question: "¿Cuándo sucede?", options: ["En reposo", "Con actividad/ejercicio", "Al acostarse", "Todo el tiempo", "Va y viene", "Después de tareas pequeñas"] },
      associated: { question: "¿Tiene alguno de estos?", options: ["Dolor/molestia en el pecho", "Tos", "Sibilancias", "Fiebre", "Hinchazón de piernas", "Labios/dedos azules", "Ansiedad/nerviosismo", "Ninguno de estos"] },
      history: { question: "¿Tiene alguna de estas condiciones?", options: ["Asma", "EPOC/enfisema", "Problemas cardíacos", "Alergias", "Trastorno de ansiedad", "Ninguno de estos"] }
    },
    
    fatigue: {
      severity: { question: "¿Qué tan grave es la fatiga?", min: "Leve", max: "Extrema" },
      duration: { question: "¿Cuánto tiempo se ha sentido así?", options: ["Solo hoy", "2-3 días", "1-2 semanas", "Varias semanas", "Meses", "Siempre/crónico"] },
      onset: { question: "¿Comenzó repentinamente o gradualmente?", options: ["Repentinamente (en horas/días)", "Gradualmente con el tiempo", "Ha sido constante", "Va y viene"] },
      activities: { question: "¿Cómo afecta las actividades diarias?", options: ["No puedo hacer actividades normales", "Puedo hacer algunas pero no todas", "Puedo hacer todo pero más cansado", "Impacto mínimo", "Cansado después de tareas pequeñas"] },
      associated: { question: "¿Tiene alguno de estos?", options: ["Fiebre", "Pérdida de peso", "Aumento de peso", "Dificultad para respirar", "Dolor en el pecho", "Confusión", "Debilidad muscular", "Depresión/tristeza", "Problemas de sueño", "Pérdida de interés en cosas", "Ninguno de estos"] }
    },
    
    nausea: {
      severity: { question: "¿Qué tan fuerte es la náusea/vómito?", min: "Leve", max: "Grave" },
      vomiting: { question: "¿Está vomitando o solo tiene náuseas?", options: ["Solo náuseas, sin vómito", "Vomitando ocasionalmente", "Vomitando frecuentemente (múltiples veces)", "No puedo retener nada", "Náusea de vez en cuando"] },
      duration: { question: "¿Cuánto tiempo ha estado sucediendo esto?", options: ["Menos de 6 horas", "6-24 horas", "1-2 días", "Más de 2 días", "De vez en cuando durante semanas"] },
      content: { question: "¿Cómo se ve el vómito? (si está vomitando)", options: ["Comida/líquido normal", "Bilis verde/amarilla", "Sangre o apariencia de café molido", "Material negro", "No estoy vomitando", "No estoy seguro"] },
      associated: { question: "¿Tiene alguno de estos?", options: ["Dolor abdominal", "Diarrea", "Fiebre", "Dolor de cabeza", "Mareos", "Signos de deshidratación (mucha sed, boca seca)", "Pérdida de apetito", "Ninguno de estos"] }
    },
    
    skin: {
      type: { question: "¿Cómo se ve?", options: ["Protuberancias rojas/urticaria", "Erupción roja plana", "Ampollas/llenas de líquido", "Hinchazón (sin erupción)", "Picazón pero sin erupción visible", "Piel seca/sensible", "Otro/no estoy seguro"] },
      location: { question: "¿Dónde está ubicado?", options: ["Cara", "Brazos", "Piernas", "Torso/pecho/espalda", "Manos/pies", "Cuero cabelludo/cabello", "Todo el cuerpo"] },
      onset: { question: "¿Cuándo comenzó?", options: ["Última hora", "Hace 1-6 horas", "Hace 6-24 horas", "Hace 1-2 días", "Hace más de 2 días", "Va y viene"] },
      symptoms: { question: "¿Qué síntomas tiene?", options: ["Muy picante", "Doloroso", "Caliente al tacto", "Se propaga rápidamente", "Sin otros síntomas", "Se siente sensible"] },
      associated: { question: "¿Tiene alguno de estos?", options: ["Dificultad para respirar", "Hinchazón de garganta/lengua", "Fiebre", "Cambio reciente de medicamento", "Picadura de insecto reciente", "Alimento nuevo reciente", "Pérdida de cabello", "Ninguno de estos"] }
    },
    
    joint: {
      location: { question: "¿Qué articulación(es)/área duele(n)?", options: ["Rodilla", "Tobillo", "Hombro", "Codo", "Muñeca", "Cadera", "Múltiples articulaciones", "Músculos (no articulaciones)"] },
      severity: { question: "¿Qué tan grave es el dolor?", min: "Leve", max: "Grave" },
      onset: { question: "¿Cómo comenzó?", options: ["Después de lesión/trauma", "Después de ejercicio/actividad", "Gradualmente con el tiempo", "Me desperté con él", "De repente sin lesión", "Aleatorio/se mueve"] },
      mobility: { question: "¿Puede mover la articulación?", options: ["Rango de movimiento normal", "Limitado pero puedo moverlo", "Movimiento muy limitado", "No puedo moverlo en absoluto", "Rígido especialmente por la mañana"] },
      associated: { question: "¿Tiene alguno de estos?", options: ["Hinchazón", "Enrojecimiento", "Caliente al tacto", "Fiebre", "No puede soportar peso (si es pierna)", "Deformidad/se ve mal", "Debilidad", "Ninguno de estos"] }
    },
    
    urinary: {
      symptoms: { question: "¿Qué está experimentando?", options: ["Dolor/ardor al orinar", "Necesidad frecuente de orinar", "Dificultad para comenzar a orinar", "Sangre en la orina", "Orina oscura/turbia", "Olor fuerte", "Urgencia urinaria (necesidad repentina de ir)", "Ardor leve a veces"] },
      severity: { question: "¿Qué tan grave es la molestia?", min: "Leve", max: "Grave" },
      duration: { question: "¿Cuánto tiempo ha tenido estos síntomas?", options: ["Menos de 24 horas", "1-2 días", "3-5 días", "Más de 5 días", "De vez en cuando"] },
      pain_location: { question: "¿Dónde está el dolor/molestia?", options: ["Solo al orinar", "Abdomen inferior/área de la vejiga", "Espalda/flanco (área del riñón)", "Área pélvica", "Sin dolor, solo otros síntomas"] },
      associated: { question: "¿Tiene alguno de estos?", options: ["Fiebre/escalofríos", "Dolor de espalda", "Náuseas/vómitos", "Incapaz de orinar en absoluto", "Incontinencia (no puede retener la orina)", "Ninguno de estos"] }
    },
    
    anxiety: {
      severity: { question: "¿Qué tan graves son estos sentimientos?", min: "Leve", max: "Extremo" },
      duration: { question: "¿Cuánto tiempo se ha sentido así?", options: ["Solo hoy", "Pocos días", "1-2 semanas", "Varias semanas", "Meses o más"] },
      symptoms: { question: "¿Qué está experimentando?", options: ["Ansioso/nervioso sin saber por qué", "Sintiéndose triste/deprimido", "Cambios de humor sin razón", "Irritabilidad", "Pérdida de interés en actividades", "Ataques de pánico", "Preocupación constante", "Ninguno de estos"] },
      physical: { question: "¿Algún síntoma físico?", options: ["Corazón acelerado", "Dificultad para respirar", "Opresión en el pecho", "Sudoración", "Temblores", "Problemas de sueño", "Fatiga", "Ninguno de estos"] },
      impact: { question: "¿Cómo afecta la vida diaria?", options: ["No puedo hacer actividades normales", "Luchando pero manejando", "Manejable con esfuerzo", "Impacto mínimo"] }
    },
    
    sleep: {
      problem: { question: "¿Qué problemas de sueño tiene?", options: ["Dificultad para conciliar el sueño", "Despertarse durante la noche", "Despertarse demasiado temprano", "Dormir demasiado", "Sueño inquieto/no reparador", "Pesadillas", "Ronquidos/la respiración se detiene"] },
      duration: { question: "¿Cuánto tiempo ha estado sucediendo esto?", options: ["Recientemente", "1-2 semanas", "3-4 semanas", "Meses", "Años"] },
      impact: { question: "¿Cómo afecta su día?", options: ["Severamente - no puedo funcionar bien", "Moderadamente - cansado pero manejando", "Levemente - ligeramente cansado", "Sin impacto durante el día"] },
      associated: { question: "¿Tiene alguno de estos?", options: ["Estrés/preocupación", "Dolor que lo mantiene despierto", "Orinar frecuentemente por la noche", "Ronquidos", "Jadeos por aire", "Movimientos de piernas", "Ansiedad/depresión", "Ninguno de estos"] },
      habits: { question: "Hábitos de sueño:", options: ["Horario de sueño irregular", "Tiempo de pantalla antes de dormir", "Cafeína por la noche", "Alcohol antes de dormir", "Ejercicio cerca de la hora de dormir", "Buena higiene del sueño"] }
    },
    
    temperature: {
      symptom: { question: "¿Qué está experimentando?", options: ["Siempre sintiéndose caliente", "Siempre sintiéndose frío", "Alternando calor y frío", "Sofocos", "Sudores fríos", "No puede regular la temperatura"] },
      severity: { question: "¿Qué tan molesto es esto?", min: "Leve", max: "Grave" },
      duration: { question: "¿Cuánto tiempo ha estado sucediendo esto?", options: ["Pocos días", "1-2 semanas", "Pocas semanas", "Meses", "Años"] },
      timing: { question: "¿Cuándo sucede?", options: ["Todo el tiempo", "Principalmente por la noche", "Principalmente durante el día", "Durante actividad", "En reposo", "Aleatoriamente"] },
      associated: { question: "¿Tiene alguno de estos?", options: ["Sudoración", "Temblores", "Fatiga", "Cambios de peso", "Palpitaciones cardíacas", "Ansiedad", "Cambios menstruales (si aplica)", "Ninguno de estos"] }
    },
    
    numbness: {
      location: { question: "¿Dónde siente hormigueo/entumecimiento?", options: ["Manos", "Pies", "Brazos", "Piernas", "Cara", "Un lado del cuerpo", "Múltiples áreas"] },
      severity: { question: "¿Qué tan molesto es?", min: "Leve", max: "Grave" },
      timing: { question: "¿Cuándo sucede?", options: ["Todo el tiempo", "Va y viene", "Solo en ciertos momentos", "Después de ciertas posiciones", "Aleatoriamente"] },
      onset: { question: "¿Cómo comenzó?", options: ["De repente", "Gradualmente durante días", "Gradualmente durante semanas", "Después de lesión", "Siempre lo he tenido"] },
      associated: { question: "¿Tiene alguno de estos?", options: ["Debilidad en el área afectada", "Dolor", "Dificultad con el equilibrio", "Dificultad con movimientos finos", "Cambios en la visión", "Mareos", "Diabetes", "Ninguno de estos"] }
    },
    
    weight: {
      type: { question: "¿Qué está pasando con su peso?", options: ["Perdiendo peso sin intentarlo", "Ganando peso sin intentarlo", "Pérdida rápida de peso", "Aumento rápido de peso", "Peso fluctuante"] },
      amount: { question: "¿Cuánto cambio de peso?", options: ["Menos de 5 libras", "5-10 libras", "10-20 libras", "Más de 20 libras", "No estoy seguro/significativo"] },
      duration: { question: "¿Durante qué período de tiempo?", options: ["Pocos días", "1-2 semanas", "Pocas semanas", "1-2 meses", "Varios meses"] },
      appetite: { question: "¿Cómo está su apetito?", options: ["Apetito aumentado", "Apetito disminuido", "Sin cambio en el apetito", "Pérdida de apetito", "Siempre hambriento"] },
      associated: { question: "¿Tiene alguno de estos?", options: ["Fatiga", "Fiebre", "Sudores nocturnos", "Cambios en los hábitos intestinales", "Náuseas/vómitos", "Aumento de sed", "Orinar frecuentemente", "Cambios de humor", "Ninguno de estos"] }
    },
    
    nonspecific: {
      severity: { question: "¿Qué tan preocupante es esta sensación?", min: "Levemente preocupante", max: "Muy preocupante" },
      duration: { question: "¿Cuánto tiempo se ha sentido así?", options: ["Recién comenzó hoy", "Pocos días", "1-2 semanas", "Varias semanas", "Más tiempo"] },
      symptoms: { question: "¿Puede identificar algún síntoma específico?", options: ["Fatiga/cansancio", "Dolor en algún lugar", "Mareos", "Náusea", "Dolor de cabeza", "Dificultad para respirar", "Molestia en el pecho", "Ansiedad/nerviosismo", "Sin síntomas específicos, solo me siento mal"] },
      location: { question: "¿Alguna área particular del cuerpo se siente mal?", options: ["Cabeza", "Pecho", "Estómago/abdomen", "Brazos/piernas", "Todo el cuerpo", "No puedo precisar"] },
      impact: { question: "¿Cómo afecta sus actividades diarias?", options: ["No puedo hacer actividades normales", "Luchando pero manejando", "Puedo funcionar pero me siento mal", "Impacto mínimo"] }
    }
  }
};
