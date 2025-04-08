import React from 'react';
import '../styles/Keyboard.css';

const Keyboard = ({ onKeyPress, usedLetters }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
  ];

  const getKeyClass = (key) => {
    if (usedLetters.correct.includes(key)) return 'correct';
    if (usedLetters.present.includes(key)) return 'present';
    if (usedLetters.absent.includes(key)) return 'absent';
    return '';
  };

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={`key ${getKeyClass(key)} ${key === 'ENTER' || key === '⌫' ? 'special-key' : ''}`}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard; 