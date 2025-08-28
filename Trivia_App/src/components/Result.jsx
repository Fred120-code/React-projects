const Results = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  let message = "";
  let emoji = "";
  
  if (percentage >= 80) {
    message = "Excellent! You're a trivia master!";
    emoji = "🎉";
  } else if (percentage >= 60) {
    message = "Great job! Well done!";
    emoji = "👏";
  } else if (percentage >= 40) {
    message = "Not bad! Keep learning!";
    emoji = "👍";
  } else {
    message = "Keep trying! You'll improve!";
    emoji = "💪";
  }

  return (
    <div className="text-center bg-white rounded-lg shadow-lg p-8">
      <div className="text-6xl mb-4">{emoji}</div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
      <div className="text-6xl font-bold text-blue-600 mb-2">{score}/{total}</div>
      <div className="text-2xl font-semibold text-gray-600 mb-4">{percentage}%</div>
      <p className="text-lg text-gray-600 mb-6">{message}</p>
      <button
        onClick={onRestart}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
      >
        Play Again
      </button>
    </div>
  );
};

export default Results;
