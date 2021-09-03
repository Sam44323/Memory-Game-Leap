import React from "react";
import styles from "./App.module.scss";
import Card from "./components/Card";

const CONTENT = ["A", "B", "C", "D", "E", "F", "G", "H"]; // a constant for initial content

/**
 *
 * @returns the root component
 */

const App: React.FC = () => {
  // storing duplicates of alphabets from A...H in an array
  const [currentContent, setCurrentContent] = React.useState<string[]>([]);
  const [currentFlips, setCurrentFlips] = React.useState<number[]>([]); // for storing the current flip cards indexes

  /**
   *
   * @param arr -> string[]
   * @returns the inputted array shuffled
   */

  const shuffleArray = (arr: string[]): string[] => {
    let currentIndex = arr.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }

    return arr;
  };

  React.useEffect(() => {
    setCurrentContent([...shuffleArray(CONTENT), ...shuffleArray(CONTENT)]);
  }, []);

  const flipHandler = React.useCallback(
    (index: number) => {
      if (currentFlips.includes(index)) {
        return;
      }
      const data = [...currentFlips];
      data.push(index);
      setCurrentFlips(data);
    },
    [currentFlips]
  );
  return (
    <div className={styles.App}>
      <div className={styles.TopContainer}>
        <div className={styles.HeadingData}>
          <p>Memory Game (Cards)</p>
          <p>High Score: 0</p>
        </div>
        <div className={styles.FlexContainer}>
          <button>Start Game</button>
          <button>Restart Game</button>
        </div>
        <hr />
      </div>
      <div className={styles.CardContainer}>
        {currentContent.map((item, index) => (
          <Card
            key={index}
            content={item}
            index={index}
            flipState={currentFlips.includes(index)}
            flipHandler={flipHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
