import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Main chatbot function (Multi-Shot Prompting)
async function generateTherapeuticResponse(userInput) {
  try {
    // Multi-shot examples
    const exampleConversations = `
    Example 1:
    User: "I'm feeling really anxious about work."
    AI Therapist: "I hear that you’re feeling anxious about work. It’s understandable to feel pressure in such situations. Try taking a few deep breaths, and remind yourself that it’s okay to handle things one step at a time. What’s one small step you could take right now to feel a bit more in control?"

    Example 2:
    User: "I feel very sad and lonely."
    AI Therapist: "I’m sorry you’re feeling sad and lonely. Those emotions can be really heavy to carry. Remember that reaching out to a trusted friend or even writing down your thoughts can help ease the burden. You don’t have to go through this alone."

    Example 3:
    User: "I’m so stressed about my exams."
    AI Therapist: "It makes sense to feel stressed when exams are approaching. Sometimes breaking your study into smaller chunks and taking short breaks can help reduce the pressure. What’s one subject you’d like to focus on first?"

    Example 4:
    User: "I get angry at small things lately."
    AI Therapist: "It sounds like anger has been showing up more often for you. Anger is a valid emotion, but it can sometimes cover up stress or frustration. Taking a pause before reacting, or journaling about what triggered the anger, might help you feel more in control."
    `;

    const prompt = `You are an empathetic AI therapist.
    A user has shared: "${userInput}"

    Please provide a supportive and compassionate response that:
    1. Acknowledges their feelings with empathy
    2. Offers gentle guidance or coping strategies
    3. Maintains professional boundaries
    4. Encourages reflection or positive action
    5. Is concise (under 150 words).

    Here are examples of how you should respond:
    ${exampleConversations}

    Now respond to the new user message.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",   // you can switch to gpt-4o-mini for better results
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
      max_tokens: 250,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content.trim();

    return {
      response: aiResponse,
      mode: "multi-shot"
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
  const testInputs = [
    "I'm nervous about a job interview",
    "Lately I feel very low and demotivated",
    "I’m overwhelmed with too many tasks",
    "I snap at my family for no reason"
  ];

  for (const input of testInputs) {
    const response = await generateTherapeuticResponse(input);
    console.log(`\n🧑 User: ${input}`);
    console.log(`🤖 Chatbot: ${response.response}`);
  }
}

// Run the test
testChatbot();

export { generateTherapeuticResponse };
