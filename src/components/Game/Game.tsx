import React, { useState } from 'react';
import { getRandomCityHint, checkGuess } from '../../services/gameService';
import styles from './Game.module.scss'
import { CityHintResponse, GuessResponse } from '../../types/types';

const Game: React.FC = () => {
  const [hint, setHint] = useState<string>('');
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [startGame, setStartGame] = useState<boolean>(false);


  const fetchNewHint = async (): Promise<void> => {
    const response: CityHintResponse | null = await getRandomCityHint();
    if (response) {
      setHint(response.hint);
      setMessage('');
    } else {
      console.error("❌ Failed to fetch hint from API!");
    }
  };

  const startTheGame = async (): Promise<void> => {
      setScore(0);
      setStartGame(true);
    await fetchNewHint();
  };

  const submitGuess = async (): Promise<void> => {
    if (!guess.trim()) {
      setMessage('Please enter a guess!');
      return;
    }

    const response: GuessResponse | null = await checkGuess(guess);

    if (response) {
      setMessage(response.message);

      if (response.correct) {
        setScore((prevScore) => prevScore + 1);
        setGuess('');
        await fetchNewHint();
      }
    }
  };

  return (
    <div className={styles.game}>
      <h1 className={styles.game__title}>Guess the City Game 🌍</h1>
      {!startGame &&
        <button
          className={styles.game__button}
          onClick={startTheGame}
        >
          Start Game
        </button>
      }
      {startGame && <p className={styles.game__score}>Score: {score} 🏆</p>}
      {hint && (
        <div>
          <p className={styles.game__hint}><strong>Hint:</strong> {hint}</p>
          <input
            className={styles.game__input}
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess..."
          />
          <button className={styles.game__button} onClick={submitGuess}>Submit Guess</button>
          <p className={styles.game__message}>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
