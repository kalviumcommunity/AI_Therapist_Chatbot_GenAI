import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Therapeutic response templates
const responseTemplates = {
  anxious: [
    "It's completely understandable to feel anxious. Taking a few deep breaths or stepping away for a short break might help clear your mind and regain focus.",
    "Anxiety can feel overwhelming, but remember that this feeling is temporary. Try grounding yourself by naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
    "When anxiety strikes, it can help to remind yourself that you've overcome challenges before. What coping strategies have worked for you in the past?"
  ],
  sad: [
    "I hear that you're feeling sad, and that's okay. It's important to acknowledge these feelings rather than push them away. What's been weighing on your mind lately?",
    "Sadness is a natural human emotion, and it's brave of you to share how you're feeling. Sometimes talking about what's troubling us can help lighten the emotional load.",
    "It sounds like you're going through a difficult time. Remember that it's okay to feel sad, and these feelings don't define your worth as a person."
  ],
  stressed: [
    "Stress can feel overwhelming, but breaking things down into smaller, manageable tasks might help. What's the most pressing thing on your mind right now?",
    "When we're stressed, our minds can race with everything we need to do. Try focusing on just one thing at a time - what's one small step you could take today?",
    "Stress often comes from feeling like we have too much to handle. Remember that it's okay to ask for help or to prioritize what truly needs your attention right now."
  ],
  angry: [
    "Anger is a valid emotion, and it often signals that something important to you has been threatened or violated. What's behind these feelings of anger?",
    "It sounds like you're feeling really frustrated. Sometimes anger can be a way our mind protects us from other emotions like hurt or disappointment. What do you think might be underneath this anger?",
    "When we're angry, it can help to take a step back and breathe before reacting. What would help you feel more in control of this situation?"
  ],
  default: [
    "Thank you for sharing with me. It takes courage to open up about how you're feeling. What would be most helpful for you right now?",
    "I'm here to listen and support you. Everyone's journey is different, and there's no right or wrong way to feel. What's been on your mind lately?",
    "It's important to acknowledge your feelings, whatever they may be. What kind of support would be most meaningful to you today?"
  ]
};

// Function to detect mood from user input
function detectMood(userInput) {
  const input = userInput.toLowerCase();
  
  if (input.includes('anxious') || input.includes('worried') || input.includes('nervous') || input.includes('panic')) {
    return 'anxious';
  } else if (input.includes('sad') || input.includes('depressed') || input.includes('down') || input.includes('upset')) {
    return 'sad';
  } else if (input.includes('stressed') || input.includes('overwhelmed') || input.includes('pressure') || input.includes('busy')) {
    return 'stressed';
  } else if (input.includes('angry') || input.includes('mad') || input.includes('frustrated') || input.includes('irritated')) {
    return 'angry';
  } else {
    return 'default';
  }
}

// Function to get therapeutic suggestion type
function getSuggestionType(mood) {
  const suggestions = {
    anxious: 'mindfulness',
    sad: 'emotional_support',
    stressed: 'stress_management',
    angry: 'emotional_regulation',
    default: 'general_support'
  };
  return suggestions[mood] || 'general_support';
}

// Function to get a random response template
function getResponseTemplate(mood) {
  const templates = responseTemplates[mood] || responseTemplates.default;
  return templates[Math.floor(Math.random() * templates.length)];
}

// Main chatbot function
async function generateTherapeuticResponse(userInput) {
  try {
    // Detect mood and get appropriate response template
    const detectedMood = detectMood(userInput);
    const suggestionType = getSuggestionType(detectedMood);
    
    // Create a therapeutic prompt for OpenAI
    const prompt = `You are a compassionate AI therapist. A user has shared: "${userInput}"
    
    Please provide a therapeutic response that:
    1. Acknowledges their feelings with empathy
    2. Offers gentle guidance or coping strategies
    3. Maintains professional boundaries
    4. Encourages self-reflection or positive action
    5. Is supportive but not prescriptive
    
    Keep the response warm, professional, and under 150 words. Focus on ${suggestionType} techniques.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a compassionate AI therapist assistant. Provide supportive, empathetic responses that encourage healthy coping strategies. Always maintain professional boundaries and remind users that you're not a replacement for professional therapy when appropriate."
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
    
    // Fallback to template if AI response is not available
    const finalResponse = aiResponse || getResponseTemplate(detectedMood);

    return {
      response: finalResponse,
      mood_tag: detectedMood,
      suggestion_type: suggestionType
    };

  } catch (error) {
    console.error('Error generating response:', error);
    
    // Fallback response
    const detectedMood = detectMood(userInput);
    return {
      response: getResponseTemplate(detectedMood),
      mood_tag: detectedMood,
      suggestion_type: getSuggestionType(detectedMood)
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

export { generateTherapeuticResponse, detectMood, getSuggestionType };
