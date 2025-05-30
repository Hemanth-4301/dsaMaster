import { Category } from "../types/Question";
import { arraysQuestions } from "./arrays";
import { stringsQuestions } from "./strings";
import { slidingWindowQuestions } from "./slidingWindow";
import { stackQuestions } from "./stack";
import { binarySearchQuestions } from "./binarySearch";

export const categories: Category[] = [
  {
    id: "arrays",
    name: "Arrays & Hashing",
    description:
      "Fundamental data structure for storing collections of elements",
    icon: "List",
    questions: arraysQuestions,
  },
  {
    id: "strings",
    name: "Strings",
    description: "Sequence of characters and operations on them",
    icon: "Text",
    questions: stringsQuestions,
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    description: "Efficient technique for processing sequential data",
    icon: "Window",
    questions: slidingWindowQuestions,
  },
  {
    id: "stack",
    name: "Stack",
    description: "LIFO data structure for solving various problems",
    icon: "StackSimple",
    questions: stackQuestions,
  },
  {
    id: "binary-search",
    name: "Binary Search",
    description: "Efficient search algorithm for sorted arrays",
    icon: "Search",
    questions: binarySearchQuestions,
  },
  {
    id: "linked-list",
    name: "Linked List",
    description: "Linear data structure with nodes connected by pointers",
    icon: "Link",
    questions: [],
  },
  {
    id: "binary-tree",
    name: "Binary Tree",
    description: "Tree with at most two children per node",
    icon: "GitBranch",
    questions: [],
  },
  {
    id: "heap",
    name: "Heap / Priority Queue",
    description: "Special tree-based data structure",
    icon: "TreePine",
    questions: [],
  },
  {
    id: "backtracking",
    name: "Backtracking",
    description:
      "Algorithm for finding all solutions by exploring all potential paths",
    icon: "Undo2",
    questions: [],
  },
  {
    id: "trie",
    name: "Trie",
    description: "Specialized tree for efficient string operations",
    icon: "Network",
    questions: [],
  },
  {
    id: "graph",
    name: "Graph",
    description: "Collection of nodes connected by edges",
    icon: "Network",
    questions: [],
  },
  {
    id: "dp-easy",
    name: "Dynamic Programming I",
    description: "Fundamental DP problems and patterns",
    icon: "Braces",
    questions: [],
  },
  {
    id: "dp-hard",
    name: "Dynamic Programming II",
    description: "Advanced DP problems and techniques",
    icon: "Braces",
    questions: [],
  },
  {
    id: "greedy",
    name: "Greedy",
    description: "Algorithms that make locally optimal choices",
    icon: "Zap",
    questions: [],
  },
  {
    id: "intervals",
    name: "Intervals",
    description: "Problems involving ranges or intervals",
    icon: "Milestone",
    questions: [],
  },
  {
    id: "matrix",
    name: "Matrix",
    description: "2D grid problems and traversal techniques",
    icon: "Grid",
    questions: [],
  },
  {
    id: "bit-manipulation",
    name: "Bit Manipulation",
    description: "Operations on binary representations of numbers",
    icon: "Binary",
    questions: [],
  },
];

export const totalQuestions = categories.reduce(
  (count, category) => count + category.questions.length,
  0
);
