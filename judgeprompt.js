function createJudgePrompt(userInput, expected, actualOutput) {
  return `
You are a neutral evaluator reviewing a therapeutic AI assistant's response.

Input message from user: "${userInput}"

Expected qualities in the response:
- ${expected.qualities.join("\n- ")}

Actual AI response:
"${actualOutput}"

Evaluate the response on the following:
1. Does it reflect the user's emotional tone correctly? (e.g., ${expected.emotion})
2. Does it include at least one relevant coping strategy?
3. Is the tone warm, professional, and empathetic?

Give a score from 1 to 5 (5 = Excellent match), and explain your reasoning in 2-3 sentences.
Only return this format:
Score: X
Feedback: <your explanation>
`;
}

export default createJudgePrompt;
