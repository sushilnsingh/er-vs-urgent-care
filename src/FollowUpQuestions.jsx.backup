// FollowUpQuestions.jsx
// Component for collecting clarifying information about vague symptoms

import React, { useState } from 'react';
import { AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function FollowUpQuestions({ vagueResult, onComplete, onBack }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const questions = vagueResult.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const handleCheckboxChange = (questionId, option, checked) => {
    const currentAnswers = answers[questionId] || [];
    
    // Handle "None of these" logic
    if (option === 'None of these' && checked) {
      setAnswers({
        ...answers,
        [questionId]: ['None of these']
      });
      return;
    }
    
    if (checked) {
      // Remove "None of these" if selecting something else
      const filteredAnswers = currentAnswers.filter(a => a !== 'None of these');
      setAnswers({
        ...answers,
        [questionId]: [...filteredAnswers, option]
      });
    } else {
      setAnswers({
        ...answers,
        [questionId]: currentAnswers.filter(a => a !== option)
      });
    }
  };

  const canProceed = () => {
    if (!currentQuestion.required) return true;
    
    const answer = answers[currentQuestion.id];
    
    if (currentQuestion.type === 'checkbox') {
      return answer && answer.length > 0;
    }
    
    return answer !== undefined && answer !== null && answer !== '';
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Let's get more details
            </h2>
            <p className="text-sm text-gray-600">
              These questions will help provide a more accurate recommendation
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {currentQuestion.question}
          {currentQuestion.required && <span className="text-red-600 ml-1">*</span>}
        </h3>

        {/* Scale Question */}
        {currentQuestion.type === 'scale' && (
          <div className="space-y-4">
            <input
              type="range"
              min={currentQuestion.min}
              max={currentQuestion.max}
              value={answers[currentQuestion.id] || currentQuestion.min}
              onChange={(e) => handleAnswer(currentQuestion.id, parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{currentQuestion.minLabel}</span>
              <span className="text-2xl font-bold text-blue-600">
                {answers[currentQuestion.id] || currentQuestion.min}
              </span>
              <span className="text-gray-600">{currentQuestion.maxLabel}</span>
            </div>
          </div>
        )}

        {/* Choice Question */}
        {currentQuestion.type === 'choice' && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <label
                key={idx}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  answers[currentQuestion.id] === option
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={answers[currentQuestion.id] === option}
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  className="w-4 h-4 text-blue-600 mr-3"
                />
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        )}

        {/* Checkbox Question */}
        {currentQuestion.type === 'checkbox' && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isChecked = (answers[currentQuestion.id] || []).includes(option);
              const isNoneSelected = (answers[currentQuestion.id] || []).includes('None of these');
              const isDisabled = option !== 'None of these' && isNoneSelected;
              
              return (
                <label
                  key={idx}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isChecked
                      ? 'border-blue-600 bg-blue-50'
                      : isDisabled
                      ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={(e) => handleCheckboxChange(currentQuestion.id, option, e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded mr-3"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              );
            })}
            <p className="text-xs text-gray-500 mt-2">
              Select all that apply
            </p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {currentQuestionIndex > 0 && (
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>
        )}
        
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Start Over
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Get Recommendation'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-500 text-center mt-4">
        <span className="text-red-600">*</span> Required question
      </p>
    </div>
  );
}
