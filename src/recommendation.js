// recommendation.js
import { Configuration, OpenAIApi } from "openai";
import { products } from "./dataProducts.js";

// 1. Configurar la API KEY (usa variable de entorno o string directo si es un demo)
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, 
});
const openai = new OpenAIApi(configuration);

/**
 * Recibe un objeto con info del usuario, por ejemplo:
 * {
 *   hairType: "rizado",
 *   hairCondition: "seco",
 *   hasFrizz: true,
 *   isColored: false
 * }
 */
export async function getRecommendationFromAI(userData) {
  // 2. Convertimos el array de productos a un string (para enviárselo a ChatGPT):
  const productListText = products.map(p => {
    return `Nombre: ${p.name}
Descripción: ${p.description}
Beneficio principal: ${p.mainBenefit}
Beneficios secundarios: ${p.secondaryBenefits}`;
  }).join("\n\n"); // separamos cada producto con un doble salto de línea

  // 3. Construimos el prompt:
  //    - Le damos el contexto de que ChatGPT es un experto en cabello.
  //    - Proporcionamos la tabla de productos en texto.
  //    - Describimos al usuario y solicitamos la recomendación en español.
  const prompt = `
Eres un experto en cuidado del cabello. Aquí tienes una tabla de productos:

${productListText}

El usuario tiene el siguiente perfil:
- Tipo de cabello: ${userData.hairType}
- Condición del cabello: ${userData.hairCondition}
- ¿Tiene frizz?: ${userData.hasFrizz ? "Sí" : "No"}
- ¿Está teñido?: ${userData.isColored ? "Sí" : "No"}

Recomienda uno o dos productos de la tabla que mejor se ajusten a este perfil.
Por favor, explica brevemente el porqué de cada recomendación.
Da tu respuesta en español.
`;

  // 4. Hacemos la llamada a la API de OpenAI con el modelo que prefieras:
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003", // o GPT-3.5-turbo, etc.
      prompt,
      max_tokens: 500,   // Ajusta la longitud máxima de la respuesta
      temperature: 0.7,  // Ajusta la creatividad
    });

    // 5. Retornamos el texto que generó ChatGPT
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error al llamar a la API de OpenAI:", error);
    throw error;
  }
}
