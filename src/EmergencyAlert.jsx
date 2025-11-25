// EmergencyAlert.jsx - WITH LANGUAGE SUPPORT
// Emergency 911 alert component

import React from 'react';
import { AlertTriangle, Phone } from 'lucide-react';

export default function EmergencyAlert({ emergencyResult, language = 'en', translations }) {
  // Get translations (fallback to English if not provided)
  const t = translations || {
    title: "🚨 MEDICAL EMERGENCY 🚨",
    callButton: "📞 CALL 911 NOW",
    doNotDrive: "⚠️ DO NOT DRIVE YOURSELF",
    stopUsing: "🛑 STOP USING THIS TOOL",
    onlyAction: "Your ONLY action should be calling 911",
    whileWaiting: "While waiting for 911:"
  };

  // Get emergency type translations
  const getEmergencyTypeTranslations = (category) => {
    if (!translations || !translations[category]) {
      // Fallback English translations
      const fallbackTranslations = {
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
      };
      return fallbackTranslations[category] || fallbackTranslations.cardiac;
    }
    return translations[category];
  };

  const emergencyType = getEmergencyTypeTranslations(emergencyResult.category);

  // Handle call 911 click
  const handleCall911 = () => {
    // On mobile devices, this will open the phone dialer
    window.location.href = 'tel:911';
  };

  return (
    <div className="min-h-screen bg-red-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Alert Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 border-8 border-red-700">
          {/* Emergency Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 rounded-full p-6 animate-pulse">
              <AlertTriangle className="w-24 h-24 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-red-900 mb-6 animate-pulse">
            {t.title}
          </h1>

          {/* Emergency Type */}
          <div className="bg-red-50 border-4 border-red-300 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-red-900 mb-4 text-center">
              {emergencyType.title}
            </h2>
            <p className="text-lg text-red-800 font-semibold text-center">
              {emergencyResult.emergencyMessage}
            </p>
          </div>

          {/* Call 911 Button */}
          <button
            onClick={handleCall911}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-2xl font-bold py-6 px-8 rounded-lg transition-colors mb-6 flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 transition-transform"
          >
            <Phone className="w-8 h-8" />
            {t.callButton}
          </button>

          {/* Critical Warnings */}
          <div className="space-y-4 mb-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-lg font-bold text-gray-900">
                {t.doNotDrive}
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-lg font-bold text-gray-900">
                {t.stopUsing}
              </p>
              <p className="text-gray-700 mt-1">
                {t.onlyAction}
              </p>
            </div>
          </div>

          {/* Instructions While Waiting */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              {t.whileWaiting}
            </h3>
            <ul className="space-y-2 text-gray-800">
              <li className="text-base">{emergencyType.instruction1}</li>
              <li className="text-base">{emergencyType.instruction2}</li>
              <li className="text-base">{emergencyType.instruction3}</li>
              <li className="text-base">{emergencyType.instruction4}</li>
            </ul>
          </div>
        </div>

        {/* Additional Emergency Numbers */}
        {(emergencyResult.category === 'poisoning' || emergencyResult.category === 'consciousness') && (
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              {language === 'es' ? 'Números de emergencia adicionales:' : 'Additional emergency numbers:'}
            </p>
            {emergencyResult.category === 'poisoning' && (
              <p className="text-lg font-semibold text-gray-900">
                {language === 'es' ? 'Control de Envenenamientos:' : 'Poison Control:'} 1-800-222-1222
              </p>
            )}
            {emergencyResult.category === 'consciousness' && emergencyResult.matchedPattern.includes('suicid') && (
              <p className="text-lg font-semibold text-gray-900">
                {language === 'es' ? 'Prevención del Suicidio:' : 'Suicide Prevention:'} 988
              </p>
            )}
          </div>
        )}

        {/* Legal Protection Log */}
        <div className="text-center text-white text-xs mt-4 opacity-75">
          {language === 'es' 
            ? 'Emergencia detectada y registrada. Se mostró una alerta 911 apropiada.'
            : 'Emergency detected and logged. Appropriate 911 alert shown.'}
        </div>
      </div>
    </div>
  );
}
