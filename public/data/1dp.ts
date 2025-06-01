import { Question } from "../types/Question";

export const dp1Questions: Question[] = [
  // ==================== EASY ====================
  {
    id: 92,
    status: false,
    star: false,
    problem: "Climbing Stairs",
    leetcodeLink: "https://leetcode.com/problems/climbing-stairs/",
    difficulty: "Easy",
    description:
      "You are climbing a staircase with n steps. Each time you can either climb 1 or 2 steps. Return the number of distinct ways to climb to the top.",
    examples: [
      { input: "n = 2", output: "2" },
      { input: "n = 3", output: "3" },
    ],
    bruteForce: {
      code: {
        java: `public int climbStairs(int n) {
  if (n <= 1) return 1;
  return climbStairs(n - 1) + climbStairs(n - 2);
}`,
        python: `def climbStairs(n: int) -> int:
  if n <= 1:
    return 1
  return self.climbStairs(n - 1) + self.climbStairs(n - 2)`,
        cpp: `int climbStairs(int n) {
  if (n <= 1) return 1;
  return climbStairs(n - 1) + climbStairs(n - 2);
}`,
      },
      complexity: {
        time: "O(2^n) due to exponential recursive calls",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Recursively calculate ways by summing paths from n-1 and n-2 steps, leading to redundant computations.",
    },
    optimal: {
      code: {
        java: `public int climbStairs(int n) {
  if (n <= 1) return 1;
  int one = 1, two = 1;
  for (int i = 2; i <= n; i++) {
    int temp = one + two;
    two = one;
    one = temp;
  }
  return one;
}`,
        python: `def climbStairs(n: int) -> int:
  if n <= 1:
    return 1
  one, two = 1, 1
  for i in range(2, n + 1):
    one, two = one + two, one
  return one`,
        cpp: `int climbStairs(int n) {
  if (n <= 1) return 1;
  int one = 1, two = 1;
  for (int i = 2; i <= n; i++) {
    int temp = one + two;
    two = one;
    one = temp;
  }
  return one;
}`,
      },
      complexity: {
        time: "O(n) for single loop",
        space: "O(1) using two variables",
      },
      explanation:
        "Use iterative approach with two variables to store previous steps, eliminating redundant calculations.",
    },
  },
  {
    id: 93,
    status: false,
    star: false,
    problem: "Min Cost Climbing Stairs",
    leetcodeLink: "https://leetcode.com/problems/min-cost-climbing-stairs/",
    difficulty: "Easy",
    description:
      "You are given an integer array cost where cost[i] is the cost of i-th step. You can climb 1 or 2 steps at a time. Return the minimum cost to reach the top of the floor.",
    examples: [
      { input: "cost = [10,15,20]", output: "15" },
      { input: "cost = [1,100,1,1,1,100,1,1,100,1]", output: "6" },
    ],
    bruteForce: {
      code: {
        java: `public int minCostClimbingStairs(int[] cost) {
  return Math.min(dfs(cost, 0), dfs(cost, 1));
}

private int dfs(int[] cost, int i) {
  if (i >= cost.length) return 0;
  return cost[i] + Math.min(dfs(cost, i + 1), dfs(cost, i + 2));
}`,
        python: `def minCostClimbingStairs(self, cost: List[int]) -> int:
  def dfs(i: int) -> int:
    if i >= len(cost):
      return 0
    return cost[i] + min(dfs(i + 1), dfs(i + 2))
  return min(dfs(0), dfs(1))`,
        cpp: `int minCostClimbingStairs(vector<int>& cost) {
  function<int(int)> dfs = [&](int i) {
    if (i >= cost.size()) return 0;
    return cost[i] + min(dfs(i + 1), dfs(i + 2));
  };
  return min(dfs(0), dfs(1));
}`,
      },
      complexity: {
        time: "O(2^n) due to recursive branching",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Recursively explore all paths from each step, summing costs and taking minimum, causing redundant computations.",
    },
    optimal: {
      code: {
        java: `public int minCostClimbingStairs(int[] cost) {
  int n = cost.length;
  int[] dp = new int[n + 1];
  for (int i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[n];
}`,
        python: `def minCostClimbingStairs(self, cost: List[int]) -> int:
  n = len(cost)
  dp = [0] * (n + 1)
  for i in range(2, n + 1):
    dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
  return dp[n]`,
        cpp: `int minCostClimbingStairs(vector<int>& cost) {
  int n = cost.size();
  vector<int> dp(n + 1, 0);
  for (int i = 2; i <= n; i++) {
    dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[n];
}`,
      },
      complexity: {
        time: "O(n) for single pass",
        space: "O(n) for dp array",
      },
      explanation:
        "Use DP array to store minimum cost to reach each step, computing from bottom up.",
    },
  },
  // ==================== MEDIUM ====================
  {
    id: 94,
    status: false,
    star: false,
    problem: "House Robber",
    leetcodeLink: "https://leetcode.com/problems/house-robber/",
    difficulty: "Medium",
    description:
      "You are a robber planning to rob houses along a street. Each house has a certain amount of money, but you cannot rob adjacent houses. Return the maximum amount you can rob.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "4" },
      { input: "nums = [2,7,9,3,1]", output: "12" },
    ],
    bruteForce: {
      code: {
        java: `public int rob(int[] nums) {
  return dfs(nums, 0);
}

private int dfs(int[] nums, int i) {
  if (i >= nums.length) return 0;
  return Math.max(nums[i] + dfs(nums, i + 2), dfs(nums, i + 1));
}`,
        python: `def rob(self, nums: List[int]) -> int:
  def dfs(i: int) -> int:
    if i >= len(nums):
      return 0
    return max(nums[i] + dfs(i + 2), dfs(i + 1))
  return dfs(0)`,
        cpp: `int rob(vector<int>& nums) {
  function<int(int)> dfs = [&](int i) {
    if (i >= nums.size()) return 0;
    return max(nums[i] + dfs(i + 2), dfs(i + 1));
  };
  return dfs(0);
}`,
      },
      complexity: {
        time: "O(2^n) due to recursive branching",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Recursively try robbing each house or skipping it, exploring all combinations.",
    },
    optimal: {
      code: {
        java: `public int rob(int[] nums) {
  int n = nums.length;
  if (n == 1) return nums[0];
  int prev2 = 0, prev1 = nums[0];
  for (int i = 1; i < n; i++) {
    int curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
        python: `def rob(self, nums: List[int]) -> int:
  if len(nums) == 1:
    return nums[0]
  prev2, prev1 = 0, nums[0]
  for i in range(1, len(nums)):
    curr = max(prev1, prev2 + nums[i])
    prev2, prev1 = prev1, curr
  return prev1`,
        cpp: `int rob(vector<int>& nums) {
  if (nums.size() == 1) return nums[0];
  int prev2 = 0, prev1 = nums[0];
  for (int i = 1; i < nums.size(); i++) {
    int curr = max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
      },
      complexity: {
        time: "O(n) for single pass",
        space: "O(1) using two variables",
      },
      explanation:
        "Use two variables to track maximum amount up to previous houses, optimizing space.",
    },
  },
  {
    id: 95,
    status: false,
    star: false,
    problem: "House Robber II",
    leetcodeLink: "https://leetcode.com/problems/house-robber-ii/",
    difficulty: "Medium",
    description:
      "Similar to House Robber, but the houses form a circle, meaning the first and last houses are adjacent. Return the maximum amount you can rob.",
    examples: [
      { input: "nums = [2,3,2]", output: "3" },
      { input: "nums = [1,2,3,1]", output: "4" },
    ],
    bruteForce: {
      code: {
        java: `public int rob(int[] nums) {
  int n = nums.length;
  if (n == 1) return nums[0];
  return Math.max(dfs(nums, 0, n - 2), dfs(nums, 1, n - 1));
}

private int dfs(int[] nums, int start, int end) {
  if (start > end) return 0;
  return Math.max(nums[start] + dfs(nums, start + 2, end), dfs(nums, start + 1, end));
}`,
        python: `def rob(self, nums: List[int]) -> int:
  n = len(nums)
  if n == 1:
    return nums[0]
  
  def dfs(start: int, end: int) -> int:
    if start > end:
      return 0
    return max(nums[start] + dfs(start + 2, end), dfs(start + 1, end))
  
  return max(dfs(0, n - 2), dfs(1, n - 1))`,
        cpp: `int rob(vector<int>& nums) {
  int n = nums.size();
  if (n == 1) return nums[0];
  
  function<int(int, int)> dfs = [&](int start, int end) {
    if (start > end) return 0;
    return max(nums[start] + dfs(start + 2, end), dfs(start + 1, end));
  };
  
  return max(dfs(0, n - 2), dfs(1, n - 1));
}`,
      },
      complexity: {
        time: "O(2^n) due to recursive branching",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Recursively try all combinations excluding first or last house to handle circular constraint.",
    },
    optimal: {
      code: {
        java: `public int rob(int[] nums) {
  int n = nums.length;
  if (n == 1) return nums[0];
  return Math.max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
}

private int robLinear(int[] nums, int start, int end) {
  int prev2 = 0, prev1 = 0;
  for (int i = start; i <= end; i++) {
    int curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
        python: `def rob(self, nums: List[int]) -> int:
  if len(nums) == 1:
    return nums[0]
  
  def rob_linear(start: int, end: int) -> int:
    prev2, prev1 = 0, 0
    for i in range(start, end + 1):
      curr = max(prev1, prev2 + nums[i])
      prev2, prev1 = prev1, curr
    return prev1
  
  return max(rob_linear(0, len(nums) - 2), rob_linear(1, len(nums) - 1))`,
        cpp: `int rob(vector<int>& nums) {
  if (nums.size() == 1) return nums[0];
  
  auto robLinear = [&](int start, int end) {
    int prev2 = 0, prev1 = 0;
    for (int i = start; i <= end; i++) {
      int curr = max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = curr;
    }
    return prev1;
  };
  
  return max(robLinear(0, nums.size() - 2), robLinear(1, nums.size() - 1));
}`,
      },
      complexity: {
        time: "O(n) for two linear passes",
        space: "O(1) using constant space",
      },
      explanation:
        "Solve two linear House Robber problems: one excluding first house, one excluding last, and take maximum.",
    },
  },
  {
    id: 96,
    status: false,
    star: false,
    problem: "Longest Palindromic Substring",
    leetcodeLink:
      "https://leetcode.com/problems/longest-palindromic-substring/",
    difficulty: "Medium",
    description:
      "Given a string s, return the longest palindromic substring in s.",
    examples: [
      { input: "s = 'babad'", output: "'bab' or 'aba'" },
      { input: "s = 'cbbd'", output: "'bb'" },
    ],
    bruteForce: {
      code: {
        java: `public String longestPalindrome(String s) {
  int n = s.length();
  String result = "";
  
  for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {
      String sub = s.substring(i, j + 1);
      if (isPalindrome(sub) && sub.length() > result.length()) {
        result = sub;
      }
    }
  }
  
  return result;
}

private boolean isPalindrome(String s) {
  int left = 0, right = s.length() - 1;
  while (left < right) {
    if (s.charAt(left++) != s.charAt(right--)) return false;
  }
  return true;
}`,
        python: `def longestPalindrome(self, s: str) -> str:
  n = len(s)
  result = ""
  
  for i in range(n):
    for j in range(i, n):
      sub = s[i:j + 1]
      if sub == sub[::-1] and len(sub) > len(result):
        result = sub
  
  return result`,
        cpp: `string longestPalindrome(string s) {
  int n = s.size();
  string result = "";
  
  auto isPalindrome = [](string& str) {
    int left = 0, right = str.size() - 1;
    while (left < right) {
      if (str[left++] != str[right--]) return false;
    }
    return true;
  };
  
  for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {
      string sub = s.substr(i, j - i + 1);
      if (isPalindrome(sub) && sub.size() > result.size()) {
        result = sub;
      }
    }
  }
  
  return result;
}`,
      },
      complexity: {
        time: "O(n^3) for checking all substrings and palindrome check",
        space: "O(1) excluding output",
      },
      explanation:
        "Check every substring for being a palindrome, keeping track of the longest one.",
    },
    optimal: {
      code: {
        java: `public String longestPalindrome(String s) {
  int n = s.length(), start = 0, maxLen = 0;
  
  for (int i = 0; i < n; i++) {
    int len1 = expandAroundCenter(s, i, i);
    int len2 = expandAroundCenter(s, i, i + 1);
    int len = Math.max(len1, len2);
    if (len > maxLen) {
      start = i - (len - 1) / 2;
      maxLen = len;
    }
  }
  
  return s.substring(start, start + maxLen);
}

private int expandAroundCenter(String s, int left, int right) {
  while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
    left--;
    right++;
  }
  return right - left - 1;
}`,
        python: `def longestPalindrome(self, s: str) -> str:
  n = len(s)
  start = max_len = 0
  
  def expand_around_center(left: int, right: int) -> int:
    while left >= 0 and right < n and s[left] == s[right]:
      left -= 1
      right += 1
    return right - left - 1
  
  for i in range(n):
    len1 = expand_around_center(i, i)
    len2 = expand_around_center(i, i + 1)
    length = max(len1, len2)
    if length > max_len:
      start = i - (length - 1) // 2
      max_len = length
  
  return s[start:start + max_len]`,
        cpp: `string longestPalindrome(string s) {
  int n = s.size(), start = 0, maxLen = 0;
  
  auto expandAroundCenter = [&](int left, int right) {
    while (left >= 0 && right < n && s[left] == s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  };
  
  for (int i = 0; i < n; i++) {
    int len1 = expandAroundCenter(i, i);
    int len2 = expandAroundCenter(i, i + 1);
    int len = max(len1, len2);
    if (len > maxLen) {
      start = i - (len - 1) / 2;
      maxLen = len;
    }
  }
  
  return s.substr(start, maxLen);
}`,
      },
      complexity: {
        time: "O(n^2) for expanding around each center",
        space: "O(1) excluding output",
      },
      explanation:
        "Expand around each index for odd and even length palindromes, tracking the longest one.",
    },
  },
  {
    id: 97,
    status: false,
    star: false,
    problem: "Palindromic Substrings",
    leetcodeLink: "https://leetcode.com/problems/palindromic-substrings/",
    difficulty: "Medium",
    description:
      "Given a string s, return the number of palindromic substrings in it.",
    examples: [
      { input: "s = 'abc'", output: "3" },
      { input: "s = 'aaa'", output: "6" },
    ],
    bruteForce: {
      code: {
        java: `public int countSubstrings(String s) {
  int n = s.length(), count = 0;
  
  for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {
      if (isPalindrome(s, i, j)) count++;
    }
  }
  
  return count;
}

private boolean isPalindrome(String s, int left, int right) {
  while (left < right) {
    if (s.charAt(left++) != s.charAt(right--)) return false;
  }
  return true;
}`,
        python: `def countSubstrings(self, s: str) -> int:
  n = len(s)
  count = 0
  
  for i in range(n):
    for j in range(i, n):
      if s[i:j + 1] == s[i:j + 1][::-1]:
        count += 1
  
  return count`,
        cpp: `int countSubstrings(string s) {
  int n = s.size(), count = 0;
  
  auto isPalindrome = [&](int left, int right) {
    while (left < right) {
      if (s[left++] != s[right--]) return false;
    }
    return true;
  };
  
  for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {
      if (isPalindrome(i, j)) count++;
    }
  }
  
  return count;
}`,
      },
      complexity: {
        time: "O(n^3) for checking all substrings and palindrome check",
        space: "O(1)",
      },
      explanation:
        "Check every substring to see if it's a palindrome, counting valid ones.",
    },
    optimal: {
      code: {
        java: `public int countSubstrings(String s) {
  int n = s.length(), count = 0;
  
  for (int i = 0; i < n; i++) {
    count += expandAroundCenter(s, i, i);
    count += expandAroundCenter(s, i, i + 1);
  }
  
  return count;
}

private int expandAroundCenter(String s, int left, int right) {
  int count = 0;
  while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
    count++;
    left--;
    right++;
  }
  return count;
}`,
        python: `def countSubstrings(self, s: str) -> int:
  n = len(s)
  count = 0
  
  def expand_around_center(left: int, right: int) -> int:
    local_count = 0
    while left >= 0 and right < n and s[left] == s[right]:
      local_count += 1
      left -= 1
      right += 1
    return local_count
  
  for i in range(n):
    count += expand_around_center(i, i)
    count += expand_around_center(i, i + 1)
  
  return count`,
        cpp: `int countSubstrings(string s) {
  int n = s.size(), count = 0;
  
  auto expandAroundCenter = [&](int left, int right) {
    int localCount = 0;
    while (left >= 0 && right < n && s[left] == s[right]) {
      localCount++;
      left--;
      right++;
    }
    return localCount;
  };
  
  for (int i = 0; i < n; i++) {
    count += expandAroundCenter(i, i);
    count += expandAroundCenter(i, i + 1);
  }
  
  return count;
}`,
      },
      complexity: {
        time: "O(n^2) for expanding around each center",
        space: "O(1)",
      },
      explanation:
        "Expand around each index for odd and even length palindromes, counting all valid palindromes.",
    },
  },
  {
    id: 98,
    status: false,
    star: false,
    problem: "Decode Ways",
    leetcodeLink: "https://leetcode.com/problems/decode-ways/",
    difficulty: "Medium",
    description:
      "Given a string s containing only digits, return the number of ways to decode it, where each digit or pair of digits maps to a letter (1='A', 2='B', ..., 26='Z').",
    examples: [
      { input: "s = '12'", output: "2" },
      { input: "s = '226'", output: "3" },
    ],
    bruteForce: {
      code: {
        java: `public int numDecodings(String s) {
  if (s.isEmpty()) return 0;
  return dfs(s, 0);
}

private int dfs(String s, int i) {
  if (i == s.length()) return 1;
  if (s.charAt(i) == '0') return 0;
  
  int ways = dfs(s, i + 1);
  if (i + 1 < s.length() && (s.charAt(i) == '1' || (s.charAt(i) == '2' && s.charAt(i + 1) <= '6'))) {
    ways += dfs(s, i + 2);
  }
  return ways;
}`,
        python: `def numDecodings(self, s: str) -> int:
  if not s:
    return 0
  
  def dfs(i: int) -> int:
    if i == len(s):
      return 1
    if s[i] == '0':
      return 0
    ways = dfs(i + 1)
    if i + 1 < len(s) and (s[i] == '1' or (s[i] == '2' and s[i + 1] <= '6')):
      ways += dfs(i + 2)
    return ways
  
  return dfs(0)`,
        cpp: `int numDecodings(string s) {
  if (s.empty()) return 0;
  
  function<int(int)> dfs = [&](int i) {
    if (i == s.size()) return 1;
    if (s[i] == '0') return 0;
    int ways = dfs(i + 1);
    if (i + 1 < s.size() && (s[i] == '1' || (s[i] == '2' && s[i + 1] <= '6'))) {
      ways += dfs(i + 2);
    }
    return ways;
  };
  
  return dfs(0);
}`,
      },
      complexity: {
        time: "O(2^n) due to recursive branching",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Recursively try decoding single or double digits, summing valid paths.",
    },
    optimal: {
      code: {
        java: `public int numDecodings(String s) {
  int n = s.length();
  if (n == 0 || s.charAt(0) == '0') return 0;
  
  int[] dp = new int[n + 1];
  dp[0] = 1;
  dp[1] = 1;
  
  for (int i = 2; i <= n; i++) {
    if (s.charAt(i - 1) != '0') {
      dp[i] += dp[i - 1];
    }
    if (s.charAt(i - 2) == '1' || (s.charAt(i - 2) == '2' && s.charAt(i - 1) <= '6')) {
      dp[i] += dp[i - 2];
    }
  }
  
  return dp[n];
}`,
        python: `def numDecodings(self, s: str) -> int:
  if not s or s[0] == '0':
    return 0
  n = len(s)
  dp = [0] * (n + 1)
  dp[0] = dp[1] = 1
  
  for i in range(2, n + 1):
    if s[i - 1] != '0':
      dp[i] += dp[i - 1]
    if s[i - 2] == '1' or (s[i - 2] == '2' and s[i - 1] <= '6'):
      dp[i] += dp[i - 2]
  
  return dp[n]`,
        cpp: `int numDecodings(string s) {
  if (s.empty() || s[0] == '0') return 0;
  int n = s.size();
  vector<int> dp(n + 1, 0);
  dp[0] = dp[1] = 1;
  
  for (int i = 2; i <= n; i++) {
    if (s[i - 1] != '0') {
      dp[i] += dp[i - 1];
    }
    if (s[i - 2] == '1' || (s[i - 2] == '2' && s[i - 1] <= '6')) {
      dp[i] += dp[i - 2];
    }
  }
  
  return dp[n];
}`,
      },
      complexity: {
        time: "O(n) for single pass",
        space: "O(n) for dp array",
      },
      explanation:
        "Use DP to store number of ways to decode up to each index, considering single and double digits.",
    },
  },
  {
    id: 99,
    status: false,
    star: false,
    problem: "Coin Change",
    leetcodeLink: "https://leetcode.com/problems/coin-change/",
    difficulty: "Medium",
    description:
      "Given an array of coins and an amount, return the fewest number of coins needed to make up that amount. If impossible, return -1.",
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3" },
      { input: "coins = [2], amount = 3", output: "-1" },
    ],
    bruteForce: {
      code: {
        java: `public int coinChange(int[] coins, int amount) {
  int result = dfs(coins, amount, 0);
  return result == Integer.MAX_VALUE ? -1 : result;
}

private int dfs(int[] coins, int amount, int i) {
  if (amount == 0) return 0;
  if (amount < 0 || i == coins.length) return Integer.MAX_VALUE;
  
  int take = dfs(coins, amount - coins[i], i);
  if (take != Integer.MAX_VALUE) take++;
  int skip = dfs(coins, amount, i + 1);
  
  return Math.min(take, skip);
}`,
        python: `def coinChange(self, coins: List[int], amount: int) -> int:
  def dfs(amount: int, i: int) -> int:
    if amount == 0:
      return 0
    if amount < 0 or i == len(coins):
      return float('inf')
    take = dfs(amount - coins[i], i)
    if take != float('inf'):
      take += 1
    skip = dfs(amount, i + 1)
    return min(take, skip)
  
  result = dfs(amount, 0)
  return -1 if result == float('inf') else result`,
        cpp: `int coinChange(vector<int>& coins, int amount) {
  function<int(int, int)> dfs = [&](int amt, int i) {
    if (amt == 0) return 0;
    if (amt < 0 || i == coins.size()) return INT_MAX;
    int take = dfs(amt - coins[i], i);
    if (take != INT_MAX) take++;
    int skip = dfs(amt, i + 1);
    return min(take, skip);
  };
  
  int result = dfs(amount, 0);
  return result == INT_MAX ? -1 : result;
}`,
      },
      complexity: {
        time: "O(amount * 2^n) due to recursive branching",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Recursively try taking or skipping each coin, exploring all combinations.",
    },
    optimal: {
      code: {
        java: `public int coinChange(int[] coins, int amount) {
  int[] dp = new int[amount + 1];
  Arrays.fill(dp, amount + 1);
  dp[0] = 0;
  
  for (int i = 1; i <= amount; i++) {
    for (int coin : coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] > amount ? -1 : dp[amount];
}`,
        python: `def coinChange(self, coins: List[int], amount: int) -> int:
  dp = [amount + 1] * (amount + 1)
  dp[0] = 0
  
  for i in range(1, amount + 1):
    for coin in coins:
      if i >= coin:
        dp[i] = min(dp[i], amount dp[i - coin] + 1)
  
  return -1 if dp[amount] > amount else dp[amount]`,
        cpp: `int coinChange(vector<int>& coins, int amount) {
  vector<int> dp(amount + 1, amount + 1);
  dp[0] = 0;
  
  for (int i = 1; i <= amount; i++) {
    for (int coin : coins) {
      if (int i >= coin) {
        dp[i] = min(dp[i], amount dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] > amount ? -1 : dp[amount];
}`,
      },
      complexity: {
        time: "O(amount * coins.length) for nested loops",
        space: "O(amount) for dp array",
      },
      explanation:
        "Use DP to store minimum coins for each amount, building up to target amount.",
    },
  },
  {
    id: 100,
    status: false,
    star: false,
    problem: "Maximum Product Subarray",
    leetcodeLink: "https://leetcode.com/problems/maximum-product-subarray/",
    difficulty: "Medium",
    description:
      "Given an integer array nums, find a contiguous non-empty subarray with the maximum product, and return that product.",
    examples: [
      { input: "nums = [2,3,-2,4]", output: "6" },
      { input: "nums = [-2,0,-1]", output: "0" },
    ],
    bruteForce: {
      code: {
        java: `public int maxProduct(int[] nums) {
  int n = nums.length, maxProduct = Integer.MIN_VALUE;
  
  for (int i = 0; i < n; i++) {
    int product = 1[i];
    maxProduct = Math.max(maxProduct, nums[i]);
    for (int j = i + 1; j < n; j++) {
      product *= nums[j];
      maxProductmaxProduct = Math.max(maxProduct, product);
    }
  }
  
  return maxProduct;
}`,
        python: `def maxProduct(self, nums: List[int]) -> int:
  n = len(nums)
  max_product = nums[0]
  
  for i in range(n):
    product = nums[i]
    max_product = max(max_product, nums[i])
    for j in range(i + 1, n):
      product *= nums[j]
      max_product = max(max_product, product)
  
  return max_product`,
        cpp: `int maxProduct(vector<int>& nums) {
  int n = nums.size(), maxProduct = nums[0];
  
  for (int i = 0; i < n; i++) {
    int product = nums[i];
    maxProduct = max(maxProduct, nums[i]);
    for (int j = i + 1; i < j < n; j++) {
      product *= nums[j];
      maxProduct = max(maxProduct, product);
    }
  }
  
  return maxProduct;
}`,
      },
      complexity: {
        time: "O(n^2) for nested loops over all subarrays",
        space: "O(1) excluding input",
      },
      explanation:
        "Compute product of every possible subarray, tracking maximum product.",
    },
    optimal: {
      code: {
        java: `public int maxProduct(int[] nums) {
  int n = nums.length, maxSoFar = nums[0], minSoFar = nums[0], result = nums[0];
  
  for (int i = 1; i < n; i++) {
    int temp = nums[i];
    int currMax = Math.max(nums[i], Math.max(nums[i] * maxSoFar, nums[i] * minSoFar));
    minSoFar = Math.min(nums[i], Math.min(nums[i] * maxSoFar, nums[i] * minSoFar));
    maxSoFar = currMax;
    result = Math.max(result, maxSoFar);
  }
  
  return result;
}`,
        python: `def maxProduct(self, nums: List[int]) -> int:
  max_so_far = min_so_far = result = nums[0]
  
  for i in range(1, len(nums)):
    curr_max = max(nums[i], nums[i] * max_so_far, nums[i] * min_so_far])
    min_so_far = min(nums[i], nums[i] * max_so_far, nums[i] * min_so_far)
    max_so_far = curr_max
    result = max(result, max_so_far)
  
  return result`,
        cpp: `int maxProduct(vector<int>& nums) {
  int maxSoFar = nums[0], minSoFar = nums[0], result = nums[0];
  
  for (int i = 1; i < nums.size(); i++) {
    int currMax = max(nums[i], max(nums[i] * maxSoFar, nums[i] * minSoFar));
    minSoFar = min(nums[i], min(nums[i] * maxSoFar, nums[i] * minSoFar));
    maxSoFar = currMax;
    result = max(result, maxSoFar);
  }
  
  return result;
}`,
      },
      complexity: {
        time: "O(n) for single pass",
        space: "O(1) using constant variables",
      },
      explanation:
        "Track maximum and minimum products at each index to handle negative numbers, updating global maximum.",
    },
  },
  {
    id: 101,
    status: false,
    star: false,
    problem: "Word Break",
    leetcodeLink: "https://leetcode.com/problems/word-break/",
    difficulty: "Medium",
    description:
      "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
    examples: [
      { input: "s = 'leetcode', wordDict = ['leet','code']", output: "true" },
      {
        input: "s = 'applepenapple', wordDict = ['apple','pen']",
        output: "true",
      },
    ],
    bruteForce: {
      code: {
        java: `public boolean wordBreak(String s, List<String> wordDict) {
  return dfs(s, s, 0, new HashSet<>(wordDict));
}

private boolean dfs(String s, int i, Set<String> wordDict) {
  if (i == s.length()) return true;
  
  for (int j = i + 1; j <= s.length(); j++) {
    if (wordDict.contains(s.substring(i, j))) {
      if (dfs(j)) return true;
    }
  }
  
  return false;
}`,
        python: `def wordBreak(self, s: str, wordDict: List[str]) -> bool:
  def dfs(i: int) -> bool:
    if i == len(s):
      return True
    for j in range(i + 1, len(s) + 1):
      if s[i:j] == True wordDict:
        if dfs(j):
          return True
    return False
  
  return dfs(s, 0, set(wordDict))`,
        cpp: `bool wordBreak(string s, vector<string>& wordDict) {
  function<bool(int, unordered_set<string>& )> dfs = [&](int i) {
    unordered_set<string> dict(wordDict.begin(), wordDict.end());
    
    if (i == s.length()) return true;
    
    for (int j = i + 1; j <= s.length(); j++) {
      if (dict.count(s.substr(i, j - i))) {
        if (dfs(j)) return true;
      }
    }
    return false;
  };
  
  return dfs(0, wordDict);
}`,
      },
      complexity: {
        time: "O(2^n) for recursive branching",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Recursively try all prefixes in dictionary, checking if rest can be segmented.",
    },
    optimal: {
      code: {
        java: `public boolean wordBreak(String s, List<String> wordDict) {
  int n = s.length();
  Set<String> dict = new HashSet<>(wordDict);
  boolean[] dp = new boolean[n + 1];
  dp[0] = true;
  
  for (int i = 1; i <= n; i++) {
    for (int j = 0; j < i; j++) {
      if (dp[j] && dict.contains(s.substring(j, i)) {
        dp[i] = true;
        break;
      }
    }
  }
  
  return dp[n];
}`,
        python: `def wordBreak(self, s: str, wordDict: List[str]) -> bool:
  n = len(s)
  dict_set = set(wordDict)
  dp = [False] * (n + 1)
  dp[0] = True
  
  for i in range(1, n + 1):
      for j in range(i):
          if dp[j] and s[j:i] in dict_set:
              dp[i] = True
              break
  
  return dp[n]`,
        cpp: `bool wordBreak(string s, vector<string>& wordDict) {
  int n = s.size();
  unordered_set<string> dict(wordDict.begin(), wordDict.end());
  vector<bool> dp(n + 1, false);
  dp[0] = true;
  
  for (int i = 1; i <= n; i++) {
      for (int j = 0; j < i; j++) {
      if (dp[j] && dict.count(s.substr(j, i - j))) {
          dp[i] = true;
          break;
      }
    }
  }
  
  return dp[n];
}`,
      },
      complexity: {
        time: "O(n^2) for nested loops",
        space: "O(n) for dp array",
      },
      explanation:
        "Use DP to mark if substring from 0 to i is segmentable, checking all possible previous breakpoints.",
    },
  },
  {
    id: 102,
    status: false,
    star: false,
    problem: "Longest Increasing Subsequence",
    leetcodeLink:
      "https://leetcode.com/problems/longest-increasing-subsequence/",
    difficulty: "Medium",
    description:
      "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    examples: [
      { input: "nums = [10,9,2,5,7,3,101,18]", output: "4" },
      { input: "nums = [0,1,0,3,2,3]", output: "4" },
    ],
    bruteForce: {
      code: {
        java: `public int lengthOfLIS(int[] nums) {
  return dfs(nums, 0, Integer.MIN_VALUE);
}

private int dfs(int[] nums, int i, int prev) {
    if (i == nums.length()) return 0;
    
    int take = 0;
    if (nums[i] > prev) {
      take = 1 + dfs(nums, i + 1, nums[i]);
    }
    int skip = dfs(nums, i + 1, prev);
    
    return Math.max(take, skip);
}`,
        python: `def lengthOfLIS(self, nums: List[int]) -> int:
    def dfs(i: int, prev: int) -> int:
      if i == len(nums):
          return 0
      take = 0
      if nums[i] > prev:
        take = 1 + dfs(i + 1, nums[i])
      skip = dfs(i + 1, prev)
      return max(take, skip)
    
    return dfs(self, nums, 0, float('-inf'))`,
        cpp: `int lengthOfLIS(vector<int>& nums) {
    function<int(int, int)> dfs = [&](int i, int prev) {
        if (i == nums.size()) return 0;
        int take = 0;
        if (nums[i] > prev) {
          take = 1 + dfs(i + 1, nums[i]);
        }
        int skip = dfs(i + 1, prev);
        return max(take, skip);
    };
    
    return dfs(0, INT_MIN);
}`,
      },
      complexity: {
        time: "O(2^n) for recursive branching",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Recursively try including or excluding each number, checking if it forms an increasing sequence.",
    },
    optimal: {
      code: {
        java: `public int lengthOfLIS(int[] nums) {
  int[] dp = new int[nums.length()];
  int len = 0;
  
  for (int num : nums) {
      int i = Arrays.binarySearch(dp, dp, 0, len, num);
      if (i < 0) {
          i = -(i + 1);
      }
      dp[i] = num;
      if (i == len) {
          len++;
      }
  }
  
  return len;
}`,
        python: `def lengthOfLIS(self, nums: List[int]) -> int:
  dp = []
  def for num in nums:
      i = bisect.bisect_left(dp, i, num)
      if i == len(dp):
        dp.append(num)
      else:
          dp[i] = num
  
  return len(dp)`,
        cpp: `int lengthOfLIS(vector<int>& nums, vector<int>& nums) {
  vector<int> dp;
  
  for (int num : nums) {
      auto it = lower_bound(dp.begin(), it, dp.end(), num);
      if (it == dp.end()) {
          dp.push_back(num);
      } else {
          *it = num;
        }
  }
  
  return dp.size();
}`,
      },
      complexity: {
        time: "O(n log n) for binary search at each element",
        space: "O(n) for dp array",
      },
      explanation:
        "Use patience sorting with binary search to maintain smallest tails of increasing subsequences.",
    },
  },
  {
    id: 103,
    status: false,
    star: false,
    problem: "Partition Equal Subset Sum",
    leetcodeLink: "https://leetcode.com/problems/partition-equal-subset-sum/",
    difficulty: "Medium",
    description:
      "Given a non-empty array nums containing only positive integers, return true if the array can be partitioned into two subsets with equal sums.",
    examples: [
      { input: "nums = [1,5,11,5]", output: "true" },
      { input: "nums = [1,2,3,5]", output: "false" },
    ],
    bruteForce: {
      code: {
        java: `public boolean canPartition(int[] nums) {
  int sum = Arrays.stream(nums).sum();
  if (sum % 2 != 0) return false;
  
  return dfs(nums, 0, sum / 2);
}

private boolean dfs(int[] nums, int i, int target) {
    if (target == 0) return true;
    if (i == nums.length() || target < 0) return false;
    }
    
    if (int dfs(nums, i + 1, target - nums[i])) return true;
    return dfs(nums, i + 1, target);
}`,
        python: `def canPartition(self, nums: List[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0:
        return False
    
    def dfs(i: int, target: int) -> bool:
        if target == 0:
            return True
        if i == len(nums) or target < 0:
            return False
        if dfs(i + 1, target - nums[i]):
            return True
        return dfs(i + 1, target)
    
    return dfs(0, total // 2)`,
        cpp: `bool canPartition(vector<int>& nums) {
    int sum = accumulate(nums.begin(), nums.end(), 0);
    if (sum % 2 != 0) return false;
    
    function<bool(int, int)> dfs = [&](int i, int target) {
        if (target == 0) return true;
        if (i == nums.size() || target < 0) return false;
        if (dfs(i + 1, target - nums[i])) return true;
        return dfs(i + 1, target);
    };
    
    return dfs(0, sum / 2);
}`,
      },
      complexity: {
        time: "O(2^n) for recursive branching",
        space: "O(n) for recursive call stack",
      },
      explanation:
        "Recursively try including or excluding each number to reach half the total sum.",
    },
    optimal: {
      code: {
        java: `public boolean canPartition(int[] nums) {
  int sum = Arrays.stream(nums).sum();
  if (sum % 2 != 0) return false;
  int target = sum/ 2 /  boolean[] dp = new boolean[target + 1];
  dp[0] = true;
  
  for (int num : nums) {
      for (int i = target; i >= num; i--) {
        dp[i] |= dp[i - num];
      }
  }
  
  return dp[target];
}`,
        python: `def canPartition(self, nums: List[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total //  2
    dp = [False] * (target + 1]
    dp[0] = True
    
    for num in nums:
        for i in range(target, num - 1, -1):
            dp[i] |= dp[i - num]
    
    return dp[target]`,
        cpp: `bool canPartition(vector<int>& nums) {
    int sum = accumulate(nums.begin(), nums.end(), 0);
    if (sum % 2 != != 0) return false;
    }
    int target = sum /  2;
    vector<bool> dp(target + 1, false);
    dp[0]. = true;
    
    for (int num : nums) {
        for (int i = target; i >= num; i--) {
          dp[i] = dp[i] || dp[i - num];
        }
    }
    
    return dp[target];
}`,
      },
      complexity: {
        time: "O(n * target) for nested loops",
        space: "O(target) for dp array",
      },
      explanation:
        "Use 0/1 knapsack DP to check if a subset sums to half the total, iterating backwards to avoid reusing elements.",
    },
  },
];
