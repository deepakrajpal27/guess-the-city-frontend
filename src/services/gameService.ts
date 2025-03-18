import axios from 'axios';
import { CityHintResponse, GuessResponse } from '../types/types';

const API_URL = 'http://localhost:3000/game';

export const getRandomCityHint = async (): Promise<CityHintResponse | null> => {
  try {
    const response = await axios.get<CityHintResponse>(`${API_URL}/random-city`);
    return response.data;
  } catch (error) {
    console.error('Error fetching city hint:', error);
    return null;
  }
};

export const checkGuess = async (guess: string): Promise<GuessResponse | null> => {
  try {
    const response = await axios.post<GuessResponse>(`${API_URL}/guess`, { guess });
    return response.data;
  } catch (error) {
    console.error('Error checking guess:', error);
    return null;
  }
};
