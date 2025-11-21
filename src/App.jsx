import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Clock, DollarSign, MapPin, Phone, CheckCircle, ArrowRight } from 'lucide-react';
export default function App() {
  const [step, setStep] = useState('input');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    setStep('analyzing');

    const userMessage = {
      role: "user",
      content: `I need you to act as a medical triage assistant. Analyze these symptoms and determine if the person should go to the Emergency Room, Urgent Care, or can handle this at home.

Symptoms: ${symptoms}

Provide your response in the following JSON format ONLY. Do not include any text outside the JSON:
{
  "recommendation": "ER" or "URGENT_CARE" or "HOME_CARE",
  "severity": "Critical" or "Moderate" or "Minor",
  "reasoning": "Brief explanation of why this recommendation",
  "redFlags": ["list", "of", "concerning", "symptoms"],
  "timeframe": "How quickly they should seek care",
  "estimatedCost": {"er": "range", "urgentCare": "range", "homeCare": "range"},
  "whatToExpect": "What will happen at the recommended facility",
  "alternatives": "When to escalate to higher level of care"
}

IMPORTANT: 
- Be conservative with safety - when in doubt, recommend higher level of care
- Look for red flags like chest pain, difficulty breathing, severe bleeding, altered consciousness
- Consider severity, duration, and progression of symptoms
- Your entire response must be valid JSON only, no other text`
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

      const data = await response.json();
      let responseText = data.content[0].text;
      
      // Strip markdown code blocks if present
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
      setResult({
        recommendation: "ER",
        severity: "Unknown",
        reasoning: "Unable to analyze symptoms. When in doubt, please call 911 or visit the nearest Emergency Room.",
        redFlags: ["Unable to complete analysis"],
        timeframe: "Immediately if symptoms are severe",
        estimatedCost: {
          er: "$1,500 - $3,000",
          urgentCare: "$150 - $300",
          homeCare: "$0 - $50"
        },
        whatToExpect: "Please consult with a medical professional.",
        alternatives: "Call 911 for life-threatening emergencies."
      });
      setStep('results');
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationColor = (rec) => {
    if (rec === 'ER') return 'bg-red-50 border-red-300';
    if (rec === 'URGENT_CARE') return 'bg-yellow-50 border-yellow-300';
    return 'bg-green-50 border-green-300';
  };

  const getRecommendationIcon = (rec) => {
    if (rec === 'ER') return 'text-red-600';
    if (rec === 'URGENT_CARE') return 'text-yellow-600';
    return 'text-green-600';
  };

  const resetTool = () => {
    setStep('input');
    setSymptoms('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ER or Urgent Care?
          </h1>
          <p className="text-lg text-gray-600">
            Get instant AI-powered guidance on where to seek medical care
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Save thousands by making the right choice
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {step === 'input' && (
            <div>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  What symptoms are you experiencing?
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Example: I have severe chest pain that radiates to my left arm, shortness of breath, and I'm sweating..."
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-32 text-base"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      analyzeSymptoms();
                    }
                  }}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Be as detailed as possible. Include when symptoms started, severity, and any other relevant information.
                </p>
              </div>

              <button
                onClick={analyzeSymptoms}
                disabled={!symptoms.trim()}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                Analyze My Symptoms
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Emergency Warning */}
              <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-red-900 mb-1">
                      🚨 Call 911 Immediately If You Experience:
                    </p>
                    <ul className="text-red-800 space-y-1">
                      <li>• Chest pain or pressure</li>
                      <li>• Difficulty breathing or shortness of breath</li>
                      <li>• Sudden severe headache or vision changes</li>
                      <li>• Loss of consciousness or severe confusion</li>
                      <li>• Severe bleeding that won't stop</li>
                      <li>• Suspected stroke symptoms (face drooping, arm weakness, speech difficulty)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'analyzing' && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
              <p className="text-xl font-semibold text-gray-900">
                Analyzing your symptoms...
              </p>
              <p className="text-gray-600 mt-2">
                Our AI is reviewing your information
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
                      Recommendation: {result.recommendation.replace('_', ' ')}
                    </h2>
                    <p className="text-lg text-gray-700 mb-3">
                      Severity: <span className="font-semibold">{result.severity}</span>
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
                  <p className="font-semibold text-gray-900">Timeframe:</p>
                  <p className="text-gray-700">{result.timeframe}</p>
                </div>
              </div>

              {/* Red Flags */}
              {result.redFlags && result.redFlags.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg mb-6">
                  <p className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Warning Signs Identified:
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
                    Emergency Room
                  </p>
                  <p className="text-2xl font-bold text-red-600">{result.estimatedCost.er}</p>
                  <p className="text-sm text-gray-600 mt-1">Average cost</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-yellow-600" />
                    Urgent Care
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">{result.estimatedCost.urgentCare}</p>
                  <p className="text-sm text-gray-600 mt-1">Average cost</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Home Care
                  </p>
                  <p className="text-2xl font-bold text-green-600">{result.estimatedCost.homeCare}</p>
                  <p className="text-sm text-gray-600 mt-1">OTC/Telehealth</p>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  What to Expect:
                </p>
                <p className="text-gray-700">{result.whatToExpect}</p>
              </div>

              {/* Alternatives */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <span className="font-bold">Important Note:</span>
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
                  Talk to a Doctor Now ($0 with insurance)
                </a>
                <a
                  href="https://www.google.com/maps/search/urgent+care+near+me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-4 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  Find Nearest Facility
                </a>
              </div>

              {/* Amazon Affiliate Products Section */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Recommended Health & Safety Products
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Be prepared for emergencies with these essential health monitoring and first aid supplies:
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
                      <h4 className="font-bold text-gray-800 mb-1">First Aid Kit</h4>
                      <p className="text-xs text-gray-500 mb-3">OSHA-Compliant • 260 Pieces</p>
                      <p className="text-sm text-gray-600 mb-4">
                        Complete emergency kit for home, car, and workplace. Be prepared for minor injuries and emergencies.
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
                        View on Amazon →
                      </a>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        ⭐⭐⭐⭐⭐ #1 Best Seller
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
                      <h4 className="font-bold text-gray-800 mb-1">Digital Thermometer</h4>
                      <p className="text-xs text-gray-500 mb-3">No-Touch • Forehead & Object</p>
                      <p className="text-sm text-gray-600 mb-4">
                        Accurate fever detection for adults and kids. No-contact technology with fever alarm and silent mode.
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
                        View on Amazon →
                      </a>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        ⭐⭐⭐⭐⭐ Essential for Fevers
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
                      <h4 className="font-bold text-gray-800 mb-1">Blood Pressure Monitor</h4>
                      <p className="text-xs text-gray-500 mb-3">OMRON • #1 Doctor Recommended</p>
                      <p className="text-sm text-gray-600 mb-4">
                        Clinically validated home monitor. Easy-to-use upper arm cuff for accurate BP readings.
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
                        View on Amazon →
                      </a>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        ⭐⭐⭐⭐⭐ Clinically Validated
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-6 text-center">
                  <span className="font-semibold">Disclosure:</span> As an Amazon Associate, we earn from qualifying purchases. These recommendations help support our free medical guidance tool.
                </p>
              </div>

              {/* New Analysis Button */}
              <button
                onClick={resetTool}
                className="w-full bg-gray-200 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors mt-6"
              >
                Analyze Different Symptoms
              </button>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-white rounded-lg p-6 mb-6 text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-2">Medical Disclaimer:</p>
          <p>
            This tool provides general guidance only and is not a substitute for professional medical advice, 
            diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider 
            with any questions you may have regarding a medical condition. If you think you may have a medical 
            emergency, call 911 immediately.
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg p-6 text-center">
          <p className="text-3xl font-bold text-blue-600 mb-2">$2,345</p>
          <p className="text-gray-600">Average amount saved by choosing Urgent Care over ER for non-emergencies</p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <p className="text-2xl font-bold text-gray-900">127M</p>
              <p className="text-sm text-gray-600">Annual ER visits in US</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">30%</p>
              <p className="text-sm text-gray-600">Could be treated at Urgent Care</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">$1.5K</p>
              <p className="text-sm text-gray-600">Avg ER copay</p>
            </div>
          </div>
        </div>

       {/* Enhanced Footer with Legal Links */}
<div className="bg-white rounded-lg p-6 text-center border-t-2 border-gray-200 mt-8">
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 text-sm">
    <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
      About Us
    </Link>
    <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
      Contact
    </Link>
    <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
      Privacy Policy
    </Link>
    <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
      Terms & Conditions
    </Link>
    <Link to="/affiliate-disclosure" className="text-gray-600 hover:text-blue-600 transition-colors">
      Affiliate Disclosure
    </Link>
  </div>
  <p className="text-gray-600 text-sm">
    © 2024 ER vs Urgent Care Tool. Not affiliated with any medical facility.
  </p>
  <p className="text-gray-500 text-xs mt-2">
    This tool provides general information only and is not a substitute for professional medical advice.
  </p>
</div>
</div>
    </div>
  );
}