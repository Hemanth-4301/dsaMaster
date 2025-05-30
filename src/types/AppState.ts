export interface AppState {
  darkMode: boolean;
  solvedQuestions: Record<number, boolean>;
  starredQuestions: Record<number, boolean>;
}

export const defaultAppState: AppState = {
  darkMode: true, // Default to dark mode
  solvedQuestions: {},
  starredQuestions: {},
};