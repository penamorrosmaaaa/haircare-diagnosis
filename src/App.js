import React, { useState } from 'react';
import './App.css';
import darkLeather from './assets/blueLeather.jpg';
import Questionnaire from './components/Questionnaire';
import SplashScreen from './components/SplashScreen';
import LanguageButton from './components/LanguageButton';

function App() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [language, setLanguage] = useState('es'); // idioma por defecto: español

  const handleStart = () => {
    setShowQuestionnaire(true);
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'));
  };

  // Fondo con textura
  const backgroundStyle = {
    backgroundImage: `url(${darkLeather})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  };

  return (
    <div style={backgroundStyle}>
      <LanguageButton language={language} toggleLanguage={toggleLanguage} />
      <div className="app-container">
        {showQuestionnaire ? (
          <Questionnaire language={language} />
        ) : (
          <SplashScreen onStart={handleStart} language={language} />
        )}
      </div>
    </div>
  );
}

export default App;
