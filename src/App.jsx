import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Clock, DollarSign, MapPin, Phone, CheckCircle, ArrowRight } from 'lucide-react';
import { detectEmergency, generateEmergencyResult } from './emergencyDetection';
import EmergencyAlert from './EmergencyAlert';
import { detectVagueSymptom } from './vagueSymptomDetection';
import FollowUpQuestions from './FollowUpQuestions';
import translations from './translations';
import LanguageToggle from './LanguageToggle';

export default function App() {
  const [step, setStep] = useState('input');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isEmergency, setIsEmergency] = useState(false);
  const [vagueResult, setVagueResult] = useState(null);
  const [followUpAnswers, setFollowUpAnswers] = useState(null);
  const [language, setLanguage] = useState('en'); // 'en' or 'es'

  // Get translations for current language
  const t = translations[language];

  const analyzeSymptoms = async (combinedSymptoms = null) => {
    const symptomsToAnalyze = combinedSymptoms || symptoms;
    
    console.log('=== ANALYZE SYMPTOMS CALLED ===');
    console.log('combinedSymptoms param:', combinedSymptoms);
    console.log('symptoms state:', symptoms);
    console.log('symptomsToAnalyze:', symptomsToAnalyze);
    console.log('symptomsToAnalyze length:', symptomsToAnalyze.length);
    console.log('language:', language);
    
    if (!symptomsToAnalyze.trim()) return;

    // 🚨 EMERGENCY DETECTION FIRST
    const emergencyCheck = detectEmergency(symptomsToAnalyze);
    
    if (emergencyCheck.isEmergency) {
      const emergencyResult = generateEmergencyResult(emergencyCheck);
      setResult(emergencyResult);
      setIsEmergency(true);
      setStep('emergency');
      
      console.log('EMERGENCY DETECTED:', {
        timestamp: new Date().toISOString(),
        symptoms: symptomsToAnalyze,
        category: emergencyCheck.category,
        pattern: emergencyCheck.matchedPattern
      });
      
      return;
    }

    // 🤔 CHECK FOR VAGUE SYMPTOMS (only if no follow-up answers yet)
 // 🤔 CHECK FOR VAGUE SYMPTOMS (only if no follow-up answers yet)
if (!combinedSymptoms) {
  const vagueCheck = detectVagueSymptom(symptomsToAnalyze);
  
  // Check for invalid input first (like "111111" or "asdfgh")
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

    // NOT emergency, NOT vague - proceed with AI
    setLoading(true);
    setStep('analyzing');

    // Create language-specific prompt
    const promptLanguage = language === 'es' ? 'Spanish' : 'English';
    const userMessage = {
      role: "user",
      content: `I need you to act as a medical triage assistant. Analyze these symptoms and determine if the person should go to the Emergency Room, Urgent Care, or can handle this at home.

Symptoms: ${symptomsToAnalyze}

IMPORTANT INSTRUCTIONS:
- Respond in ${promptLanguage}
- Be VERY conservative with safety - when in doubt, recommend ER
- Look for red flags like severe pain, bleeding, breathing issues, chest symptoms
- Consider ALL information provided including any clarifying details
- NEVER downplay potentially serious symptoms

Provide your response in the following JSON format ONLY. Do not include any text outside the JSON:
{
  "recommendation": "ER" or "URGENT_CARE" or "HOME_CARE",
  "severity": "Critical" or "Moderate" or "Minor",
  "reasoning": "Brief explanation of why this recommendation (in ${promptLanguage})",
  "redFlags": ["list", "of", "concerning", "symptoms (in ${promptLanguage})"],
  "timeframe": "How quickly they should seek care (in ${promptLanguage})",
  "estimatedCost": {"er": "range", "urgentCare": "range", "homeCare": "range"},
  "whatToExpect": "What will happen at the recommended facility (in ${promptLanguage})",
  "alternatives": "When to escalate to higher level of care (in ${promptLanguage})"
}

CRITICAL: Your entire response must be valid JSON only, no other text. All text fields must be in ${promptLanguage}.`
    };

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...conversationHistory, userMessage]
        })
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const text = await response.text();
      console.log('Response text:', text);

      if (!text) {
        throw new Error('Empty response from API');
      }

      const data = JSON.parse(text);
      console.log('Parsed data:', data);
      
      let responseText = data.content[0].text;
      
      responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      
      const analysis = JSON.parse(responseText);
      
      setResult(analysis);
      setConversationHistory([...conversationHistory, userMessage, {
        role: "assistant",
        content: responseText
      }]);
      setStep('results');
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      
      // Error message in current language
      const errorReasoning = language === 'es' 
        ? "No se pudieron analizar los síntomas. En caso de duda, llame al 911 o visite la sala de emergencias más cercana."
        : "Unable to analyze symptoms. When in doubt, please call 911 or visit the nearest Emergency Room.";
      
      const errorFlag = language === 'es'
        ? "No se pudo completar el análisis"
        : "Unable to complete analysis";
      
      const errorTimeframe = language === 'es'
        ? "Inmediatamente si los síntomas son graves"
        : "Immediately if symptoms are severe";
      
      const errorExpect = language === 'es'
        ? "Consulte con un profesional médico."
        : "Please consult with a medical professional.";
      
      const errorAlternatives = language === 'es'
        ? "Llame al 911 para emergencias que ponen en peligro la vida."
        : "Call 911 for life-threatening emergencies.";
      
      setResult({
        recommendation: "ER",
        severity: "Unknown",
        reasoning: errorReasoning,
        redFlags: [errorFlag],
        timeframe: errorTimeframe,
        estimatedCost: {
          er: "$1,500 - $3,000",
          urgentCare: "$150 - $300",
          homeCare: "$0 - $50"
        },
        whatToExpect: errorExpect,
        alternatives: errorAlternatives
      });
      setStep('results');
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUpComplete = (answers) => {
    setFollowUpAnswers(answers);
    
    let formattedAnswers = language === 'es' 
      ? '\n\nDETALLES ADICIONALES DEL PACIENTE:\n'
      : '\n\nADDITIONAL PATIENT DETAILS:\n';
    
    const labelMap = t.followUp.labels;
    
    for (const [questionId, answer] of Object.entries(answers)) {
      const label = labelMap[questionId] || questionId;
      
      if (Array.isArray(answer)) {
        if (answer.length > 0) {
          formattedAnswers += `- ${label}: ${answer.join(', ')}\n`;
        }
      } else {
        formattedAnswers += `- ${label}: ${answer}\n`;
      }
    }
    
    const importantNote = language === 'es'
      ? '\nIMPORTANTE: Analice TODA la información anterior al hacer su recomendación.\n'
      : '\nIMPORTANT: Please analyze ALL of the above information together when making your recommendation.\n';
    
    formattedAnswers += importantNote;
    
    const combinedSymptoms = symptoms + formattedAnswers;
    
    console.log('FOLLOW-UP ANSWERS:', answers);
    console.log('FORMATTED TEXT:', formattedAnswers);
    console.log('COMBINED SYMPTOMS:', combinedSymptoms);
    
    analyzeSymptoms(combinedSymptoms);
  };

  const handleFollowUpBack = () => {
    setStep('input');
    setVagueResult(null);
    setFollowUpAnswers(null);
  };

 const getRecommendationColor = (rec) => {
  if (rec === 'ER' || rec === 'EMERGENCY_911') return 'bg-red-50 border-red-300';
  if (rec === 'URGENT_CARE') return 'bg-yellow-50 border-yellow-300';
  if (rec === 'INVALID_INPUT') return 'bg-gray-50 border-gray-300';
  return 'bg-green-50 border-green-300';
};

  const getRecommendationIcon = (rec) => {
    if (rec === 'ER' || rec === 'EMERGENCY_911') return 'text-red-600';
    if (rec === 'URGENT_CARE') return 'text-yellow-600';
    return 'text-green-600';
  };

  const resetTool = () => {
    setStep('input');
    setSymptoms('');
    setResult(null);
    setIsEmergency(false);
    setVagueResult(null);
    setFollowUpAnswers(null);
  };

  if (isEmergency && result) {
    return <EmergencyAlert emergencyResult={result} language={language} translations={t.emergencyAlert} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Language Toggle */}
      <LanguageToggle 
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600">
            {t.subtitle}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t.savingsText}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {step === 'input' && (
            <div>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  {t.inputLabel}
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder={t.inputPlaceholder}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-32 text-base"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      analyzeSymptoms();
                    }
                  }}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {t.inputHelper}
                </p>
              </div>

              <button
                onClick={() => analyzeSymptoms()}
                disabled={!symptoms.trim()}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {t.analyzeButton}
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Emergency Warning - Enhanced */}
              <div className="mt-6 p-6 bg-red-50 border-4 border-red-600 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold text-red-900 mb-3 text-lg">
                      {t.emergencyTitle}
                    </p>
                    <ul className="text-red-800 space-y-2 font-semibold">
                      {t.emergencyItems.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                    <p className="mt-4 text-red-900 font-bold text-base">
                      {t.emergencyWarning}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'followup' && vagueResult && (
            <FollowUpQuestions
              vagueResult={vagueResult}
              onComplete={handleFollowUpComplete}
              onBack={handleFollowUpBack}
              language={language}
              translations={t.followUp}
            />
          )}

          {step === 'analyzing' && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
              <p className="text-xl font-semibold text-gray-900">
                {t.analyzing}
              </p>
              <p className="text-gray-600 mt-2">
                {t.analyzingSubtext}
              </p>
            </div>
          )}

          {step === 'results' && result && (
            <div>
              {/* Main Recommendation */}
              <div className={`p-6 rounded-xl border-2 mb-6 ${getRecommendationColor(result.recommendation)}`}>
                <div className="flex items-start gap-4">
                  <AlertCircle className={`w-12 h-12 ${getRecommendationIcon(result.recommendation)} flex-shrink-0`} />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {t.results.recommendation} {result.recommendation.replace('_', ' ')}
                    </h2>
                    <p className="text-lg text-gray-700 mb-3">
                      {t.results.severity} <span className="font-semibold">{result.severity}</span>
                    </p>
                    <p className="text-base text-gray-800 leading-relaxed">
                      {result.reasoning}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeframe */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">{t.results.timeframe}</p>
                  <p className="text-gray-700">{result.timeframe}</p>
                </div>
              </div>

              {/* Red Flags */}
              {result.redFlags && result.redFlags.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg mb-6">
                  <p className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {t.results.warningSignsTitle}
                  </p>
                  <ul className="space-y-1">
                    {result.redFlags.map((flag, idx) => (
                      <li key={idx} className="text-red-800">• {flag}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cost Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-red-600" />
                    {t.results.emergencyRoom}
                  </p>
                  <p className="text-2xl font-bold text-red-600">{result.estimatedCost.er}</p>
                  <p className="text-sm text-gray-600 mt-1">{t.results.averageCost}</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-yellow-600" />
                    {t.results.urgentCare}
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">{result.estimatedCost.urgentCare}</p>
                  <p className="text-sm text-gray-600 mt-1">{t.results.averageCost}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    {t.results.homeCare}
                  </p>
                  <p className="text-2xl font-bold text-green-600">{result.estimatedCost.homeCare}</p>
                  <p className="text-sm text-gray-600 mt-1">{t.results.otcTelehealth}</p>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  {t.results.whatToExpect}
                </p>
                <p className="text-gray-700">{result.whatToExpect}</p>
              </div>

              {/* Alternatives */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <span className="font-bold">{t.results.importantNote}</span>
                      <br />
                      {result.alternatives}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <a
                  href="https://www.google.com/search?q=telemedicine+online+doctor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white p-4 rounded-lg font-semibold text-center hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {t.results.talkToDoctor}
                </a>
                <a
                  href="https://www.google.com/maps/search/urgent+care+near+me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-4 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  {t.results.findFacility}
                </a>
              </div>

              {/* Amazon Affiliate Products Section */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {t.results.productsTitle}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  {t.results.productsSubtitle}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* First Aid Kit */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="overflow-hidden">
                      <img 
                        src="/images/first-aid-kit.jpg"
                        alt="First Aid Only OSHA-Compliant First Aid Kit, 260 Pieces"
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-1">{t.results.firstAidKit.title}</h4>
                      <p className="text-xs text-gray-500 mb-3">{t.results.firstAidKit.subtitle}</p>
                      <p className="text-sm text-gray-600 mb-4">
                        {t.results.firstAidKit.description}
                      </p>
                      <a 
                        href="https://amzn.to/4iczKz1"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="block w-full text-white font-semibold py-2 px-4 rounded text-center transition-colors"
                        style={{backgroundColor: '#FF9900'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#E88B00'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#FF9900'}
                      >
                        {t.results.viewOnAmazon}
                      </a>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        ⭐⭐⭐⭐⭐ {t.results.firstAidKit.badge}
                      </p>
                    </div>
                  </div>

                  {/* Thermometer */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="overflow-hidden">
                      <img 
                        src="/images/thermometer.jpg"
                        alt="No-Touch Digital Thermometer for Adults and Kids"
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-1">{t.results.thermometer.title}</h4>
                      <p className="text-xs text-gray-500 mb-3">{t.results.thermometer.subtitle}</p>
                      <p className="text-sm text-gray-600 mb-4">
                        {t.results.thermometer.description}
                      </p>
                      <a 
                        href="https://amzn.to/3X9lmxV"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="block w-full text-white font-semibold py-2 px-4 rounded text-center transition-colors"
                        style={{backgroundColor: '#FF9900'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#E88B00'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#FF9900'}
                      >
                        {t.results.viewOnAmazon}
                      </a>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        ⭐⭐⭐⭐⭐ {t.results.thermometer.badge}
                      </p>
                    </div>
                  </div>

                  {/* Blood Pressure Monitor */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="overflow-hidden">
                      <img 
                        src="/images/blood-pressure.jpg"
                        alt="OMRON Blood Pressure Monitor for Home Use"
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-1">{t.results.bloodPressure.title}</h4>
                      <p className="text-xs text-gray-500 mb-3">{t.results.bloodPressure.subtitle}</p>
                      <p className="text-sm text-gray-600 mb-4">
                        {t.results.bloodPressure.description}
                      </p>
                      <a 
                        href="https://amzn.to/48ev3An"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="block w-full text-white font-semibold py-2 px-4 rounded text-center transition-colors"
                        style={{backgroundColor: '#FF9900'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#E88B00'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#FF9900'}
                      >
                        {t.results.viewOnAmazon}
                      </a>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        ⭐⭐⭐⭐⭐ {t.results.bloodPressure.badge}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-6 text-center">
                  <span className="font-semibold">{language === 'es' ? 'Divulgación:' : 'Disclosure:'}</span> {t.results.disclosure}
                </p>
              </div>

              {/* New Analysis Button */}
              <button
                onClick={resetTool}
                className="w-full bg-gray-200 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors mt-6"
              >
                {t.results.newAnalysisButton}
              </button>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-white rounded-lg p-6 mb-6 text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-2">{t.disclaimer.title}</p>
          <p>{t.disclaimer.text}</p>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg p-6 text-center">
          <p className="text-3xl font-bold text-blue-600 mb-2">{t.stats.savings}</p>
          <p className="text-gray-600">{t.stats.savingsText}</p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <p className="text-2xl font-bold text-gray-900">{t.stats.erVisits}</p>
              <p className="text-sm text-gray-600">{t.stats.erVisitsText}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{t.stats.treatable}</p>
              <p className="text-sm text-gray-600">{t.stats.treatableText}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{t.stats.copay}</p>
              <p className="text-sm text-gray-600">{t.stats.copayText}</p>
            </div>
          </div>
        </div>

        {/* Enhanced Footer with Legal Links */}
        <div className="bg-white rounded-lg p-6 text-center border-t-2 border-gray-200 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 text-sm">
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t.footer.aboutUs}
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t.footer.contact}
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t.footer.privacy}
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t.footer.terms}
            </Link>
            <Link to="/affiliate-disclosure" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t.footer.affiliate}
            </Link>
          </div>
          <p className="text-gray-600 text-sm">
            {t.footer.copyright}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            {t.footer.note}
          </p>
        </div>
      </div>
    </div>
  );
}
