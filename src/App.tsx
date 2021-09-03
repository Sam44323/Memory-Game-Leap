import React, { useEffect, useState } from "react";
import MemoryGame from "./components/MemoryGame";
import "./App.scss";

const App: React.FC = () => {
  const [options, setOptions] = useState<any>(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    // Loads when the game starts
  }, []);
  return (
    <div>
      <div className="container">
        <h1>Memory Game</h1>
        <div>High Score: {highScore}</div>
        <div>
          {options === null ? (
            <>
              <button onClick={() => setOptions(12)}>Easy</button>
              <button onClick={() => setOptions(18)}>Medium</button>
              <button onClick={() => setOptions(24)}>Hard</button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  const prevOptions = options;
                  setOptions(null);
                  setTimeout(() => {
                    setOptions(prevOptions);
                  }, 5);
                }}
              >
                Start Over
              </button>
              <button onClick={() => setOptions(null)}>Main Menu</button>
            </>
          )}
        </div>
      </div>

      {options ? (
        <MemoryGame
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      ) : (
        <h2>Choose a difficulty to begin!</h2>
      )}
    </div>
  );
};

export default App;
