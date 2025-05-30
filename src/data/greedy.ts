// src/data/greedy.ts
import { Question } from "../types/Question";

export const greedyQuestions: Question[] = [
  // ==================== MEDIUM ====================
  {
    id: 115,
    status: false,
    star: false,
    problem: "Maximum Subarray",
    leetcodeLink: "https://leetcode.com/problems/maximum-subarray/",
    difficulty: "Medium",
    description:
      "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
      },
      {
        input: "nums = [1]",
        output: "1",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int maxSubArray(int[] nums) {
    int maxSum = Integer.MIN_VALUE;
    for (int i = 0; i < nums.length; i++) {
      int currSum = 0;
      for (int j = i; j < nums.length; j++) {
        currSum += nums[j];
        maxSum = Math.max(maxSum, currSum);
      }
    }
    return maxSum;
  }
}`,
        python: `class Solution:
  def maxSubArray(self, nums: List[int]) -> int:
    max_sum = float('-inf')
    for i in range(len(nums)):
      curr_sum = 0
      for j in range(i, len(nums)):
        curr_sum += nums[j]
        max_sum = max(max_sum, curr_sum)
    return max_sum`,
        cpp: `class Solution {
public:
  int maxSubArray(vector<int>& nums) {
    int maxSum = INT_MIN;
    for (int i = 0; i < nums.size(); i++) {
      int currSum = 0;
      for (int j = i; j < nums.size(); j++) {
        currSum += nums[j];
        maxSum = max(maxSum, currSum);
      }
    }
    return maxSum;
  }
};`,
      },
      complexity: {
        time: "O(n^2) for checking all possible subarrays",
        space: "O(1) for storing only the current and maximum sum",
      },
      explanation:
        "Iterate through all possible subarrays by using two nested loops, calculating the sum of each subarray and keeping track of the maximum sum found.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int maxSubArray(int[] nums) {
    int maxSum = nums[0];
    int currSum = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
      currSum = Math.max(nums[i], currSum + nums[i]);
      maxSum = Math.max(maxSum, currSum);
    }
    return maxSum;
  }
}`,
        python: `class Solution:
  def maxSubArray(self, nums: List[int]) -> int:
    max_sum = nums[0]
    curr_sum = nums[0]
    
    for num in nums[1:]:
      curr_sum = max(num, curr_sum + num)
      max_sum = max(max_sum, curr_sum)
    
    return max_sum`,
        cpp: `class Solution {
public:
  int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0];
    int currSum = nums[0];
    
    for (int i = 1; i < nums.size(); i++) {
      currSum = max(nums[i], currSum + nums[i]);
      maxSum = max(maxSum, currSum);
    }
    return maxSum;
  }
};`,
      },
      complexity: {
        time: "O(n) for a single pass through the array",
        space: "O(1) for storing only the current and maximum sum",
      },
      explanation:
        "Use Kadane's algorithm, a greedy approach that maintains the maximum sum subarray ending at each index. At each step, decide whether to start a new subarray at the current element or extend the existing subarray.",
    },
  },
  {
    id: 116,
    status: false,
    star: false,
    problem: "Jump Game",
    leetcodeLink: "https://leetcode.com/problems/jump-game/",
    difficulty: "Medium",
    description:
      "Given an array of non-negative integers nums, you are initially positioned at the first index of the array. Each element in the array represents your maximum jump length at that position. Determine if you can reach the last index.",
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "true",
      },
      {
        input: "nums = [3,2,1,0,4]",
        output: "false",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public boolean canJump(int[] nums) {
    return dfs(0, nums, new boolean[nums.length]);
  }
  
  private boolean dfs(int i, int[] nums, boolean[] visited) {
    if (i >= nums.length - 1) return true;
    if (visited[i]) return false;
    
    visited[i] = true;
    for (int jump = 1; jump <= nums[i]; jump++) {
      if (dfs(i + jump, nums, visited)) return true;
    }
    return false;
  }
}`,
        python: `class Solution:
  def canJump(self, nums: List[int]) -> bool:
    def dfs(i, visited):
      if i >= len(nums) - 1:
        return True
      if i in visited:
        return False
      
      visited.add(i)
      for jump in range(1, nums[i] + 1):
        if dfs(i + jump, visited):
          return True
      return False
    
    return dfs(0, set())`,
        cpp: `class Solution {
public:
  bool canJump(vector<int>& nums) {
    vector<bool> visited(nums.size(), false);
    return dfs(0, nums, visited);
  }
  
private:
  bool dfs(int i, vector<int>& nums, vector<bool>& visited) {
    if (i >= nums.size() - 1) return true;
    if (visited[i]) return false;
    
    visited[i] = true;
    for (int jump = 1; jump <= nums[i]; jump++) {
      if (dfs(i + jump, nums, visited)) return true;
    }
    return false;
  }
};`,
      },
      complexity: {
        time: "O(n!) in worst case for exploring all possible jump paths",
        space: "O(n) for the visited array and recursion stack",
      },
      explanation:
        "Use DFS to try all possible jumps from each index, marking visited indices to avoid cycles. Return true if the last index is reached.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public boolean canJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.length && i <= maxReach; i++) {
      maxReach = Math.max(maxReach, i + nums[i]);
      if (maxReach >= nums.length - 1) return true;
    }
    return false;
  }
}`,
        python: `class Solution:
  def canJump(self, nums: List[int]) -> bool:
    max_reach = 0
    for i in range(len(nums)):
      if i > max_reach:
        return False
      max_reach = max(max_reach, i + nums[i])
      if max_reach >= len(nums) - 1:
        return True
    return False`,
        cpp: `class Solution {
public:
  bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.size() && i <= maxReach; i++) {
      maxReach = max(maxReach, i + nums[i]);
      if (maxReach >= nums.size() - 1) return true;
    }
    return false;
  }
};`,
      },
      complexity: {
        time: "O(n) for a single pass through the array",
        space: "O(1) for storing only the maximum reach",
      },
      explanation:
        "Use a greedy approach to track the furthest index reachable. At each position, update the maximum reach and check if the last index can be reached. If the current index exceeds the maximum reach, return false.",
    },
  },
  {
    id: 117,
    status: false,
    star: false,
    problem: "Jump Game II",
    leetcodeLink: "https://leetcode.com/problems/jump-game-ii/",
    difficulty: "Medium",
    description:
      "Given an array of non-negative integers nums, you are initially positioned at the first index of the array. Each element in the array represents your maximum jump length at that position. Return the minimum number of jumps to reach the last index.",
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "2",
      },
      {
        input: "nums = [2,3,0,1,4]",
        output: "2",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int jump(int[] nums) {
    return dfs(0, nums, new Integer[nums.length]);
  }
  
  private int dfs(int i, int[] nums, Integer[] memo) {
    if (i >= nums.length - 1) return 0;
    if (memo[i] != null) return memo[i];
    
    int minJumps = Integer.MAX_VALUE;
    for (int jump = 1; jump <= nums[i]; jump++) {
      if (i + jump < nums.length) {
        int jumps = dfs(i + jump, nums, memo);
        if (jumps != Integer.MAX_VALUE) {
          minJumps = Math.min(minJumps, 1 + jumps);
        }
      }
    }
    
    return memo[i] = minJumps;
  }
}`,
        python: `class Solution:
  def jump(self, nums: List[int]) -> int:
    memo = {}
    
    def dfs(i):
      if i >= len(nums) - 1:
        return 0
      if i in memo:
        return memo[i]
      
      min_jumps = float('inf')
      for jump in range(1, nums[i] + 1):
        if i + jump < len(nums):
          jumps = dfs(i + jump)
          if jumps != float('inf'):
            min_jumps = min(min_jumps, 1 + jumps)
      
      memo[i] = min_jumps
      return min_jumps
    
    return dfs(0)`,
        cpp: `class Solution {
public:
  int jump(vector<int>& nums) {
    vector<int> memo(nums.size(), -1);
    return dfs(0, nums, memo);
  }
  
private:
  int dfs(int i, vector<int>& nums, vector<int>& memo) {
    if (i >= nums.size() - 1) return 0;
    if (memo[i] != -1) return memo[i];
    
    int minJumps = INT_MAX;
    for (int jump = 1; jump <= nums[i]; jump++) {
      if (i + jump < nums.size()) {
        int jumps = dfs(i + jump, nums, memo);
        if (jumps != INT_MAX) {
          minJumps = min(minJumps, 1 + jumps);
        }
      }
    }
    
    return memo[i] = minJumps;
  }
};`,
      },
      complexity: {
        time: "O(n * max(nums)) for exploring all possible jumps",
        space: "O(n) for memoization array and recursion stack",
      },
      explanation:
        "Use DFS with memoization to try all possible jumps from each index, taking the minimum number of jumps to reach the last index.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int jump(int[] nums) {
    int jumps = 0, currEnd = 0, farthest = 0;
    for (int i = 0; i < nums.length - 1; i++) {
      farthest = Math.max(farthest, i + nums[i]);
      if (i == currEnd) {
        jumps++;
        currEnd = farthest;
      }
    }
    return jumps;
  }
}`,
        python: `class Solution:
  def jump(self, nums: List[int]) -> int:
    jumps = 0
    curr_end = 0
    farthest = 0
    
    for i in range(len(nums) - 1):
      farthest = max(farthest, i + nums[i])
      if i == curr_end:
        jumps += 1
        curr_end = farthest
    
    return jumps`,
        cpp: `class Solution {
public:
  int jump(vector<int>& nums) {
    int jumps = 0, currEnd = 0, farthest = 0;
    for (int i = 0; i < nums.size() - 1; i++) {
      farthest = max(farthest, i + nums[i]);
      if (i == currEnd) {
        jumps++;
        currEnd = farthest;
      }
    }
    return jumps;
  }
};`,
      },
      complexity: {
        time: "O(n) for a single pass through the array",
        space: "O(1) for storing only a few variables",
      },
      explanation:
        "Use a greedy approach to track the furthest reachable index within the current jump range. When the current index reaches the end of the current range, increment jumps and update the range to the furthest reachable point.",
    },
  },
  {
    id: 118,
    status: false,
    star: false,
    problem: "Gas Station",
    leetcodeLink: "https://leetcode.com/problems/gas-station/",
    difficulty: "Medium",
    description:
      "There are n gas stations along a circular route, where the amount of gas at the i-th station is gas[i]. You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the i-th station to the next (i+1)-th station. Return the starting gas station's index if you can complete the circuit, otherwise return -1.",
    examples: [
      {
        input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
        output: "3",
      },
      {
        input: "gas = [2,3,4], cost = [3,4,3]",
        output: "-1",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int canCompleteCircuit(int[] gas, int[] cost) {
    int n = gas.length;
    for (int start = 0; start < n; start++) {
      int tank = 0;
      boolean canComplete = true;
      for (int i = 0; i < n; i++) {
        int index = (start + i) % n;
        tank += gas[index] - cost[index];
        if (tank < 0) {
          canComplete = false;
          break;
        }
      }
      if (canComplete) return start;
    }
    return -1;
  }
}`,
        python: `class Solution:
  def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
    n = len(gas)
    for start in range(n):
      tank = 0
      can_complete = True
      for i in range(n):
        index = (start + i) % n
        tank += gas[index] - cost[index]
        if tank < 0:
          can_complete = False
          break
      if can_complete:
        return start
    return -1`,
        cpp: `class Solution {
public:
  int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int n = gas.size();
    for (int start = 0; start < n; start++) {
      int tank = 0;
      bool canComplete = true;
      for (int i = 0; i < n; i++) {
        int index = (start + i) % n;
        tank += gas[index] - cost[index];
        if (tank < 0) {
          canComplete = false;
          break;
        }
      }
      if (canComplete) return start;
    }
    return -1;
  }
};`,
      },
      complexity: {
        time: "O(n^2) for trying each starting point and simulating the circuit",
        space: "O(1) for storing only the tank variable",
      },
      explanation:
        "Try each station as a starting point and simulate a full circuit, checking if the tank remains non-negative. Return the first valid starting index or -1 if none exist.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int canCompleteCircuit(int[] gas, int[] cost) {
    int totalTank = 0, currTank = 0, start = 0;
    for (int i = 0; i < gas.length; i++) {
      totalTank += gas[i] - cost[i];
      currTank += gas[i] - cost[i];
      if (currTank < 0) {
        start = i + 1;
        currTank = 0;
      }
    }
    return totalTank >= 0 ? start : -1;
  }
}`,
        python: `class Solution:
  def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
    total_tank = 0
    curr_tank = 0
    start = 0
    
    for i in range(len(gas)):
      total_tank += gas[i] - cost[i]
      curr_tank += gas[i] - cost[i]
      if curr_tank < 0:
        start = i + 1
        curr_tank = 0
    
    return start if total_tank >= 0 else -1`,
        cpp: `class Solution {
public:
  int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int totalTank = 0, currTank = 0, start = 0;
    for (int i = 0; i < gas.size(); i++) {
      totalTank += gas[i] - cost[i];
      currTank += gas[i] - cost[i];
      if (currTank < 0) {
        start = i + 1;
        currTank = 0;
      }
    }
    return totalTank >= 0 ? start : -1;
  }
};`,
      },
      complexity: {
        time: "O(n) for a single pass through the arrays",
        space: "O(1) for storing only a few variables",
      },
      explanation:
        "Use a greedy approach to track the total gas surplus/deficit and the current tank. If the current tank becomes negative, reset it and try the next index as the start. If the total tank is non-negative, the start index is valid; otherwise, return -1.",
    },
  },
  {
    id: 119,
    status: false,
    star: false,
    problem: "Hand of Straights",
    leetcodeLink: "https://leetcode.com/problems/hand-of-straights/",
    difficulty: "Medium",
    description:
      "Given an array of integers hand where hand[i] is the value of the i-th card and an integer groupSize, return true if the cards can be arranged into groups of size groupSize where each group contains consecutive cards, and false otherwise.",
    examples: [
      {
        input: "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3",
        output: "true",
      },
      {
        input: "hand = [1,2,3,4,5], groupSize = 4",
        output: "false",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public boolean isNStraightHand(int[] hand, int groupSize) {
    if (hand.length % groupSize != 0) return false;
    Arrays.sort(hand);
    
    List<Integer> list = new ArrayList<>();
    for (int card : hand) list.add(card);
    
    while (!list.isEmpty()) {
      int start = list.get(0);
      list.remove(0);
      for (int i = 1; i < groupSize; i++) {
        int index = list.indexOf(start + i);
        if (index == -1) return false;
        list.remove(index);
      }
    }
    return true;
  }
}`,
        python: `class Solution:
  def isNStraightHand(self, hand: List[int], groupSize: int) -> bool:
    if len(hand) % groupSize != 0:
      return False
    hand.sort()
    
    while hand:
      start = hand[0]
      hand.pop(0)
      for i in range(1, groupSize):
        if start + i not in hand:
          return False
        hand.remove(start + i)
    return True`,
        cpp: `class Solution {
public:
  bool isNStraightHand(vector<int>& hand, int groupSize) {
    if (hand.size() % groupSize != 0) return false;
    sort(hand.begin(), hand.end());
    
    while (!hand.empty()) {
      int start = hand[0];
      hand.erase(hand.begin());
      for (int i = 1; i < groupSize; i++) {
        auto it = find(hand.begin(), hand.end(), start + i);
        if (it == hand.end()) return false;
        hand.erase(it);
      }
    }
    return true;
  }
};`,
      },
      complexity: {
        time: "O(n^2) due to searching and removing elements from the list",
        space: "O(n) for storing the list of cards",
      },
      explanation:
        "Sort the array and repeatedly form groups by taking the smallest card and finding the next groupSize-1 consecutive cards. Remove used cards and continue until the list is empty or a group cannot be formed.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public boolean isNStraightHand(int[] hand, int groupSize) {
    if (hand.length % groupSize != 0) return false;
    
    Map<Integer, Integer> count = new TreeMap<>();
    for (int card : hand) {
      count.put(card, count.getOrDefault(card, 0) + 1);
    }
    
    while (!count.isEmpty()) {
      int start = count.keySet().iterator().next();
      for (int i = 0; i < groupSize; i++) {
        int card = start + i;
        if (!count.containsKey(card)) return false;
        count.put(card, count.get(card) - 1);
        if (count.get(card) == 0) count.remove(card);
      }
    }
    return true;
  }
}`,
        python: `class Solution:
  def isNStraightHand(self, hand: List[int], groupSize: int) -> bool:
    if len(hand) % groupSize != 0:
      return False
    
    count = {}
    for card in hand:
      count[card] = count.get(card, 0) + 1
    
    for start in sorted(count.keys()):
      if count[start] > 0:
        for i in range(groupSize):
          card = start + i
          if card not in count or count[card] == 0:
            return False
          count[card] -= 1
          if count[card] == 0:
            del count[card]
    
    return True`,
        cpp: `class Solution {
public:
  bool isNStraightHand(vector<int>& hand, int groupSize) {
    if (hand.size() % groupSize != 0) return false;
    
    map<int, int> count;
    for (int card : hand) {
      count[card]++;
    }
    
    while (!count.empty()) {
      int start = count.begin()->first;
      for (int i = 0; i < groupSize; i++) {
        int card = start + i;
        if (count.find(card) == count.end()) return false;
        count[card]--;
        if (count[card] == 0) count.erase(card);
      }
    }
    return true;
  }
};`,
      },
      complexity: {
        time: "O(n log n) for sorting keys in the map",
        space: "O(n) for the frequency map",
      },
      explanation:
        "Use a frequency map to count card occurrences, sorted by value. Greedily form groups starting from the smallest card, ensuring consecutive cards exist. Decrease counts and remove cards with zero count, continuing until all cards are used or a group cannot be formed.",
    },
  },
  {
    id: 120,
    status: false,
    star: false,
    problem: "Merge Triplets to Form Target Triplet",
    leetcodeLink:
      "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/",
    difficulty: "Medium",
    description:
      "Given an array of triplets where triplets[i] = [ai, bi, ci] represents the i-th triplet, and a target triplet target = [x, y, z], return true if it is possible to choose some triplets such that their maximum values form the target triplet, and false otherwise.",
    examples: [
      {
        input: "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]",
        output: "true",
      },
      {
        input: "triplets = [[3,4,5],[4,5,6]], target = [3,2,5]",
        output: "false",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public boolean mergeTriplets(int[][] triplets, int[] target) {
    for (int[][] subset : getSubsets(triplets)) {
      int x = 0, y = 0, z = 0;
      for (int[] triplet : subset) {
        x = Math.max(x, triplet[0]);
        y = Math.max(y, triplet[1]);
        z = Math.max(z, triplet[2]);
      }
      if (x == target[0] && y == target[1] && z == target[2]) return true;
    }
    return false;
  }
  
  private List<List<int[]>> getSubsets(int[][] triplets) {
    List<List<int[]>> result = new ArrayList<>();
    result.add(new ArrayList<>());
    for (int[] triplet : triplets) {
      List<List<int[]>> newSubsets = new ArrayList<>();
      for (List<int[]> subset : result) {
        newSubsets.add(new ArrayList<>(subset));
        List<int[]> newSubset = new ArrayList<>(subset);
        newSubset.add(triplet);
        newSubsets.add(newSubset);
      }
      result = newSubsets;
    }
    return result;
  }
}`,
        python: `class Solution:
  def mergeTriplets(self, triplets: List[List[int]], target: List[int]) -> bool:
    def get_subsets(triplets):
      result = [[]]
      for triplet in triplets:
        new_subsets = []
        for subset in result:
          new_subsets.append(subset[:])
          new_subsets.append(subset + [triplet])
        result = new_subsets
      return result
    
    for subset in get_subsets(triplets):
      x = y = z = 0
      for triplet in subset:
        x = max(x, triplet[0])
        y = max(y, triplet[1])
        z = max(z, triplet[2])
      if x == target[0] and y == target[1] and z == target[2]:
        return True
    return False`,
        cpp: `class Solution {
public:
  bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
    for (auto& subset : getSubsets(triplets)) {
      int x = 0, y = 0, z = 0;
      for (auto& triplet : subset) {
        x = max(x, triplet[0]);
        y = max(y, triplet[1]);
        z = max(z, triplet[2]);
      }
      if (x == target[0] && y == target[1] && z == target[2]) return true;
    }
    return false;
  }
  
private:
  vector<vector<vector<int>>> getSubsets(vector<vector<int>>& triplets) {
    vector<vector<vector<int>>> result = {{}};
    for (auto& triplet : triplets) {
      vector<vector<vector<int>>> newSubsets;
      for (auto& subset : result) {
        newSubsets.push_back(subset);
        auto newSubset = subset;
        newSubset.push_back(triplet);
        newSubsets.push_back(newSubset);
      }
      result = newSubsets;
    }
    return result;
  }
};`,
      },
      complexity: {
        time: "O(2^n * n) for generating all subsets and computing maximums",
        space: "O(2^n) for storing all subsets",
      },
      explanation:
        "Generate all possible subsets of triplets and compute the maximum values for x, y, z in each subset. Check if any subset produces the target triplet.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public boolean mergeTriplets(int[][] triplets, int[] target) {
    boolean foundX = false, foundY = false, foundZ = false;
    
    for (int[] triplet : triplets) {
      if (triplet[0] <= target[0] && triplet[1] <= target[1] && triplet[2] <= target[2]) {
        if (triplet[0] == target[0]) foundX = true;
        if (triplet[1] == target[1]) foundY = true;
        if (triplet[2] == target[2]) foundZ = true;
      }
    }
    
    return foundX && foundY && foundZ;
  }
}`,
        python: `class Solution:
  def mergeTriplets(self, triplets: List[List[int]], target: List[int]) -> bool:
    found_x = found_y = found_z = False
    
    for triplet in triplets:
      if triplet[0] <= target[0] and triplet[1] <= target[1] and triplet[2] <= target[2]:
        if triplet[0] == target[0]:
          found_x = True
        if triplet[1] == target[1]:
          found_y = True
        if triplet[2] == target[2]:
          found_z = True
    
    return found_x and found_y and found_z`,
        cpp: `class Solution {
public:
  bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
    bool foundX = false, foundY = false, foundZ = false;
    
    for (auto& triplet : triplets) {
      if (triplet[0] <= target[0] && triplet[1] <= target[1] && triplet[2] <= target[2]) {
        if (triplet[0] == target[0]) foundX = true;
        if (triplet[1] == target[1]) foundY = true;
        if (triplet[2] == target[2]) foundZ = true;
      }
    }
    
    return foundX && foundY && foundZ;
  }
};`,
      },
      complexity: {
        time: "O(n) for iterating through triplets",
        space: "O(1) for storing only boolean flags",
      },
      explanation:
        "Greedily check for triplets that can contribute to the target without exceeding it. For each position (x, y, z), find at least one triplet where the value matches the target and other values are less than or equal to the target. If all components are found, return true.",
    },
  },
  {
    id: 121,
    status: false,
    star: false,
    problem: "Partition Labels",
    leetcodeLink: "https://leetcode.com/problems/partition-labels/",
    difficulty: "Medium",
    description:
      "You are given a string s. Partition s such that every substring of the partition is composed of the same characters (i.e., each letter appears in at most one part). Return the lengths of the partitions in the order they appear in the string.",
    examples: [
      {
        input: `s = "ababcbacadefegdehijhklij"`,
        output: "[9,7,8]",
      },
      {
        input: `s = "eccbbbbdec"`,
        output: "[10]",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public List<Integer> partitionLabels(String s) {
    List<Integer> result = new ArrayList<>();
    int i = 0;
    while (i < s.length()) {
      Set<Character> seen = new HashSet<>();
      int j = i;
      while (j < s.length()) {
        char c = s.charAt(j);
        if (!seen.contains(c)) {
          seen.add(c);
          boolean valid = true;
          for (int k = j + 1; k < s.length(); k++) {
            if (seen.contains(s.charAt(k))) {
              valid = false;
              break;
            }
          }
          if (valid) break;
        }
        j++;
      }
      result.add(j - i + 1);
      i = j + 1;
    }
    return result;
  }
}`,
        python: `class Solution:
  def partitionLabels(self, s: str) -> List[int]:
    result = []
    i = 0
    while i < len(s):
      seen = set()
      j = i
      while j < len(s):
        c = s[j]
        if c not in seen:
          seen.add(c)
          valid = True
          for k in range(j + 1, len(s)):
            if s[k] in seen:
              valid = False
              break
          if valid:
            break
        j += 1
      result.append(j - i + 1)
      i = j + 1
    return result`,
        cpp: `class Solution {
public:
  vector<int> partitionLabels(string s) {
    vector<int> result;
    int i = 0;
    while (i < s.length()) {
      unordered_set<char> seen;
      int j = i;
      while (j < s.length()) {
        char c = s[j];
        if (seen.find(c) == seen.end()) {
          seen.insert(c);
          bool valid = true;
          for (int k = j + 1; k < s.length(); k++) {
            if (seen.find(s[k]) != seen.end()) {
              valid = false;
              break;
            }
          }
          if (valid) break;
        }
        j++;
      }
      result.push_back(j - i + 1);
      i = j + 1;
    }
    return result;
  }
};`,
      },
      complexity: {
        time: "O(n^2) for checking each character against remaining string",
        space:
          "O(k) for the set of seen characters, where k is the unique character count",
      },
      explanation:
        "For each starting index, expand the partition until all characters in it do not appear later in the string. Use a set to track characters and check validity of each partition end.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public List<Integer> partitionLabels(String s) {
    int[] last = new int[26];
    for (int i = 0; i < s.length(); i++) {
      last[s.charAt(i) - 'a'] = i;
    }
    
    List<Integer> result = new ArrayList<>();
    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
      end = Math.max(end, last[s.charAt(i) - 'a']);
      if (i == end) {
        result.add(end - start + 1);
        start = i + 1;
      }
    }
    return result;
  }
}`,
        python: `class Solution:
  def partitionLabels(self, s: str) -> List[int]:
    last = {}
    for i, c in enumerate(s):
      last[c] = i
    
    result = []
    start = 0
    end = 0
    for i, c in enumerate(s):
      end = max(end, last[c])
      if i == end:
        result.append(end - start + 1)
        start = i + 1
    
    return result`,
        cpp: `class Solution {
public:
  vector<int> partitionLabels(string s) {
    vector<int> last(26, 0);
    for (int i = 0; i < s.length(); i++) {
      last[s[i] - 'a'] = i;
    }
    
    vector<int> result;
    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
      end = max(end, last[s[i] - 'a']);
      if (i == end) {
        result.push_back(end - start + 1);
        start = i + 1;
      }
    }
    return result;
  }
};`,
      },
      complexity: {
        time: "O(n) for two passes through the string",
        space: "O(1) for the fixed-size last array (26 letters)",
      },
      explanation:
        "Greedily partition the string by finding the last occurrence of each character. Extend each partition to include the last occurrence of any character within it, adding the partition length when the current index reaches the end of the partition.",
    },
  },
  // ==================== HARD ====================
  {
    id: 122,
    status: false,
    star: false,
    problem: "Valid Parenthesis String",
    leetcodeLink: "https://leetcode.com/problems/valid-parenthesis-string/",
    difficulty: "Hard",
    description:
      "Given a string s containing only three types of characters: '(', ')', and '*', return true if s is valid. A string is valid if every '(' has a corresponding ')', '*' can be treated as a single '(', a single ')', or an empty string, and the string forms a valid sequence of parentheses.",
    examples: [
      {
        input: `s = "()"`,
        output: "true",
      },
      {
        input: `s = "(*)"`,
        output: "true",
      },
      {
        input: `s = "(*))"`,
        output: "true",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public boolean checkValidString(String s) {
    return dfs(0, 0, s);
  }
  
  private boolean dfs(int i, int count, String s) {
    if (count < 0) return false;
    if (i == s.length()) return count == 0;
    
    if (s.charAt(i) == '(') {
      return dfs(i + 1, count + 1, s);
    } else if (s.charAt(i) == ')') {
      return dfs(i + 1, count - 1, s);
    } else { // '*'
      return dfs(i + 1, count + 1, s) || // as '('
             dfs(i + 1, count - 1, s) || // as ')'
             dfs(i + 1, count, s);       // as empty
    }
  }
}`,
        python: `class Solution:
  def checkValidString(self, s: str) -> bool:
    def dfs(i, count):
      if count < 0:
        return False
      if i == len(s):
        return count == 0
      
      if s[i] == '(':
        return dfs(i + 1, count + 1)
      elif s[i] == ')':
        return dfs(i + 1, count - 1)
      else: # '*'
        return (dfs(i + 1, count + 1) or # as '('
                dfs(i + 1, count - 1) or # as ')'
                dfs(i + 1, count))       # as empty
    
    return dfs(0, 0)`,
        cpp: `class Solution {
public:
  bool checkValidString(string s) {
    return dfs(0, 0, s);
  }
  
private:
  bool dfs(int i, int count, string& s) {
    if (count < 0) return false;
    if (i == s.length()) return count == 0;
    
    if (s[i] == '(') {
      return dfs(i + 1, count + 1, s);
    } else if (s[i] == ')') {
      return dfs(i + 1, count - 1, s);
    } else { // '*'
      return dfs(i + 1, count + 1, s) || // as '('
             dfs(i + 1, count - 1, s) || // as ')'
             dfs(i + 1, count, s);       // as empty
    }
  }
};`,
      },
      complexity: {
        time: "O(3^n) for trying all possibilities of '*'",
        space: "O(n) for recursion stack",
      },
      explanation:
        "Use DFS to explore all possible interpretations of '*' (as '(', ')', or empty). Track the balance of open parentheses and ensure it never goes negative and equals zero at the end.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public boolean checkValidString(String s) {
    int low = 0, high = 0;
    
    for (char c : s.toCharArray()) {
      if (c == '(') {
        low++;
        high++;
      } else if (c == ')') {
        low--;
        high--;
      } else { // '*'
        low--;
        high++;
      }
      if (high < 0) return false;
      low = Math.max(low, 0);
    }
    
    return low == 0;
  }
}`,
        python: `class Solution:
  def checkValidString(self, s: str) -> bool:
    low = high = 0
    
    for c in s:
      if c == '(':
        low += 1
        high += 1
      elif c == ')':
        low -= 1
        high -= 1
      else: # '*'
        low -= 1
        high += 1
      if high < 0:
        return False
      low = max(low, 0)
    
    return low == 0`,
        cpp: `class Solution {
public:
  bool checkValidString(string s) {
    int low = 0, high = 0;
    
    for (char c : s) {
      if (c == '(') {
        low++;
        high++;
      } else if (c == ')') {
        low--;
        high--;
      } else { // '*'
        low--;
        high++;
      }
      if (high < 0) return false;
      low = max(low, 0);
    }
    
    return low == 0;
  }
};`,
      },
      complexity: {
        time: "O(n) for a single pass through the string",
        space: "O(1) for storing only two variables",
      },
      explanation:
        "Use a greedy approach to track the range of possible open parenthesis counts (low and high). For '(', increment both; for ')', decrement both; for '*', decrement low (as ')') and increment high (as '('). Ensure high never goes negative and low equals zero at the end.",
    },
  },
];
