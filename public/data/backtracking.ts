// src/data/backTracking.ts
import { Question } from "../types/Question";

export const backTrackingQuestions: Question[] = [
  // ==================== MEDIUM ====================
  {
    id: 53,
    status: false,
    star: false,
    problem: "Subsets",
    leetcodeLink: "https://leetcode.com/problems/subsets/",
    difficulty: "Medium",
    description: "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "nums = [0]", output: "[[],[0]]" }
    ],
    bruteForce: {
      code: {
        java: `public List<List<Integer>> subsets(int[] nums) {
  List<List<Integer>> result = new ArrayList<>();
  result.add(new ArrayList<>());
  
  for (int num : nums) {
    List<List<Integer>> newSubsets = new ArrayList<>();
    for (List<Integer> subset : result) {
      List<Integer> newSubset = new ArrayList<>(subset);
      newSubset.add(num);
      newSubsets.add(newSubset);
    }
    result.addAll(newSubsets);
  }
  
  return result;
}`,
        python: `def subsets(nums: List[int]) -> List[List[int]]:
  result = [[]]
  
  for num in nums:
    new_subsets = []
    for subset in result:
      new_subsets.append(subset + [num])
    result.extend(new_subsets)
  
  return result`,
        cpp: `vector<vector<int>> subsets(vector<int>& nums) {
  vector<vector<int>> result = {{}};
  
  for (int num : nums) {
    vector<vector<int>> newSubsets;
    for (const auto& subset : result) {
      vector<int> newSubset = subset;
      newSubset.push_back(num);
      newSubsets.push_back(newSubset);
    }
    result.insert(result.end(), newSubsets.begin(), newSubsets.end());
  }
  
  return result;
}`
      },
      complexity: {
        time: "O(2^n * n) where n is the length of nums",
        space: "O(2^n * n)"
      },
      explanation: "Iteratively build subsets by adding each element to all existing subsets."
    },
    optimal: {
      code: {
        java: `public List<List<Integer>> subsets(int[] nums) {
  List<List<Integer>> result = new ArrayList<>();
  backtrack(nums, 0, new ArrayList<>(), result);
  return result;
}

private void backtrack(int[] nums, int start, List<Integer> curr, List<List<Integer>> result) {
  result.add(new ArrayList<>(curr));
  
  for (int i = start; i < nums.length; i++) {
    curr.add(nums[i]);
    backtrack(nums, i + 1, curr, result);
    curr.remove(curr.size() - 1);
  }
}`,
        python: `def subsets(nums: List[int]) -> List[List[int]]:
  result = []
  
  def backtrack(start: int, curr: List[int]):
    result.append(curr[:])
    for i in range(start, len(nums)):
      curr.append(nums[i])
      backtrack(i + 1, curr)
      curr.pop()
  
  backtrack(0, [])
  return result`,
        cpp: `vector<vector<int>> subsets(vector<int>& nums) {
  vector<vector<int>> result;
  vector<int> curr;
  
  function<void(int)> backtrack = [&](int start) {
    result.push_back(curr);
    for (int i = start; i < nums.size(); i++) {
      curr.push_back(nums[i]);
      backtrack(i + 1);
      curr.pop_back();
    }
  };
  
  backtrack(0);
  return result;
}`
      },
      complexity: {
        time: "O(2^n * n) where n is the length of nums",
        space: "O(n) for recursion stack, O(2^n * n) for output"
      },
      explanation: "Use backtracking to explore all possible subsets by including or excluding each element."
    }
  },
  {
    id: 54,
    status: false,
    star: false,
    problem: "Combination Sum",
    leetcodeLink: "https://leetcode.com/problems/combination-sum/",
    difficulty: "Medium",
    description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may use the same number an unlimited number of times.",
    examples: [
      { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" },
      { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3],[3,5]]" }
    ],
    bruteForce: {
      code: {
        java: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
  List<List<Integer>> result = new ArrayList<>();
  for (int i = 1; i <= target; i++) {
    List<List<Integer>> combs = new ArrayList<>();
    for (int candidate : candidates) {
      if (candidate == i) combs.add(Arrays.asList(candidate));
      else if (i - candidate > 0) {
        for (List<Integer> sub : combinationSum(candidates, i - candidate)) {
          List<Integer> newComb = new ArrayList<>(sub);
          newComb.add(candidate);
          combs.add(newComb);
        }
      }
    }
    if (i == target) result = combs;
  }
  return result;
}`,
        python: `def combinationSum(candidates: List[int], target: int) -> List[List[int]]:
  result = []
  for i in range(1, target + 1):
    combs = []
    for candidate in candidates:
      if candidate == i:
        combs.append([candidate])
      elif i - candidate > 0:
        for sub in combinationSum(candidates, i - candidate):
          combs.append(sub + [candidate])
    if i == target:
      result = combs
  return result`,
        cpp: `vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
  vector<vector<int>> result;
  for (int i = 1; i <= target; i++) {
    vector<vector<int>> combs;
    for (int candidate : candidates) {
      if (candidate == i) combs.push_back({candidate});
      else if (i - candidate > 0) {
        auto sub = combinationSum(candidates, i - candidate);
        for (auto& s : sub) {
          s.push_back(candidate);
          combs.push_back(s);
        }
      }
    }
    if (i == target) result = combs;
  }
  return result;
}`
      },
      complexity: {
        time: "O(2^target) due to recursive exploration",
        space: "O(target) for recursion stack"
      },
      explanation: "Recursively try all possible sums up to target, building combinations."
    },
    optimal: {
      code: {
        java: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
  List<List<Integer>> result = new ArrayList<>();
  Arrays.sort(candidates);
  backtrack(candidates, 0, target, new ArrayList<>(), result);
  return result;
}

private void backtrack(int[] candidates, int start, int target, List<Integer> curr, List<List<Integer>> result) {
  if (target == 0) {
    result.add(new ArrayList<>(curr));
    return;
  }
  for (int i = start; i < candidates.length && candidates[i] <= target; i++) {
    curr.add(candidates[i]);
    backtrack(candidates, i, target - candidates[i], curr, result);
    curr.remove(curr.size() - 1);
  }
}`,
        python: `def combinationSum(candidates: List[int], target: int) -> List[List[int]]:
  result = []
  candidates.sort()
  
  def backtrack(start: int, target: int, curr: List[int]):
    if target == 0:
      result.append(curr[:])
      return
    for i in range(start, len(candidates)):
      if candidates[i] > target:
        break
      curr.append(candidates[i])
      backtrack(i, target - candidates[i], curr)
      curr.pop()
  
  backtrack(0, target, [])
  return result`,
        cpp: `vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
  vector<vector<int>> result;
  sort(candidates.begin(), candidates.end());
  
  function<void(int, int, vector<int>&)> backtrack = [&](int start, int target, vector<int>& curr) {
    if (target == 0) {
      result.push_back(curr);
      return;
    }
    for (int i = start; i < candidates.size() && candidates[i] <= target; i++) {
      curr.push_back(candidates[i]);
      backtrack(i, target - candidates[i], curr);
      curr.pop_back();
    }
  };
  
  vector<int> curr;
  backtrack(0, target, curr);
  return result;
}`
      },
      complexity: {
        time: "O(2^n) where n is the length of candidates",
        space: "O(n) for recursion stack"
      },
      explanation: "Use backtracking with sorted candidates to efficiently explore combinations, pruning when target becomes negative."
    }
  },
  {
    id: 55,
    status: false,
    star: false,
    problem: "Combination Sum II",
    leetcodeLink: "https://leetcode.com/problems/combination-sum-ii/",
    difficulty: "Medium",
    description: "Given a collection of candidate numbers and a target number, find all unique combinations in candidates where the candidate numbers sum to target. Each number may be used only once.",
    examples: [
      { input: "candidates = [10,1,2,7,6,1,5], target = 8", output: "[[1,1,6],[1,2,5],[1,7],[2,6]]" },
      { input: "candidates = [2,5,2,1,2], target = 5", output: "[[1,2,2],[5]]" }
    ],
    bruteForce: {
      code: {
        java: `public List<List<Integer>> combinationSum2(int[] candidates, int target) {
  List<List<Integer>> result = new ArrayList<>();
  Arrays.sort(candidates);
  Set<List<Integer>> set = new HashSet<>();
  backtrack(candidates, 0, target, new ArrayList<>(), set);
  result.addAll(set);
  return result;
}

private void backtrack(int[] candidates, int start, int target, List<Integer> curr, Set<List<Integer>> result) {
  if (target == 0) {
    result.add(new ArrayList<>(curr));
    return;
  }
  for (int i = start; i < candidates.length; i++) {
    if (target - candidates[i] < 0) continue;
    curr.add(candidates[i]);
    backtrack(candidates, i + 1, target - candidates[i], curr, result);
    curr.remove(curr.size() - 1);
  }
}`,
        python: `def combinationSum2(candidates: List[int], target: int) -> List[List[int]]:
  candidates.sort()
  result = set()
  
  def backtrack(start: int, target: int, curr: List[int]):
    if target == 0:
      result.add(tuple(curr))
      return
    for i in range(start, len(candidates)):
      if target - candidates[i] < 0:
        continue
      curr.append(candidates[i])
      backtrack(i + 1, target - candidates[i], curr)
      curr.pop()
  
  backtrack(0, target, [])
  return [list(x) for x in result]`,
        cpp: `vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
  sort(candidates.begin(), candidates.end());
  set<vector<int>> result;
  
  function<void(int, int, vector<int>&)> backtrack = [&](int start, int target, vector<int>& curr) {
    if (target == 0) {
      result.insert(curr);
      return;
    }
    for (int i = start; i < candidates.size(); i++) {
      if (target - candidates[i] < 0) continue;
      curr.push_back(candidates[i]);
      backtrack(i + 1, target - candidates[i], curr);
      curr.pop_back();
    }
  };
  
  vector<int> curr;
  backtrack(0, target, curr);
  return vector<vector<int>>(result.begin(), result.end());
}`
      },
      complexity: {
        time: "O(2^n) where n is the length of candidates",
        space: "O(n) for recursion stack, O(2^n) for output"
      },
      explanation: "Use backtracking and a set to avoid duplicates, but this is inefficient due to set operations."
    },
    optimal: {
      code: {
        java: `public List<List<Integer>> combinationSum2(int[] candidates, int target) {
  List<List<Integer>> result = new ArrayList<>();
  Arrays.sort(candidates);
  backtrack(candidates, 0, target, new ArrayList<>(), result);
  return result;
}

private void backtrack(int[] candidates, int start, int target, List<Integer> curr, List<List<Integer>> result) {
  if (target == 0) {
    result.add(new ArrayList<>(curr));
    return;
  }
  for (int i = start; i < candidates.length && candidates[i] <= target; i++) {
    if (i > start && candidates[i] == candidates[i - 1]) continue;
    curr.add(candidates[i]);
    backtrack(candidates, i + 1, target - candidates[i], curr, result);
    curr.remove(curr.size() - 1);
  }
}`,
        python: `def combinationSum2(candidates: List[int], target: int) -> List[List[int]]:
  result = []
  candidates.sort()
  
  def backtrack(start: int, target: int, curr: List[int]):
    if target == 0:
      result.append(curr[:])
      return
    for i in range(start, len(candidates)):
      if i > start and candidates[i] == candidates[i - 1]:
        continue
      if candidates[i] > target:
        break
      curr.append(candidates[i])
      backtrack(i + 1, target - candidates[i], curr)
      curr.pop()
  
  backtrack(0, target, [])
  return result`,
        cpp: `vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
  vector<vector<int>> result;
  sort(candidates.begin(), candidates.end());
  
  function<void(int, int, vector<int>&)> backtrack = [&](int start, int target, vector<int>& curr) {
    if (target == 0) {
      result.push_back(curr);
      return;
    }
    for (int i = start; i < candidates.size() && candidates[i] <= target; i++) {
      if (i > start && candidates[i] == candidates[i - 1]) continue;
      curr.push_back(candidates[i]);
      backtrack(i + 1, target - candidates[i], curr);
      curr.pop_back();
    }
  };
  
  vector<int> curr;
  backtrack(0, target, curr);
  return result;
}`
      },
      complexity: {
        time: "O(2^n) where n is the length of candidates",
        space: "O(n) for recursion stack"
      },
      explanation: "Backtrack with sorted candidates, skipping duplicates by checking adjacent elements."
    }
  },
  {
    id: 56,
    status: false,
    star: false,
    problem: "Permutations",
    leetcodeLink: "https://leetcode.com/problems/permutations/",
    difficulty: "Medium",
    description: "Given an array nums of distinct integers, return all the possible permutations.",
    examples: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
      { input: "nums = [0,1]", output: "[[0,1],[1,0]]" }
    ],
    bruteForce: {
      code: {
        java: `public List<List<Integer>> permute(int[] nums) {
  List<List<Integer>> result = new ArrayList<>();
  List<Integer> curr = new ArrayList<>();
  boolean[] used = new boolean[nums.length];
  backtrack(nums, used, curr, result);
  return result;
}

private void backtrack(int[] nums, boolean[] used, List<Integer> curr, List<List<Integer>> result) {
  if (curr.size() == nums.length) {
    result.add(new ArrayList<>(curr));
    return;
  }
  for (int i = 0; i < nums.length; i++) {
    if (!used[i]) {
      used[i] = true;
      curr.add(nums[i]);
      backtrack(nums, used, curr, result);
      curr.remove(curr.size() - 1);
      used[i] = false;
    }
  }
}`,
        python: `def permute(nums: List[int]) -> List[List[int]]:
  result = []
  
  def backtrack(used: List[bool], curr: List[int]):
    if len(curr) == len(nums):
      result.append(curr[:])
      return
    for i in range(len(nums)):
      if not used[i]:
        used[i] = True
        curr.append(nums[i])
        backtrack(used, curr)
        curr.pop()
        used[i] = False
  
  backtrack([False] * len(nums), [])
  return result`,
        cpp: `vector<vector<int>> permute(vector<int>& nums) {
  vector<vector<int>> result;
  vector<bool> used(nums.size(), false);
  vector<int> curr;
  
  function<void()> backtrack = [&]() {
    if (curr.size() == nums.size()) {
      result.push_back(curr);
      return;
    }
    for (int i = 0; i < nums.size(); i++) {
      if (!used[i]) {
        used[i] = true;
        curr.push_back(nums[i]);
        backtrack();
        curr.pop_back();
        used[i] = false;
      }
    }
  };
  
  backtrack();
  return result;
}`
      },
      complexity: {
        time: "O(n!) where n is the length of nums",
        space: "O(n) for recursion stack"
      },
      explanation: "Use backtracking with a boolean array to track used elements, generating all permutations."
    },
    optimal: {
      code: {
        java: `public List<List<Integer>> permute(int[] nums) {
  List<List<Integer>> result = new ArrayList<>();
  backtrack(nums, 0, result);
  return result;
}

private void backtrack(int[] nums, int start, List<List<Integer>> result) {
  if (start == nums.length) {
    List<Integer> list = new ArrayList<>();
    for (int num : nums) list.add(num);
    result.add(list);
    return;
  }
  for (int i = start; i < nums.length; i++) {
    swap(nums, start, i);
    backtrack(nums, start + 1, result);
    swap(nums, start, i);
  }
}

private void swap(int[] nums, int i, int j) {
  int temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}`,
        python: `def permute(nums: List[int]) -> List[List[int]]:
  result = []
  
  def backtrack(start: int):
    if start == len(nums):
      result.append(nums[:])
      return
    for i in range(start, len(nums)):
      nums[start], nums[i] = nums[i], nums[start]
      backtrack(start + 1)
      nums[start], nums[i] = nums[i], nums[start]
  
  backtrack(0)
  return result`,
        cpp: `vector<vector<int>> permute(vector<int>& nums) {
  vector<vector<int>> result;
  
  function<void(int)> backtrack = [&](int start) {
    if (start == nums.size()) {
      result.push_back(nums);
      return;
    }
    for (int i = start; i < nums.size(); i++) {
      swap(nums[start], nums[i]);
      backtrack(start + 1);
      swap(nums[start], nums[i]);
    }
  };
  
  backtrack(0);
  return result;
}`
      },
      complexity: {
        time: "O(n!) where n is the length of nums",
        space: "O(n) for recursion stack"
      },
      explanation: "Generate permutations by swapping elements in-place, avoiding extra space for tracking used elements."
    }
  },
  {
    id: 57,
    status: false,
    star: false,
    problem: "Subsets II",
    leetcodeLink: "https://leetcode.com/problems/subsets-ii/",
    difficulty: "Medium",
    description: "Given an integer array nums that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
    examples: [
      { input: "nums = [1,2,2]", output: "[[],[1],[1,2],[1,2,2],[2],[2,2]]" },
      { input: "nums = [0]", output: "[[],[0]]" }
    ],
    bruteForce: {
      code: {
        java: `public List<List<Integer>> subsetsWithDup(int[] nums) {
  List<List<Integer>> result = new ArrayList<>();
  Set<List<Integer>> set = new HashSet<>();
  Arrays.sort(nums);
  backtrack(nums, 0, new ArrayList<>(), set);
  result.addAll(set);
  return result;
}

private void backtrack(int[] nums, int start, List<Integer> curr, Set<List<Integer>> result) {
  result.add(new ArrayList<>(curr));
  for (int i = start; i < nums.length; i++) {
    curr.add(nums[i]);
    backtrack(nums, i + 1, curr, result);
    curr.remove(curr.size() - 1);
  }
}`,
        python: `def subsetsWithDup(nums: List[int]) -> List[List[int]]:
  nums.sort()
  result = set()
  
  def backtrack(start: int, curr: List[int]):
    result.add(tuple(curr))
    for i in range(start, len(nums)):
      curr.append(nums[i])
      backtrack(i + 1, curr)
      curr.pop()
  
  backtrack(0, [])
  return [list(x) for x in result]`,
        cpp: `vector<vector<int>> subsetsWithDup(vector<int>& nums) {
  sort(nums.begin(), nums.end());
  set<vector<int>> result;
  
  function<void(int, vector<int>&)> backtrack = [&](int start, vector<int>& curr) {
    result.insert(curr);
    for (int i = start; i < nums.size(); i++) {
      curr.push_back(nums[i]);
      backtrack(i + 1, curr);
      curr.pop_back();
    }
  };
  
  vector<int> curr;
  backtrack(0, curr);
  return vector<vector<int>>(result.begin(), result.end());
}`
      },
      complexity: {
        time: "O(2^n) where n is the length of nums",
        space: "O(2^n) for output"
      },
      explanation: "Use backtracking and a set to eliminate duplicates, but set operations add overhead."
    },
    optimal: {
      code: {
        java: `public List<List<Integer>> subsetsWithDup(int[] nums) {
  List<List<Integer>> result = new ArrayList<>();
  Arrays.sort(nums);
  backtrack(nums, 0, new ArrayList<>(), result);
  return result;
}

private void backtrack(int[] nums, int start, List<Integer> curr, List<List<Integer>> result) {
  result.add(new ArrayList<>(curr));
  for (int i = start; i < nums.length; i++) {
    if (i > start && nums[i] == nums[i - 1]) continue;
    curr.add(nums[i]);
    backtrack(nums, i + 1, curr, result);
    curr.remove(curr.size() - 1);
  }
}`,
        python: `def subsetsWithDup(nums: List[int]) -> List[List[int]]:
  result = []
  nums.sort()
  
  def backtrack(start: int, curr: List[int]):
    result.append(curr[:])
    for i in range(start, len(nums)):
      if i > start and nums[i] == nums[i - 1]:
        continue
      curr.append(nums[i])
      backtrack(i + 1, curr)
      curr.pop()
  
  backtrack(0, [])
  return result`,
        cpp: `vector<vector<int>> subsetsWithDup(vector<int>& nums) {
  vector<vector<int>> result;
  sort(nums.begin(), nums.end());
  
  function<void(int, vector<int>&)> backtrack = [&](int start, vector<int>& curr) {
    result.push_back(curr);
    for (int i = start; i < nums.size(); i++) {
      if (i > start && nums[i] == nums[i - 1]) continue;
      curr.push_back(nums[i]);
      backtrack(i + 1, curr);
      curr.pop_back();
    }
  };
  
  vector<int> curr;
  backtrack(0, curr);
  return result;
}`
      },
      complexity: {
        time: "O(2^n) where n is the length of nums",
        space: "O(n) for recursion stack"
      },
      explanation: "Backtrack with sorted nums, skipping duplicates by checking adjacent elements."
    }
  },
  {
    id: 58,
    status: false,
    star: false,
    problem: "Word Search",
    leetcodeLink: "https://leetcode.com/problems/word-search/",
    difficulty: "Medium",
    description: "Given an m x n board of characters and a string word, return true if word exists in the grid. The word must be constructed from letters of sequentially adjacent cells (horizontally or vertically).",
    examples: [
      { input: "board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED'", output: "true" },
      { input: "board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCB'", output: "false" }
    ],
    bruteForce: {
      code: {
        java: `public boolean exist(char[][] board, String word) {
  for (int i = 0; i < board.length; i++) {
    for (int j = 0; j < board[0].length; j++) {
      if (dfs(board, i, j, word, 0)) return true;
    }
  }
  return false;
}

private boolean dfs(char[][] board, int i, int j, String word, int index) {
  if (index == word.length()) return true;
  if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != word.charAt(index)) {
    return false;
  }
  
  char temp = board[i][j];
  board[i][j] = '#';
  
  boolean found = dfs(board, i + 1, j, word, index + 1) ||
                  dfs(board, i - 1, j, word, index + 1) ||
                  dfs(board, i, j + 1, word, index + 1) ||
                  dfs(board, i, j - 1, word, index + 1);
  
  board[i][j] = temp;
  return found;
}`,
        python: `def exist(board: List[List[str]], word: str) -> bool:
  def dfs(i: int, j: int, index: int) -> bool:
    if index == len(word):
      return True
    if i < 0 or i >= len(board) or j < 0 or j >= len(board[0]) or board[i][j] != word[index]:
      return False
    
    temp = board[i][j]
    board[i][j] = '#'
    
    found = dfs(i + 1, j, index + 1) or \
            dfs(i - 1, j, index + 1) or \
            dfs(i, j + 1, index + 1) or \
            dfs(i, j - 1, index + 1)
    
    board[i][j] = temp
    return found
  
  for i in range(len(board)):
    for j in range(len(board[0])):
      if dfs(i, j, 0):
        return True
  return False`,
        cpp: `bool exist(vector<vector<char>>& board, string word) {
  function<bool(int, int, int)> dfs = [&](int i, int j, int index) {
    if (index == word.size()) return true;
    if (i < 0 || i >= board.size() || j < 0 || j >= board[0].size() || board[i][j] != word[index]) {
      return false;
    }
    
    char temp = board[i][j];
    board[i][j] = '#';
    
    bool found = dfs(i + 1, j, index + 1) ||
                 dfs(i - 1, j, index + 1) ||
                 dfs(i, j + 1, index + 1) ||
                 dfs(i, j - 1, index + 1);
    
    board[i][j] = temp;
    return found;
  };
  
  for (int i = 0; i < board.size(); i++) {
    for (int j = 0; j < board[0].size(); j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
}`
      },
      complexity: {
        time: "O(m * n * 4^w) where m*n is board size, w is word length",
        space: "O(w) for recursion stack"
      },
      explanation: "Use DFS to explore all possible paths from each cell, marking visited cells to avoid reuse."
    },
    optimal: {
      code: {
        java: `public boolean exist(char[][] board, String word) {
  for (int i = 0; i < board.length; i++) {
    for (int j = 0; j < board[0].length; j++) {
      if (board[i][j] == word.charAt(0) && dfs(board, i, j, word, 0)) return true;
    }
  }
  return false;
}

private boolean dfs(char[][] board, int i, int j, String word, int index) {
  if (index == word.length()) return true;
  if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != word.charAt(index)) {
    return false;
  }
  
  char temp = board[i][j];
  board[i][j] = '#';
  
  int[][] directions = {{1,0}, {-1,0}, {0,1}, {0,-1}};
  for (int[] dir : directions) {
    if (dfs(board, i + dir[0], j + dir[1], word, index + 1)) return true;
  }
  
  board[i][j] = temp;
  return false;
}`,
        python: `def exist(board: List[List[str]], word: str) -> bool:
  def dfs(i: int, j: int, index: int) -> bool:
    if index == len(word):
      return True
    if i < 0 or i >= len(board) or j < 0 or j >= len(board[0]) or board[i][j] != word[index]:
      return False
    
    temp = board[i][j]
    board[i][j] = '#'
    
    directions = [(1,0), (-1,0), (0,1), (0,-1)]
    for di, dj in directions:
      if dfs(i + di, j + dj, index + 1):
        return True
    
    board[i][j] = temp
    return False
  
  for i in range(len(board)):
    for j in range(len(board[0])):
      if board[i][j] == word[0] and dfs(i, j, 0):
        return True
  return False`,
        cpp: `bool exist(vector<vector<char>>& board, string word) {
  function<bool(int, int, int)> dfs = [&](int i, int j, int index) {
    if (index == word.size()) return true;
    if (i < 0 || i >= board.size() || j < 0 || j >= board[0].size() || board[i][j] != word[index]) {
      return false;
    }
    
    char temp = board[i][j];
    board[i][j] = '#';
    
    vector<pair<int,int>> directions = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    for (auto [di, dj] : directions) {
      if (dfs(i + di, j + dj, index + 1)) return true;
    }
    
    board[i][j] = temp;
    return false;
  };
  
  for (int i = 0; i < board.size(); i++) {
    for (int j = 0; j < board[0].size(); j++) {
      if (board[i][j] == word[0] && dfs(i, j, 0)) return true;
    }
  }
  return false;
}`
      },
      complexity: {
        time: "O(m * n * 4^w) where m*n is board size, w is word length",
        space: "O(w) for recursion stack"
      },
      explanation: "Optimize DFS by only starting from cells matching the first character and using a directions array for cleaner code."
    }
  },
  {
    id: 59,
    status: false,
    star: false,
    problem: "Palindrome Partitioning",
    leetcodeLink: "https://leetcode.com/problems/palindrome-partitioning/",
    difficulty: "Medium",
    description: "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.",
    examples: [
      { input: "s = 'aab'", output: "[['a','a','b'],['aa','b']]" },
      { input: "s = 'a'", output: "[['a']]" }
    ],
    bruteForce: {
      code: {
        java: `public List<List<String>> partition(String s) {
  List<List<String>> result = new ArrayList<>();
  backtrack(s, 0, new ArrayList<>(), result);
  return result;
}

private void backtrack(String s, int start, List<String> curr, List<List<String>> result) {
  if (start == s.length()) {
    result.add(new ArrayList<>(curr));
    return;
  }
  for (int i = start; i < s.length(); i++) {
    String substr = s.substring(start, i + 1);
    if (isPalindrome(substr)) {
      curr.add(substr);
      backtrack(s, i + 1, curr, result);
      curr.remove(curr.size() - 1);
    }
  }
}

private boolean isPalindrome(String s) {
  int left = 0, right = s.length() - 1;
  while (left < right) {
    if (s.charAt(left++) != s.charAt(right--)) return false;
  }
  return true;
}`,
        python: `def partition(s: str) -> List[List[str]]:
  result = []
  
  def backtrack(start: int, curr: List[str]):
    if start == len(s):
      result.append(curr[:])
      return
    for i in range(start, len(s)):
      substr = s[start:i + 1]
      if substr == substr[::-1]:
        curr.append(substr)
        backtrack(i + 1, curr)
        curr.pop()
  
  backtrack(0, [])
  return result`,
        cpp: `vector<vector<string>> partition(string s) {
  vector<vector<string>> result;
  
  function<void(int, vector<string>&)> backtrack = [&](int start, vector<string>& curr) {
    if (start == s.size()) {
      result.push_back(curr);
      return;
    }
    for (int i = start; i < s.size(); i++) {
      string substr = s.substr(start, i - start + 1);
      if (substr == string(substr.rbegin(), substr.rend())) {
        curr.push_back(substr);
        backtrack(i + 1, curr);
        curr.pop_back();
      }
    }
  };
  
  vector<string> curr;
  backtrack(0, curr);
  return result;
}`
      },
      complexity: {
        time: "O(n * 2^n) where n is the length of s",
        space: "O(n) for recursion stack"
      },
      explanation: "Backtrack by trying all possible substrings and checking if they are palindromes."
    },
    optimal: {
      code: {
        java: `public List<List<String>> partition(String s) {
  List<List<String>> result = new ArrayList<>();
  boolean[][] dp = new boolean[s.length()][s.length()];
  for (int i = 0; i < s.length(); i++) {
    for (int j = 0; j <= i; j++) {
      if (s.charAt(j) == s.charAt(i) && (i - j <= 2 || dp[j + 1][i - 1])) {
        dp[j][i] = true;
      }
    }
  }
  backtrack(s, 0, new ArrayList<>(), result, dp);
  return result;
}

private void backtrack(String s, int start, List<String> curr, List<List<String>> result, boolean[][] dp) {
  if (start == s.length()) {
    result.add(new ArrayList<>(curr));
    return;
  }
  for (int i = start; i < s.length(); i++) {
    if (dp[start][i]) {
      curr.add(s.substring(start, i + 1));
      backtrack(s, i + 1, curr, result, dp);
      curr.remove(curr.size() - 1);
    }
  }
}`,
        python: `def partition(s: str) -> List[List[str]]:
  n = len(s)
  dp = [[False] * n for _ in range(n)]
  for i in range(n):
    for j in range(i + 1):
      if s[j] == s[i] and (i - j <= 2 or dp[j + 1][i - 1]):
        dp[j][i] = True
  
  result = []
  
  def backtrack(start: int, curr: List[str]):
    if start == len(s):
      result.append(curr[:])
      return
    for i in range(start, len(s)):
      if dp[start][i]:
        curr.append(s[start:i + 1])
        backtrack(i + 1, curr)
        curr.pop()
  
  backtrack(0, [])
  return result`,
        cpp: `vector<vector<string>> partition(string s) {
  int n = s.size();
  vector<vector<bool>> dp(n, vector<bool>(n, false));
  for (int i = 0; i < n; i++) {
    for (int j = 0; j <= i; j++) {
      if (s[j] == s[i] && (i - j <= 2 || dp[j + 1][i - 1])) {
        dp[j][i] = true;
      }
    }
  }
  
  vector<vector<string>> result;
  
  function<void(int, vector<string>&)> backtrack = [&](int start, vector<string>& curr) {
    if (start == s.size()) {
      result.push_back(curr);
      return;
    }
    for (int i = start; i < s.size(); i++) {
      if (dp[start][i]) {
        curr.push_back(s.substr(start, i - start + 1));
        backtrack(i + 1, curr);
        curr.pop_back();
      }
    }
  };
  
  vector<string> curr;
  backtrack(0, curr);
  return result;
}`
      },
      complexity: {
        time: "O(n * 2^n) where n is the length of s",
        space: "O(n^2) for DP table"
      },
      explanation: "Use dynamic programming to precompute palindrome substrings, reducing palindrome checks in backtracking."
    }
  },
  {
    id: 60,
    status: false,
    star: false,
    problem: "Letter Combinations of a Phone Number",
    leetcodeLink: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    difficulty: "Medium",
    description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. A mapping of digits to letters is given.",
    examples: [
      { input: "digits = '23'", output: "['ad','ae','af','bd','be','bf','cd','ce','cf']" },
      { input: "digits = ''", output: "[]" }
    ],
    bruteForce: {
      code: {
        java: `public List<String> letterCombinations(String digits) {
  if (digits.isEmpty()) return new ArrayList<>();
  
  String[] mapping = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
  List<String> result = new ArrayList<>();
  result.add("");
  
  for (char digit : digits.toCharArray()) {
    List<String> newResult = new ArrayList<>();
    for (String s : result) {
      for (char c : mapping[digit - '0'].toCharArray()) {
        newResult.add(s + c);
      }
    }
    result = newResult;
  }
  
  return result;
}`,
        python: `def letterCombinations(digits: str) -> List[str]:
  if not digits:
    return []
  
  mapping = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
  result = [""]
  
  for digit in digits:
    new_result = []
    for s in result:
      for c in mapping[int(digit)]:
        new_result.append(s + c)
    result = new_result
  
  return result`,
        cpp: `vector<string> letterCombinations(string digits) {
  if (digits.empty()) return {};
  
  vector<string> mapping = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
  vector<string> result = {""};
  
  for (char digit : digits) {
    vector<string> newResult;
    for (const string& s : result) {
      for (char c : mapping[digit - '0']) {
        newResult.push_back(s + c);
      }
    }
    result = newResult;
  }
  
  return result;
}`
      },
      complexity: {
        time: "O(4^n) where n is the length of digits",
        space: "O(4^n) for output"
      },
      explanation: "Iteratively build combinations by appending each possible letter for each digit."
    },
    optimal: {
      code: {
        java: `public List<String> letterCombinations(String digits) {
  List<String> result = new ArrayList<>();
  if (digits.isEmpty()) return result;
  
  String[] mapping = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
  backtrack(digits, 0, new StringBuilder(), result, mapping);
  return result;
}

private void backtrack(String digits, int index, StringBuilder curr, List<String> result, String[] mapping) {
  if (index == digits.length()) {
    result.add(curr.toString());
    return;
  }
  for (char c : mapping[digits.charAt(index) - '0'].toCharArray()) {
    curr.append(c);
    backtrack(digits, index + 1, curr, result, mapping);
    curr.deleteCharAt(curr.length() - 1);
  }
}`,
        python: `def letterCombinations(digits: str) -> List[str]:
  if not digits:
    return []
  
  mapping = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
  result = []
  
  def backtrack(index: int, curr: str):
    if index == len(digits):
      result.append(curr)
      return
    for c in mapping[int(digits[index])]:
      backtrack(index + 1, curr + c)
  
  backtrack(0, "")
  return result`,
        cpp: `vector<string> letterCombinations(string digits) {
  vector<string> result;
  if (digits.empty()) return result;
  
  vector<string> mapping = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
  
  function<void(int, string)> backtrack = [&](int index, string curr) {
    if (index == digits.size()) {
      result.push_back(curr);
      return;
    }
    for (char c : mapping[digits[index] - '0']) {
      backtrack(index + 1, curr + c);
    }
  };
  
  backtrack(0, "");
  return result;
}`
      },
      complexity: {
        time: "O(4^n) where n is the length of digits",
        space: "O(n) for recursion stack"
      },
      explanation: "Use backtracking to build combinations by appending letters one digit at a time."
    }
  }
];