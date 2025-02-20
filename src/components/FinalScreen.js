import React from 'react';
import ProductCard from './ProductCard';

/**
 * Datos de productos en ambos idiomas, con "internalId"
 * para localizarlos en la lógica de recomendación.
 */
const productList = [
  {
    internalId: "Hydrating Mask",
    es: {
      name: "Mascarilla Hidratante",
      description: "Repara y humecta el cabello seco o quebradizo de forma intensa.",
      mainBenefit: "Previene la rotura",
      secondaryBenefits: "Sella la cutícula, repara daños, restaura elasticidad, combate el frizz.",
    },
    en: {
      name: "Hydrating Mask",
      description: "Deeply moisturizes and revives dry or brittle hair.",
      mainBenefit: "Prevents breakage",
      secondaryBenefits: "Seals the cuticle, repairs damage, restores elasticity, fights frizz.",
    },
  },
  {
    internalId: "Amplifying Oil",
    es: {
      name: "Aceite Amplificador",
      description: "Aceite ligero que nutre, protege del calor y aporta brillo.",
      mainBenefit: "Aceite ligero y lujoso",
      secondaryBenefits: "Penetra la fibra, reduce el tiempo de secado y evita apelmazar.",
    },
    en: {
      name: "Amplifying Oil",
      description: "A lightweight oil that nourishes, protects from heat, and adds shine.",
      mainBenefit: "Luxurious lightweight oil",
      secondaryBenefits: "Penetrates hair shaft, reduces drying time, and prevents weigh-down.",
    },
  },
  {
    internalId: "Equilibrium Shampoo",
    es: {
      name: "Shampoo Equilibrium",
      description: "Regula el exceso de grasa y equilibra el cuero cabelludo, prolongando los lavados.",
      mainBenefit: "Regulación de sebo",
      secondaryBenefits: "Controla la producción de grasa y balancea el microbioma capilar.",
    },
    en: {
      name: "Equilibrium Shampoo",
      description: "Controls excess oil and balances the scalp, prolonging time between washes.",
      mainBenefit: "Sebum regulation",
      secondaryBenefits: "Controls oil production and balances the scalp microbiome.",
    },
  },
  // ... Agrega más productos si lo deseas
];

/** Devuelve el objeto de producto (en el idioma correcto) según internalId */
function getProduct(internalId, language) {
  const base = productList.find(p => p.internalId === internalId);
  if (!base) return null;
  return base[language]; // 'es' o 'en'
}

/**
 * Genera un diagnóstico profesional y detallado según las respuestas.
 */
function getDiagnosis(data, language) {
  if (language === 'es') {
    // Versión en español
    let diagnosisParts = [];

    // Cabello seco/quebradizo, graso, etc.
    switch (data.condicionGeneral) {
      case 'seco-quebradizo':
        diagnosisParts.push(
          "Presentas un cabello con tendencia a la sequedad y posible quiebre, lo cual indica una falta de hidratación y nutrientes esenciales en la fibra capilar."
        );
        break;
      case 'graso':
        diagnosisParts.push(
          "Tu cabello muestra tendencia grasa, lo que implica una producción excesiva de sebo en el cuero cabelludo."
        );
        break;
      case 'mixto':
        diagnosisParts.push(
          "Se observa una condición mixta, con zonas secas y otras con exceso de grasa, requiriendo un cuidado equilibrado."
        );
        break;
      case 'sano':
        diagnosisParts.push(
          "Tu cabello se encuentra en condiciones saludables generales, con pocos signos de daño o resequedad."
        );
        break;
      default:
        // por si no coincide ninguna opción
        diagnosisParts.push("Estado general de cabello no determinado.");
        break;
    }

    // Tratamientos químicos
    if (data.tratamientosQuimicos === 'tinte-decoloracion') {
      diagnosisParts.push(
        "Has sometido tu cabello a un proceso de tinte o decoloración, lo que puede debilitar la fibra capilar si no se hidrata y protege adecuadamente."
      );
    } else if (data.tratamientosQuimicos === 'alisado-permanente') {
      diagnosisParts.push(
        "Has pasado por un alisado o permanente, procedimientos que suelen deshidratar o alterar la estructura del cabello."
      );
    }

    // Frecuencia de lavado
    if (data.frecuenciaLavado === 'diario') {
      diagnosisParts.push(
        "Lavas tu cabello diariamente, lo cual puede eliminar aceites naturales y requerir un producto suave que proteja el cuero cabelludo."
      );
    } else if (data.frecuenciaLavado === 'cada-dos-dias') {
      diagnosisParts.push(
        "Realizas lavados frecuentes (cada dos días), requiriendo un shampoo equilibrado para evitar resecar o engrasar en exceso."
      );
    }

    // Construimos el diagnóstico final
    return diagnosisParts.join(" ");
  } else {
    // Versión en inglés
    let diagnosisParts = [];

    switch (data.condicionGeneral) {
      case 'seco-quebradizo':
        diagnosisParts.push(
          "Your hair tends to be dry or brittle, indicating a lack of hydration and essential nutrients in the hair shaft."
        );
        break;
      case 'graso':
        diagnosisParts.push(
          "Your hair shows an oily tendency, implying excessive sebum production on the scalp."
        );
        break;
      case 'mixto':
        diagnosisParts.push(
          "You have combination hair, with some dry areas and others that are oily, requiring a balanced approach."
        );
        break;
      case 'sano':
        diagnosisParts.push(
          "Your hair appears generally healthy, with minimal signs of damage or dryness."
        );
        break;
      default:
        diagnosisParts.push("General hair condition not determined.");
        break;
    }

    if (data.tratamientosQuimicos === 'tinte-decoloracion') {
      diagnosisParts.push(
        "You've undergone coloring or bleaching, which can weaken hair if not properly moisturized and protected."
      );
    } else if (data.tratamientosQuimicos === 'alisado-permanente') {
      diagnosisParts.push(
        "You've had a straightening or perm treatment, which can dehydrate or alter the hair structure."
      );
    }

    if (data.frecuenciaLavado === 'diario') {
      diagnosisParts.push(
        "You wash your hair daily, which can strip natural oils and require a gentle formula."
      );
    } else if (data.frecuenciaLavado === 'cada-dos-dias') {
      diagnosisParts.push(
        "You wash your hair every other day, suggesting the need for a balanced shampoo."
      );
    }

    return diagnosisParts.join(" ");
  }
}

/**
 * FinalScreen: Muestra el diagnóstico personalizado y las recomendaciones.
 */
function FinalScreen({ formData, language }) {
  /**
   * Lógica de recomendación
   * Retorna array de { product, reason } con 'product' = { name, description, ... } según idioma
   */
  const getRecommendations = data => {
    const recs = [];

    // Ejemplo de reglas
    if (data.condicionGeneral === 'seco-quebradizo') {
      recs.push({
        product: getProduct('Hydrating Mask', language),
        reason: language === 'es'
          ? "Debido a la sequedad y fragilidad, una mascarilla hidratante repondrá la humedad perdida."
          : "Because your hair is dry/brittle, a hydrating mask will restore lost moisture."
      });
      recs.push({
        product: getProduct('Amplifying Oil', language),
        reason: language === 'es'
          ? "Un aceite ligero ayudará a sellar la humedad y proteger la fibra capilar."
          : "A lightweight oil helps seal in moisture and protect the hair shaft."
      });
    }

    if (data.condicionGeneral === 'graso') {
      recs.push({
        product: getProduct('Equilibrium Shampoo', language),
        reason: language === 'es'
          ? "Para regular el exceso de sebo y equilibrar el cuero cabelludo."
          : "To regulate excess sebum and balance the scalp."
      });
    }

    // Eliminar duplicados
    const unique = new Map();
    for (const item of recs) {
      const productName = item.product?.name;
      if (productName && !unique.has(productName)) {
        unique.set(productName, item);
      }
    }
    return Array.from(unique.values());
  };

  const diagnosis = getDiagnosis(formData, language);
  const recommendations = getRecommendations(formData);

  return (
    <div className="final-screen">
      {/* Título */}
      <h1>
        {language === 'es'
          ? `¡Gracias, ${formData.nombre || 'Usuario'}!`
          : `Thank you, ${formData.nombre || 'User'}!`}
      </h1>

      {/* Diagnóstico personalizado */}
      <section className="diagnosis-section" style={{ marginBottom: '1.5rem' }}>
        <h2>
          {language === 'es' ? 'Diagnóstico Personalizado:' : 'Your Hair Diagnosis:'}
        </h2>
        <p style={{ whiteSpace: 'pre-line' }}>{diagnosis}</p>
      </section>

      {/* Recomendaciones de productos */}
      <section className="recommendation-section">
        <h2>
          {language === 'es'
            ? 'Recomendaciones de Productos:'
            : 'Product Recommendations:'}
        </h2>

        {recommendations.length === 0 ? (
          <p>
            {language === 'es'
              ? 'No se encontraron recomendaciones específicas según tus respuestas.'
              : 'No specific recommendations found based on your answers.'}
          </p>
        ) : (
          <div className="recommendation-cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {recommendations.map(({ product, reason }, idx) => (
              product && (
                <ProductCard
                  key={idx}
                  product={product}
                  reason={reason}
                  language={language}
                />
              )
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default FinalScreen;
