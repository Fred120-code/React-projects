const Score = ({ current, total, currentQuestion }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-6">
    <div className="flex justify-between items-center text-lg font-semibold">
      <span className="text-gray-600">Question {currentQuestion} of {total}</span>
      <span className="text-blue-600">Score: {current}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(currentQuestion / total) * 100}%` }}
      ></div>
    </div>
  </div>
)

export default Score; 