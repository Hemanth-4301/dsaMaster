import { Category } from "../types/Question";
import { arraysQuestions } from "./arrays";
import { stringsQuestions } from "./strings";
import { slidingWindowQuestions } from "./slidingWindow";
import { stackQuestions } from "./stack";
import { binarySearchQuestions } from "./binarySearch";
import { linkedListQuestions } from "./linkedList";
import { heapQuestions } from "./heaps";
import { backTrackingQuestions } from "./backtracking";
import { trieQuestions } from "./tries";
import { treeQuestions } from "./trees";
import { graphQuestions } from "./graph";
import { dp1Questions } from "./1dp";
import { dp2Questions } from "./2dp";
import { greedyQuestions } from "./greedy";
import { bitQuestions } from "./bits";
import { twoPointerQuestions } from "./twoPointers";
import { matrixQuestions } from "./matrix";

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
    id: "two-pointers",
    name: "Two Pointers",
    description: "Technique for solving problems with two indices",
    icon: "Pointer",
    questions: twoPointerQuestions,
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
    questions: linkedListQuestions,
  },

  {
    id: "heap",
    name: "Heap / Priority Queue",
    description: "Special tree-based data structure",
    icon: "TreePine",
    questions: heapQuestions,
  },

  {
    id: "backtracking",
    name: "Backtracking",
    description:
      "Algorithm for finding all solutions by exploring all potential paths",
    icon: "Undo2",
    questions: backTrackingQuestions,
  },
  {
    id: "binary-tree",
    name: "Binary Tree",
    description: "Tree with at most two children per node",
    icon: "GitBranch",
    questions: treeQuestions,
  },
  {
    id: "trie",
    name: "Trie",
    description: "Specialized tree for efficient string operations",
    icon: "Network",
    questions: trieQuestions,
  },
  {
    id: "graph",
    name: "Graph",
    description: "Collection of nodes connected by edges",
    icon: "Network",
    questions: graphQuestions,
  },
  {
    id: "dp-easy",
    name: "Dynamic Programming I",
    description: "Fundamental DP problems and patterns",
    icon: "Braces",
    questions: dp1Questions,
  },
  {
    id: "dp-hard",
    name: "Dynamic Programming II",
    description: "Advanced DP problems and techniques",
    icon: "Braces",
    questions: dp2Questions,
  },
  {
    id: "greedy",
    name: "Greedy",
    description: "Algorithms that make locally optimal choices",
    icon: "Zap",
    questions: greedyQuestions,
  },
  {
    id: "bit-manipulation",
    name: "Bit Manipulation",
    description: "Operations on binary representations of numbers",
    icon: "Binary",
    questions: bitQuestions,
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    description: "Other important topics and algorithms",
    icon: "PuzzlePiece",
    questions: matrixQuestions,
  },
];

export const totalQuestions = categories.reduce(
  (count, category) => count + category.questions.length,
  0
);
