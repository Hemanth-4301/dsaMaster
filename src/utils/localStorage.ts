import { AppState, defaultAppState } from '../types/AppState';

const APP_STATE_KEY = 'dsa_learning_platform_state';

export const loadAppState = (): AppState => {
  try {
    const storedState = localStorage.getItem(APP_STATE_KEY);
    if (storedState) {
      return JSON.parse(storedState) as AppState;
    }
  } catch (error) {
    console.error('Failed to load app state from localStorage:', error);
  }
  return defaultAppState;
};

export const saveAppState = (state: AppState): void => {
  try {
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save app state to localStorage:', error);
  }
};

export const toggleQuestionStatus = (questionId: number, solved: boolean): AppState => {
  const state = loadAppState();
  const newState = {
    ...state,
    solvedQuestions: {
      ...state.solvedQuestions,
      [questionId]: solved,
    },
  };
  saveAppState(newState);
  return newState;
};

export const toggleQuestionStar = (questionId: number, starred: boolean): AppState => {
  const state = loadAppState();
  const newState = {
    ...state,
    starredQuestions: {
      ...state.starredQuestions,
      [questionId]: starred,
    },
  };
  saveAppState(newState);
  return newState;
};

export const toggleDarkMode = (darkMode: boolean): AppState => {
  const state = loadAppState();
  const newState = {
    ...state,
    darkMode,
  };
  saveAppState(newState);
  return newState;
};

export const getTotalSolvedQuestions = (): number => {
  const state = loadAppState();
  return Object.values(state.solvedQuestions).filter(Boolean).length;
};

export const getQuestionStatus = (questionId: number): boolean => {
  const state = loadAppState();
  return state.solvedQuestions[questionId] || false;
};

export const getQuestionStarred = (questionId: number): boolean => {
  const state = loadAppState();
  return state.starredQuestions[questionId] || false;
};