import './App.css';
import { useState } from 'react';

function App() {
  const [chosenNumbers, setChosenNumbers] = useState([]);
  let [numberOfDraws, setNumberOfDraws] = useState(0);

  const generateNumbers = () => Array.from({length: 22}, (_, i) => i + 1);

  const doesArraysEqual = (a, b) => {
    const sortedDrawnNumbers = a.sort((a, b) => a - b);
    const sortedChosenNumbers = b.sort((a, b) => a - b);

    return Array.isArray(sortedDrawnNumbers) &&
      Array.isArray(sortedChosenNumbers) &&
      sortedDrawnNumbers.length === sortedChosenNumbers.length &&
      sortedDrawnNumbers.every((val, index) => val === sortedChosenNumbers[index]);
  }

  const getAmountOfYearsAndDaysByNumber = (number) => {
    let years = 0;
    let days = 0;

    while (number) {
      if (number >= 365) {
        years++;
        number -= 365;
      } else {
        days++;
        number--;
      }
    }

    return `Years: ${years} days: ${days}`
  };

  const handleNumberClick = (number) => {
    if (chosenNumbers.includes(number)) {
      setChosenNumbers(chosenNumbers.filter(chosenNumber => number !== chosenNumber))
    } else {
      if (chosenNumbers.length === 3) return;

      setChosenNumbers([...chosenNumbers, number].sort((a, b) => a - b));
    }
  };

  const drawUniqueThreeNumbers = () => {
    let arr = [];

    while (arr.length < 3) {
      let r = Math.floor(Math.random() * 22) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    return arr;
  };

  const drawResult = () => {
    if (chosenNumbers.length !== 3) return;
    setNumberOfDraws(numberOfDraws++);

    const drawnNumbers = drawUniqueThreeNumbers();
    if (doesArraysEqual(drawnNumbers, chosenNumbers)) {
      return;
    } else {
      drawResult();
    }
  };

  const handleDrawResult = () => {
    if (numberOfDraws > 0) return;

    drawResult();

    console.log('koniec!');
  };

  const resetDraw = () => {
    if (chosenNumbers.length === 0) return;

    setChosenNumbers([]);
    setNumberOfDraws(0);
  };

  return (
    <div className='App'>
      <h1>Choose 3 unique numbers and draw!</h1>

      <div className="numbers">
        {
          generateNumbers().map(i => (
            <span
              className={`number ${chosenNumbers.includes(i) ? 'chosen' : ''}`}
              key={i}
              onClick={() => handleNumberClick(i)}
            >
              {i}
            </span>
          ))
        }
      </div>

      <button
        className={`draw-button start ${(chosenNumbers.length !== 3 || numberOfDraws > 0) ? 'not-allowed' : ''}`}
        onClick={handleDrawResult}
      >
        Start Draw
      </button>

      <button className={`draw-button reset ${chosenNumbers.length === 0 ? 'not-allowed' : ''}`} onClick={resetDraw}>
        Reset Draw
      </button>

      <div className="result">
        <p>Number of draws: {numberOfDraws}</p>
        <br/>

        <p>Amount of years and days assuming that you can draw once per day:</p>
        <div>{getAmountOfYearsAndDaysByNumber(numberOfDraws)}</div>

      </div>
    </div>
  );
}

export default App;
