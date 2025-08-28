import { useState } from "react";
import "./App.css";
import { triviaQuestions } from "./components/triviaQuestions";
import Question from "./components/Question";
import Results from "./components/Result";
import Score from "./components/Score";
import StartScreen from "./components/ScreenStart";



function App() {
 const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'finished'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return; // Prevent multiple answers
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    // Check if answer is correct
    if (answerIndex === triviaQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex + 1 < triviaQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameState('finished');
      }
    }, 2000);
  };

  const restartGame = () => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {gameState === 'start' && (
          <StartScreen onStart={startGame} />
        )}
        
        {gameState === 'playing' && (
          <div>
            <Score 
              current={score} 
              total={triviaQuestions.length}
              currentQuestion={currentQuestionIndex + 1}
            />
            <div className="flex justify-center">
              <Question
                question={triviaQuestions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                selectedAnswer={selectedAnswer}
                showResult={showResult}
              />
            </div>
          </div>
        )}
        
        {gameState === 'finished' && (
          <Results 
            score={score} 
            total={triviaQuestions.length} 
            onRestart={restartGame}
          />
        )}
      </div>
    </div>
  );
}

export default App;
