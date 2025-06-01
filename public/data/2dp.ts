// src/data/2dp.ts
import { Question } from "../types/Question";

export const dp2Questions: Question[] = [
  // ==================== MEDIUM ====================
  {
    id: 104,
    status: false,
    star: false,
    problem: "Unique Paths",
    leetcodeLink: "https://leetcode.com/problems/unique-paths/",
    difficulty: "Medium",
    description:
      "A robot is located at the top-left corner of an m x n grid. It can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid. How many possible unique paths are there?",
    examples: [
      {
        input: "m = 3, n = 7",
        output: "28",
      },
      {
        input: "m = 3, n = 2",
        output: "3",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int uniquePaths(int m, int n) {
    return dfs(0, 0, m, n);
  }
  
  private int dfs(int i, int j, int m, int n) {
    if (i >= m || j >= n) return 0;
    if (i == m - 1 && j == n - 1) return 1;
    return dfs(i + 1, j, m, n) + dfs(i, j + 1, m, n);
  }
}`,
        python: `class Solution:
  def uniquePaths(self, m: int, n: int) -> int:
    def dfs(i, j):
      if i >= m or j >= n:
        return 0
      if i == m - 1 and j == n - 1:
        return 1
      return dfs(i + 1, j) + dfs(i, j + 1)
    return dfs(0, 0)`,
        cpp: `class Solution {
public:
  int uniquePaths(int m, int n) {
    return dfs(0, 0, m, n);
  }
  
private:
  int dfs(int i, int j, int m, int n) {
    if (i >= m || j >= n) return 0;
    if (i == m - 1 && j == n - 1) return 1;
    return dfs(i + 1, j, m, n) + dfs(i, j + 1, m, n);
  }
};`,
      },
      complexity: {
        time: "O(2^(m+n)) due to exploring all possible paths recursively",
        space: "O(m+n) for recursion stack",
      },
      explanation:
        "Use DFS to explore all possible paths from (0,0) to (m-1,n-1) by moving down or right. Each recursive call branches into two possibilities, leading to exponential time complexity.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int uniquePaths(int m, int n) {
    int[][] dp = new int[m][n];
    for (int i = 0; i < m; i++) dp[i][0] = 1;
    for (int j = 0; j < n; j++) dp[0][j] = 1;
    
    for (int i = 1; i < m; i++) {
      for (int j = 1; j < n; j++) {
        dp[i][j] = dp[i-1][j] + dp[i][j-1];
      }
    }
    return dp[m-1][n-1];
  }
}`,
        python: `class Solution:
  def uniquePaths(self, m: int, n: int) -> int:
    dp = [[1] * n for _ in range(m)]
    for i in range(1, m):
      for j in range(1, n):
        dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]`,
        cpp: `class Solution {
public:
  int uniquePaths(int m, int n) {
    vector<vector<int>> dp(m, vector<int>(n, 1));
    for (int i = 1; i < m; i++) {
      for (int j = 1; j < n; j++) {
        dp[i][j] = dp[i-1][j] + dp[i][j-1];
      }
    }
    return dp[m-1][n-1];
  }
};`,
      },
      complexity: {
        time: "O(m*n) for filling the DP table",
        space: "O(m*n) for the DP table",
      },
      explanation:
        "Use a 2D DP table where dp[i][j] represents the number of unique paths to reach (i,j). Initialize first row and column to 1 (only one way to reach those cells). For each cell, sum paths from above (dp[i-1][j]) and left (dp[i][j-1]).",
    },
  },
  {
    id: 105,
    status: false,
    star: false,
    problem: "Longest Common Subsequence",
    leetcodeLink: "https://leetcode.com/problems/longest-common-subsequence/",
    difficulty: "Medium",
    description:
      "Given two strings text1 and text2, return the length of their longest common subsequence. A subsequence is a sequence that can be derived from a string by deleting some or no elements without changing the order of the remaining elements.",
    examples: [
      {
        input: `text1 = "abcde", text2 = "ace"`,
        output: "3",
      },
      {
        input: `text1 = "abc", text2 = "def"`,
        output: "0",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int longestCommonSubsequence(String text1, String text2) {
    return lcs(text1, text2, 0, 0);
  }
  
  private int lcs(String text1, String text2, int i, int j) {
    if (i >= text1.length() || j >= text2.length()) return 0;
    if (text1.charAt(i) == text2.charAt(j)) {
      return 1 + lcs(text1, text2, i + 1, j + 1);
    }
    return Math.max(lcs(text1, text2, i + 1, j), lcs(text1, text2, i, j + 1));
  }
}`,
        python: `class Solution:
  def longestCommonSubsequence(self, text1: str, text2: str) -> int:
    def lcs(i, j):
      if i >= len(text1) or j >= len(text2):
        return 0
      if text1[i] == text2[j]:
        return 1 + lcs(i + 1, j + 1)
      return max(lcs(i + 1, j), lcs(i, j + 1))
    return lcs(0, 0)`,
        cpp: `class Solution {
public:
  int longestCommonSubsequence(string text1, string text2) {
    return lcs(text1, text2, 0, 0);
  }
  
private:
  int lcs(string& text1, string& text2, int i, int j) {
    if (i >= text1.length() || j >= text2.length()) return 0;
    if (text1[i] == text2[j]) {
      return 1 + lcs(text1, text2, i + 1, j + 1);
    }
    return max(lcs(text1, text2, i + 1, j), lcs(text1, text2, i, j + 1));
  }
};`,
      },
      complexity: {
        time: "O(2^(m+n)) where m and n are lengths of text1 and text2",
        space: "O(m+n) for recursion stack",
      },
      explanation:
        "Recursively explore all possible subsequences by either including a matching character or skipping one character from either string, taking the maximum length.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    return dp[m][n];
  }
}`,
        python: `class Solution:
  def longestCommonSubsequence(self, text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
      for j in range(1, n + 1):
        if text1[i - 1] == text2[j - 1]:
          dp[i][j] = dp[i - 1][j - 1] + 1
        else:
          dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
        cpp: `class Solution {
public:
  int longestCommonSubsequence(string text1, string text2) {
    int m = text1.length(), n = text2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        if (text1[i - 1] == text2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    return dp[m][n];
  }
};`,
      },
      complexity: {
        time: "O(m*n) for filling the DP table",
        space: "O(m*n) for the DP table",
      },
      explanation:
        "Use a 2D DP table where dp[i][j] represents the length of the LCS for prefixes text1[0:i] and text2[0:j]. If characters match, add 1 to the diagonal value; otherwise, take the maximum of left or top.",
    },
  },
  {
    id: 106,
    status: false,
    star: false,
    problem: "Best Time to Buy and Sell Stock with Cooldown",
    leetcodeLink:
      "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
    difficulty: "Medium",
    description:
      "Given an array prices where prices[i] is the price of a stock on the i-th day, find the maximum profit you can achieve. You may complete as many transactions as you like, but you cannot engage in multiple transactions simultaneously, and after selling, you cannot buy on the next day (cooldown period).",
    examples: [
      {
        input: "prices = [1,2,3,0,2]",
        output: "3",
      },
      {
        input: "prices = [1]",
        output: "0",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int maxProfit(int[] prices) {
    return dfs(0, false, prices);
  }
  
  private int dfs(int i, boolean holding, int[] prices) {
    if (i >= prices.length) return 0;
    
    if (holding) {
      return Math.max(
        dfs(i + 2, false, prices) + prices[i], // sell
        dfs(i + 1, true, prices) // hold
      );
    } else {
      return Math.max(
        dfs(i + 1, true, prices) - prices[i], // buy
        dfs(i + 1, false, prices) // do nothing
      );
    }
  }
}`,
        python: `class Solution:
  def maxProfit(self, prices: List[int]) -> int:
    def dfs(i, holding):
      if i >= len(prices):
        return 0
      if holding:
        return max(
          dfs(i + 2, False, prices) + prices[i], # sell
          dfs(i + 1, True, prices) # hold
        )
      else:
        return max(
          dfs(i + 1, True, prices) - prices[i], # buy
          dfs(i + 1, False, prices) # do nothing
        )
    return dfs(0, False)`,
        cpp: `class Solution {
public:
  int maxProfit(vector<int>& prices) {
    return dfs(0, false, prices);
  }
  
private:
  int dfs(int i, bool holding, vector<int>& prices) {
    if (i >= prices.size()) return 0;
    
    if (holding) {
      return max(
        dfs(i + 2, false, prices) + prices[i], // sell
        dfs(i + 1, true, prices) // hold
      );
    } else {
      return max(
        dfs(i + 1, true, prices) - prices[i], // buy
        dfs(i + 1, false, prices) // do nothing
      );
    }
  }
};`,
      },
      complexity: {
        time: "O(2^n) where n is the length of prices",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Recursively explore all possibilities: buy, sell (with cooldown), hold, or do nothing, based on whether we hold a stock. This leads to exponential time due to overlapping subproblems.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int maxProfit(int[] prices) {
    int n = prices.length;
    int[][] dp = new int[n + 2][2];
    
    for (int i = n - 1; i >= 0; i--) {
      dp[i][1] = Math.max(dp[i + 1][1], dp[i + 2][0] + prices[i]); // hold or sell
      dp[i][0] = Math.max(dp[i + 1][0], dp[i + 1][1] - prices[i]); // do nothing or buy
    }
    
    return dp[0][0];
  }
}`,
        python: `class Solution:
  def maxProfit(self, prices: List[int]) -> int:
    n = len(prices)
    dp = [[0] * 2 for _ in range(n + 2)]
    
    for i in range(n - 1, -1, -1):
      dp[i][1] = max(dp[i + 1][1], dp[i + 2][0] + prices[i]) # hold or sell
      dp[i][0] = max(dp[i + 1][0], dp[i + 1][1] - prices[i]) # do nothing or buy
    
    return dp[0][0]`,
        cpp: `class Solution {
public:
  int maxProfit(vector<int>& prices) {
    int n = prices.size();
    vector<vector<int>> dp(n + 2, vector<int>(2, 0));
    
    for (int i = n - 1; i >= 0; i--) {
      dp[i][1] = max(dp[i + 1][1], dp[i + 2][0] + prices[i]); // hold or sell
      dp[i][0] = max(dp[i + 1][0], dp[i + 1][1] - prices[i]); // do nothing or buy
    }
    
    return dp[0][0];
  }
};`,
      },
      complexity: {
        time: "O(n) for iterating through prices",
        space: "O(n) for the DP table",
      },
      explanation:
        "Use a 2D DP table where dp[i][0] represents max profit at index i without holding a stock, and dp[i][1] with holding. Account for cooldown by looking two steps ahead when selling.",
    },
  },
  {
    id: 107,
    status: false,
    star: false,
    problem: "Coin Change II",
    leetcodeLink: "https://leetcode.com/problems/coin-change-ii/",
    difficulty: "Medium",
    description:
      "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of combinations that make up that amount. You may assume that you have an infinite number of each kind of coin.",
    examples: [
      {
        input: "amount = 5, coins = [1,2,5]",
        output: "4",
      },
      {
        input: "amount = 3, coins = [2]",
        output: "0",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int change(int amount, int[] coins) {
    return dfs(0, amount, coins);
  }
  
  private int dfs(int i, int amount, int[] coins) {
    if (amount == 0) return 1;
    if (amount < 0 || i >= coins.length) return 0;
    return dfs(i, amount - coins[i], coins) + dfs(i + 1, amount, coins);
  }
}`,
        python: `class Solution:
  def change(self, amount: int, coins: List[int]) -> int:
    def dfs(i, amount):
      if amount == 0:
        return 1
      if amount < 0 or i >= len(coins):
        return 0
      return dfs(i, amount - coins[i]) + dfs(i + 1, amount)
    return dfs(0, amount)`,
        cpp: `class Solution {
public:
  int change(int amount, vector<int>& coins) {
    return dfs(0, amount, coins);
  }
  
private:
  int dfs(int i, int amount, vector<int>& coins) {
    if (amount == 0) return 1;
    if (amount < 0 || i >= coins.size()) return 0;
    return dfs(i, amount - coins[i], coins) + dfs(i + 1, amount, coins);
  }
};`,
      },
      complexity: {
        time: "O(2^n) where n is the number of coins",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Recursively try including each coin (subtract its value) or skipping it, summing all valid combinations that reach the target amount.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int change(int amount, int[] coins) {
    int[] dp = new int[amount + 1];
    dp[0] = 1;
    
    for (int coin : coins) {
      for (int i = coin; i <= amount; i++) {
        dp[i] += dp[i - coin];
      }
    }
    return dp[amount];
  }
}`,
        python: `class Solution:
  def change(self, amount: int, coins: List[int]) -> int:
    dp = [0] * (amount + 1)
    dp[0] = 1
    
    for coin in coins:
      for i in range(coin, amount + 1):
        dp[i] += dp[i - coin]
    return dp[amount]`,
        cpp: `class Solution {
public:
  int change(int amount, vector<int>& coins) {
    vector<int> dp(amount + 1, 0);
    dp[0] = 1;
    
    for (int coin : coins) {
      for (int i = coin; i <= amount; i++) {
        dp[i] += dp[i - coin];
      }
    }
    return dp[amount];
  }
};`,
      },
      complexity: {
        time: "O(n*amount) where n is the number of coins",
        space: "O(amount) for the DP array",
      },
      explanation:
        "Use a 1D DP array where dp[i] represents the number of ways to make amount i. For each coin, update dp[i] by adding the number of ways to make i - coin.",
    },
  },
  {
    id: 108,
    status: false,
    star: false,
    problem: "Target Sum",
    leetcodeLink: "https://leetcode.com/problems/target-sum/",
    difficulty: "Medium",
    description:
      "You are given an integer array nums and an integer target. You want to build an expression out of nums by adding one of the symbols '+' or '-' before each integer and then concatenating all the integers. Return the number of different expressions that evaluate to target.",
    examples: [
      {
        input: "nums = [1,1,1,1,1], target = 3",
        output: "5",
      },
      {
        input: "nums = [1], target = 1",
        output: "1",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int findTargetSumWays(int[] nums, int target) {
    return dfs(0, 0, nums, target);
  }
  
  private int dfs(int i, int sum, int[] nums, int target) {
    if (i == nums.length) return sum == target ? 1 : 0;
    return dfs(i + 1, sum + nums[i], nums, target) + 
           dfs(i + 1, sum - nums[i], nums, target);
  }
}`,
        python: `class Solution:
  def findTargetSumWays(self, nums: List[int], target: int) -> int:
    def dfs(i, sum):
      if i == len(nums):
        return 1 if sum == target else 0
      return dfs(i + 1, sum + nums[i]) + dfs(i + 1, sum - nums[i])
    return dfs(0, 0)`,
        cpp: `class Solution {
public:
  int findTargetSumWays(vector<int>& nums, int target) {
    return dfs(0, 0, nums, target);
  }
  
private:
  int dfs(int i, int sum, vector<int>& nums, int target) {
    if (i == nums.size()) return sum == target ? 1 : 0;
    return dfs(i + 1, sum + nums[i], nums, target) + 
           dfs(i + 1, sum - nums[i], nums, target);
  }
};`,
      },
      complexity: {
        time: "O(2^n) where n is the length of nums",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Recursively try adding or subtracting each number, counting expressions that sum to the target at the end.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int findTargetSumWays(int[] nums, int target) {
    int sum = 0;
    for (int num : nums) sum += num;
    if (target > sum || target < -sum) return 0;
    
    int offset = sum;
    int[][] dp = new int[nums.length + 1][2 * sum + 1];
    dp[0][offset] = 1;
    
    for (int i = 0; i < nums.length; i++) {
      for (int s = -sum; s <= sum; s++) {
        if (dp[i][s + offset] > 0) {
          dp[i + 1][s + nums[i] + offset] += dp[i][s + offset];
          dp[i + 1][s - nums[i] + offset] += dp[i][s + offset];
        }
      }
    }
    return dp[nums.length][target + offset];
  }
}`,
        python: `class Solution:
  def findTargetSumWays(self, nums: List[int], target: int) -> int:
    sum_nums = sum(nums)
    if target > sum_nums or target < -sum_nums:
      return 0
    
    offset = sum_nums
    dp = [[0] * (2 * sum_nums + 1) for _ in range(len(nums) + 1)]
    dp[0][offset] = 1
    
    for i in range(len(nums)):
      for s in range(-sum_nums, sum_nums + 1):
        if dp[i][s + offset] > 0:
          dp[i + 1][s + nums[i] + offset] += dp[i][s + offset]
          dp[i + 1][s - nums[i] + offset] += dp[i][s + offset]
    
    return dp[len(nums)][target + offset]`,
        cpp: `class Solution {
public:
  int findTargetSumWays(vector<int>& nums, int target) {
    int sum = accumulate(nums.begin(), nums.end(), 0);
    if (target > sum || target < -sum) return 0;
    
    int offset = sum;
    vector<vector<int>> dp(nums.size() + 1, vector<int>(2 * sum + 1, 0));
    dp[0][offset] = 1;
    
    for (int i = 0; i < nums.size(); i++) {
      for (int s = -sum; s <= sum; s++) {
        if (dp[i][s + offset] > 0) {
          dp[i + 1][s + nums[i] + offset] += dp[i][s + offset];
          dp[i + 1][s - nums[i] + offset] += dp[i][s + offset];
        }
      }
    }
    return dp[nums.size()][target + offset];
  }
};`,
      },
      complexity: {
        time: "O(n*sum) where n is length of nums, sum is sum of nums",
        space: "O(n*sum) for the DP table",
      },
      explanation:
        "Convert to a subset sum problem. Use a 2D DP table where dp[i][s] represents the number of ways to achieve sum s after using first i numbers. Offset sums to handle negative values.",
    },
  },
  // ==================== HARD ====================
  {
    id: 109,
    status: false,
    star: false,
    problem: "Interleaving String",
    leetcodeLink: "https://leetcode.com/problems/interleaving-string/",
    difficulty: "Hard",
    description:
      "Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2. An interleaving is formed by taking characters alternately from s1 and s2 in any order to form s3.",
    examples: [
      {
        input: `s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"`,
        output: "true",
      },
      {
        input: `s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"`,
        output: "false",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public boolean isInterleave(String s1, String s2, String s3) {
    if (s1.length() + s2.length() != s3.length()) return false;
    return dfs(0, 0, 0, s1, s2, s3);
  }
  
  private boolean dfs(int i, int j, int k, String s1, String s2, String s3) {
    if (k == s3.length()) return i == s1.length() && j == s2.length();
    
    boolean valid = false;
    if (i < s1.length() && s1.charAt(i) == s3.charAt(k)) {
      valid |= dfs(i + 1, j, k + 1, s1, s2, s3);
    }
    if (j < s2.length() && s2.charAt(j) == s3.charAt(k)) {
      valid |= dfs(i, j + 1, k + 1, s1, s2, s3);
    }
    return valid;
  }
}`,
        python: `class Solution:
  def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
    if len(s1) + len(s2) != len(s3):
      return False
    def dfs(i, j, k):
      if k == len(s3):
        return i == len(s1) and j == len(s2)
      valid = False
      if i < len(s1) and s1[i] == s3[k]:
        valid |= dfs(i + 1, j, k + 1)
      if j < len(s2) and s2[j] == s3[k]:
        valid |= dfs(i, j + 1, k + 1)
      return valid
    return dfs(0, 0, 0)`,
        cpp: `class Solution {
public:
  bool isInterleave(string s1, string s2, string s3) {
    if (s1.length() + s2.length() != s3.length()) return false;
    return dfs(0, 0, 0, s1, s2, s3);
  }
  
private:
  bool dfs(int i, int j, int k, string& s1, string& s2, string& s3) {
    if (k == s3.length()) return i == s1.length() && j == s2.length();
    
    bool valid = false;
    if (i < s1.length() && s1[i] == s3[k]) {
      valid |= dfs(i + 1, j, k + 1, s1, s2, s3);
    }
    if (j < s2.length() && s2[j] == s3[k]) {
      valid |= dfs(i, j + 1, k + 1, s1, s2, s3);
    }
    return valid;
  }
};`,
      },
      complexity: {
        time: "O(2^(m+n)) where m and n are lengths of s1 and s2",
        space: "O(m+n) for recursion stack",
      },
      explanation:
        "Recursively try matching s3[k] with either s1[i] or s2[j], advancing indices accordingly. Check all possible interleavings.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public boolean isInterleave(String s1, String s2, String s3) {
    int m = s1.length(), n = s2.length();
    if (m + n != s3.length()) return false;
    
    boolean[][] dp = new boolean[m + 1][n + 1];
    dp[0][0] = true;
    
    for (int i = 1; i <= m; i++) {
      dp[i][0] = dp[i - 1][0] && s1.charAt(i - 1) == s3.charAt(i - 1);
    }
    for (int j = 1; j <= n; j++) {
      dp[0][j] = dp[0][j - 1] && s2.charAt(j - 1) == s3.charAt(j - 1);
    }
    
    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        if (s1.charAt(i - 1) == s3.charAt(i + j - 1)) {
          dp[i][j] |= dp[i - 1][j];
        }
        if (s2.charAt(j - 1) == s3.charAt(i + j - 1)) {
          dp[i][j] |= dp[i][j - 1];
        }
      }
    }
    return dp[m][n];
  }
}`,
        python: `class Solution:
  def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
    m, n = len(s1), len(s2)
    if m + n != len(s3):
      return False
    
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    
    for i in range(1, m + 1):
      dp[i][0] = dp[i - 1][0] and s1[i - 1] == s3[i - 1]
    for j in range(1, n + 1):
      dp[0][j] = dp[0][j - 1] and s2[j - 1] == s3[j - 1]
    
    for i in range(1, m + 1):
      for j in range(1, n + 1):
        if s1[i - 1] == s3[i + j - 1]:
          dp[i][j] |= dp[i - 1][j]
        if s2[j - 1] == s3[i + j - 1]:
          dp[i][j] |= dp[i][j - 1]
    
    return dp[m][n]`,
        cpp: `class Solution {
public:
  bool isInterleave(string s1, string s2, string s3) {
    int m = s1.length(), n = s2.length();
    if (m + n != s3.length()) return false;
    
    vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
    dp[0][0] = true;
    
    for (int i = 1; i <= m; i++) {
      dp[i][0] = dp[i - 1][0] && s1[i - 1] == s3[i - 1];
    }
    for (int j = 1; j <= n; j++) {
      dp[0][j] = dp[0][j - 1] && s2[j - 1] == s3[j - 1];
    }
    
    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        if (s1[i - 1] == s3[i + j - 1]) {
          dp[i][j] |= dp[i - 1][j];
        }
        if (s2[j - 1] == s3[i + j - 1]) {
          dp[i][j] |= dp[i][j - 1];
        }
      }
    }
    return dp[m][n];
  }
};`,
      },
      complexity: {
        time: "O(m*n) for filling the DP table",
        space: "O(m*n) for the DP table",
      },
      explanation:
        "Use a 2D DP table where dp[i][j] indicates if s3[0:i+j] is an interleaving of s1[0:i] and s2[0:j]. Check if current characters match and update based on previous states.",
    },
  },
  {
    id: 110,
    status: false,
    star: false,
    problem: "Longest Increasing Path in a Matrix",
    leetcodeLink:
      "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
    difficulty: "Hard",
    description:
      "Given an m x n integers matrix, return the length of the longest increasing path in matrix. From each cell, you can move in four directions: left, right, up, or down. You may not move diagonally or move outside the grid.",
    examples: [
      {
        input: "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
        output: "4",
      },
      {
        input: "matrix = [[3,4,5],[3,2,6],[2,2,1]]",
        output: "4",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int longestIncreasingPath(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    int max = 1;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        max = Math.max(max, dfs(i, j, matrix, -1));
      }
    }
    return max;
  }
  
  private int dfs(int i, int j, int[][] matrix, int prev) {
    if (i < 0 || i >= matrix.length || j < 0 || j >= matrix[0].length || matrix[i][j] <= prev) {
      return 0;
    }
    
    int max = 1;
    int curr = matrix[i][j];
    max = Math.max(max, 1 + dfs(i + 1, j, matrix, curr));
    max = Math.max(max, 1 + dfs(i - 1, j, matrix, curr));
    max = Math.max(max, 1 + dfs(i, j + 1, matrix, curr));
    max = Math.max(max, 1 + dfs(i, j - 1, matrix, curr));
    return max;
  }
}`,
        python: `class Solution:
  def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
    m, n = len(matrix), len(matrix[0])
    
    def dfs(i, j, prev):
      if i < 0 or i >= m or j < 0 or j >= n or matrix[i][j] <= prev:
        return 0
      curr = matrix[i][j]
      max_len = 1
      max_len = max(max_len, 1 + dfs(i + 1, j, curr))
      max_len = max(max_len, 1 + dfs(i - 1, j, curr))
      max_len = max(max_len, 1 + dfs(i, j + 1, curr))
      max_len = max(max_len, 1 + dfs(i, j - 1, curr))
      return max_len
    
    max_path = 1
    for i in range(m):
      for j in range(n):
        max_path = max(max_path, dfs(i, j, -1))
    return max_path`,
        cpp: `class Solution {
public:
  int longestIncreasingPath(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    int maxLen = 1;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        maxLen = max(maxLen, dfs(i, j, matrix, -1));
      }
    }
    return maxLen;
  }
  
private:
  int dfs(int i, int j, vector<vector<int>>& matrix, int prev) {
    if (i < 0 || i >= matrix.size() || j < 0 || j >= matrix[0].size() || matrix[i][j] <= prev) {
      return 0;
    }
    
    int curr = matrix[i][j];
    int maxLen = 1;
    maxLen = max(maxLen, 1 + dfs(i + 1, j, matrix, curr));
    maxLen = max(maxLen, 1 + dfs(i - 1, j, matrix, curr));
    maxLen = max(maxLen, 1 + dfs(i, j + 1, matrix, curr));
    maxLen = max(maxLen, 1 + dfs(i, j - 1, matrix, curr));
    return maxLen;
  }
};`,
      },
      complexity: {
        time: "O(2^(m*n)) where m*n is the matrix size",
        space: "O(m*n) for recursion stack",
      },
      explanation:
        "Use DFS to explore all possible increasing paths from each cell, checking all four directions. This leads to exponential time due to repeated computations.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int longestIncreasingPath(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    int[][] memo = new int[m][n];
    int max = 1;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        max = Math.max(max, dfs(i, j, matrix, memo, -1));
      }
    }
    return max;
  }
  
  private int dfs(int i, int j, int[][] matrix, int[][] memo, int prev) {
    if (i < 0 || i >= matrix.length || j < 0 || j >= matrix[0].length || matrix[i][j] <= prev) {
      return 0;
    }
    if (memo[i][j] != 0) return memo[i][j];
    
    int curr = matrix[i][j];
    int max = 1;
    max = Math.max(max, 1 + dfs(i + 1, j, matrix, memo, curr));
    max = Math.max(max, 1 + dfs(i - 1, j, matrix, memo, curr));
    max = Math.max(max, 1 + dfs(i, j + 1, matrix, memo, curr));
    max = Math.max(max, 1 + dfs(i, j - 1, matrix, memo, curr));
    
    memo[i][j] = max;
    return max;
  }
}`,
        python: `class Solution:
  def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
    m, n = len(matrix), len(matrix[0])
    memo = [[0] * n for _ in range(m)]
    
    def dfs(i, j, prev):
      if i < 0 or i >= m or j < 0 or j >= n or matrix[i][j] <= prev:
        return 0
      if memo[i][j] != 0:
        return memo[i][j]
      
      curr = matrix[i][j]
      max_len = 1
      max_len = max(max_len, 1 + dfs(i + 1, j, curr))
      max_len = max(max_len, 1 + dfs(i - 1, j, curr))
      max_len = max(max_len, 1 + dfs(i, j + 1, curr))
      max_len = max(max_len, 1 + dfs(i, j - 1, curr))
      
      memo[i][j] = max_len
      return max_len
    
    max_path = 1
    for i in range(m):
      for j in range(n):
        max_path = max(max_path, dfs(i, j, -1))
    return max_path`,
        cpp: `class Solution {
public:
  int longestIncreasingPath(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    vector<vector<int>> memo(m, vector<int>(n, 0));
    int maxLen = 1;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        maxLen = max(maxLen, dfs(i, j, matrix, memo, -1));
      }
    }
    return maxLen;
  }
  
private:
  int dfs(int i, int j, vector<vector<int>>& matrix, vector<vector<int>>& memo, int prev) {
    if (i < 0 || i >= matrix.size() || j < 0 || j >= matrix[0].size() || matrix[i][j] <= prev) {
      return 0;
    }
    if (memo[i][j] != 0) return memo[i][j];
    
    int curr = matrix[i][j];
    int maxLen = 1;
    maxLen = max(maxLen, 1 + dfs(i + 1, j, matrix, memo, curr));
    maxLen = max(maxLen, 1 + dfs(i - 1, j, matrix, memo, curr));
    maxLen = max(maxLen, 1 + dfs(i, j + 1, matrix, memo, curr));
    maxLen = max(maxLen, 1 + dfs(i, j - 1, matrix, memo, curr));
    
    memo[i][j] = maxLen;
    return maxLen;
  }
};`,
      },
      complexity: {
        time: "O(m*n) with memoization, visiting each cell once",
        space: "O(m*n) for memoization table",
      },
      explanation:
        "Use DFS with memoization to find the longest increasing path from each cell. Memoize results to avoid recomputing paths, making each cell visited once.",
    },
  },
  {
    id: 111,
    status: false,
    star: false,
    problem: "Distinct Subsequences",
    leetcodeLink: "https://leetcode.com/problems/distinct-subsequences/",
    difficulty: "Hard",
    description:
      "Given two strings s and t, return the number of distinct subsequences of s which equals t. A subsequence is a new string formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.",
    examples: [
      {
        input: `s = "rabbbit", t = "rabbit"`,
        output: "3",
      },
      {
        input: `s = "babgbag", t = "bag"`,
        output: "5",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int numDistinct(String s, String t) {
    return dfs(0, 0, s, t);
  }
  
  private int dfs(int i, int j, String s, String t) {
    if (j == t.length()) return 1;
    if (i == s.length()) return 0;
    
    int count = 0;
    if (s.charAt(i) == t.charAt(j)) {
      count += dfs(i + 1, j + 1, s, t);
    }
    count += dfs(i + 1, j, s, t);
    return count;
  }
}`,
        python: `class Solution:
  def numDistinct(self, s: str, t: str) -> int:
    def dfs(i, j):
      if j == len(t):
        return 1
      if i == len(s):
        return 0
      
      count = 0
      if s[i] == t[j]:
        count += dfs(i + 1, j + 1)
      count += dfs(i + 1, j)
      return count
    
    return dfs(0, 0)`,
        cpp: `class Solution {
public:
  int numDistinct(string s, string t) {
    return dfs(0, 0, s, t);
  }
  
private:
  int dfs(int i, int j, string& s, string& t) {
    if (j == t.length()) return 1;
    if (i == s.length()) return 0;
    
    int count = 0;
    if (s[i] == t[j]) {
      count += dfs(i + 1, j + 1, s, t);
    }
    count += dfs(i + 1, j, s, t);
    return count;
  }
};`,
      },
      complexity: {
        time: "O(2^n) where n is the length of s",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Recursively try including or excluding each character of s if it matches t[j], counting all valid subsequences.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int numDistinct(String s, String t) {
    int m = s.length(), n = t.length();
    long[][] dp = new long[m + 1][n + 1];
    for (int i = 0; i <= m; i++) dp[i][0] = 1;
    
    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        dp[i][j] = dp[i - 1][j];
        if (s.charAt(i - 1) == t.charAt(j - 1)) {
          dp[i][j] += dp[i - 1][j - 1];
        }
      }
    }
    return (int) dp[m][n];
  }
}`,
        python: `class Solution:
  def numDistinct(self, s: str, t: str) -> int:
    m, n = len(s), len(t)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
      dp[i][0] = 1
    
    for i in range(1, m + 1):
      for j in range(1, n + 1):
        dp[i][j] = dp[i - 1][j]
        if s[i - 1] == t[j - 1]:
          dp[i][j] += dp[i - 1][j - 1]
    
    return dp[m][n]`,
        cpp: `class Solution {
public:
  int numDistinct(string s, string t) {
    int m = s.length(), n = t.length();
    vector<vector<long>> dp(m + 1, vector<long>(n + 1, 0));
    for (int i = 0; i <= m; i++) dp[i][0] = 1;
    
    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        dp[i][j] = dp[i - 1][j];
        if (s[i - 1] == t[j - 1]) {
          dp[i][j] += dp[i - 1][j - 1];
        }
      }
    }
    return dp[m][n];
  }
};`,
      },
      complexity: {
        time: "O(m*n) where m and n are lengths of s and t",
        space: "O(m*n) for the DP table",
      },
      explanation:
        "Use a 2D DP table where dp[i][j] represents the number of distinct subsequences of s[0:i] that match t[0:j]. Include or exclude the current character based on whether it matches.",
    },
  },
  {
    id: 112,
    status: false,
    star: false,
    problem: "Edit Distance",
    leetcodeLink: "https://leetcode.com/problems/edit-distance/",
    difficulty: "Hard",
    description:
      "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations permitted: insert a character, delete a character, replace a character.",
    examples: [
      {
        input: `word1 = "horse", word2 = "ros"`,
        output: "3",
      },
      {
        input: `word1 = "intention", word2 = "execution"`,
        output: "5",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int minDistance(String word1, String word2) {
    return dfs(0, 0, word1, word2);
  }
  
  private int dfs(int i, int j, String word1, String word2) {
    if (i == word1.length()) return word2.length() - j;
    if (j == word2.length()) return word1.length() - i;
    
    if (word1.charAt(i) == word2.charAt(j)) {
      return dfs(i + 1, j + 1, word1, word2);
    }
    
    return 1 + Math.min(
      dfs(i + 1, j + 1, word1, word2), // replace
      Math.min(
        dfs(i + 1, j, word1, word2), // delete
        dfs(i, j + 1, word1, word2)  // insert
      )
    );
  }
}`,
        python: `class Solution:
  def minDistance(self, word1: str, word2: str) -> int:
    def dfs(i, j):
      if i == len(word1):
        return len(word2) - j
      if j == len(word2):
        return len(word1) - i
      
      if word1[i] == word2[j]:
        return dfs(i + 1, j + 1)
      
      return 1 + min(
        dfs(i + 1, j + 1), # replace
        dfs(i + 1, j),     # delete
        dfs(i, j + 1)      # insert
      )
    
    return dfs(0, 0)`,
        cpp: `class Solution {
public:
  int minDistance(string word1, string word2) {
    return dfs(0, 0, word1, word2);
  }
  
private:
  int dfs(int i, int j, string& word1, string& word2) {
    if (i == word1.length()) return word2.length() - j;
    if (j == word2.length()) return word1.length() - i;
    
    if (word1[i] == word2[j]) {
      return dfs(i + 1, j + 1, word1, word2);
    }
    
    return 1 + min({
      dfs(i + 1, j + 1, word1, word2), // replace
      dfs(i + 1, j, word1, word2),     // delete
      dfs(i, j + 1, word1, word2)      // insert
    });
  }
};`,
      },
      complexity: {
        time: "O(3^(m+n)) where m and n are lengths of word1 and word2",
        space: "O(m+n) for recursion stack",
      },
      explanation:
        "Recursively try all possible operations (replace, delete, insert) when characters differ, or move forward if they match. This leads to exponential time due to overlapping subproblems.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    
    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(
            dp[i - 1][j - 1], // replace
            Math.min(dp[i - 1][j], dp[i][j - 1]) // delete, insert
          );
        }
      }
    }
    return dp[m][n];
  }
}`,
        python: `class Solution:
  def minDistance(self, word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1):
      dp[i][0] = i
    for j in range(n + 1):
      dp[0][j] = j
    
    for i in range(1, m + 1):
      for j in range(1, n + 1):
        if word1[i - 1] == word2[j - 1]:
          dp[i][j] = dp[i - 1][j - 1]
        else:
          dp[i][j] = 1 + min(
            dp[i - 1][j - 1], # replace
            dp[i - 1][j],     # delete
            dp[i][j - 1]      # insert
          )
    
    return dp[m][n]`,
        cpp: `class Solution {
public:
  int minDistance(string word1, string word2) {
    int m = word1.length(), n = word2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    
    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        if (word1[i - 1] == word2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + min({
            dp[i - 1][j - 1], // replace
            dp[i - 1][j],     // delete
            dp[i][j - 1]      // insert
          });
        }
      }
    }
    return dp[m][n];
  }
};`,
      },
      complexity: {
        time: "O(m*n) for filling the DP table",
        space: "O(m*n) for the DP table",
      },
      explanation:
        "Use a 2D DP table where dp[i][j] represents the minimum operations to convert word1[0:i] to word2[0:j]. If characters match, copy the diagonal value; otherwise, take the minimum of replace, delete, or insert operations.",
    },
  },
  {
    id: 113,
    status: false,
    star: false,
    problem: "Burst Balloons",
    leetcodeLink: "https://leetcode.com/problems/burst-balloons/",
    difficulty: "Hard",
    description:
      "You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons. If you burst the i-th balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds, treat it as if there is a balloon with a 1 painted on it. Return the maximum coins you can collect by bursting the balloons wisely.",
    examples: [
      {
        input: "nums = [3,1,5,8]",
        output: "167",
      },
      {
        input: "nums = [1,5]",
        output: "10",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int maxCoins(int[] nums) {
    List<Integer> balloons = new ArrayList<>();
    for (int num : nums) balloons.add(num);
    return dfs(balloons);
  }
  
  private int dfs(List<Integer> balloons) {
    if (balloons.isEmpty()) return 0;
    
    int max = 0;
    for (int i = 0; i < balloons.size(); i++) {
      int left = i == 0 ? 1 : balloons.get(i - 1);
      int right = i == balloons.size() - 1 ? 1 : balloons.get(i + 1);
      int curr = balloons.get(i);
      int coins = left * curr * right;
      
      List<Integer> next = new ArrayList<>(balloons);
      next.remove(i);
      max = Math.max(max, coins + dfs(next));
    }
    return max;
  }
}`,
        python: `class Solution:
  def maxCoins(self, nums: List[int]) -> int:
    def dfs(balloons):
      if not balloons:
        return 0
      
      max_coins = 0
      for i in range(len(balloons)):
        left = 1 if i == 0 else balloons[i - 1]
        right = 1 if i == len(balloons) - 1 else balloons[i + 1]
        curr = balloons[i]
        coins = left * curr * right
        
        next_balloons = balloons[:i] + balloons[i + 1:]
        max_coins = max(max_coins, coins + dfs(next_balloons))
      return max_coins
    
    return dfs(nums)`,
        cpp: `class Solution {
public:
  int maxCoins(vector<int>& nums) {
    vector<int> balloons(nums.begin(), nums.end());
    return dfs(balloons);
  }
  
private:
  int dfs(vector<int>& balloons) {
    if (balloons.empty()) return 0;
    
    int maxCoins = 0;
    for (int i = 0; i < balloons.size(); i++) {
      int left = i == 0 ? 1 : balloons[i - 1];
      int right = i == balloons.size() - 1 ? 1 : balloons[i + 1];
      int curr = balloons[i];
      int coins = left * curr * right;
      
      vector<int> next = balloons;
      next.erase(next.begin() + i);
      maxCoins = max(maxCoins, coins + dfs(next));
    }
    return maxCoins;
  }
};`,
      },
      complexity: {
        time: "O(n!) for trying all permutations of bursting",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Recursively try bursting each balloon, calculating coins based on adjacent balloons, and explore all possible bursting orders.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int maxCoins(int[] nums) {
    int n = nums.length;
    int[] arr = new int[n + 2];
    arr[0] = arr[n + 1] = 1;
    for (int i = 0; i < n; i++) arr[i + 1] = nums[i];
    
    int[][] dp = new int[n + 2][n + 2];
    
    for (int len = 1; len <= n; len++) {
      for (int left = 1; left <= n - len + 1; left++) {
        int right = left + len - 1;
        for (int k = left; k <= right; k++) {
          dp[left][right] = Math.max(
            dp[left][right],
            dp[left][k - 1] + arr[left - 1] * arr[k] * arr[right + 1] + dp[k + 1][right]
          );
        }
      }
    }
    return dp[1][n];
  }
}`,
        python: `class Solution:
  def maxCoins(self, nums: List[int]) -> int:
    n = len(nums)
    arr = [1] + nums + [1]
    dp = [[0] * (n + 2) for _ in range(n + 2)]
    
    for len in range(1, n + 1):
      for left in range(1, n - len + 2):
        right = left + len - 1
        for k in range(left, right + 1):
          dp[left][right] = max(
            dp[left][right],
            dp[left][k - 1] + arr[left - 1] * arr[k] * arr[right + 1] + dp[k + 1][right]
          )
    
    return dp[1][n]`,
        cpp: `class Solution {
public:
  int maxCoins(vector<int>& nums) {
    int n = nums.size();
    vector<int> arr(n + 2, 1);
    for (int i = 0; i < n; i++) arr[i + 1] = nums[i];
    
    vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
    
    for (int len = 1; len <= n; len++) {
      for (int left = 1; left <= n - len + 1; left++) {
        int right = left + len - 1;
        for (int k = left; k <= right; k++) {
          dp[left][right] = max(
            dp[left][right],
            dp[left][k - 1] + arr[left - 1] * arr[k] * arr[right + 1] + dp[k + 1][right]
          );
        }
      }
    }
    return dp[1][n];
  }
};`,
      },
      complexity: {
        time: "O(n^3) for filling the DP table",
        space: "O(n^2) for the DP table",
      },
      explanation:
        "Use a 2D DP table where dp[left][right] represents the maximum coins for bursting balloons in range [left, right]. Consider each balloon as the last to be burst in the range, using adjacent balloons outside the range for coin calculation.",
    },
  },
  {
    id: 114,
    status: false,
    star: false,
    problem: "Regular Expression Matching",
    leetcodeLink: "https://leetcode.com/problems/regular-expression-matching/",
    difficulty: "Hard",
    description:
      "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'. '.' matches any single character, and '*' matches zero or more of the preceding element. The matching should cover the entire input string (not partial).",
    examples: [
      {
        input: `s = "aa", p = "a"`,
        output: "false",
      },
      {
        input: `s = "aa", p = "a*"`,
        output: "true",
      },
      {
        input: `s = "ab", p = ".*"`,
        output: "true",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public boolean isMatch(String s, String p) {
    return dfs(0, 0, s, p);
  }
  
  private boolean dfs(int i, int j, String s, String p) {
    if (j == p.length()) return i == s.length();
    
    boolean firstMatch = (i < s.length() && 
                         (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.'));
    
    if (j + 1 < p.length() && p.charAt(j + 1) == '*') {
      return dfs(i, j + 2, s, p) || (firstMatch && dfs(i + 1, j, s, p));
    }
    
    return firstMatch && dfs(i + 1, j + 1, s, p);
  }
}`,
        python: `class Solution:
  def isMatch(self, s: str, p: str) -> bool:
    def dfs(i, j):
      if j == len(p):
        return i == len(s)
      
      first_match = i < len(s) and (p[j] == s[i] or p[j] == '.')
      
      if j + 1 < len(p) and p[j + 1] == '*':
        return dfs(i, j + 2) or (first_match and dfs(i + 1, j))
      
      return first_match and dfs(i + 1, j + 1)
    
    return dfs(0, 0)`,
        cpp: `class Solution {
public:
  bool isMatch(string s, string p) {
    return dfs(0, 0, s, p);
  }
  
private:
  bool dfs(int i, int j, string& s, string& p) {
    if (j == p.length()) return i == s.length();
    
    bool firstMatch = (i < s.length() && 
                      (p[j] == s[i] || p[j] == '.'));
    
    if (j + 1 < p.length() && p[j + 1] == '*') {
      return dfs(i, j + 2, s, p) || (firstMatch && dfs(i + 1, j, s, p));
    }
    
    return firstMatch && dfs(i + 1, j + 1, s, p);
  }
};`,
      },
      complexity: {
        time: "O(2^(m+n)) in worst case where m and n are lengths of s and p",
        space: "O(m+n) for recursion stack",
      },
      explanation:
        "Recursively match characters, handling '.' for any character and '*' for zero or more occurrences. Try all possibilities for '*' (skip or include).",
    },
    optimal: {
      code: {
        java: `class Solution {
  public boolean isMatch(String s, String p) {
    int m = s.length(), n = p.length();
    boolean[][] dp = new boolean[m + 1][n + 1];
    dp[0][0] = true;
    
    for (int j = 1; j <= n; j++) {
      if (p.charAt(j - 1) == '*' && j >= 2) {
        dp[0][j] = dp[0][j - 2];
      }
    }
    
    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        if (p.charAt(j - 1) == '*' && j >= 2) {
          dp[i][j] = dp[i][j - 2] || 
                    (dp[i - 1][j] && (s.charAt(i - 1) == p.charAt(j - 2) || p.charAt(j - 2) == '.'));
        } else if (p.charAt(j - 1) == '.' || s.charAt(i - 1) == p.charAt(j - 1)) {
          dp[i][j] = dp[i - 1][j - 1];
        }
      }
    }
    return dp[m][n];
  }
}`,
        python: `class Solution:
  def isMatch(self, s: str, p: str) -> bool:
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    
    for j in range(1, n + 1):
      if p[j - 1] == '*' and j >= 2:
        dp[0][j] = dp[0][j - 2]
    
    for i in range(1, m + 1):
      for j in range(1, n + 1):
        if p[j - 1] == '*' and j >= 2:
          dp[i][j] = dp[i][j - 2] or \
                    (dp[i - 1][j] and (s[i - 1] == p[j - 2] or p[j - 2] == '.'))
        elif p[j - 1] == '.' or s[i - 1] == p[j - 1]:
          dp[i][j] = dp[i - 1][j - 1]
    
    return dp[m][n]`,
        cpp: `class Solution {
public:
  bool isMatch(string s, string p) {
    int m = s.length(), n = p.length();
    vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
    dp[0][0] = true;
    
    for (int j = 1; j <= n; j++) {
      if (p[j - 1] == '*' && j >= 2) {
        dp[0][j] = dp[0][j - 2];
      }
    }
    
    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        if (p[j - 1] == '*' && j >= 2) {
          dp[i][j] = dp[i][j - 2] || 
                    (dp[i - 1][j] && (s[i - 1] == p[j - 2] || p[j - 2] == '.'));
        } else if (p[j - 1] == '.' || s[i - 1] == p[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        }
      }
    }
    return dp[m][n];
  }
};`,
      },
      complexity: {
        time: "O(m*n) for filling the DP table",
        space: "O(m*n) for the DP table",
      },
      explanation:
        "Use a 2D DP table where dp[i][j] indicates if s[0:i] matches p[0:j]. Handle '*' by checking zero occurrences (dp[i][j-2]) or more occurrences if characters match.",
    },
  },
];
