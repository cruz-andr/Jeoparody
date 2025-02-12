const Category = ({ category, categoryIndex, onQuestionClick }) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="bg-blue-800 text-white p-4 text-center font-bold">
          {category.title}
        </div>
        {category.questions.map((question, questionIndex) => (
          <button
            key={questionIndex}
            className={`p-4 text-center font-bold ${
              question.isAnswered ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
            onClick={() => onQuestionClick(categoryIndex, questionIndex)}
            disabled={question.isAnswered}
          >
            ${question.value}
          </button>
        ))}
      </div>
    );
  };
  export default Category;