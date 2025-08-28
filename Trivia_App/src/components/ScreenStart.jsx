import { triviaQuestions } from "./triviaQuestions";
const StartScreen = ({ onStart }) => (
  <div className="text-center">
    <h1 className="text-6xl font-bold text-blue-600 mb-8">🧠 Trivia Quiz</h1>
    <p className="text-xl text-gray-600 mb-8">
      Test your knowledge with {triviaQuestions.length} exciting questions!
    </p>
    <button
      onClick={onStart}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200"
    >
      Start Quiz
    </button>
  </div>
);
export default StartScreen;
