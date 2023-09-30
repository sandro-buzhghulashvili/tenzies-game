import React from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [numberOfRolls, setNumberOfRolls] = React.useState(0);
  const [lowestNumberOfRolls, setLowestNumberOfrolls] = React.useState(
    JSON.parse(localStorage.getItem('lowestNumber')) || 1000
  );

  function allNewDice() {
    const allDices = [];

    for (let i = 0; i < 10; i++) {
      allDices.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return allDices;
  }

  const diceElements = dice.map((element) => {
    return (
      <Die
        value={element.value}
        isHeld={element.isHeld}
        key={element.id}
        hold={() => hold(element.id)}
      />
    );
  });

  function Roll() {
    setNumberOfRolls((prevValue) => prevValue + 1);
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((element) => {
          return element.isHeld
            ? element
            : {
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
                id: nanoid(),
              };
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      if (numberOfRolls < lowestNumberOfRolls) {
        setLowestNumberOfrolls(numberOfRolls);
      }

      setNumberOfRolls(0);
    }
  }
  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log('You won');
    }
  }, [dice]);

  React.useEffect(() => {
    localStorage.setItem('lowestNumber', JSON.stringify(lowestNumberOfRolls));
  }, [lowestNumberOfRolls]);

  return (
    <>
      {tenzies && <Confetti />}
      <main>
        <div className="results">
          <h2>Number of Rolls : {numberOfRolls}</h2>
          <h2>
            Min number of Rolls :{' '}
            {lowestNumberOfRolls < 1000 ? lowestNumberOfRolls : '-'}
          </h2>
        </div>
        <center>
          <h1 className="title">Tenzies</h1>
        </center>
        <center>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </center>
        <div className="dice-container">{diceElements}</div>
        <button onClick={Roll} className="roll-button">
          {tenzies === true ? 'New Game' : 'Roll'}
        </button>
      </main>
    </>
  );
}
