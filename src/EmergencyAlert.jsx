// EmergencyAlert.jsx
// Emergency 911 Alert Component

import React from 'react';
import { AlertCircle, Phone, Clock, AlertTriangle } from 'lucide-react';

export default function EmergencyAlert({ emergencyResult }) {
  const handleCall911 = () => {
    // For mobile devices, this will open phone dialer
    window.location.href = 'tel:911';
  };

  const handleCallPoisonControl = () => {
    window.location.href = 'tel:18002221222';
  };

  return (
    <div className="min-h-screen bg-red-900 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Main Emergency Alert */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-red-600 animate-pulse">
          {/* Header */}
          <div className="bg-red-600 text-white p-6 text-center">
            <div className="text-6xl mb-4">{emergencyResult.icon}</div>
            <h1 className="text-3xl font-bold mb-2">
              🚨 MEDICAL EMERGENCY 🚨
            </h1>
            <p className="text-xl font-semibold">
              {emergencyResult.emergencyType}
            </p>
          </div>

          {/* Call 911 Button - HUGE and prominent */}
          <div className="p-8 bg-red-50">
            <button
              onClick={handleCall911}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-8 px-6 rounded-xl font-bold text-3xl shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-4"
            >
              <Phone className="w-12 h-12" />
              CALL 911 NOW
            </button>
            
            <p className="text-center text-red-800 font-bold text-xl mt-4">
              ⚠️ DO NOT DRIVE YOURSELF TO THE HOSPITAL
            </p>
          </div>

          {/* Critical Warning */}
          <div className="bg-yellow-50 border-t-4 border-yellow-400 p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-yellow-900 text-lg mb-2">
                  CRITICAL WARNING:
                </p>
                <p className="text-yellow-800 text-base">
                  {emergencyResult.warning}
                </p>
              </div>
            </div>
          </div>

          {/* Specific Instructions */}
          <div className="p-6 bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-red-600" />
              While Waiting for 911:
            </h2>
            <ul className="space-y-3">
              {emergencyResult.specificInstructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-gray-800 text-base">{instruction}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Red Flags */}
          <div className="p-6 bg-red-50 border-t-2 border-red-200">
            <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Why This Is An Emergency:
            </h3>
            <ul className="space-y-2">
              {emergencyResult.redFlags.map((flag, index) => (
                <li key={index} className="text-red-800 text-sm flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Emergency Numbers */}
          {emergencyResult.category === 'poisoning' && (
            <div className="p-6 bg-blue-50 border-t-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-3">
                Also Call Poison Control:
              </h3>
              <button
                onClick={handleCallPoisonControl}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-bold text-xl flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" />
                1-800-222-1222 (Poison Control)
              </button>
            </div>
          )}

          {emergencyResult.category === 'consciousness' && 
           emergencyResult.matchedPattern?.includes('suicidal') && (
            <div className="p-6 bg-purple-50 border-t-2 border-purple-200">
              <h3 className="font-bold text-purple-900 mb-3">
                Suicide & Crisis Lifeline:
              </h3>
              <button
                onClick={() => window.location.href = 'tel:988'}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-lg font-bold text-xl flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" />
                988 (Suicide Prevention)
              </button>
              <p className="text-purple-800 text-sm mt-2 text-center">
                Available 24/7 • Free • Confidential
              </p>
            </div>
          )}

          {/* Do NOT Use This Tool Further */}
          <div className="p-6 bg-gray-900 text-white text-center">
            <p className="text-xl font-bold mb-2">
              ⛔ STOP USING THIS TOOL
            </p>
            <p className="text-base opacity-90">
              This tool cannot help with medical emergencies. 
              Your only action should be to CALL 911 NOW.
            </p>
          </div>

          {/* Emergency Call Button - Repeat at bottom */}
          <div className="p-6 bg-red-600">
            <button
              onClick={handleCall911}
              className="w-full bg-white hover:bg-gray-100 text-red-600 py-6 px-6 rounded-xl font-bold text-2xl shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-4 border-4 border-red-700"
            >
              <Phone className="w-10 h-10" />
              TAP HERE TO CALL 911
            </button>
          </div>
        </div>

        {/* Bottom Warning */}
        <div className="mt-6 text-center text-white">
          <p className="text-lg font-bold mb-2">
            🚨 This is a medical emergency 🚨
          </p>
          <p className="text-base opacity-90">
            Do not close this page until you have called 911
          </p>
        </div>
      </div>
    </div>
  );
}
