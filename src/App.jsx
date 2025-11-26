// App.jsx
// Complete ER vs Urgent Care tool with Visual Body Diagram

import { useState } from 'react';
import BodyDiagram from './components/BodyDiagram';
import { detectVagueSymptom, formatFollowUpAnswers } from './vagueSymptomDetection';
import { detect911Emergency } from './emergencyDetection';
import { translations } from './translations';

function App() {
  const [step, setStep] = useState('input'); // 'input', 'visual', 'followup', 'analyzing', 'results'
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState('en');
  const [vagueResult, setVagueResult] = useState(null);
  const [followUpAnswers, setFollowUpAnswers] = useState({});
  
  // Visual picker state
  const [useVisualPicker, setUseVisualPicker] = useState(true);
  const [selectedBodyRegions, setSelectedBodyRegions] = useState([]);
  const [showTextInput, setShowTextInput] = useState(false);

  const t = translations[language];

  // Analyze symptoms from visual selection
  const analyzeFromVisualSelection = async () => {
    if (selectedBodyRegions.length === 0) return;
    
    // Get all unique symptoms from selected regions
    const allSymptoms = selectedBodyRegions
      .flatMap(region => region.symptoms)
      .filter((symptom, index, self) => self.indexOf(symptom) === index);
    
    // Map symptom categories to text that will trigger vague detection
    const symptomCategoryMap = {
      'fatigue': 'tired all the time',
      'fever': 'fever and chills',
      'anxiety': 'feeling anxious',
      'sleep': 'trouble sleeping',
      'nausea': 'nausea and vomiting',
      'skin': 'skin rash',
      'headache': 'headache',
      'chest': 'chest pain',
      'breathing': 'shortness of breath',
      'abdominal': 'stomach pain',
      'back': 'back pain',
      'joint': 'joint pain',
      'numbness': 'numbness and tingling',
      'urinary': 'urinary problems',
      'dizziness': 'dizziness'
    };
    
    // Priority: if only one symptom category, trigger vague detection with mapped text
    if (allSymptoms.length === 1) {
      const symptomCategory = allSymptoms[0];
      const mappedText = symptomCategoryMap[symptomCategory] || symptomCategory;
      
      // Trigger follow-up questions using the mapped text
      const vagueCheck = detectVagueSymptom(mappedText);
      
      if (vagueCheck.isVague) {
        setSymptoms(mappedText);
        setVagueResult(vagueCheck);
        setStep('followup');
        return;
      }
    }
    
    // Create a descriptive symptom text from region names for Claude
    const symptomDescription = selectedBodyRegions
      .map(r => {
        const name = r.name.toLowerCase();
        // Use the mapped descriptions
        if (name.includes('fatigue') || name.includes('tired')) return 'feeling very tired and fatigued';
        if (name.includes('fever') || name.includes('chills') || name.includes('fiebre')) return 'fever and chills';
        if (name.includes('anxiety') || name.includes('stress') || name.includes('ansiedad')) return 'feeling anxious and stressed';
        if (name.includes('sleep') || name.includes('sueño')) return 'having trouble sleeping';
        if (name.includes('nausea') || name.includes('náuseas')) return 'nausea and feeling sick';
        if (name.includes('skin') || name.includes('rash') || name.includes('piel')) return 'skin rash or irritation';
        // Default for body parts
        return `pain in ${name}`;
      })
      .join(', ');
    
    setSymptoms(symptomDescription);
    setStep('analyzing');
    
    // Continue with normal Claude analysis
    setTimeout(() => {
      analyzeSymptoms(symptomDescription);
    }, 100);
  };

  // Main analysis function
  const analyzeSymptoms = async (symptomsToAnalyze = null) => {
    const symptomsText = symptomsToAnalyze || symptoms;
    
    if (!symptomsText.trim()) {
      alert('Please describe your symptoms');
      return;
    }

    setStep('analyzing');

    // Check for 911 emergencies first
    const emergencyCheck = detect911Emergency(symptomsText);
    if (emergencyCheck.isEmergency) {
      setResult({
        recommendation: 'EMERGENCY_911',
        severity: 'Critical',
        reasoning: emergencyCheck.reasoning,
        redFlags: emergencyCheck.patterns,
        timeframe: 'CALL 911 IMMEDIATELY',
        emergencyType: emergencyCheck.category
      });
      setStep('results');
      return;
    }

    // Combine follow-up answers if available
    let combinedSymptoms = symptomsText;
    if (Object.keys(followUpAnswers).length > 0) {
      combinedSymptoms = symptomsText + formatFollowUpAnswers(followUpAnswers);
    }

    // Check for vague symptoms (only if no follow-up answers yet)
    if (!symptomsToAnalyze && Object.keys(followUpAnswers).length === 0) {
      const vagueCheck = detectVagueSymptom(symptomsText);
      
      // Check for invalid input first
      if (vagueCheck.invalidInput) {
        setResult({
          recommendation: "INVALID_INPUT",
          severity: "N/A",
          reasoning: vagueCheck.message || "Please describe your symptoms in words. For example: 'headache', 'stomach pain', 'feeling tired', etc.",
          redFlags: [],
          timeframe: "Please provide valid symptoms",
          estimatedCost: {
            er: "N/A",
            urgentCare: "N/A",
            homeCare: "N/A"
          },
          whatToExpect: "This tool helps you decide where to seek care based on your symptoms. Please describe what you're experiencing in your own words.",
          alternatives: "Try describing your symptoms like: 'I have a headache', 'My stomach hurts', 'I feel tired', 'I can't sleep', etc."
        });
        setStep('results');
        return;
      }
      
      if (vagueCheck.isVague) {
        console.log('VAGUE SYMPTOM DETECTED:', {
          category: vagueCheck.category,
          pattern: vagueCheck.matchedPattern
        });
        
        setVagueResult(vagueCheck);
        setStep('followup');
        return;
      }
    }

    // Call Claude API
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `You are a medical triage assistant. Based on these symptoms, recommend whether the person should go to the ER, Urgent Care, or can treat at home.

Symptoms: ${combinedSymptoms}

Respond in this EXACT JSON format (no markdown, no backticks, just raw JSON):
{
  "recommendation": "ER" or "URGENT_CARE" or "HOME_CARE",
  "severity": "Critical" or "Moderate" or "Mild",
  "reasoning": "Brief explanation",
  "redFlags": ["list", "of", "warning", "signs"],
  "timeframe": "When to seek care",
  "estimatedCost": {
    "er": "$X,XXX-$X,XXX",
    "urgentCare": "$XXX-$XXX",
    "homeCare": "$XX-$XXX"
  },
  "whatToExpect": "What happens at recommended facility",
  "alternatives": "Other options to consider"
}

IMPORTANT: Output ONLY valid JSON, no other text.`
            }
          ]
        })
      });

      const data = await response.json();
      let responseText = data.content[0].text;
      
      // Strip markdown code blocks if present
      responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const analysis = JSON.parse(responseText);
      setResult(analysis);
      setStep('results');
      
    } catch (error) {
      console.error('Error:', error);
      setResult({
        recommendation: 'ER',
        severity: 'Unknown',
        reasoning: 'Unable to analyze symptoms. When in doubt, please call 911 or visit the nearest Emergency Room.',
        redFlags: ['Unable to complete analysis'],
        timeframe: 'Immediately if symptoms are severe'
      });
      setStep('results');
    }
  };

  // Handle follow-up question answers
  const handleFollowUpSubmit = () => {
    setStep('analyzing');
    analyzeSymptoms();
  };

  // Reset and start over
  const resetApp = () => {
    setStep('input');
    setSymptoms('');
    setResult(null);
    setVagueResult(null);
    setFollowUpAnswers({});
    setSelectedBodyRegions([]);
    setShowTextInput(false);
  };

  const getRecommendationColor = (rec) => {
    if (rec === 'ER' || rec === 'EMERGENCY_911') return 'bg-red-50 border-red-300';
    if (rec === 'URGENT_CARE') return 'bg-yellow-50 border-yellow-300';
    if (rec === 'INVALID_INPUT') return 'bg-gray-50 border-gray-300';
    return 'bg-green-50 border-green-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t.title}
              </h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {language === 'en' ? '🇪🇸 Español' : '🇺🇸 English'}
            </button>
          </div>
        </div>

        {/* VISUAL SYMPTOM PICKER */}
        {step === 'input' && useVisualPicker && !showTextInput && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <BodyDiagram
              selectedRegions={selectedBodyRegions}
              onRegionSelect={setSelectedBodyRegions}
              language={language}
            />
            
            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {selectedBodyRegions.length > 0 && (
                <button
                  onClick={analyzeFromVisualSelection}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  {language === 'es' 
                    ? `Continuar con ${selectedBodyRegions.length} área${selectedBodyRegions.length > 1 ? 's' : ''} seleccionada${selectedBodyRegions.length > 1 ? 's' : ''} →`
                    : `Continue with ${selectedBodyRegions.length} selected area${selectedBodyRegions.length > 1 ? 's' : ''} →`
                  }
                </button>
              )}
              
              <button
                onClick={() => setShowTextInput(true)}
                className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 transition-all"
              >
                {language === 'es' ? '✍️ Describir síntomas en su lugar' : '✍️ Describe symptoms instead'}
              </button>
            </div>
          </div>
        )}

        {/* TEXT SYMPTOM INPUT */}
        {step === 'input' && (!useVisualPicker || showTextInput) && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t.inputPrompt}
            </h2>
            
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder={t.placeholder}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-[150px] text-lg"
            />

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => analyzeSymptoms()}
                disabled={!symptoms.trim()}
                className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {t.analyzeButton}
              </button>
            </div>

            {/* Back to visual picker option */}
            {showTextInput && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowTextInput(false)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  ← Back to visual picker
                </button>
              </div>
            )}
          </div>
        )}

        {/* FOLLOW-UP QUESTIONS */}
        {step === 'followup' && vagueResult && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              A few quick questions to help us understand better:
            </h2>

            <div className="space-y-6">
              {vagueResult.questions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-200 pb-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    {index + 1}. {question.question}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </label>

                  {question.type === 'choice' && (
                    <select
                      value={followUpAnswers[question.id] || ''}
                      onChange={(e) => setFollowUpAnswers({
                        ...followUpAnswers,
                        [question.id]: e.target.value
                      })}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select an option...</option>
                      {question.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}

                  {question.type === 'scale' && (
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={question.min}
                        max={question.max}
                        value={followUpAnswers[question.id] || question.min}
                        onChange={(e) => setFollowUpAnswers({
                          ...followUpAnswers,
                          [question.id]: e.target.value
                        })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{question.minLabel}</span>
                        <span className="font-bold text-lg text-blue-600">
                          {followUpAnswers[question.id] || question.min}
                        </span>
                        <span>{question.maxLabel}</span>
                      </div>
                    </div>
                  )}

                  {question.type === 'checkbox' && (
                    <div className="space-y-2">
                      {question.options.map(option => (
                        <label key={option} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(followUpAnswers[question.id] || []).includes(option)}
                            onChange={(e) => {
                              const current = followUpAnswers[question.id] || [];
                              const updated = e.target.checked
                                ? [...current, option]
                                : current.filter(item => item !== option);
                              setFollowUpAnswers({
                                ...followUpAnswers,
                                [question.id]: updated
                              });
                            }}
                            className="w-5 h-5 text-blue-600 rounded"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleFollowUpSubmit}
                className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Get Recommendation →
              </button>
              <button
                onClick={resetApp}
                className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* ANALYZING */}
        {step === 'analyzing' && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-700">Analyzing your symptoms...</p>
          </div>
        )}

        {/* RESULTS */}
        {step === 'results' && result && (
          <div className={`rounded-2xl shadow-xl p-8 border-4 ${getRecommendationColor(result.recommendation)}`}>
            {/* 911 Emergency Alert */}
            {result.recommendation === 'EMERGENCY_911' && (
              <div className="bg-red-600 text-white p-6 rounded-xl mb-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">🚨</div>
                  <div>
                    <h2 className="text-3xl font-bold">CALL 911 IMMEDIATELY</h2>
                    <p className="text-xl mt-2">This may be a life-threatening emergency</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Recommendation: {result.recommendation.replace('_', ' ')}
              </h2>
              <p className="text-xl text-gray-700">
                Severity: <span className="font-semibold">{result.severity}</span>
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Why:</h3>
                <p className="text-gray-700 leading-relaxed">{result.reasoning}</p>
              </div>

              {result.timeframe && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Timeframe:</h3>
                  <p className="text-gray-700">{result.timeframe}</p>
                </div>
              )}

              {result.redFlags && result.redFlags.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Warning Signs Identified:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {result.redFlags.map((flag, index) => (
                      <li key={index}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.estimatedCost && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Estimated Costs:</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-white rounded-lg border border-gray-300">
                      <p className="font-semibold text-gray-700">ER</p>
                      <p className="text-lg">{result.estimatedCost.er}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-gray-300">
                      <p className="font-semibold text-gray-700">Urgent Care</p>
                      <p className="text-lg">{result.estimatedCost.urgentCare}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-gray-300">
                      <p className="font-semibold text-gray-700">Home Care</p>
                      <p className="text-lg">{result.estimatedCost.homeCare}</p>
                    </div>
                  </div>
                </div>
              )}

              {result.whatToExpect && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">What to Expect:</h3>
                  <p className="text-gray-700 leading-relaxed">{result.whatToExpect}</p>
                </div>
              )}

              {result.alternatives && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Other Options:</h3>
                  <p className="text-gray-700 leading-relaxed">{result.alternatives}</p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <button
                onClick={resetApp}
                className="w-full px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Analyze Different Symptoms
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
              <p className="font-semibold mb-2">⚠️ Important Disclaimer:</p>
              <p>
                This tool provides general guidance only and is not a substitute for professional medical advice, 
                diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider 
                with any questions you may have regarding a medical condition. In case of emergency, call 911 immediately.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
