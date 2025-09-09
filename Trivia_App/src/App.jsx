import React, { useState, useEffect } from 'react';
import { Clock, Settings, Trophy, User, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { triviaQuestions } from './components/triviaQuestions';
import './App.css'; 



// User Name Input Component
const UserNameInput = ({ onSubmit, darkMode }) => {
  const [name, setName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="text-center">
      <div className="text-4xl mb-4">👋</div>
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Welcome to Trivia Quiz!
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full max-w-md px-4 py-3 rounded-lg border-2 text-lg ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-800'
          } focus:border-blue-500 focus:outline-none`}
          maxLength={20}
          required
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

// Settings Component
const SettingsPanel = ({ settings, onSettingsChange, onClose, darkMode }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl p-6 w-full max-w-md`}>
      <h3 className="text-2xl font-bold mb-4">Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={settings.category}
            onChange={(e) => onSettingsChange({...settings, category: e.target.value})}
            className={`w-full p-2 rounded border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}
          >
            <option value="general">General Knowledge</option>
            <option value="science">Science</option>
            <option value="history">History</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Difficulty</label>
          <select
            value={settings.difficulty}
            onChange={(e) => onSettingsChange({...settings, difficulty: e.target.value})}
            className={`w-full p-2 rounded border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Timer (seconds)</label>
          <select
            value={settings.timeLimit}
            onChange={(e) => onSettingsChange({...settings, timeLimit: parseInt(e.target.value)})}
            className={`w-full p-2 rounded border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}
          >
            <option value="0">No Timer</option>
            <option value="10">10 seconds</option>
            <option value="15">15 seconds</option>
            <option value="30">30 seconds</option>
          </select>
        </div>
      </div>
      
      <div className="flex space-x-3 mt-6">
        <button
          onClick={onClose}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

// Start Screen Component (Enhanced)
const StartScreen = ({ onStart, onSettings, userName, darkMode }) => (
  <div className="text-center">
    <h1 className={`text-6xl font-bold mb-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
      🧠 Trivia Quiz
    </h1>
    {userName && (
      <p className={`text-xl mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Welcome back, <span className="font-semibold text-blue-500">{userName}</span>!
      </p>
    )}
    <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      Test your knowledge with exciting trivia questions!
    </p>
    <div className="space-y-4">
      <button
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-200 transform hover:scale-105"
      >
        Start Quiz
      </button>
      <div>
        <button
          onClick={onSettings}
          className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center mx-auto`}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </button>
      </div>
    </div>
  </div>
);

// Enhanced Question Component with Timer
const Question = ({ question, onAnswer, selectedAnswer, showResult, timeLeft, settings, darkMode }) => (
  <div className="w-full max-w-2xl">
    {settings.timeLimit > 0 && (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 mb-4`}>
        <div className="flex items-center justify-center space-x-2">
          <Clock className={`w-5 h-5 ${timeLeft <= 5 ? 'text-red-500' : darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          <span className={`text-lg font-bold ${timeLeft <= 5 ? 'text-red-500' : darkMode ? 'text-white' : 'text-gray-800'}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              timeLeft <= 5 ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${(timeLeft / settings.timeLimit) * 100}%` }}
          ></div>
        </div>
      </div>
    )}
    
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg p-6 transition-all duration-300`}>
      <h2 className="text-2xl font-bold mb-6">{question.question}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => {
          let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 transform hover:scale-102 ";
          
          if (showResult) {
            if (index === question.correctAnswer) {
              buttonClass += "border-green-500 bg-green-100 text-green-800 animate-pulse";
            } else if (index === selectedAnswer) {
              buttonClass += "border-red-500 bg-red-100 text-red-800";
            } else {
              buttonClass += darkMode ? "border-gray-600 bg-gray-700 text-gray-400" : "border-gray-300 bg-gray-50 text-gray-600";
            }
          } else if (selectedAnswer === index) {
            buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
          } else {
            buttonClass += darkMode 
              ? "border-gray-600 hover:border-blue-400 hover:bg-gray-700 text-white" 
              : "border-gray-300 hover:border-blue-300 hover:bg-blue-50";
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && onAnswer(index)}
              className={buttonClass}
              disabled={showResult}
            >
              <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

// Enhanced Score Component
const Score = ({ current, total, currentQuestion, userName, darkMode }) => (
  <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-md p-4 mb-6 transition-all duration-300`}>
    <div className="flex justify-between items-center text-lg font-semibold mb-2">
      <div className="flex items-center space-x-2">
        <User className="w-5 h-5" />
        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{userName}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span className="text-blue-600">Score: {current}</span>
      </div>
    </div>
    <div className="text-center text-sm text-gray-500 mb-2">
      Question {currentQuestion} of {total}
    </div>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 transform"
        style={{ width: `${(currentQuestion / total) * 100}%` }}
      ></div>
    </div>
  </div>
);

// Leaderboard Component
const Leaderboard = ({ scores, darkMode, onClose }) => {
  const sortedScores = [...scores].sort((a, b) => b.percentage - a.percentage).slice(0, 10);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl p-6 w-full max-w-md max-h-96 overflow-y-auto`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
            Leaderboard
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        {sortedScores.length === 0 ? (
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No scores yet. Play a game to get started!</p>
        ) : (
          <div className="space-y-2">
            {sortedScores.map((score, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-yellow-500">#{index + 1}</span>
                  <span className="font-medium">{score.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">{score.score}/{score.total}</div>
                  <div className="text-sm text-gray-500">{score.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Results Component
const Results = ({ score, total, onRestart, onMainMenu, userName, onSaveScore, darkMode, isNewHighScore }) => {
  const percentage = Math.round((score / total) * 100);
  let message = "";
  let emoji = "";
  
  if (percentage >= 80) {
    message = "Outstanding! You're a trivia champion!";
    emoji = "🎉";
  } else if (percentage >= 60) {
    message = "Great job! Well done!";
    emoji = "👏";
  } else if (percentage >= 40) {
    message = "Good effort! Keep learning!";
    emoji = "👍";
  } else {
    message = "Don't give up! Practice makes perfect!";
    emoji = "💪";
  }

  useEffect(() => {
    if (onSaveScore) {
      onSaveScore({ name: userName, score, total, percentage });
    }
  }, []);

  return (
    <div className={`text-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg p-8 transition-all duration-500 transform animate-pulse`}>
      <div className="text-6xl mb-4">{emoji}</div>
      {isNewHighScore && (
        <div className="text-2xl text-yellow-500 font-bold mb-2 animate-bounce">
          🏆 NEW HIGH SCORE! 🏆
        </div>
      )}
      <h2 className="text-3xl font-bold mb-4">Quiz Complete, {userName}!</h2>
      <div className="text-6xl font-bold text-blue-600 mb-2">{score}/{total}</div>
      <div className="text-2xl font-semibold text-gray-500 mb-4">{percentage}%</div>
      <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{message}</p>
      <div className="flex space-x-3 justify-center">
        <button
          onClick={onRestart}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-200 transform hover:scale-105"
        >
          Play Again
        </button>
        <button
          onClick={onMainMenu}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-200 transform hover:scale-105"
        >
          Main Menu
        </button>
      </div>
    </div>
  );
};

// Help Modal Component
const HelpModal = ({ onClose, darkMode }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl p-6 w-full max-w-lg max-h-96 overflow-y-auto`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">How to Play</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-4 text-left">
        <div>
          <h4 className="font-semibold text-blue-600">🎯 Objective</h4>
          <p className="text-sm">Answer as many questions correctly as possible to get the highest score!</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-green-600">✅ How to Answer</h4>
          <p className="text-sm">Click on one of the four answer options. Correct answers turn green, incorrect ones turn red.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-purple-600">⚙️ Settings</h4>
          <p className="text-sm">Choose your preferred category, difficulty level, and timer settings before starting.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-yellow-600">🏆 Scoring</h4>
          <p className="text-sm">Each correct answer gives you 1 point. Your final percentage score gets saved to the leaderboard!</p>
        </div>
      </div>
    </div>
  </div>
);

// Main App Component (Enhanced)
export default function TriviaApp() {
  const [gameState, setGameState] = useState('name'); // 'name', 'start', 'playing', 'finished'
  const [userName, setUserName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [savedScores, setSavedScores] = useState([]);
  const [settings, setSettings] = useState({
    category: 'general',
    difficulty: 'easy',
    timeLimit: 0
  });

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && settings.timeLimit > 0 && !showResult && gameState === 'playing') {
      // Time's up - force answer
      handleAnswer(-1); // -1 indicates timeout
    }
  }, [timeLeft, gameState, showResult, settings.timeLimit]);

  // Load questions based on settings
  const loadQuestions = () => {
    const categoryQuestions = triviaQuestions[settings.difficulty]?.[settings.category] || [];
    if (categoryQuestions.length === 0) {
      // Fallback to easy general if category/difficulty combo doesn't exist
      setCurrentQuestions(triviaQuestions.easy.general);
    } else {
      setCurrentQuestions([...categoryQuestions].sort(() => Math.random() - 0.5)); // Shuffle
    }
  };

  const startGame = () => {
    loadQuestions();
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    if (settings.timeLimit > 0) {
      setTimeLeft(settings.timeLimit);
    }
  };

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null && answerIndex !== -1) return; // Prevent multiple answers
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setTimeLeft(0); // Stop timer
    
    // Check if answer is correct (timeout = wrong answer)
    if (answerIndex === currentQuestions[currentQuestionIndex]?.correctAnswer) {
      setScore(score + 1);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex + 1 < currentQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        if (settings.timeLimit > 0) {
          setTimeLeft(settings.timeLimit);
        }
      } else {
        setGameState('finished');
      }
    }, 2000);
  };

  const saveScore = (scoreData) => {
    const newScores = [...savedScores, { 
      ...scoreData, 
      date: new Date().toLocaleDateString(),
      settings: `${settings.difficulty} ${settings.category}`
    }];
    setSavedScores(newScores);
  };

  const isNewHighScore = () => {
    if (savedScores.length === 0) return true;
    const currentPercentage = Math.round((score / currentQuestions.length) * 100);
    const bestScore = Math.max(...savedScores.map(s => s.percentage));
    return currentPercentage > bestScore;
  };

  const restartGame = () => {
    startGame();
  };

  const goToMainMenu = () => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(0);
  };

  const handleUserNameSubmit = (name) => {
    setUserName(name);
    setGameState('start');
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600'
    } flex items-center justify-center p-4`}>
      
      {/* Header with controls */}
      <div className="fixed top-4 right-4 flex space-x-2 z-40">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg transition-colors ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-white hover:bg-gray-100 text-gray-700'
          }`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-lg transition-colors ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-700'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
        
        {gameState !== 'name' && (
          <button
            onClick={() => setShowLeaderboard(true)}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Trophy className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="w-full max-w-4xl">
        {gameState === 'name' && (
          <UserNameInput onSubmit={handleUserNameSubmit} darkMode={darkMode} />
        )}
        
        {gameState === 'start' && (
          <div>
            <StartScreen 
              onStart={startGame} 
              onSettings={() => setShowSettings(true)}
              userName={userName}
              darkMode={darkMode}
            />
            <div className="text-center mt-6">
              <button
                onClick={() => setShowHelp(true)}
                className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'} font-medium py-2 px-4 rounded-lg transition-colors`}
              >
                ❓ How to Play
              </button>
            </div>
          </div>
        )}
        
        {gameState === 'playing' && currentQuestions.length > 0 && (
          <div>
            <Score 
              current={score} 
              total={currentQuestions.length}
              currentQuestion={currentQuestionIndex + 1}
              userName={userName}
              darkMode={darkMode}
            />
            <div className="flex justify-center">
              <Question
                question={currentQuestions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                selectedAnswer={selectedAnswer}
                showResult={showResult}
                timeLeft={timeLeft}
                settings={settings}
                darkMode={darkMode}
              />
            </div>
          </div>
        )}
        
        {gameState === 'finished' && (
          <Results 
            score={score} 
            total={currentQuestions.length} 
            onRestart={restartGame}
            onMainMenu={goToMainMenu}
            userName={userName}
            onSaveScore={saveScore}
            darkMode={darkMode}
            isNewHighScore={isNewHighScore()}
          />
        )}
      </div>

      {/* Modals */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setShowSettings(false)}
          darkMode={darkMode}
        />
      )}

      {showLeaderboard && (
        <Leaderboard
          scores={savedScores}
          onClose={() => setShowLeaderboard(false)}
          darkMode={darkMode}
        />
      )}

      {showHelp && (
        <HelpModal
          onClose={() => setShowHelp(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}