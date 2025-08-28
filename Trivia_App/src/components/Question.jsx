const Question = ({ question, onAnswer, selectedAnswer, showResult }) => (
  <div className="w-full max-w-2xl">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {question.question}
      </h2>
      <div className="space-y-3">
        {question.options.map((option, index) => {
          let buttonClass =
            "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ";

          if (showResult) {
            if (index === question.correctAnswer) {
              buttonClass += "border-green-500 bg-green-100 text-green-800";
            } else if (index === selectedAnswer) {
              buttonClass += "border-red-500 bg-red-100 text-red-800";
            } else {
              buttonClass += "border-gray-300 bg-gray-50 text-gray-600";
            }
          } else if (selectedAnswer === index) {
            buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
          } else {
            buttonClass +=
              "border-gray-300 hover:border-blue-300 hover:bg-blue-50";
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && onAnswer(index)}
              className={buttonClass}
              disabled={showResult}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);
export default Question;
