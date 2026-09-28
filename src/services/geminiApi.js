/**
 * Gemini API service for the AI chemistry assistant.
 *
 * Uses Google's Gemini API (free tier: 15 RPM).
 * Set VITE_GEMINI_API_KEY in your .env file.
 * Get a free key at: https://aistudio.google.com/apikey
 */

const GEMINI_MODEL = 'gemini-3.8-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are an educational chemistry assistant embedded in an interactive periodic table web app called NeoTable. 
Your role is to help students and chemistry enthusiasts learn about:
- Elements and their properties (atomic mass, electronegativity, electron configuration, etc.)
- Periodic trends (atomic radius, ionization energy, electronegativity patterns)
- Chemical reactions, bonding, and molecular structures
- Real-world applications of elements
- History of element discovery

Guidelines:
- Keep answers clear, concise, and educational
- Use simple analogies when explaining complex concepts
- When discussing specific elements, mention their key properties
- Format important terms or element symbols in a clear way
- If asked something outside chemistry, politely redirect to chemistry topics`;

/**
 * Convert our chat message history into the Gemini API format.
 * Gemini uses "user" and "model" roles (not "assistant").
 */
function buildGeminiContents(messages) {
  return messages
    .filter(msg => msg.role === 'user' || msg.role === 'assistant')
    .map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));
}

/**
 * Send a chat request to the Gemini API.
 * @param {Array} messages - Chat history in {role, content} format
 * @returns {Promise<string>} - The assistant's response text
 * @throws {Error} - If the API key is missing or the request fails
 */
export async function sendGeminiMessage(messages) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('MISSING_API_KEY');
  }

  const contents = buildGeminiContents(messages);

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData?.error?.message || `HTTP ${response.status}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('No response generated. The model may have filtered the output.');
  }

  return text;
}
