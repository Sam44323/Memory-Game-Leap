import React from "react";
import "./App.scss";

const CONTENT = ["A", "B", "C", "D", "E", "F", "G", "H"]; // a constant for initial content

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

  return (
    <div>
      <h3>App</h3>
    </div>
  );
};

export default App;
