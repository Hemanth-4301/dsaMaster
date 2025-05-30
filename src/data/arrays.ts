import { Question } from "../types/Question";

export const arraysQuestions: Question[] = [
  {
    id: 1,
    status: false,
    star: false,
    problem: "Contains Duplicate",
    leetcodeLink: "https://leetcode.com/problems/contains-duplicate/",
    difficulty: "Easy",
    description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" }
    ],
    bruteForce: {
      code: {
        java: "public boolean containsDuplicate(int[] nums) {\n  for (int i = 0; i < nums.length; i++) {\n    for (int j = i + 1; j < nums.length; j++) {\n      if (nums[i] == nums[j]) return true;\n    }\n  }\n  return false;\n}",
        python: "def containsDuplicate(nums):\n  for i in range(len(nums)):\n    for j in range(i + 1, len(nums)):\n      if nums[i] == nums[j]: return True\n  return False",
        cpp: "bool containsDuplicate(vector<int>& nums) {\n  for (int i = 0; i < nums.size(); i++) {\n    for (int j = i + 1; j < nums.size(); j++) {\n      if (nums[i] == nums[j]) return true;\n    }\n  }\n  return false;\n}"
      },
      complexity: {
        time: "O(n²)",
        space: "O(1)"
      },
      explanation: "The brute force approach compares each element with every other element in the array using nested loops."
    },
    optimal: {
      code: {
        java: "public boolean containsDuplicate(int[] nums) {\n  Set<Integer> seen = new HashSet<>();\n  for (int num : nums) {\n    if (seen.contains(num)) return true;\n    seen.add(num);\n  }\n  return false;\n}",
        python: "def containsDuplicate(nums):\n  return len(nums) != len(set(nums))",
        cpp: "bool containsDuplicate(vector<int>& nums) {\n  unordered_set<int> seen;\n  for (int num : nums) {\n    if (seen.count(num)) return true;\n    seen.insert(num);\n  }\n  return false;\n}"
      },
      complexity: {
        time: "O(n)",
        space: "O(n)"
      },
      explanation: "The optimal solution uses a HashSet to track seen elements, allowing O(1) lookups."
    }
  },
  {
    id: 2,
    status: false,
    star: false,
    problem: "Valid Anagram",
    leetcodeLink: "https://leetcode.com/problems/valid-anagram/",
    difficulty: "Easy",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word formed by rearranging the letters of another word.",
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" }
    ],
    bruteForce: {
      code: {
        java: "public boolean isAnagram(String s, String t) {\n  if (s.length() != t.length()) return false;\n  char[] sChars = s.toCharArray();\n  char[] tChars = t.toCharArray();\n  Arrays.sort(sChars);\n  Arrays.sort(tChars);\n  return Arrays.equals(sChars, tChars);\n}",
        python: "def isAnagram(s, t):\n  if len(s) != len(t): return False\n  return sorted(s) == sorted(t)",
        cpp: "bool isAnagram(string s, string t) {\n  if (s.length() != t.length()) return false;\n  sort(s.begin(), s.end());\n  sort(t.begin(), t.end());\n  return s == t;\n}"
      },
      complexity: {
        time: "O(n log n)",
        space: "O(1)"
      },
      explanation: "Sort both strings and compare them. If they are anagrams, the sorted strings will be identical."
    },
    optimal: {
      code: {
        java: "public boolean isAnagram(String s, String t) {\n  if (s.length() != t.length()) return false;\n  int[] count = new int[26];\n  for (int i = 0; i < s.length(); i++) {\n    count[s.charAt(i) - 'a']++;\n    count[t.charAt(i) - 'a']--;\n  }\n  for (int n : count) if (n != 0) return false;\n  return true;\n}",
        python: "def isAnagram(s, t):\n  if len(s) != len(t): return False\n  count = {}\n  for c1, c2 in zip(s, t):\n    count[c1] = count.get(c1, 0) + 1\n    count[c2] = count.get(c2, 0) - 1\n  return all(v == 0 for v in count.values())",
        cpp: "bool isAnagram(string s, string t) {\n  if (s.length() != t.length()) return false;\n  vector<int> count(26);\n  for (int i = 0; i < s.length(); i++) {\n    count[s[i] - 'a']++;\n    count[t[i] - 'a']--;\n  }\n  return all_of(count.begin(), count.end(), [](int x) { return x == 0; });\n}"
      },
      complexity: {
        time: "O(n)",
        space: "O(1)"
      },
      explanation: "Use a frequency counter array to track character counts. Increment for s and decrement for t."
    }
  }
];