// src/components/Board.jsx
import Tile from './Tile';

const Board = ({ guesses, solution }) => {
  return (
    <div className="flex flex-col items-center">
      {guesses.map((guess, rowIndex) => (
        <div key={rowIndex} className="flex">
          {guess.split('').map((letter, colIndex) => {
            // Logika sprawdzania statusu litery
            let status = '';
            if (solution[colIndex] === letter) {
              status = 'correct';
            } else if (solution.includes(letter)) {
              status = 'present';
            } else {
              status = 'absent';
            }

            return <Tile key={colIndex} letter={letter} status={status} />;
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
