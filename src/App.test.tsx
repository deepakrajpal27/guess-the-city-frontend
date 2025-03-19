import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';  // Add this line
import App from './App';

test('renders Guess the City Game title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Guess the City Game/i);
  expect(titleElement).toBeInTheDocument();
});
