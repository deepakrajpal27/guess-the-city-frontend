import axios from 'axios';
import { CityHintResponse, GuessResponse } from '../types/types';

// Base API URL for the game backend
const API_URL = 'http://localhost:3000/game';

/**
 * Fetch a random city hint from the backend.
 * @returns {Promise<CityHintResponse | null>} - Returns a city hint object or null if an error occurs.
 */
export const getRandomCityHint = async (): Promise<CityHintResponse | null> => {
  try {
    // Make a GET request to fetch a random city hint
    const response = await axios.get<CityHintResponse>(`${API_URL}/random-city`);
    
    // Return the city hint data from the response
    return response.data;
  } catch (error) {
    // Log the error if the API request fails
    console.error('Error fetching city hint:', error);
    return null;
  }
};

/**
 * Send a user's guess to the backend for validation.
 * @param {string} guess - The user's guessed city name.
 * @returns {Promise<GuessResponse | null>} - Returns whether the guess is correct and a response message.
 */
export const checkGuess = async (guess: string): Promise<GuessResponse | null> => {
  try {
    // Make a POST request to validate the user's guess
    const response = await axios.post<GuessResponse>(`${API_URL}/guess`, { guess });
    
    // Return the validation result from the response
    return response.data;
  } catch (error) {
    // Log the error if the API request fails
    console.error('Error checking guess:', error);
    return null;
  }
};
