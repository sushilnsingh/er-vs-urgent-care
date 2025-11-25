// LanguageToggle.jsx
// Language switcher component

import React from 'react';
import { Globe } from 'lucide-react';

export default function LanguageToggle({ currentLanguage, onLanguageChange }) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="flex items-center">
          <button
            onClick={() => onLanguageChange('en')}
            className={`flex items-center gap-2 px-4 py-2 font-semibold transition-colors ${
              currentLanguage === 'en'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">🇺🇸</span>
            <span className="hidden sm:inline">English</span>
            <span className="sm:hidden">EN</span>
          </button>
          
          <div className="w-px h-8 bg-gray-300"></div>
          
          <button
            onClick={() => onLanguageChange('es')}
            className={`flex items-center gap-2 px-4 py-2 font-semibold transition-colors ${
              currentLanguage === 'es'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">🇪🇸</span>
            <span className="hidden sm:inline">Español</span>
            <span className="sm:hidden">ES</span>
          </button>
        </div>
      </div>
      
      {/* Mobile hint */}
      <p className="text-xs text-gray-500 text-center mt-1 hidden sm:block">
        <Globe className="w-3 h-3 inline mr-1" />
        Language / Idioma
      </p>
    </div>
  );
}
