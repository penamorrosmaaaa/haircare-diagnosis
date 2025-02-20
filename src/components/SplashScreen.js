import React from 'react';

function SplashScreen({ onStart, language }) {
  return (
    <div className="splash-screen">
      <img 
        src="/fi-logo.png" 
        alt="Logo" 
        className="logo-animado" 
      />
      <button className="btn-empezar" onClick={onStart}>
        {language === 'es' ? 'Empezar Cuestionario' : 'Start Questionnaire'}
      </button>
    </div>
  );
}

export default SplashScreen;
