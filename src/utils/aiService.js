const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

/**
 * Fetches one-sentence descriptions for multiple POIs, personalized to the user's travel soul.
 * @param {Array} pois - List of POI objects.
 * @param {Object} travelSoul - The user's travel archetype object (name, description).
 * @returns {Promise<Object>} - A map of poi_id to description.
 */
export const generatePOIDescriptions = async (pois, travelSoul) => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn("Gemini API key is missing. Using static descriptions.");
        return null;
    }

    const poiListStr = pois.map(p => `- ${p.name} (Type: ${p.content_type}, District: ${p.district})`).join('\n');

    const prompt = `
    You are a professional travel curator for "ChinaGlider", an app that helps travelers discover the soul of Shanghai.
    
    The user is a "${travelSoul.name}" archetype. Their profile: ${travelSoul.description}
    
    Please write a ONE-SENTENCE, atmospheric, and highly personalized description for each of the following locations in Shanghai. 
    The tone should be sophisticated and evocative, matching the user's travel soul personality.
    Keep the descriptions in English and ensure each is UNDER 20 WORDS.
    
    IMPORTANT: You MUST use the exact name of the POI provided as the key in your JSON object.
    
    LOCATIONS:
    ${poiListStr}
    
    Format your response as a valid JSON object where keys are exactly the POI names provided and values are the one-sentence descriptions.
    Example: {"Name": "Evocative sentence..."}
    ONLY RETURN THE JSON OBJECT.
  `;


    try {
        const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textResponse) return null;

        // Use a more robust regex to find the first '{' and last '}'
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.warn("AI returned text but no JSON block found:", textResponse);
            return null;
        }

        try {
            return JSON.parse(jsonMatch[0]);
        } catch (parseError) {
            console.error("Failed to parse JSON from AI response:", parseError, textResponse);
            return null;
        }
    } catch (error) {
        console.error("Error generating AI descriptions:", error);
        return null;
    }
};
