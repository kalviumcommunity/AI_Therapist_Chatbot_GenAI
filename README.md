# AI_Therapist_Chatbot_GenAI

## Project Overview

The **AI Therapist Chatbot** is a conversational AI tool designed to provide emotional support and guidance through empathetic and safe interactions. It uses **natural language processing (NLP)** to understand user emotions and replies with relevant suggestions based on techniques like **Cognitive Behavioral Therapy (CBT)**, **mindfulness**, and **stress management**.

This chatbot does **not diagnose or replace professional mental health services** but offers a 24/7 virtual companion to help users regulate emotions, reduce anxiety, and track mental health over time.


##  Features

* Understands user sentiment and mood
* Provides structured self-help suggestions
* Uses function calling for mood logging and wellness suggestions
* Integrates with a mental health knowledge base using RAG
* Offers safe, empathetic, and non-judgmental responses

##  Key AI Concepts and Implementation

###  1. Prompting

We use **two types of prompts** in this project:

* **System Prompt**:
  Guides the AI to act as a compassionate and safe listener.

  ```
  "You are a virtual therapist trained in CBT and mindfulness. Be empathetic, helpful, and never give medical advice."
  ```

* **User Prompt**:
  Users input messages like:

  ```
  "I'm feeling very anxious and can't sleep lately."
  ```

  The bot processes this input to identify emotions and respond with supportive techniques.



###  2. Structured Output

To allow the frontend or logging system to understand and use the chatbot's replies programmatically, responses are formatted with a **structured JSON output** like this:

```json
{
  "response": "Try a simple breathing exercise: inhale for 4 seconds, hold for 4, exhale for 4.",
  "mood_tag": "anxious",
  "suggestion_type": "mindfulness"
}
```

This structure makes it easy to:

* Categorize tips (CBT, journaling, mindfulness)
* Track user mood over time
* Display responses in a clean UI



###  3. Function Calling

We’ll implement **function calling** to extend the chatbot’s capabilities using external tools or internal functions. Examples include:

* **Log mood**:

```json
{
  "name": "logMood",
  "parameters": {
    "mood": "anxious",
    "timestamp": "2025-08-05T19:00:00"
  }
}
```

* **Fetch suggestion**:

```json
{
  "name": "getMindfulnessExercise",
  "parameters": {
    "type": "breathing",
    "duration": "5 minutes"
  }
}
```

These functions allow dynamic interaction and real-time actions such as journaling, progress tracking, and guided tips.



###  4. Retrieval-Augmented Generation (RAG)

To improve the accuracy and helpfulness of the chatbot's responses, we’ll use **RAG** to pull content from a curated set of documents. For example:

* Mental health articles
* CBT templates
* Guided meditation scripts

**Workflow**:

1. User prompt is embedded.
2. A similarity search retrieves the top 3 related texts from a local knowledge base.
3. Retrieved context is added to the prompt before generating the final reply.

This helps the bot generate **factually accurate and context-rich responses**.


##  Tech Stack

* **Frontend**: React (optional, for UI)
* **Backend**: Node.js / Python
* **Model**: OpenAI GPT (via API)
* **Data**: Local JSON or vector DB (for RAG)
* **Tools**: LangChain / OpenAI Function Calling


##  Project Timeline (1 Week Plan)
                                            
Day 1  Project setup and prompt design                   
Day 2  Implement basic chatbot logic                     
Day 3  Add structured output & mood tagging              
Day 4  Implement function calling features               
Day 5  Integrate RAG using local mental health documents 
Day 6  UI (optional) & testing                           
Day 7  Final polish and deployment                       


##  Final Notes

This project is a practical demonstration of how AI can be used responsibly to support mental health through empathetic, intelligent, and structured conversations. It leverages advanced AI techniques while remaining lightweight enough to complete within a week.
 
