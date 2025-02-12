import React, { useState } from 'react';
import Category from './Category';

const GameBoard = () => {
  const [gameState, setGameState] = useState({
    categories: [
      {
        title: 'Sample Category 1',
        questions: [
          { value: 200, question: 'Sample Question 1', answer: 'Sample Answer 1', isAnswered: false },
          { value: 400, question: 'Sample Question 2', answer: 'Sample Answer 2', isAnswered: false },
          { value: 600, question: 'Sample Question 3', answer: 'Sample Answer 3', isAnswered: false },
          { value: 800, question: 'Sample Question 4', answer: 'Sample Answer 4', isAnswered: false },
          { value: 1000, question: 'Sample Question 5', answer: 'Sample Answer 5', isAnswered: false },
        ],
      },
      //add more later
    ],
    currentScore: 0,
    currentQuestion: null,
  });

  const handleQuestionClick = (categoryIndex, questionIndex) => {
    const question = gameState.categories[categoryIndex].questions[questionIndex];
    if (!question.isAnswered) {
      setGameState(prev => ({
        ...prev,
        currentQuestion: {
          categoryIndex,
          questionIndex,
          ...question,
        },
      }));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Jeoparody</h1>
      <div className="grid grid-cols-6 gap-4">
        {gameState.categories.map((category, categoryIndex) => (
          <Category
            key={categoryIndex}
            category={category}
            categoryIndex={categoryIndex}
            onQuestionClick={handleQuestionClick}
          />
        ))}
      </div>
      {gameState.currentQuestion && (
        <QuestionModal
          question={gameState.currentQuestion}
          onClose={() => setGameState(prev => ({ ...prev, currentQuestion: null }))}
          onAnswer={(isCorrect) => {
            const pointValue = gameState.currentQuestion.value;
            const newScore = isCorrect ? 
              gameState.currentScore + pointValue : 
              gameState.currentScore - pointValue;

            setGameState(prev => ({
              ...prev,
              currentScore: newScore,
              currentQuestion: null,
              categories: prev.categories.map((cat, catIdx) =>
                catIdx === prev.currentQuestion.categoryIndex
                  ? {
                      ...cat,
                      questions: cat.questions.map((q, qIdx) =>
                        qIdx === prev.currentQuestion.questionIndex
                          ? { ...q, isAnswered: true }
                          : q
                      ),
                    }
                  : cat
              ),
            }));
          }}
        />
      )}
      <div className="mt-8 text-center">
        <h2 className="text-2xl">Score: ${gameState.currentScore}</h2>
      </div>
    </div>
  );
};
export default GameBoard;