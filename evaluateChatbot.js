import OpenAI from "openai";
import dotenv from "dotenv";
import evaluationDataset from "./evaluationDataset.js";
import createJudgePrompt from "./judgeprompt.js";
import { generateTherapeuticResponse } from "./chatbot.js"; // Your main chatbot function

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function evaluateSingleCase(testCase) {
  const aiOutput = await generateTherapeuticResponse(testCase.input);
  const judgePrompt = createJudgePrompt(testCase.input, testCase.expected, aiOutput.response);

  const judgment = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: judgePrompt }],
    temperature: 0.3,
    max_tokens: 200
  });

  const result = judgment.choices[0].message.content.trim();
  return {
    input: testCase.input,
    aiResponse: aiOutput.response,
    evaluation: result
  };
}

async function runEvaluation() {
  const results = [];

  for (const testCase of evaluationDataset) {
    console.log(`\n📌 Testing input: "${testCase.input}"`);
    const result = await evaluateSingleCase(testCase);
    console.log("🤖 AI Response:\n", result.aiResponse);
    console.log("📊 Evaluation:\n", result.evaluation);
    results.push(result);
  }

  return results;
}

runEvaluation();
