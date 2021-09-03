import React from "react";
import styles from "./App.module.scss";
import Card from "./components/Card";

const CONTENT = ["A", "B", "C", "D", "E", "F", "G", "H"]; // a constant for initial content
let tempContentValue: {
  index: number;
  value: string;
} = {} as any; // storing the temp content value based on flipping
let Attempts = 0; // storing the count of attempts;
let flipperCounter = 0; // flipper counter for counting the number of current flipped cards

/**
 *
 * @returns the root component
 */

const App: React.FC = () => {
  // storing duplicates of alphabets from A...H in an array
  const [currentContent, setCurrentContent] = React.useState<string[]>([]);
  const [tempFlips, setTempFlips] = React.useState<number[]>([]); // for storing the temporary flip cards indexes
  const [currentFlips, setCurrentFlips] = React.useState<string[]>([]); // for storing the temporary flip cards indexes
  const [currentScore, setCurrentScore] = React.useState<number>(0); // storing the score for user
  const [start, setStart] = React.useState<boolean>(false);

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
    window.onbeforeunload = (e) => {
      return true;
    };
  }, []);

  const restartHandler = () => {
    setCurrentFlips([]);
    setTempFlips([]);
    tempContentValue = {} as any;
    Attempts = 0;
    flipperCounter = 0;
    setTimeout(() => {
      setCurrentContent([...shuffleArray(CONTENT), ...shuffleArray(CONTENT)]);
    }, 1500);
  };

  const flipHandler = React.useCallback(
    (index: number, content: string) => {
      let data: number[] = [];

      if (tempContentValue.value === content && flipperCounter < 2) {
        const currFlipsTempData = [...currentFlips];
        currFlipsTempData.push(content);
        setCurrentFlips(currFlipsTempData);
        const score =
          currentScore +
          (Attempts === 1 ? 3 : Attempts === 2 ? 2 : Attempts === 3 ? 1 : 0);
        setCurrentScore(score);
        Attempts = 0;
      } else {
        tempContentValue = {
          index,
          value: content,
        };
        Attempts++;
        flipperCounter++;
      }
      /**
       * checking if the tempFlips array already includes the passed index
       */
      if (tempFlips.includes(index)) {
        return;
      }

      /**
       * tempFlips > 2 then un-flip the cards that were already flipped
       */
      if (tempFlips.length === 1) {
        setTimeout(() => {
          data.length = 0;
          setTempFlips(data);
          flipperCounter = 0;
        }, 100);
      }

      data = [...tempFlips];
      data.push(index);
      setTempFlips(data);
    },
    [tempFlips, currentFlips, currentScore]
  );
  console.log(Attempts);
  return (
    <div className={styles.App}>
      <div className={styles.TopContainer}>
        <div className={styles.HeadingData}>
          <p>Memory Game (Cards)</p>
          <p>
            High Score: {currentScore} (1 Attempt: 3, 2 Attempts: 2, 3 Attempts:
            1, More than 3 Attempts: 0)
          </p>
        </div>
        <div className={styles.FlexContainer}>
          <button onClick={() => setStart(true)}>Start Game</button>
          <button onClick={restartHandler}>Restart Game</button>
        </div>
        <hr />
      </div>
      {!start ? (
        <h1 className={styles.StartGameTitle}>Start the game!</h1>
      ) : (
        <div className={styles.CardContainer}>
          {currentContent.map((item, index) => (
            <Card
              key={index}
              content={item}
              index={index}
              flipState={
                tempFlips.includes(index) || currentFlips.includes(item)
              }
              flipHandler={flipHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
