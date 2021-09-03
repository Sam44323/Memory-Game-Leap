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

  return <div className={styles.App}></div>;
};

export default App;
