// src/services/huggingFaceService.js
const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/google/flan-t5-large';

export const generateQuestions = async (categories, apiKey) => {
  const generateQuestionForCategory = async (category) => {
    const prompt = `Generate 5 Jeopardy style questions and answers for the category: ${category}. Format: Q1: [question] A1: [answer] Q2: [question] A2: [answer] etc.`;

    try {
      const response = await fetch(HUGGING_FACE_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      const text = data[0].generated_text;
      
      // Parse the generated text into questions and answers
      const pairs = text.split(/Q\d+:/).filter(Boolean).map(pair => {
        const [question, answer] = pair.split(/A\d+:/);
        return {
          question: question.trim(),
          answer: answer.trim(),
        };
      });

      // Create questions array with values
      const values = [200, 400, 600, 800, 1000];
      return pairs.map((pair, index) => ({
        ...pair,
        value: values[index],
        isAnswered: false,
        isDailyDouble: false,
      }));
    } catch (error) {
      console.error('Error generating questions:', error);
      return null;
    }
  };

  const questionSets = await Promise.all(
    categories.map(category => generateQuestionForCategory(category))
  );

  return categories.map((category, index) => ({
    title: category,
    questions: questionSets[index] || [],
  }));
};