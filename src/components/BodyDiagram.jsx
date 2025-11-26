// BodyDiagram.jsx
// Professional body diagram using REAL anatomical images with clickable regions

import { useState } from 'react';

const BodyDiagram = ({ onRegionSelect, selectedRegions = [], language = 'en' }) => {
  const [view, setView] = useState('front');

  // Translations
  const t = {
    en: {
      title: 'Symptom Location Assessment',
      subtitle: 'Click on the body region(s) where you are experiencing symptoms',
      frontView: 'Anterior View',
      backView: 'Posterior View',
      selectedRegions: 'Selected Regions:',
      generalSymptoms: 'General/Systemic Symptoms:',
      fatigue: 'Fatigue',
      fever: 'Fever/Chills',
      anxiety: 'Anxiety',
      sleep: 'Sleep Problems',
      nausea: 'Nausea',
      skin: 'Skin/Rash',
      viewLabel: '• Anterior View •',
      viewLabelBack: '• Posterior View •'
    },
    es: {
      title: 'Evaluación de Ubicación de Síntomas',
      subtitle: 'Haga clic en la(s) región(es) del cuerpo donde experimenta síntomas',
      frontView: 'Vista Anterior',
      backView: 'Vista Posterior',
      selectedRegions: 'Regiones Seleccionadas:',
      generalSymptoms: 'Síntomas Generales/Sistémicos:',
      fatigue: 'Fatiga',
      fever: 'Fiebre/Escalofríos',
      anxiety: 'Ansiedad',
      sleep: 'Problemas de Sueño',
      nausea: 'Náuseas',
      skin: 'Piel/Sarpullido',
      viewLabel: '• Vista Anterior •',
      viewLabelBack: '• Vista Posterior •'
    }
  };

  const translations = t[language] || t.en;

  // Clickable regions mapped to image coordinates (percentage-based for responsiveness)
  const bodyRegions = {
    front: [
      {
        id: 'head-front',
        name: language === 'es' ? 'Cabeza y Cuello' : 'Head & Neck',
        symptoms: ['headache', 'dizziness'],
        coords: { top: '0%', left: '35%', width: '25%', height: '15%' }
      },
      {
        id: 'chest-front',
        name: language === 'es' ? 'Pecho' : 'Chest',
        symptoms: ['chest', 'breathing'],
        coords: { top: '18%', left: '28%', width: '40%', height: '12%' }
      },
      {
        id: 'abdomen-front',
        name: language === 'es' ? 'Abdomen' : 'Abdomen',
        symptoms: ['abdominal', 'nausea'],
        coords: { top: '32%', left: '33%', width: '30%', height: '16%' }
      },
      {
        id: 'pelvis-front',
        name: language === 'es' ? 'Pelvis' : 'Pelvis',
        symptoms: ['urinary', 'abdominal'],
        coords: { top: '50%', left: '32%', width: '32%', height: '10%' }
      },
      {
        id: 'shoulder-left',
        name: language === 'es' ? 'Hombro Izquierdo' : 'Left Shoulder',
        symptoms: ['joint', 'back'],
        coords: { top: '13%', left: '18%', width: '12%', height: '8%' }
      },
      {
        id: 'shoulder-right',
        name: language === 'es' ? 'Hombro Derecho' : 'Right Shoulder',
        symptoms: ['joint', 'back'],
        coords: { top: '13%', left: '70%', width: '12%', height: '8%' }
      },
      {
        id: 'arm-left',
        name: language === 'es' ? 'Brazo Izquierdo' : 'Left Arm',
        symptoms: ['joint', 'numbness'],
        coords: { top: '25%', left: '19%', width: '15%', height: '35%' }
      },
      {
        id: 'arm-right',
        name: language === 'es' ? 'Brazo Derecho' : 'Right Arm',
        symptoms: ['joint', 'numbness'],
        coords: { top: '25%', left: '62%', width: '15%', height: '35%' }
      },
      {
        id: 'leg-left',
        name: language === 'es' ? 'Pierna Izquierda' : 'Left Leg',
        symptoms: ['joint'],
        coords: { top: '60%', left: '33%', width: '15%', height: '35%' }
      },
      {
        id: 'leg-right',
        name: language === 'es' ? 'Pierna Derecha' : 'Right Leg',
        symptoms: ['joint'],
        coords: { top: '60%', left: '47%', width: '15%', height: '35%' }
      }
    ],
    back: [
      {
        id: 'head-back',
        name: language === 'es' ? 'Parte Posterior de la Cabeza' : 'Back of Head & Neck',
        symptoms: ['headache', 'dizziness'],
        coords: { top: '0%', left: '40%', width: '25%', height: '15%' }
      },
      {
        id: 'upper-back',
        name: language === 'es' ? 'Espalda Superior' : 'Upper Back',
        symptoms: ['back', 'joint'],
        coords: { top: '15%', left: '33%', width: '40%', height: '15%' }
      },
      {
        id: 'lower-back',
        name: language === 'es' ? 'Espalda Baja' : 'Lower Back',
        symptoms: ['back', 'joint'],
        coords: { top: '32%', left: '38%', width: '30%', height: '16%' }
      },
      {
        id: 'sacral-back',
        name: language === 'es' ? 'Zona Sacra/Coxis' : 'Sacral/Tailbone',
        symptoms: ['back'],
        coords: { top: '50%', left: '37%', width: '31%', height: '10%' }
      },
      {
        id: 'shoulder-left-back',
        name: language === 'es' ? 'Hombro Izquierdo' : 'Left Shoulder',
        symptoms: ['joint', 'back'],
        coords: { top: '13%', left: '18%', width: '12%', height: '8%' }
      },
      {
        id: 'shoulder-right-back',
        name: language === 'es' ? 'Hombro Derecho' : 'Right Shoulder',
        symptoms: ['joint', 'back'],
        coords: { top: '13%', left: '70%', width: '12%', height: '8%' }
      },
      {
        id: 'arm-left-back',
        name: language === 'es' ? 'Brazo Izquierdo' : 'Left Arm',
        symptoms: ['joint', 'numbness'],
        coords: { top: '25%', left: '24%', width: '15%', height: '35%' }
      },
      {
        id: 'arm-right-back',
        name: language === 'es' ? 'Brazo Derecho' : 'Right Arm',
        symptoms: ['joint', 'numbness'],
        coords: { top: '25%', left: '66%', width: '15%', height: '35%' }
      },
      {
        id: 'leg-left-back',
        name: language === 'es' ? 'Pierna Izquierda' : 'Left Leg',
        symptoms: ['joint'],
        coords: { top: '60%', left: '38%', width: '15%', height: '35%' }
      },
      {
        id: 'leg-right-back',
        name: language === 'es' ? 'Pierna Derecha' : 'Right Leg',
        symptoms: ['joint'],
        coords: { top: '60%', left: '52%', width: '15%', height: '35%' }
      }
    ]
  };

  const handleRegionClick = (region) => {
    const isSelected = selectedRegions.some(r => r.id === region.id);
    
    if (isSelected) {
      onRegionSelect(selectedRegions.filter(r => r.id !== region.id));
    } else {
      onRegionSelect([...selectedRegions, region]);
    }
  };

  const isRegionSelected = (regionId) => {
    return selectedRegions.some(r => r.id === regionId);
  };

  const currentRegions = bodyRegions[view];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Professional Header */}
      <div className="mb-6 pb-4 border-b-2 border-gray-300">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          {translations.title}
        </h3>
        <p className="text-gray-600 text-sm">
          {translations.subtitle}
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex border-2 border-gray-400">
          <button
            onClick={() => setView('front')}
            className={`px-8 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
              view === 'front'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {translations.frontView}
          </button>
          <button
            onClick={() => setView('back')}
            className={`px-8 py-3 text-sm font-medium uppercase tracking-wider border-l-2 border-gray-400 transition-colors ${
              view === 'back'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {translations.backView}
          </button>
        </div>
      </div>

      {/* Body Diagram with Image */}
      <div className="bg-white border-2 border-gray-300 p-4">
        <div className="relative mx-auto" style={{ maxWidth: '500px' }}>
          {/* Background Image */}
          <img
            src={view === 'front' ? '/anterior_view.jpg' : '/posterior_view.jpg'}
            alt={view === 'front' ? 'Anterior View' : 'Posterior View'}
            className="w-full h-auto"
            style={{ display: 'block' }}
          />
          
          {/* Clickable Region Overlays */}
          <div className="absolute inset-0">
            {currentRegions.map((region) => {
              const isSelected = isRegionSelected(region.id);
              return (
                <div
                  key={region.id}
                  onClick={() => handleRegionClick(region)}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = isSelected ? 'rgba(59, 130, 246, 0.5)' : 'transparent';
                    }
                  }}
                  style={{
                    position: 'absolute',
                    top: region.coords.top,
                    left: region.coords.left,
                    width: region.coords.width,
                    height: region.coords.height,
                    backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
                    border: isSelected ? '2px solid #2563EB' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderRadius: '8px'
                  }}
                  title={region.name}
                />
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4 uppercase tracking-wide">
          {view === 'front' ? translations.viewLabel : translations.viewLabelBack}
        </p>
      </div>

      {/* Selected Regions */}
      {selectedRegions.length > 0 && (
        <div className="mt-6 border-2 border-gray-300 bg-blue-50 p-6">
          <div className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
            {translations.selectedRegions}
          </div>
          <div className="space-y-2">
            {selectedRegions.map((region, index) => (
              <div
                key={region.id}
                className="flex items-center justify-between bg-white border border-blue-300 px-4 py-2.5 rounded"
              >
                <span className="text-gray-900 font-medium">
                  {index + 1}. {region.name}
                </span>
                <button
                  onClick={() => handleRegionClick(region)}
                  className="text-blue-600 hover:text-blue-800 font-bold text-xl leading-none px-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* General Symptoms */}
      <div className="mt-6 border-2 border-gray-300 bg-white p-6">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
          {translations.generalSymptoms}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { id: 'systemic-fatigue', name: translations.fatigue, symptoms: ['fatigue'] },
            { id: 'systemic-fever', name: translations.fever, symptoms: ['fever'] },
            { id: 'systemic-anxiety', name: translations.anxiety, symptoms: ['anxiety'] },
            { id: 'systemic-sleep', name: translations.sleep, symptoms: ['sleep'] },
            { id: 'systemic-nausea', name: translations.nausea, symptoms: ['nausea'] },
            { id: 'systemic-skin', name: translations.skin, symptoms: ['skin'] },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleRegionClick(item)}
              className={`px-4 py-2.5 text-sm text-left border-2 rounded transition-all ${
                isRegionSelected(item.id)
                  ? 'bg-blue-600 text-white border-blue-700 font-semibold'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 border-2 rounded-sm mr-2.5 flex items-center justify-center ${
                  isRegionSelected(item.id) ? 'border-white bg-white' : 'border-gray-400'
                }`}>
                  {isRegionSelected(item.id) && (
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </div>
                {item.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BodyDiagram;
