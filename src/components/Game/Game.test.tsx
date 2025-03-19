import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Game from './Game';
import * as gameService from '../../services/gameService';

// Explicitly cast as jest.Mock to avoid TypeScript errors
jest.mock('../../services/gameService', () => ({
  getRandomCityHint: jest.fn() as jest.Mock,
  checkGuess: jest.fn() as jest.Mock,
}));

describe('Game Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the game title', () => {
    render(<Game />);
    const titleElement = screen.getByText(/Guess the City Game 🌍/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('starts the game when "Start Game" button is clicked', async () => {
    (gameService.getRandomCityHint as jest.Mock).mockResolvedValue({ hint: 'Famous for the Eiffel Tower' });

    render(<Game />);
    const startButton = screen.getByText(/Start Game/i);
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(startButton).not.toBeInTheDocument();
      expect(screen.getByText(/Score: 0 🏆/i)).toBeInTheDocument();
      expect(screen.getByText(/Famous for the Eiffel Tower/i)).toBeInTheDocument();
    });
  });

  test('accepts user input and submits a guess', async () => {
    (gameService.getRandomCityHint as jest.Mock).mockResolvedValue({ hint: 'Famous for the Eiffel Tower' });
    (gameService.checkGuess as jest.Mock).mockResolvedValue({ correct: false, message: 'Wrong guess! Try again.' });

    render(<Game />);
    fireEvent.click(screen.getByText(/Start Game/i));

    await waitFor(() => screen.getByText(/Famous for the Eiffel Tower/i));

    const input = screen.getByPlaceholderText(/Enter your guess.../i);
    const submitButton = screen.getByText(/Submit Guess/i);

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Wrong guess! Try again./i)).toBeInTheDocument();
    });
  });

  test('prevents submission when input is empty', async () => {
    (gameService.getRandomCityHint as jest.Mock).mockResolvedValue({ hint: 'Famous for the Eiffel Tower' });

    render(<Game />);
    fireEvent.click(screen.getByText(/Start Game/i));

    await waitFor(() => screen.getByText(/Famous for the Eiffel Tower/i));

    const submitButton = screen.getByText(/Submit Guess/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/Please enter a guess!/i)).toBeInTheDocument();
  });
});
