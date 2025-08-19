import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Main chatbot function (One-Shot Prompting)
async function generateTherapeuticResponse(userInput) {
  try {
    // One-shot example included in the prompt
    const exampleConversation = `
    Example:
    User: "I'm feeling really anxious about work."
    AI Therapist: "I hear that you’re feeling anxious about work. It’s understandable to feel pressure in such situations. 
    Try taking a few deep breaths, and remind yourself that it’s okay to handle things one step at a time. 
    What’s one small step you could take right now to feel a bit more in control?"
    `;

    const prompt = `You are an empathetic AI therapist. 
    A user has shared: "${userInput}"

    Please provide a supportive and compassionate response that:
    1. Acknowledges their feelings with empathy
    2. Offers gentle guidance or coping strategies
    3. Maintains professional boundaries
    4. Encourages reflection or positive action
    5. Is concise (under 150 words).

    ${exampleConversation}
    Now respond to the new user message.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",   // or gpt-4o-mini
      messages: [
        {
          role: "system",
          content: "You are a compassionate AI therapist assistant. Provide warm, empathetic responses that encourage healthy coping strategies. You are not a medical professional, so avoid giving medical advice or diagnoses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content.trim();

    return {
      response: aiResponse,
      mode: "one-shot"
    };

  } catch (error) {
    console.error('Error generating response:', error);

    // Fallback response
    return {
      response: "I'm here to listen. It sounds like you're going through something difficult. Could you tell me more about how you're feeling?",
      mode: "fallback"
    };
  }
}

// Test the chatbot
async function testChatbot() {
  const testInput = "I feel very sad and demotivated these days";
  const response = await generateTherapeuticResponse(testInput);
  console.log('🤖 Chatbot Output:');
  console.log(JSON.stringify(response, null, 2));
}

// Run the test
testChatbot();

export { generateTherapeuticResponse };
