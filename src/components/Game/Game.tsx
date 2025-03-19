import React, { useState } from 'react';
import { getRandomCityHint, checkGuess } from '../../services/gameService';
import styles from './Game.module.scss';
import { CityHintResponse, GuessResponse } from '../../types/types';

/**
 * Game Component - The main component for the "Guess the City Game"
 * 
 * Features:
 * - Fetches a random city hint when the game starts.
 * - Allows the user to submit a guess.
 * - Displays a score that increases when the user guesses correctly.
 * - Uses SCSS module for styling.
 */
const Game: React.FC = () => {
  // State variables to manage game state
  const [hint, setHint] = useState<string>(''); // Stores the hint for the current city
  const [guess, setGuess] = useState<string>(''); // Stores the user's guess
  const [message, setMessage] = useState<string>(''); // Displays feedback messages
  const [score, setScore] = useState<number>(0); // Keeps track of the user's score
  const [startGame, setStartGame] = useState<boolean>(false); // Indicates whether the game has started

  /**
   * Fetches a new city hint from the backend and updates the state.
   * If the request fails, an error message is logged.
   */
  const fetchNewHint = async (): Promise<void> => {
    const response: CityHintResponse | null = await getRandomCityHint();
    if (response) {
      setHint(response.hint);
      setMessage('');
    } else {
      console.error("❌ Failed to fetch hint from API!");
    }
  };

  /**
   * Starts the game:
   * - Resets the score.
   * - Sets the game to active state.
   * - Fetches a new hint.
   */
  const startTheGame = async (): Promise<void> => {
    setScore(0);
    setStartGame(true);
    await fetchNewHint();
  };

  /**
   * Handles the submission of the user's guess:
   * - If the input is empty, prompts the user to enter a guess.
   * - Sends the guess to the backend for validation.
   * - Updates the message based on the correctness of the guess.
   * - If the guess is correct, increments the score and fetches a new hint.
   */
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

      {/* Show "Start Game" button only if the game has not started */}
      {!startGame && (
        <button className={styles.game__button} onClick={startTheGame}>
          Start Game
        </button>
      )}

      {/* Display score only when the game is active */}
      {startGame && <p className={styles.game__score}>Score: {score} 🏆</p>}

      {/* Display hint and input field when a city hint is available */}
      {hint && (
        <div>
          <p className={styles.game__hint}>
            <strong>Hint:</strong> {hint}
          </p>
          <input
            className={styles.game__input}
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitGuess();
              }
            }}
            placeholder="Enter your guess..."
          />
          <button className={styles.game__button} onClick={submitGuess}>
            Submit Guess
          </button>
          <p className={styles.game__message}>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
