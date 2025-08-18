import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Initialize client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- System Prompt (RTFC framework applied) ---
const systemPrompt = `
You are an empathetic AI therapist trained in Cognitive Behavioral Therapy (CBT), mindfulness, and stress management. 
Role: Act as a safe, compassionate listener who helps users regulate emotions.
Task: Understand the user’s message, identify their mood, and provide supportive, non-judgmental suggestions.
Format: Always return responses in JSON with three fields: 
{
  "response": "<empathetic text response>",
  "mood_tag": "<single word mood>",
  "suggestion_type": "<mindfulness | cbt | journaling>"
}
Constraints:
- Never provide medical advice or diagnosis.
- Responses must be concise (1–3 sentences), safe, and uplifting.
- Use only mindfulness/CBT/stress-management techniques.
`;

// --- Example User Prompt ---
const userPrompt = "I'm feeling very anxious and can't focus on my work.";

// Run Chatbot
const runChatbot = async () => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",  // can also use "gpt-4o" or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    console.log("🤖 Chatbot Output:");
    console.log(response.choices[0].message.content);

  } catch (error) {
    console.error("Error:", error);
  }
};

runChatbot();
