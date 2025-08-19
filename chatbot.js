import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Main chatbot function (Zero-Shot Prompting)
async function generateTherapeuticResponse(userInput) {
  try {
    // Create a zero-shot therapeutic prompt
    const prompt = `You are an empathetic AI therapist. 
    A user says: "${userInput}".
    
    Please provide a supportive and compassionate response that:
    1. Acknowledges their feelings with empathy
    2. Offers gentle guidance or coping strategies
    3. Maintains professional boundaries
    4. Encourages reflection or positive action
    5. Is concise (under 150 words).`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",   // you can also try "gpt-4o-mini"
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
      mood_tag: "detected_by_AI",      // Placeholder since no manual mood detection
      suggestion_type: "generated_by_AI"
    };

  } catch (error) {
    console.error('Error generating response:', error);

    // Fallback response if API fails
    return {
      response: "I'm here to listen. It sounds like you're going through something difficult. Could you tell me more about how you're feeling?",
      mood_tag: "unknown",
      suggestion_type: "general_support"
    };
  }
}

// Test the chatbot
async function testChatbot() {
  const testInput = "I'm feeling really anxious about work today";
  const response = await generateTherapeuticResponse(testInput);
  console.log('🤖 Chatbot Output:');
  console.log(JSON.stringify(response, null, 2));
}

// Run the test
testChatbot();

export { generateTherapeuticResponse };
