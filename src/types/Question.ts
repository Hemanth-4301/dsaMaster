export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Example {
  input: string;
  output: string;
}

export interface CodeSolution {
  java: string;
  python: string;
  cpp: string;
}

export interface Complexity {
  time: string;
  space: string;
}

export interface Solution {
  code: CodeSolution;
  complexity: Complexity;
  explanation: string;
}

export interface Question {
  id: number;
  status: boolean; // Solved or not, stored in localStorage
  star: boolean; // Bookmarked or not
  problem: string;
  leetcodeLink: string;
  difficulty: Difficulty;
  description: string;
  examples: Example[];
  bruteForce: Solution;
  optimal: Solution;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: Question[];
}