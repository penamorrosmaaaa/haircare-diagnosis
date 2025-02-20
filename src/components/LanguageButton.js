// components/LanguageButton.js
import React from 'react';

function LanguageButton({ language, toggleLanguage }) {
  return (
    <button className="btn-language" onClick={toggleLanguage}>
      {language === 'es' ? 'EN' : 'ES'}
    </button>
  );
}

export default LanguageButton;
