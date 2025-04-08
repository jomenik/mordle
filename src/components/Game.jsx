import { useState, useEffect } from 'react';
import '../styles/Game.css';
import Keyboard from './Keyboard';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const WORD_LIST = ['MORZE', 'KARTA', 'LAMPA', 'BIURO', 'KABEL', 'RADIO', 'PILOT', 'MASKA'];

function Game() {
  const [targetWord, setTargetWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [usedLetters, setUsedLetters] = useState({
    correct: [],
    present: [],
    absent: []
  });

  useEffect(() => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setTargetWord(randomWord);
  }, []);

  const handleKeyPress = (key) => {
    if (gameOver) return;

    if (key === 'ENTER' && currentGuess.length === WORD_LENGTH) {
      submitGuess();
    } else if (key === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < WORD_LENGTH && key.length === 1) {
      setCurrentGuess(prev => (prev + key).toUpperCase());
    }
  };

  useEffect(() => {
    const handlePhysicalKeyPress = (event) => {
      if (event.key === 'Enter' && currentGuess.length === WORD_LENGTH) {
        submitGuess();
      } else if (event.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (currentGuess.length < WORD_LENGTH && event.key.match(/^[a-zA-Z]$/)) {
        setCurrentGuess(prev => (prev + event.key).toUpperCase());
      }
    };

    window.addEventListener('keydown', handlePhysicalKeyPress);
    return () => window.removeEventListener('keydown', handlePhysicalKeyPress);
  }, [currentGuess, gameOver]);

  const submitGuess = () => {
    if (currentGuess === targetWord) {
      setMessage('Gratulacje! Wygrałeś!');
      setGameOver(true);
    } else if (guesses.length >= MAX_ATTEMPTS - 1) {
      setMessage(`Koniec gry! Prawidłowe słowo to: ${targetWord}`);
      setGameOver(true);
    }

    // Aktualizuj użyte litery
    const newUsedLetters = { ...usedLetters };
    currentGuess.split('').forEach((letter, index) => {
      if (targetWord[index] === letter) {
        if (!newUsedLetters.correct.includes(letter)) {
          newUsedLetters.correct.push(letter);
        }
      } else if (targetWord.includes(letter)) {
        if (!newUsedLetters.present.includes(letter)) {
          newUsedLetters.present.push(letter);
        }
      } else {
        if (!newUsedLetters.absent.includes(letter)) {
          newUsedLetters.absent.push(letter);
        }
      }
    });
    setUsedLetters(newUsedLetters);

    setGuesses(prev => [...prev, currentGuess]);
    setCurrentGuess('');
  };

  const getLetterClass = (letter, index, guess) => {
    if (!targetWord) return '';
    
    if (targetWord[index] === letter) {
      return 'correct';
    } else if (targetWord.includes(letter)) {
      return 'present';
    }
    return 'absent';
  };

  return (
    <div className="game">
      <h1>Mordle</h1>
      <div className="board">
        {[...Array(MAX_ATTEMPTS)].map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {[...Array(WORD_LENGTH)].map((_, colIndex) => {
              const letter = rowIndex < guesses.length
                ? guesses[rowIndex][colIndex]
                : rowIndex === guesses.length && colIndex < currentGuess.length
                  ? currentGuess[colIndex]
                  : '';
              
              const letterClass = rowIndex < guesses.length
                ? getLetterClass(letter, colIndex, guesses[rowIndex])
                : '';

              return (
                <div key={colIndex} className={`tile ${letterClass}`}>
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {message && <div className="message">{message}</div>}
      <button 
        className="keyboard-toggle"
        onClick={() => setShowKeyboard(!showKeyboard)}
      >
        {showKeyboard ? 'Ukryj klawiaturę' : 'Pokaż klawiaturę'}
      </button>
      {showKeyboard && (
        <Keyboard 
          onKeyPress={handleKeyPress}
          usedLetters={usedLetters}
        />
      )}
    </div>
  );
}

export default Game;
