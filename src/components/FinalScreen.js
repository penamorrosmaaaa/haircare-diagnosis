import React from 'react';
import ProductCard from './ProductCard';

/**
 * Lista de productos con traducciones.
 */
const productList = [
  {
    internalId: "Hydrating Mask",
    es: {
      name: "Mascarilla Hidratante",
      description: "Repara y humecta el cabello seco o quebradizo de forma intensa.",
      mainBenefit: "Hidratación profunda",
      secondaryBenefits: "Control del frizz, ideal para restaurar la humedad perdida.",
    },
    en: {
      name: "Hydrating Mask",
      description: "Deeply moisturizes and revives dry or brittle hair.",
      mainBenefit: "Deep hydration",
      secondaryBenefits: "Frizz control and moisture restoration.",
    },
  },
  {
    internalId: "Amplifying Oil",
    es: {
      name: "Aceite Amplificador",
      description: "Aceite ligero que nutre, protege del calor y aporta brillo.",
      mainBenefit: "Nutrición intensa",
      secondaryBenefits: "Protección del calor y brillo sin apelmazar.",
    },
    en: {
      name: "Amplifying Oil",
      description: "A lightweight oil that nourishes, protects from heat, and adds shine.",
      mainBenefit: "Intense nourishment",
      secondaryBenefits: "Heat protection and lightweight shine.",
    },
  },
  {
    internalId: "Equilibrium Shampoo",
    es: {
      name: "Shampoo Equilibrium",
      description: "Regula el exceso de grasa y equilibra el cuero cabelludo, prolongando los lavados.",
      mainBenefit: "Regulación de grasa",
      secondaryBenefits: "Equilibra el cuero cabelludo y controla el sebo.",
    },
    en: {
      name: "Equilibrium Shampoo",
      description: "Controls excess oil and balances the scalp.",
      mainBenefit: "Oil regulation",
      secondaryBenefits: "Balances the scalp and controls sebum.",
    },
  },
  {
    internalId: "Leave-in Signature",
    es: {
      name: "Leave-in Signature",
      description: "Definición sin calor que aporta cuerpo y estructura al cabello.",
      mainBenefit: "Definición y cuerpo",
      secondaryBenefits: "Control del frizz sin necesidad de calor, mejora la textura.",
    },
    en: {
      name: "Leave-in Signature",
      description: "Heat-free definition that adds body and structure to your hair.",
      mainBenefit: "Definition and body",
      secondaryBenefits: "Frizz control without heat and improved texture.",
    },
  },
  {
    internalId: "Curl Balm",
    es: {
      name: "Bálsamo para Rizos",
      description: "Definición y control del frizz, ideal para rizos con movimiento.",
      mainBenefit: "Control del frizz",
      secondaryBenefits: "Definición y suavidad sin apelmazar.",
    },
    en: {
      name: "Curl Balm",
      description: "Defines curls and controls frizz, keeping your curls bouncy.",
      mainBenefit: "Frizz control",
      secondaryBenefits: "Defines and softens without weighing hair down.",
    },
  },
  {
    internalId: "Reconstruction Mask",
    es: {
      name: "Mascarilla Reconstrucción",
      description: "Reparación profunda y fortalecimiento para cabellos dañados o teñidos.",
      mainBenefit: "Reparación y fortalecimiento",
      secondaryBenefits: "Recupera la vitalidad y estructura del cabello.",
    },
    en: {
      name: "Reconstruction Mask",
      description: "Deep repair and strengthening for damaged or colored hair.",
      mainBenefit: "Repair and strengthen",
      secondaryBenefits: "Restores vitality and structure.",
    },
  },
  {
    internalId: "Signature Conditioner",
    es: {
      name: "Acondicionador Signature",
      description: "Restauración y protección del color para cabellos teñidos.",
      mainBenefit: "Restauración del color",
      secondaryBenefits: "Protege y nutre el cabello dañado.",
    },
    en: {
      name: "Signature Conditioner",
      description: "Restores and protects color for dyed hair.",
      mainBenefit: "Color restoration",
      secondaryBenefits: "Nourishes and protects damaged hair.",
    },
  },
  {
    internalId: "Signature Shampoo",
    es: {
      name: "Shampoo Signature",
      description: "Limpieza diaria suave y protección para cabellos que se lavan con frecuencia.",
      mainBenefit: "Limpieza suave",
      secondaryBenefits: "Protege el cuero cabelludo y mantiene la hidratación natural.",
    },
    en: {
      name: "Signature Shampoo",
      description: "Gentle daily cleansing and protection for frequently washed hair.",
      mainBenefit: "Gentle cleansing",
      secondaryBenefits: "Protects the scalp and maintains natural hydration.",
    },
  },
];

/** 
 * Función que devuelve el objeto del producto (en el idioma correcto) según su internalId 
 */
function getProduct(internalId, language) {
  const base = productList.find(p => p.internalId === internalId);
  if (!base) return null;
  return base[language]; // 'es' o 'en'
}

/**
 * Genera un diagnóstico detallado basado en el cuestionario, mostrando un resumen del perfil capilar y las recomendaciones personalizadas.
 */
function getDiagnosis(data, language) {
  if (language === 'es') {
    let diagnosisParts = [];
    diagnosisParts.push("Resumen del perfil capilar:");
    diagnosisParts.push(`- Tipo de cabello: ${data.tipoCabello || 'No especificado'}.`);
    diagnosisParts.push(`- Grosor: ${data.grosorCabello || 'No especificado'}.`);
    diagnosisParts.push(`- Densidad: ${data.densidadCabello || 'No especificado'}.`);
    diagnosisParts.push(`- Longitud: ${data.longitudCabello || 'No especificado'}.`);
    diagnosisParts.push(`- Condición general: ${data.condicionGeneral || 'No especificado'}.`);
    diagnosisParts.push(`- Tratamientos químicos: ${data.tratamientosQuimicos || 'No especificado'}.`);
    diagnosisParts.push(`- Frecuencia de lavado: ${data.frecuenciaLavado || 'No especificado'}.`);
    diagnosisParts.push(`- Uso de calor: ${data.usoCalor || 'No especificado'}.`);

    diagnosisParts.push("\nRecomendaciones personalizadas según tu perfil:");

    if (data.condicionGeneral === 'seco-quebradizo') {
      diagnosisParts.push("- Cabello seco o quebradizo: Se recomienda Mascarilla Hidratante (Hidratación profunda, control del frizz) o Aceite Amplificador (Nutrición intensa, protección del calor).");
    }
    if (data.condicionGeneral === 'graso') {
      diagnosisParts.push("- Cabello graso: Se recomienda Shampoo Equilibrium (Regulación de grasa, equilibrio del cuero cabelludo).");
    }
    if (data.preocupacionesCapilares && data.preocupacionesCapilares.includes('falta-volumen')) {
      diagnosisParts.push("- Falta de volumen: Se recomienda Leave-in Signature (Definición sin calor, aporta cuerpo y estructura).");
    }
    if (data.preocupacionesCapilares && data.preocupacionesCapilares.includes('frizz')) {
      diagnosisParts.push("- Frizz y falta de control: Se recomienda Bálsamo para Rizos (Definición y control del frizz) o Aceite Amplificador (Brillo y suavidad sin apelmazar).");
    }
    if (data.tratamientosQuimicos === 'tinte-decoloracion' || data.tratamientosQuimicos === 'alisado-permanente') {
      diagnosisParts.push("- Cabello teñido o dañado: Se recomienda Mascarilla Reconstrucción (Reparación profunda y fortalecimiento) o Acondicionador Signature (Restauración y protección del color).");
    }
    if (data.objetivoPrincipal === 'hidratacion') {
      diagnosisParts.push("- Hidratación profunda: Se recomienda Mascarilla Hidratante (para cabello rizado y grueso) o Aceite Amplificador (para cabello seco y dañado).");
    }
    if (data.frecuenciaLavado === 'diario') {
      diagnosisParts.push("- Lavado frecuente: Se recomienda Shampoo Signature (Limpieza diaria suave y protección) o Equilibrium Shampoo (Regulación del sebo para espaciar lavados).");
    }
    if (data.usoCalor === 'frecuente') {
      diagnosisParts.push("- Cabello expuesto a calor: Se recomienda Aceite Amplificador (Protección térmica y reducción del tiempo de secado) o Leave-in Signature (Suavidad y control del frizz sin calor).");
    }
    return diagnosisParts.join("\n");
  } else {
    let diagnosisParts = [];
    diagnosisParts.push("Hair Profile Summary:");
    diagnosisParts.push(`- Hair type: ${data.tipoCabello || 'Not specified'}.`);
    diagnosisParts.push(`- Hair thickness: ${data.grosorCabello || 'Not specified'}.`);
    diagnosisParts.push(`- Hair density: ${data.densidadCabello || 'Not specified'}.`);
    diagnosisParts.push(`- Hair length: ${data.longitudCabello || 'Not specified'}.`);
    diagnosisParts.push(`- Overall condition: ${data.condicionGeneral || 'Not specified'}.`);
    diagnosisParts.push(`- Chemical treatments: ${data.tratamientosQuimicos || 'Not specified'}.`);
    diagnosisParts.push(`- Washing frequency: ${data.frecuenciaLavado || 'Not specified'}.`);
    diagnosisParts.push(`- Heat usage: ${data.usoCalor || 'Not specified'}.`);

    diagnosisParts.push("\nPersonalized recommendations based on your profile:");

    if (data.condicionGeneral === 'seco-quebradizo') {
      diagnosisParts.push("- Dry or brittle hair: Recommended products are Hydrating Mask (deep hydration and frizz control) or Amplifying Oil (intense nourishment and heat protection).");
    }
    if (data.condicionGeneral === 'graso') {
      diagnosisParts.push("- Oily hair: Recommended product is Equilibrium Shampoo (oil regulation and scalp balance).");
    }
    if (data.preocupacionesCapilares && data.preocupacionesCapilares.includes('falta-volumen')) {
      diagnosisParts.push("- Lack of volume: Recommended product is Leave-in Signature (heat-free definition that adds body and structure).");
    }
    if (data.preocupacionesCapilares && data.preocupacionesCapilares.includes('frizz')) {
      diagnosisParts.push("- Frizz and lack of control: Recommended products are Curl Balm (frizz control and definition) or Amplifying Oil (adds shine and softness without weighing hair down).");
    }
    if (data.tratamientosQuimicos === 'tinte-decoloracion' || data.tratamientosQuimicos === 'alisado-permanente') {
      diagnosisParts.push("- Dyed or damaged hair: Recommended products are Reconstruction Mask (deep repair and strengthening) or Signature Conditioner (color restoration and protection).");
    }
    if (data.objetivoPrincipal === 'hidratacion') {
      diagnosisParts.push("- Deep hydration: Recommended products are Hydrating Mask (for curly and thick hair) or Amplifying Oil (for dry and damaged hair).");
    }
    if (data.frecuenciaLavado === 'diario') {
      diagnosisParts.push("- Frequent washing: Recommended products are Signature Shampoo (gentle daily cleansing and protection) or Equilibrium Shampoo (sebum regulation to extend time between washes).");
    }
    if (data.usoCalor === 'frecuente') {
      diagnosisParts.push("- Hair exposed to heat: Recommended products are Amplifying Oil (thermal protection and reduced drying time) or Leave-in Signature (softness and frizz control without heat).");
    }
    return diagnosisParts.join("\n");
  }
}

/**
 * Componente FinalScreen: Muestra el diagnóstico personalizado y las recomendaciones de productos.
 */
function FinalScreen({ formData, language }) {
  /**
   * Genera un arreglo de recomendaciones basadas en las respuestas del cuestionario.
   */
  const getRecommendations = data => {
    const recs = [];

    // Cabello seco o quebradizo
    if (data.condicionGeneral === 'seco-quebradizo') {
      recs.push({
        product: getProduct('Hydrating Mask', language),
        reason: language === 'es'
          ? "Hidratación profunda y control del frizz."
          : "Deep hydration and frizz control."
      });
      recs.push({
        product: getProduct('Amplifying Oil', language),
        reason: language === 'es'
          ? "Nutrición intensa y protección del calor."
          : "Intense nourishment and heat protection."
      });
    }

    // Cabello graso
    if (data.condicionGeneral === 'graso') {
      recs.push({
        product: getProduct('Equilibrium Shampoo', language),
        reason: language === 'es'
          ? "Regula la grasa y equilibra el cuero cabelludo."
          : "Regulates oil and balances the scalp."
      });
    }

    // Falta de volumen
    if (data.preocupacionesCapilares && data.preocupacionesCapilares.includes('falta-volumen')) {
      recs.push({
        product: getProduct('Leave-in Signature', language),
        reason: language === 'es'
          ? "Aporta definición sin calor y aumenta el cuerpo y la estructura."
          : "Provides heat-free definition and adds body and structure."
      });
    }

    // Frizz y falta de control
    if (data.preocupacionesCapilares && data.preocupacionesCapilares.includes('frizz')) {
      recs.push({
        product: getProduct('Curl Balm', language),
        reason: language === 'es'
          ? "Define los rizos y controla el frizz sin apelmazar."
          : "Defines curls and controls frizz without weighing hair down."
      });
      recs.push({
        product: getProduct('Amplifying Oil', language),
        reason: language === 'es'
          ? "Aporta brillo y suavidad sin apelmazar."
          : "Adds shine and softness without weighing hair down."
      });
    }

    // Cabello teñido o dañado
    if (data.tratamientosQuimicos === 'tinte-decoloracion' || data.tratamientosQuimicos === 'alisado-permanente') {
      recs.push({
        product: getProduct('Reconstruction Mask', language),
        reason: language === 'es'
          ? "Repara profundamente y fortalece el cabello dañado."
          : "Deeply repairs and strengthens damaged hair."
      });
      recs.push({
        product: getProduct('Signature Conditioner', language),
        reason: language === 'es'
          ? "Restaura y protege el color de cabellos teñidos."
          : "Restores and protects color in dyed hair."
      });
    }

    // Objetivo: Hidratación profunda
    if (data.objetivoPrincipal === 'hidratacion') {
      recs.push({
        product: getProduct('Hydrating Mask', language),
        reason: language === 'es'
          ? "Ideal para cabellos rizados y gruesos que requieren hidratación profunda."
          : "Ideal for curly, thick hair that needs deep hydration."
      });
      recs.push({
        product: getProduct('Amplifying Oil', language),
        reason: language === 'es'
          ? "Perfecto para cabellos secos y dañados."
          : "Perfect for dry and damaged hair."
      });
    }

    // Lavado frecuente
    if (data.frecuenciaLavado === 'diario') {
      recs.push({
        product: getProduct('Signature Shampoo', language),
        reason: language === 'es'
          ? "Limpieza diaria suave y protección para cabellos de lavado frecuente."
          : "Gentle daily cleansing and protection for frequently washed hair."
      });
      recs.push({
        product: getProduct('Equilibrium Shampoo', language),
        reason: language === 'es'
          ? "Ayuda a regular el sebo y espaciar los lavados."
          : "Helps regulate sebum and extend time between washes."
      });
    }

    // Cabello expuesto a calor
    if (data.usoCalor === 'frecuente') {
      recs.push({
        product: getProduct('Amplifying Oil', language),
        reason: language === 'es'
          ? "Protección térmica y reducción del tiempo de secado."
          : "Thermal protection and reduced drying time."
      });
      recs.push({
        product: getProduct('Leave-in Signature', language),
        reason: language === 'es'
          ? "Aporta suavidad y controla el frizz sin calor."
          : "Provides softness and frizz control without heat."
      });
    }

    // Eliminar recomendaciones duplicadas
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
      <h1>
        {language === 'es'
          ? `¡Gracias, ${formData.nombre || 'Usuario'}!`
          : `Thank you, ${formData.nombre || 'User'}!`}
      </h1>

      <section className="diagnosis-section" style={{ marginBottom: '1.5rem' }}>
        <h2>
          {language === 'es' ? 'Diagnóstico Personalizado:' : 'Your Hair Diagnosis:'}
        </h2>
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{diagnosis}</pre>
      </section>

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
