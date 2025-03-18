export interface CityHintResponse {
  hint: string;
  cityName?: string;
}

export interface GuessResponse {
  correct: boolean;
  message: string;
}