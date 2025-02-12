const QuestionModal = ({ question, onClose, onAnswer }) => {
    const [showAnswer, setShowAnswer] = useState(false);
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-blue-900 text-white p-8 rounded-lg max-w-2xl w-full">
          <div className="text-2xl mb-4">
            {showAnswer ? question.answer : question.question}
          </div>
          <div className="flex gap-4 justify-center mt-8">
            {!showAnswer ? (
              <button
                className="bg-yellow-500 text-black px-6 py-2 rounded"
                onClick={() => setShowAnswer(true)}
              >
                Show Answer
              </button>
            ) : (
              <>
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded"
                  onClick={() => onAnswer(true)}
                >
                  Correct
                </button>
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded"
                  onClick={() => onAnswer(false)}
                >
                  Incorrect
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  
