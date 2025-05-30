import { Question } from "../types/Question";

export const stringsQuestions: Question[] = [
  {
    id: 3,
    status: false,
    star: false,
    problem: "Valid Palindrome",
    leetcodeLink: "https://leetcode.com/problems/valid-palindrome/",
    difficulty: "Easy",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
      { input: 's = "race a car"', output: "false" }
    ],
    bruteForce: {
      code: {
        java: "public boolean isPalindrome(String s) {\n  String clean = s.replaceAll(\"[^a-zA-Z0-9]\", \"\").toLowerCase();\n  return clean.equals(new StringBuilder(clean).reverse().toString());\n}",
        python: "def isPalindrome(s):\n  clean = ''.join(c.lower() for c in s if c.isalnum())\n  return clean == clean[::-1]",
        cpp: "bool isPalindrome(string s) {\n  string clean;\n  for (char c : s) if (isalnum(c)) clean += tolower(c);\n  string rev = clean;\n  reverse(rev.begin(), rev.end());\n  return clean == rev;\n}"
      },
      complexity: {
        time: "O(n)",
        space: "O(n)"
      },
      explanation: "Clean the string by removing non-alphanumeric characters and converting to lowercase, then compare with its reverse."
    },
    optimal: {
      code: {
        java: "public boolean isPalindrome(String s) {\n  int left = 0, right = s.length() - 1;\n  while (left < right) {\n    while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n    while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n    if (Character.toLowerCase(s.charAt(left++)) != Character.toLowerCase(s.charAt(right--))) return false;\n  }\n  return true;\n}",
        python: "def isPalindrome(s):\n  left, right = 0, len(s) - 1\n  while left < right:\n    while left < right and not s[left].isalnum(): left += 1\n    while left < right and not s[right].isalnum(): right -= 1\n    if s[left].lower() != s[right].lower(): return False\n    left, right = left + 1, right - 1\n  return True",
        cpp: "bool isPalindrome(string s) {\n  int left = 0, right = s.length() - 1;\n  while (left < right) {\n    while (left < right && !isalnum(s[left])) left++;\n    while (left < right && !isalnum(s[right])) right--;\n    if (tolower(s[left++]) != tolower(s[right--])) return false;\n  }\n  return true;\n}"
      },
      complexity: {
        time: "O(n)",
        space: "O(1)"
      },
      explanation: "Use two pointers to compare characters from both ends, skipping non-alphanumeric characters."
    }
  }
];