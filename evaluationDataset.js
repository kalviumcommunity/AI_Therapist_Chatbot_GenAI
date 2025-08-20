// 5 test samples with expected emotional tone and strategy
const evaluationDataset = [
  {
    input: "I feel overwhelmed with all my responsibilities and work deadlines.",
    expected: {
      emotion: "stressed",
      qualities: [
        "Validates the stress and pressure",
        "Suggests breaking down tasks or taking breaks",
        "Uses warm and professional tone"
      ]
    }
  },
  {
    input: "I’ve been feeling really lonely lately, like no one really understands me.",
    expected: {
      emotion: "sad",
      qualities: [
        "Validates feelings of loneliness",
        "Encourages connection or self-reflection",
        "Gentle and empathetic tone"
      ]
    }
  },
  {
    input: "I keep getting angry over small things, and it’s frustrating.",
    expected: {
      emotion: "angry",
      qualities: [
        "Acknowledges frustration and anger",
        "Normalizes the emotion",
        "Suggests healthy expression of anger"
      ]
    }
  },
  {
    input: "I’m really nervous about my exams coming up.",
    expected: {
      emotion: "anxious",
      qualities: [
        "Validates nervousness and academic pressure",
        "Offers calming or grounding strategies",
        "Supportive and reassuring"
      ]
    }
  },
  {
    input: "I don’t know what’s wrong, I just feel off lately.",
    expected: {
      emotion: "general",
      qualities: [
        "Acknowledges uncertainty",
        "Encourages reflection or talking more",
        "Keeps tone open and compassionate"
      ]
    }
  }
];

export default evaluationDataset;
