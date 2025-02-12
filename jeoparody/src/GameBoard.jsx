import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from './services/api';
import { soundService } from './services/soundService';
import Category from './Category';
import QuestionModal from './QuestionModal';

const GameBoard = () => {
  const { gameId } = useParams();
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
    ],
    currentScore: 0,
    currentQuestion: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (gameId !== 'demo') {
      loadGame();
    } else {
      setLoading(false);
    }
  }, [gameId]);

  const loadGame = async () => {
    try {
      const data = await apiService.getGame(gameId);
      if (data.error) {
        setError(data.error);
      } else {
        setGameState(data);
      }
    } catch (err) {
      console.error('Failed to load game:', err);
      setError('Failed to load game');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionClick = async (categoryIndex, questionIndex) => {
    const question = gameState.categories[categoryIndex].questions[questionIndex];
    if (!question.isAnswered) {
      if (question.isDailyDouble) {
        soundService.play('dailyDouble');
      } else {
        soundService.play('questionReveal');
      }

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

  const handleAnswerSubmit = async (isCorrect) => {
    const pointValue = gameState.currentQuestion.isDailyDouble 
      ? gameState.wager 
      : gameState.currentQuestion.value;
      
    const newScore = isCorrect ? 
      gameState.currentScore + pointValue : 
      gameState.currentScore - pointValue;

    soundService.play(isCorrect ? 'correctAnswer' : 'wrongAnswer');

    const updatedGameState = {
      ...gameState,
      currentScore: newScore,
      currentQuestion: null,
      categories: gameState.categories.map((cat, catIdx) =>
        catIdx === gameState.currentQuestion.categoryIndex
          ? {
              ...cat,
              questions: cat.questions.map((q, qIdx) =>
                qIdx === gameState.currentQuestion.questionIndex
                  ? { ...q, isAnswered: true }
                  : q
              ),
            }
          : cat
      ),
    };

    setGameState(updatedGameState);
    await apiService.updateGame(gameId, updatedGameState);
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!gameState) return null;

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
          onAnswer={handleAnswerSubmit}
        />
      )}
      <div className="mt-8 text-center">
        <h2 className="text-2xl">Score: ${gameState.currentScore}</h2>
      </div>
    </div>
  );
};

export default GameBoard;