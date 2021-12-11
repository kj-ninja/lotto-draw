import './App.css';
import { useState } from 'react';

function App() {
  const [chosenNumbers, setChosenNumbers] = useState([]);
  let [numberOfDraws, setNumberOfDraws] = useState(0);

  const generateNumbers = () => Array.from({length: 49}, (_, i) => i + 1);

  const handleNumberClick = (number) => {
    if (chosenNumbers.includes(number)) {
      setChosenNumbers(chosenNumbers.filter(chosenNumber => number !== chosenNumber))
    } else {
      if (chosenNumbers.length === 6) return;

      setChosenNumbers([...chosenNumbers, number].sort((a, b) => a - b));
    }
  };

  const doesArraysEqual = (a, b) => {
    const sortedDrawnNumbers = a.sort((a, b) => a - b);
    const sortedChosenNumbers = b.sort((a, b) => a - b);

    return Array.isArray(sortedDrawnNumbers) &&
      Array.isArray(sortedChosenNumbers) &&
      sortedDrawnNumbers.length === sortedChosenNumbers.length &&
      sortedDrawnNumbers.every((val, index) => val === sortedChosenNumbers[index]);
  }

  const drawUniqueSixNumbers = () => {
    let arr = [];

    while (arr.length < 6) {
      let r = Math.floor(Math.random() * 49) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    return arr;
  };

  const drawResult = () => {
    if (chosenNumbers.length !== 6) return;
    setNumberOfDraws(numberOfDraws++);

    const drawnNumbers = drawUniqueSixNumbers();
    if (doesArraysEqual(drawnNumbers, chosenNumbers)) {
      return;
    } else {
      drawResult();
    }
  };

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

  return (
    <div className='App'>
      <h1>Choose 6 unique numbers and draw!</h1>

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

      <button className={`draw-button ${chosenNumbers.length !== 6 ? 'not-allowed' : ''}`} onClick={drawResult}>
        Start Draw!
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
