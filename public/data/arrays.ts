// src/data/arrays.ts
import { Question } from "../../src/types/Question";

export const arraysQuestions: Question[] = [
  // Previous questions (1-5) would be here...
  // Continuing with the remaining array questions:
  {
    id: 1,
    status: false,
    star: false,
    problem: "Contains Duplicate",
    leetcodeLink: "https://leetcode.com/problems/contains-duplicate/",
    difficulty: "Easy",
    description:
      "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" },
    ],
    bruteForce: {
      code: {
        java: "public boolean containsDuplicate(int[] nums) {\n  for (int i = 0; i < nums.length; i++) {\n    for (int j = i + 1; j < nums.length; j++) {\n      if (nums[i] == nums[j]) return true;\n    }\n  }\n  return false;\n}",
        python:
          "def containsDuplicate(nums):\n  for i in range(len(nums)):\n    for j in range(i + 1, len(nums)):\n      if nums[i] == nums[j]:\n        return True\n  return False",
        cpp: "bool containsDuplicate(vector<int>& nums) {\n  for (int i = 0; i < nums.size(); i++) {\n    for (int j = i + 1; j < nums.size(); j++) {\n      if (nums[i] == nums[j]) return true;\n    }\n  }\n  return false;\n}",
      },
      complexity: {
        time: "O(n²)",
        space: "O(1)",
      },
      explanation:
        "Compare each element with every other element using nested loops.",
    },
    optimal: {
      code: {
        java: "public boolean containsDuplicate(int[] nums) {\n  Set<Integer> seen = new HashSet<>();\n  for (int num : nums) {\n    if (seen.contains(num)) return true;\n    seen.add(num);\n  }\n  return false;\n}",
        python:
          "def containsDuplicate(nums):\n  return len(nums) != len(set(nums))",
        cpp: "bool containsDuplicate(vector<int>& nums) {\n  unordered_set<int> seen;\n  for (int num : nums) {\n    if (seen.count(num)) return true;\n    seen.insert(num);\n  }\n  return false;\n}",
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation: "Use a HashSet to track seen elements for O(1) lookups.",
    },
  },
  {
    id: 2,
    status: false,
    star: false,
    problem: "Valid Anagram",
    leetcodeLink: "https://leetcode.com/problems/valid-anagram/",
    difficulty: "Easy",
    description:
      "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    examples: [
      { input: "s = 'anagram', t = 'nagaram'", output: "true" },
      { input: "s = 'rat', t = 'car'", output: "false" },
    ],
    bruteForce: {
      code: {
        java: "public boolean isAnagram(String s, String t) {\n  if (s.length() != t.length()) return false;\n  char[] sArr = s.toCharArray();\n  char[] tArr = t.toCharArray();\n  Arrays.sort(sArr);\n  Arrays.sort(tArr);\n  return Arrays.equals(sArr, tArr);\n}",
        python: "def isAnagram(s, t):\n  return sorted(s) == sorted(t)",
        cpp: "bool isAnagram(string s, string t) {\n  sort(s.begin(), s.end());\n  sort(t.begin(), t.end());\n  return s == t;\n}",
      },
      complexity: {
        time: "O(n log n)",
        space: "O(1) or O(n) depending on sort implementation",
      },
      explanation: "Sort both strings and compare if they're equal.",
    },
    optimal: {
      code: {
        java: "public boolean isAnagram(String s, String t) {\n  if (s.length() != t.length()) return false;\n  int[] count = new int[26];\n  for (char c : s.toCharArray()) count[c-'a']++;\n  for (char c : t.toCharArray()) {\n    count[c-'a']--;\n    if (count[c-'a'] < 0) return false;\n  }\n  return true;\n}",
        python:
          "def isAnagram(s, t):\n  if len(s) != len(t): return False\n  count = [0] * 26\n  for c in s: count[ord(c)-ord('a')] += 1\n  for c in t:\n    count[ord(c)-ord('a')] -= 1\n    if count[ord(c)-ord('a')] < 0: return False\n  return True",
        cpp: "bool isAnagram(string s, string t) {\n  if (s.size() != t.size()) return false;\n  int count[26] = {0};\n  for (char c : s) count[c-'a']++;\n  for (char c : t) {\n    count[c-'a']--;\n    if (count[c-'a'] < 0) return false;\n  }\n  return true;\n}",
      },
      complexity: {
        time: "O(n)",
        space: "O(1) (fixed size array)",
      },
      explanation: "Use a frequency array to count character occurrences.",
    },
  },
  {
    id: 3,
    status: false,
    star: false,
    problem: "Two Sum",
    leetcodeLink: "https://leetcode.com/problems/two-sum/",
    difficulty: "Easy",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    bruteForce: {
      code: {
        java: "public int[] twoSum(int[] nums, int target) {\n  for (int i = 0; i < nums.length; i++) {\n    for (int j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] == target) return new int[]{i,j};\n    }\n  }\n  return new int[0];\n}",
        python:
          "def twoSum(nums, target):\n  for i in range(len(nums)):\n    for j in range(i+1, len(nums)):\n      if nums[i] + nums[j] == target:\n        return [i,j]\n  return []",
        cpp: "vector<int> twoSum(vector<int>& nums, int target) {\n  for (int i = 0; i < nums.size(); i++) {\n    for (int j = i + 1; j < nums.size(); j++) {\n      if (nums[i] + nums[j] == target) return {i,j};\n    }\n  }\n  return {};\n}",
      },
      complexity: {
        time: "O(n²)",
        space: "O(1)",
      },
      explanation: "Check all possible pairs using nested loops.",
    },
    optimal: {
      code: {
        java: "public int[] twoSum(int[] nums, int target) {\n  Map<Integer, Integer> map = new HashMap<>();\n  for (int i = 0; i < nums.length; i++) {\n    int complement = target - nums[i];\n    if (map.containsKey(complement)) {\n      return new int[]{map.get(complement), i};\n    }\n    map.put(nums[i], i);\n  }\n  return new int[0];\n}",
        python:
          "def twoSum(nums, target):\n  seen = {}\n  for i, num in enumerate(nums):\n    complement = target - num\n    if complement in seen:\n      return [seen[complement], i]\n    seen[num] = i\n  return []",
        cpp: "vector<int> twoSum(vector<int>& nums, int target) {\n  unordered_map<int, int> map;\n  for (int i = 0; i < nums.size(); i++) {\n    int complement = target - nums[i];\n    if (map.count(complement)) {\n      return {map[complement], i};\n    }\n    map[nums[i]] = i;\n  }\n  return {};\n}",
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation:
        "Use a hash map to store values and indices for O(1) lookups.",
    },
  },
  {
    id: 4,
    status: false,
    star: false,
    problem: "Group Anagrams",
    leetcodeLink: "https://leetcode.com/problems/group-anagrams/",
    difficulty: "Medium",
    description:
      "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    examples: [
      {
        input: "strs = ['eat','tea','tan','ate','nat','bat']",
        output: "[['bat'],['nat','tan'],['ate','eat','tea']]",
      },
      { input: "strs = ['']", output: "[['']]" },
    ],
    bruteForce: {
      code: {
        java: "public List<List<String>> groupAnagrams(String[] strs) {\n  List<List<String>> result = new ArrayList<>();\n  boolean[] used = new boolean[strs.length];\n  \n  for (int i = 0; i < strs.length; i++) {\n    if (used[i]) continue;\n    List<String> group = new ArrayList<>();\n    group.add(strs[i]);\n    \n    for (int j = i + 1; j < strs.length; j++) {\n      if (isAnagram(strs[i], strs[j])) {\n        group.add(strs[j]);\n        used[j] = true;\n      }\n    }\n    \n    result.add(group);\n  }\n  \n  return result;\n}\n\nprivate boolean isAnagram(String a, String b) {\n  if (a.length() != b.length()) return false;\n  int[] count = new int[26];\n  for (char c : a.toCharArray()) count[c-'a']++;\n  for (char c : b.toCharArray()) {\n    count[c-'a']--;\n    if (count[c-'a'] < 0) return false;\n  }\n  return true;\n}",
        python:
          "def groupAnagrams(strs):\n  result = []\n  used = [False] * len(strs)\n  \n  for i in range(len(strs)):\n    if used[i]: continue\n    group = [strs[i]]\n    \n    for j in range(i+1, len(strs)):\n      if is_anagram(strs[i], strs[j]):\n        group.append(strs[j])\n        used[j] = True\n    \n    result.append(group)\n  \n  return result\n\ndef is_anagram(a, b):\n  return sorted(a) == sorted(b)",
        cpp: "vector<vector<string>> groupAnagrams(vector<string>& strs) {\n  vector<vector<string>> result;\n  vector<bool> used(strs.size(), false);\n  \n  for (int i = 0; i < strs.size(); i++) {\n    if (used[i]) continue;\n    vector<string> group = {strs[i]};\n    \n    for (int j = i + 1; j < strs.size(); j++) {\n      if (isAnagram(strs[i], strs[j])) {\n        group.push_back(strs[j]);\n        used[j] = true;\n      }\n    }\n    \n    result.push_back(group);\n  }\n  \n  return result;\n}\n\nbool isAnagram(string a, string b) {\n  sort(a.begin(), a.end());\n  sort(b.begin(), b.end());\n  return a == b;\n}",
      },
      complexity: {
        time: "O(n² * k) where k is max string length",
        space: "O(n)",
      },
      explanation:
        "Compare each string with every other string to find anagrams.",
    },
    optimal: {
      code: {
        java: "public List<List<String>> groupAnagrams(String[] strs) {\n  Map<String, List<String>> map = new HashMap<>();\n  \n  for (String s : strs) {\n    char[] chars = s.toCharArray();\n    Arrays.sort(chars);\n    String key = String.valueOf(chars);\n    \n    if (!map.containsKey(key)) {\n      map.put(key, new ArrayList<>());\n    }\n    map.get(key).add(s);\n  }\n  \n  return new ArrayList<>(map.values());\n}",
        python:
          "def groupAnagrams(strs):\n  anagrams = {}\n  for s in strs:\n    key = ''.join(sorted(s))\n    if key not in anagrams:\n      anagrams[key] = []\n    anagrams[key].append(s)\n  return list(anagrams.values())",
        cpp: "vector<vector<string>> groupAnagrams(vector<string>& strs) {\n  unordered_map<string, vector<string>> map;\n  \n  for (string s : strs) {\n    string key = s;\n    sort(key.begin(), key.end());\n    map[key].push_back(s);\n  }\n  \n  vector<vector<string>> result;\n  for (auto& pair : map) {\n    result.push_back(pair.second);\n  }\n  \n  return result;\n}",
      },
      complexity: {
        time: "O(n * k log k) where k is max string length",
        space: "O(n * k)",
      },
      explanation:
        "Use sorted strings as keys in a hash map to group anagrams.",
    },
  },
  {
    id: 5,
    status: false,
    star: false,
    problem: "Top K Frequent Elements",
    leetcodeLink: "https://leetcode.com/problems/top-k-frequent-elements/",
    difficulty: "Medium",
    description:
      "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    bruteForce: {
      code: {
        java: "public int[] topKFrequent(int[] nums, int k) {\n  Map<Integer, Integer> freq = new HashMap<>();\n  for (int num : nums) freq.put(num, freq.getOrDefault(num, 0) + 1);\n  \n  List<Integer> unique = new ArrayList<>(freq.keySet());\n  unique.sort((a, b) -> freq.get(b) - freq.get(a));\n  \n  int[] result = new int[k];\n  for (int i = 0; i < k; i++) result[i] = unique.get(i);\n  \n  return result;\n}",
        python:
          "def topKFrequent(nums, k):\n  freq = {}\n  for num in nums:\n    freq[num] = freq.get(num, 0) + 1\n  \n  unique = list(freq.keys())\n  unique.sort(key=lambda x: -freq[x])\n  \n  return unique[:k]",
        cpp: "vector<int> topKFrequent(vector<int>& nums, int k) {\n  unordered_map<int, int> freq;\n  for (int num : nums) freq[num]++;\n  \n  vector<int> unique;\n  for (auto& pair : freq) unique.push_back(pair.first);\n  \n  sort(unique.begin(), unique.end(), [&](int a, int b) {\n    return freq[a] > freq[b];\n  });\n  \n  return vector<int>(unique.begin(), unique.begin() + k);\n}",
      },
      complexity: {
        time: "O(n log n)",
        space: "O(n)",
      },
      explanation:
        "Count frequencies, sort unique elements by frequency, and return top k.",
    },
    optimal: {
      code: {
        java: "public int[] topKFrequent(int[] nums, int k) {\n  Map<Integer, Integer> freq = new HashMap<>();\n  for (int num : nums) freq.put(num, freq.getOrDefault(num, 0) + 1);\n  \n  PriorityQueue<Integer> heap = new PriorityQueue<>(\n    (a, b) -> freq.get(a) - freq.get(b)\n  );\n  \n  for (int num : freq.keySet()) {\n    heap.add(num);\n    if (heap.size() > k) heap.poll();\n  }\n  \n  int[] result = new int[k];\n  for (int i = 0; i < k; i++) result[i] = heap.poll();\n  \n  return result;\n}",
        python:
          "def topKFrequent(nums, k):\n  freq = {}\n  for num in nums:\n    freq[num] = freq.get(num, 0) + 1\n  \n  return heapq.nlargest(k, freq.keys(), key=freq.get)",
        cpp: "vector<int> topKFrequent(vector<int>& nums, int k) {\n  unordered_map<int, int> freq;\n  for (int num : nums) freq[num]++;\n  \n  priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> heap;\n  \n  for (auto& pair : freq) {\n    heap.push({pair.second, pair.first});\n    if (heap.size() > k) heap.pop();\n  }\n  \n  vector<int> result;\n  while (!heap.empty()) {\n    result.push_back(heap.top().second);\n    heap.pop();\n  }\n  \n  return result;\n}",
      },
      complexity: {
        time: "O(n log k)",
        space: "O(n)",
      },
      explanation:
        "Use a min-heap to keep track of top k elements without full sorting.",
    },
  },

  {
    id: 6,
    status: false,
    star: false,
    problem: "Product of Array Except Self",
    leetcodeLink: "https://leetcode.com/problems/product-of-array-except-self/",
    difficulty: "Medium",
    description:
      "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
    ],
    bruteForce: {
      code: {
        java: "public int[] productExceptSelf(int[] nums) {\n  int n = nums.length;\n  int[] answer = new int[n];\n  for (int i = 0; i < n; i++) {\n    int product = 1;\n    for (int j = 0; j < n; j++) {\n      if (i != j) product *= nums[j];\n    }\n    answer[i] = product;\n  }\n  return answer;\n}",
        python:
          "def productExceptSelf(nums):\n  n = len(nums)\n  answer = [1] * n\n  for i in range(n):\n    for j in range(n):\n      if i != j:\n        answer[i] *= nums[j]\n  return answer",
        cpp: "vector<int> productExceptSelf(vector<int>& nums) {\n  int n = nums.size();\n  vector<int> answer(n, 1);\n  for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n      if (i != j) answer[i] *= nums[j];\n    }\n  }\n  return answer;\n}",
      },
      complexity: {
        time: "O(n²)",
        space: "O(1) (excluding output array)",
      },
      explanation:
        "For each element, calculate product of all other elements using nested loops.",
    },
    optimal: {
      code: {
        java: "public int[] productExceptSelf(int[] nums) {\n  int n = nums.length;\n  int[] answer = new int[n];\n  \n  // Calculate left products\n  answer[0] = 1;\n  for (int i = 1; i < n; i++) {\n    answer[i] = answer[i-1] * nums[i-1];\n  }\n  \n  // Calculate right products and multiply\n  int right = 1;\n  for (int i = n-1; i >= 0; i--) {\n    answer[i] *= right;\n    right *= nums[i];\n  }\n  \n  return answer;\n}",
        python:
          "def productExceptSelf(nums):\n  n = len(nums)\n  answer = [1] * n\n  \n  # Calculate left products\n  for i in range(1, n):\n    answer[i] = answer[i-1] * nums[i-1]\n  \n  # Calculate right products and multiply\n  right = 1\n  for i in range(n-1, -1, -1):\n    answer[i] *= right\n    right *= nums[i]\n  \n  return answer",
        cpp: "vector<int> productExceptSelf(vector<int>& nums) {\n  int n = nums.size();\n  vector<int> answer(n, 1);\n  \n  // Calculate left products\n  for (int i = 1; i < n; i++) {\n    answer[i] = answer[i-1] * nums[i-1];\n  }\n  \n  // Calculate right products and multiply\n  int right = 1;\n  for (int i = n-1; i >= 0; i--) {\n    answer[i] *= right;\n    right *= nums[i];\n  }\n  \n  return answer;\n}",
      },
      complexity: {
        time: "O(n)",
        space: "O(1) (excluding output array)",
      },
      explanation:
        "Use prefix and suffix products to calculate result in linear time without division.",
    },
  },
  {
    id: 7,
    status: false,
    star: false,
    problem: "Valid Sudoku",
    leetcodeLink: "https://leetcode.com/problems/valid-sudoku/",
    difficulty: "Medium",
    description:
      "Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules: Each row, column, and 3x3 sub-box must contain the digits 1-9 without repetition.",
    examples: [
      {
        input:
          "board = \n[['5','3','.','.','7','.','.','.','.']\n,['6','.','.','1','9','5','.','.','.']\n,['.','9','8','.','.','.','.','6','.']\n,['8','.','.','.','6','.','.','.','3']\n,['4','.','.','8','.','3','.','.','1']\n,['7','.','.','.','2','.','.','.','6']\n,['.','6','.','.','.','.','2','8','.']\n,['.','.','.','4','1','9','.','.','5']\n,['.','.','.','.','8','.','.','7','9']]",
        output: "true",
      },
      {
        input:
          "board = \n[['8','3','.','.','7','.','.','.','.']\n,['6','.','.','1','9','5','.','.','.']\n,['.','9','8','.','.','.','.','6','.']\n,['8','.','.','.','6','.','.','.','3']\n,['4','.','.','8','.','3','.','.','1']\n,['7','.','.','.','2','.','.','.','6']\n,['.','6','.','.','.','.','2','8','.']\n,['.','.','.','4','1','9','.','.','5']\n,['.','.','.','.','8','.','.','7','9']]",
        output: "false",
      },
    ],
    bruteForce: {
      code: {
        java: `public boolean isValidSudoku(char[][] board) {
  // Check rows
  for (int i = 0; i < 9; i++) {
    boolean[] seen = new boolean[9];
    for (int j = 0; j < 9; j++) {
      if (board[i][j] != '.') {
        int num = board[i][j] - '1';
        if (seen[num]) return false;
        seen[num] = true;
      }
    }
  }
  
  // Check columns
  for (int j = 0; j < 9; j++) {
    boolean[] seen = new boolean[9];
    for (int i = 0; i < 9; i++) {
      if (board[i][j] != '.') {
        int num = board[i][j] - '1';
        if (seen[num]) return false;
        seen[num] = true;
      }
    }
  }
  
  // Check 3x3 sub-boxes
  for (int box = 0; box < 9; box++) {
    boolean[] seen = new boolean[9];
    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        int row = 3 * (box / 3) + i;
        int col = 3 * (box % 3) + j;
        if (board[row][col] != '.') {
          int num = board[row][col] - '1';
          if (seen[num]) return false;
          seen[num] = true;
        }
      }
    }
  }
  
  return true;
}`,
        python: `def isValidSudoku(board):
  # Check rows
  for i in range(9):
    seen = set()
    for j in range(9):
      if board[i][j] != '.':
        if board[i][j] in seen:
          return False
        seen.add(board[i][j])
  
  # Check columns
  for j in range(9):
    seen = set()
    for i in range(9):
      if board[i][j] != '.':
        if board[i][j] in seen:
          return False
        seen.add(board[i][j])
  
  # Check 3x3 sub-boxes
  for box in range(9):
    seen = set()
    for i in range(3):
      for j in range(3):
        row = 3 * (box // 3) + i
        col = 3 * (box % 3) + j
        if board[row][col] != '.':
          if board[row][col] in seen:
            return False
          seen.add(board[row][col])
  
  return True`,
        cpp: `bool isValidSudoku(vector<vector<char>>& board) {
  // Check rows
  for (int i = 0; i < 9; i++) {
    bool seen[9] = {false};
    for (int j = 0; j < 9; j++) {
      if (board[i][j] != '.') {
        int num = board[i][j] - '1';
        if (seen[num]) return false;
        seen[num] = true;
      }
    }
  }
  
  // Check columns
  for (int j = 0; j < 9; j++) {
    bool seen[9] = {false};
    for (int i = 0; i < 9; i++) {
      if (board[i][j] != '.') {
        int num = board[i][j] - '1';
        if (seen[num]) return false;
        seen[num] = true;
      }
    }
  }
  
  // Check 3x3 sub-boxes
  for (int box = 0; box < 9; box++) {
    bool seen[9] = {false};
    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        int row = 3 * (box / 3) + i;
        int col = 3 * (box % 3) + j;
        if (board[row][col] != '.') {
          int num = board[row][col] - '1';
          if (seen[num]) return false;
          seen[num] = true;
        }
      }
    }
  }
  
  return true;
}`,
      },
      complexity: {
        time: "O(1) (fixed 9x9 board)",
        space: "O(1) (fixed size arrays)",
      },
      explanation:
        "Check each row, column, and 3x3 sub-box for duplicates separately.",
    },
    optimal: {
      code: {
        java: `public boolean isValidSudoku(char[][] board) {
  Set<String> seen = new HashSet<>();
  for (int i = 0; i < 9; i++) {
    for (int j = 0; j < 9; j++) {
      char num = board[i][j];
      if (num != '.') {
        String rowKey = num + " in row " + i;
        String colKey = num + " in col " + j;
        String boxKey = num + " in box " + i/3 + "-" + j/3;
        
        if (seen.contains(rowKey) || seen.contains(colKey) || seen.contains(boxKey)) {
          return false;
        }
        
        seen.add(rowKey);
        seen.add(colKey);
        seen.add(boxKey);
      }
    }
  }
  return true;
}`,
        python: `def isValidSudoku(board):
  seen = set()
  for i in range(9):
    for j in range(9):
      num = board[i][j]
      if num != '.':
        row_key = f"{num} in row {i}"
        col_key = f"{num} in col {j}"
        box_key = f"{num} in box {i//3}-{j//3}"
        
        if row_key in seen or col_key in seen or box_key in seen:
          return False
        
        seen.add(row_key)
        seen.add(col_key)
        seen.add(box_key)
  return True`,
        cpp: `bool isValidSudoku(vector<vector<char>>& board) {
  unordered_set<string> seen;
  for (int i = 0; i < 9; i++) {
    for (int j = 0; j < 9; j++) {
      char num = board[i][j];
      if (num != '.') {
        string rowKey = to_string(num) + " in row " + to_string(i);
        string colKey = to_string(num) + " in col " + to_string(j);
        string boxKey = to_string(num) + " in box " + to_string(i/3) + "-" + to_string(j/3);
        
        if (seen.count(rowKey) || seen.count(colKey) || seen.count(boxKey)) {
          return false;
        }
        
        seen.insert(rowKey);
        seen.insert(colKey);
        seen.insert(boxKey);
      }
    }
  }
  return true;
}`,
      },
      complexity: {
        time: "O(1) (fixed 9x9 board)",
        space: "O(1) (fixed size hash set)",
      },
      explanation:
        "Use a single hash set to track numbers in rows, columns, and boxes with unique keys.",
    },
  },
  {
    id: 8,
    status: false,
    star: false,
    problem: "Longest Consecutive Sequence",
    leetcodeLink: "https://leetcode.com/problems/longest-consecutive-sequence/",
    difficulty: "Medium",
    description:
      "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.",
    examples: [
      { input: "nums = [100,4,200,1,3,2]", output: "4" },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" },
    ],
    bruteForce: {
      code: {
        java: "public int longestConsecutive(int[] nums) {\n  int maxStreak = 0;\n  \n  for (int num : nums) {\n    int currentNum = num;\n    int currentStreak = 1;\n    \n    while (arrayContains(nums, currentNum + 1)) {\n      currentNum++;\n      currentStreak++;\n    }\n    \n    maxStreak = Math.max(maxStreak, currentStreak);\n  }\n  \n  return maxStreak;\n}\n\nprivate boolean arrayContains(int[] arr, int num) {\n  for (int n : arr) {\n    if (n == num) return true;\n  }\n  return false;\n}",
        python:
          "def longestConsecutive(nums):\n  max_streak = 0\n  \n  for num in nums:\n    current_num = num\n    current_streak = 1\n    \n    while current_num + 1 in nums:\n      current_num += 1\n      current_streak += 1\n    \n    max_streak = max(max_streak, current_streak)\n  \n  return max_streak",
        cpp: "int longestConsecutive(vector<int>& nums) {\n  int maxStreak = 0;\n  \n  for (int num : nums) {\n    int currentNum = num;\n    int currentStreak = 1;\n    \n    while (find(nums.begin(), nums.end(), currentNum + 1) != nums.end()) {\n      currentNum++;\n      currentStreak++;\n    }\n    \n    maxStreak = max(maxStreak, currentStreak);\n  }\n  \n  return maxStreak;\n}",
      },
      complexity: {
        time: "O(n³)",
        space: "O(1)",
      },
      explanation:
        "For each number, check if the next consecutive number exists in the array (with O(n) search).",
    },
    optimal: {
      code: {
        java: "public int longestConsecutive(int[] nums) {\n  Set<Integer> numSet = new HashSet<>();\n  for (int num : nums) numSet.add(num);\n  \n  int maxStreak = 0;\n  \n  for (int num : numSet) {\n    // Only check if it's the start of a sequence\n    if (!numSet.contains(num-1)) {\n      int currentNum = num;\n      int currentStreak = 1;\n      \n      while (numSet.contains(currentNum+1)) {\n        currentNum++;\n        currentStreak++;\n      }\n      \n      maxStreak = Math.max(maxStreak, currentStreak);\n    }\n  }\n  \n  return maxStreak;\n}",
        python:
          "def longestConsecutive(nums):\n  num_set = set(nums)\n  max_streak = 0\n  \n  for num in num_set:\n    # Only check if it's the start of a sequence\n    if num - 1 not in num_set:\n      current_num = num\n      current_streak = 1\n      \n      while current_num + 1 in num_set:\n        current_num += 1\n        current_streak += 1\n      \n      max_streak = max(max_streak, current_streak)\n  \n  return max_streak",
        cpp: "int longestConsecutive(vector<int>& nums) {\n  unordered_set<int> numSet(nums.begin(), nums.end());\n  int maxStreak = 0;\n  \n  for (int num : numSet) {\n    // Only check if it's the start of a sequence\n    if (numSet.find(num - 1) == numSet.end()) {\n      int currentNum = num;\n      int currentStreak = 1;\n      \n      while (numSet.find(currentNum + 1) != numSet.end()) {\n        currentNum++;\n        currentStreak++;\n      }\n      \n      maxStreak = max(maxStreak, currentStreak);\n    }\n  }\n  \n  return maxStreak;\n}",
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation:
        "Use a hash set for O(1) lookups and only check sequences starting from the smallest number.",
    },
  },
];
