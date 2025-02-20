// Questionnaire.jsx
import React, { useState } from 'react';
import { getQuestions } from './questionsData'; // <-- Importamos la función
import ProgressBar from './ProgressBar';
import FinalScreen from './FinalScreen';

function Questionnaire({ language }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Obtenemos el array de preguntas correcto según el idioma
  const questionSet = getQuestions(language);

  // Creamos formData inicial en base a las preguntas del questionSet
  const [formData, setFormData] = useState(() => {
    const initial = {};
    questionSet.forEach((q) => {
      if (q.type === 'checkboxGroup') {
        initial[q.name] = [];
      } else {
        initial[q.name] = '';
      }
    });
    return initial;
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => {
        const currentArr = prev[name] || [];
        if (checked) {
          return { ...prev, [name]: [...currentArr, value] };
        } else {
          return { ...prev, [name]: currentArr.filter((val) => val !== value) };
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Validación para la pregunta actual.
   * Similar a lo que tenías antes, ajusta según tu lógica.
   */
  const validateCurrentQuestion = () => {
    const question = questionSet[currentStep];
    const answer = formData[question.name];

    if (question.required) {
      if (question.type === 'checkboxGroup') {
        const selectionsCount = answer.length;
        if (question.minSelections) {
          if (selectionsCount < question.minSelections) {
            alert(
              language === 'es'
                ? `Debes seleccionar al menos ${question.minSelections} opciones.`
                : `You must select at least ${question.minSelections} options.`
            );
            return false;
          }
        } else {
          // Por defecto, si es required y no define minSelections,
          // exigimos que seleccione al menos 1
          if (selectionsCount < 1) {
            alert(
              language === 'es'
                ? 'Debes seleccionar al menos 1 opción.'
                : 'Please select at least 1 option.'
            );
            return false;
          }
        }
      } else {
        if (!answer) {
          alert(
            language === 'es'
              ? 'Por favor, responde la pregunta antes de continuar.'
              : 'Please answer the question before continuing.'
          );
          return false;
        }
      }
    }

    return true;
  };

  const handleNext = () => {
    // Validamos
    if (!validateCurrentQuestion()) return;

    if (currentStep < questionSet.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validamos la última pregunta
    if (!validateCurrentQuestion()) return;

    setSubmitted(true);
  };

  if (submitted) {
    return <FinalScreen formData={formData} language={language} />;
  }

  // Obtenemos la pregunta actual
  const question = questionSet[currentStep];

  const renderInput = (q) => {
    switch (q.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={q.type}
            name={q.name}
            required={q.required}
            value={formData[q.name]}
            onChange={handleChange}
          />
        );
      case 'textarea':
        return (
          <textarea
            name={q.name}
            rows="4"
            required={q.required}
            value={formData[q.name]}
            onChange={handleChange}
          />
        );
      case 'select':
        return (
          <select
            name={q.name}
            required={q.required}
            value={formData[q.name]}
            onChange={handleChange}
          >
            {q.options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled || false}
              >
                {opt.label}
              </option>
            ))}
          </select>
        );
      case 'checkboxGroup':
        return (
          <div className="checkbox-group">
            {q.options.map((opt) => (
              <label key={opt.value} style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  name={q.name}
                  value={opt.value}
                  checked={formData[q.name].includes(opt.value)}
                  onChange={handleChange}
                />
                {opt.label}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <ProgressBar currentStep={currentStep} totalSteps={questionSet.length} />

      <h1>
        {language === 'es'
          ? 'Cuestionario de Diagnóstico Personalizado para Haircare'
          : 'Personalized Haircare Diagnosis Questionnaire'}
      </h1>

      <h2>
        {language === 'es'
          ? `Pregunta ${currentStep + 1} de ${questionSet.length}`
          : `Question ${currentStep + 1} of ${questionSet.length}`}
      </h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor={question.name}>{question.question}</label>
        {renderInput(question)}

        <div className="buttons" style={{ marginTop: '1rem' }}>
          {currentStep > 0 && (
            <button type="button" onClick={handlePrev}>
              {language === 'es' ? 'Atrás' : 'Back'}
            </button>
          )}

          {currentStep < questionSet.length - 1 ? (
            <button type="button" onClick={handleNext}>
              {language === 'es' ? 'Siguiente' : 'Next'}
            </button>
          ) : (
            <button type="submit">
              {language === 'es' ? 'Finalizar' : 'Finish'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Questionnaire;
