import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to detect emotion from user input (basic keyword check)
function detectEmotion(userInput) {
  const input = userInput.toLowerCase();
  if (input.includes("anxious") || input.includes("nervous") || input.includes("worried")) {
    return "anxious";
  } else if (input.includes("sad") || input.includes("lonely") || input.includes("depressed")) {
    return "sad";
  } else if (input.includes("stressed") || input.includes("pressure") || input.includes("overwhelmed")) {
    return "stressed";
  } else if (input.includes("angry") || input.includes("frustrated") || input.includes("irritated")) {
    return "angry";
  }
  return "general";
}

// Main chatbot function (Dynamic Prompting)
async function generateTherapeuticResponse(userInput) {
  try {
    const emotion = detectEmotion(userInput);

    // Build dynamic prompt
    let guidance = "";
    if (emotion === "anxious") {
      guidance = "Focus on calming techniques, grounding exercises, and reassurance.";
    } else if (emotion === "sad") {
      guidance = "Be very gentle, validate their sadness, and encourage social connection or journaling.";
    } else if (emotion === "stressed") {
      guidance = "Suggest stress management techniques like task breakdown, short breaks, or breathing exercises.";
    } else if (emotion === "angry") {
      guidance = "Acknowledge their anger, normalize the feeling, and suggest pausing or expressing it in healthy ways.";
    } else {
      guidance = "Provide general empathetic support with reflection and encouragement.";
    }

    const prompt = `
    You are an empathetic AI therapist.
    The user has shared: "${userInput}"

    Detected Emotion: ${emotion.toUpperCase()}

    Special Guidance: ${guidance}

    Please respond in a way that:
    1. Validates their feelings with compassion
    2. Provides supportive coping strategies
    3. Keeps the response under 150 words
    4. Maintains professional but warm tone
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
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
      detectedEmotion: emotion,
      mode: "dynamic-prompting"
    };

  } catch (error) {
    console.error('Error generating response:', error);

    return {
      response: "I'm here to listen. It sounds like you're going through something difficult. Could you tell me more about how you're feeling?",
      detectedEmotion: "unknown",
      mode: "fallback"
    };
  }
}

// Test the chatbot
async function testChatbot() {
  const testInputs = [
    "I’m really nervous about my exams",
    "Lately I feel very lonely",
    "I’m overwhelmed with too much work",
    "I get angry over small things",
    "I don’t know what’s wrong, just feeling off"
  ];

  for (const input of testInputs) {
    const response = await generateTherapeuticResponse(input);
    console.log(`\n🧑 User: ${input}`);
    console.log(`🤖 Detected Emotion: ${response.detectedEmotion}`);
    console.log(`🤖 Chatbot: ${response.response}`);
  }
}

testChatbot();

export { generateTherapeuticResponse };
