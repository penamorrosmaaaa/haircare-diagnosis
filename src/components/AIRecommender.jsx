import React, { useState } from 'react';

function AIRecommender({ formData }) {
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  // WARNING: This is a fake key for demo. Do NOT expose real keys.
  const OPENAI_API_KEY = "sk-proj-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";

  const getRecommendation = async () => {
    setLoading(true);
    setRecommendation('');

    // Build your user prompt
    const userSpecificPrompt = `
Actúa como un experto en cuidado capilar.
Tenemos varios productos (Mascarilla Hidratante, Aceite Amplificador, Shampoo Equilibrium, etc.).
El usuario tiene:
  - Tipo de cabello: ${formData.tipoCabello}
  - Condición general: ${formData.condicionGeneral}
  - Frecuencia de lavado: ${formData.frecuenciaLavado}
  (y más datos si necesitas)

Basado en esta info, dame la recomendación más adecuada en 2-3 oraciones.
Explica brevemente por qué esos productos se ajustan a su perfil.
    `;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Eres un experto asesor de cuidado capilar. Responde de manera clara y breve.'
            },
            {
              role: 'user',
              content: userSpecificPrompt
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const aiText = data?.choices?.[0]?.message?.content || "No recommendation found.";
      setRecommendation(aiText);
    } catch (error) {
      console.error(error);
      setRecommendation("Error generando la recomendación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={getRecommendation}>Obtener Recomendación IA</button>

      {loading && <p>Cargando...</p>}

      {recommendation && (
        <div>
          <h3>Recomendación IA:</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default AIRecommender;
