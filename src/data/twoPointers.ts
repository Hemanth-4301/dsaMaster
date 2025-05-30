// src/data/twoPointers.ts
import { Question } from "../types/Question";

export const twoPointerQuestions: Question[] = [
  // ==================== MEDIUM ====================
  {
    id: 130,
    status: false,
    star: false,
    problem: "Two Sum II - Input Array Is Sorted",
    leetcodeLink:
      "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    difficulty: "Medium",
    description:
      "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers (1-indexed) as an array.",
    examples: [
      {
        input: "numbers = [2,7,11,15], target = 9",
        output: "[1,2]",
      },
      {
        input: "numbers = [2,3,4], target = 6",
        output: "[1,3]",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int[] twoSum(int[] numbers, int target) {
    for (int i = 0; i < numbers.length; i++) {
      for (int j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] == target) {
          return new int[]{i + 1, j + 1};
        }
      }
    }
    return new int[]{};
  }
}`,
        python: `class Solution:
  def twoSum(self, numbers: List[int], target: int) -> List[int]:
    for i in range(len(numbers)):
      for j in range(i + 1, len(numbers)):
        if numbers[i] + numbers[j] == target:
          return [i + 1, j + 1]
    return []`,
        cpp: `class Solution {
public:
  vector<int> twoSum(vector<int>& numbers, int target) {
    for (int i = 0; i < numbers.size(); i++) {
      for (int j = i + 1; j < numbers.size(); j++) {
        if (numbers[i] + numbers[j] == target) {
          return {i + 1, j + 1};
        }
      }
    }
    return {};
  }
};`,
      },
      complexity: {
        time: "O(n^2) for nested loops checking all pairs",
        space: "O(1) for constant extra space",
      },
      explanation:
        "Iterate through all pairs of numbers in the array using two nested loops. Check if their sum equals the target, and return their 1-indexed positions if found.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;
    while (left < right) {
      int sum = numbers[left] + numbers[right];
      if (sum == target) {
        return new int[]{left + 1, right + 1};
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
    return new int[]{};
  }
}`,
        python: `class Solution:
  def twoSum(self, numbers: List[int], target: int) -> List[int]:
    left, right = 0, len(numbers) - 1
    while left < right:
      curr_sum = numbers[left] + numbers[right]
      if curr_sum == target:
        return [left + 1, right + 1]
      elif curr_sum < target:
        left += 1
      else:
        right -= 1
    return []`,
        cpp: `class Solution {
public:
  vector<int> twoSum(vector<int>& numbers, int target) {
    int left = 0, right = numbers.size() - 1;
    while (left < right) {
      int sum = numbers[left] + numbers[right];
      if (sum == target) {
        return {left + 1, right + 1};
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
    return {};
  }
};`,
      },
      complexity: {
        time: "O(n) for a single pass with two pointers",
        space: "O(1) for constant extra space",
      },
      explanation:
        "Since the array is sorted, use two pointers (left and right). Compute the sum of elements at both pointers. If the sum equals the target, return their 1-indexed positions. If the sum is too small, move left pointer right; if too large, move right pointer left.",
    },
  },
  {
    id: 131,
    status: false,
    star: false,
    problem: "3Sum",
    leetcodeLink: "https://leetcode.com/problems/3sum/",
    difficulty: "Medium",
    description:
      "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.",
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public List<List<Integer>> threeSum(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
      for (int j = i + 1; j < nums.length - 1; j++) {
        for (int k = j + 1; k < nums.length; k++) {
          if (nums[i] + nums[j] + nums[k] == 0) {
            List<Integer> triplet = Arrays.asList(nums[i], nums[j], nums[k]);
            Collections.sort(triplet);
            if (!result.contains(triplet)) {
              result.add(triplet);
            }
          }
        }
      }
    }
    return result;
  }
}`,
        python: `class Solution:
  def threeSum(self, nums: List[int]) -> List[List[int]]:
    result = []
    for i in range(len(nums) - 2):
      for j in range(i + 1, len(nums) - 1):
        for k in range(j + 1, len(nums)):
          if nums[i] + nums[j] + nums[k] == 0:
            triplet = sorted([nums[i], nums[j], nums[k]])
            if triplet not in result:
              result.append(triplet)
    return result`,
        cpp: `class Solution {
public:
  vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> result;
    for (int i = 0; i < nums.size() - 2; i++) {
      for (int j = i + 1; j < nums.size() - 1; j++) {
        for (int k = j + 1; k < nums.size(); k++) {
          if (nums[i] + nums[j] + nums[k] == 0) {
            vector<int> triplet = {nums[i], nums[j], nums[k]};
            sort(triplet.begin(), triplet.end());
            if (find(result.begin(), result.end(), triplet) == result.end()) {
              result.push_back(triplet);
            }
          }
        }
      }
    }
    return result;
  }
};`,
      },
      complexity: {
        time: "O(n^3) for three nested loops",
        space: "O(n) for storing the result (excluding output space)",
      },
      explanation:
        "Use three nested loops to check all possible triplets. If their sum is 0, sort the triplet to handle duplicates and add it to the result if not already present.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] == nums[i - 1]) continue;
      int left = i + 1, right = nums.length - 1;
      while (left < right) {
        int sum = nums[i] + nums[left] + nums[right];
        if (sum == 0) {
          result.add(Arrays.asList(nums[i], nums[left], nums[right]));
          while (left < right && nums[left] == nums[left + 1]) left++;
          while (left < right && nums[right] == nums[right - 1]) right--;
          left++;
          right--;
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }
    return result;
  }
}`,
        python: `class Solution:
  def threeSum(self, nums: List[int]) -> List[List[int]]:
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
      if i > 0 and nums[i] == nums[i - 1]:
        continue
      left, right = i + 1, len(nums) - 1
      while left < right:
        curr_sum = nums[i] + nums[left] + nums[right]
        if curr_sum == 0:
          result.append([nums[i], nums[left], nums[right]])
          while left < right and nums[left] == nums[left + 1]:
            left += 1
          while left < right and nums[right] == nums[right - 1]:
            right -= 1
          left += 1
          right -= 1
        elif curr_sum < 0:
          left += 1
        else:
          right -= 1
    return result`,
        cpp: `class Solution {
public:
  vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    for (int i = 0; i < nums.size() - 2; i++) {
      if (i > 0 && nums[i] == nums[i - 1]) continue;
      int left = i + 1, right = nums.size() - 1;
      while (left < right) {
        int sum = nums[i] + nums[left] + nums[right];
        if (sum == 0) {
          result.push_back({nums[i], nums[left], nums[right]});
          while (left < right && nums[left] == nums[left + 1]) left++;
          while (left < right && nums[right] == nums[right - 1]) right--;
          left++;
          right--;
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }
    return result;
  }
};`,
      },
      complexity: {
        time: "O(n^2) for sorting and two-pointer traversal",
        space: "O(n) for sorting (or O(1) if in-place) and result storage",
      },
      explanation:
        "Sort the array first. For each element nums[i], use two pointers (left and right) to find two numbers that sum to -nums[i]. Skip duplicates to avoid repeated triplets. Adjust pointers based on whether the sum is too small or too large.",
    },
  },
  {
    id: 132,
    status: false,
    star: false,
    problem: "Container With Most Water",
    leetcodeLink: "https://leetcode.com/problems/container-with-most-water/",
    difficulty: "Medium",
    description:
      "Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i are at (i, 0) and (i, ai). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
      },
      {
        input: "height = [1,1]",
        output: "1",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int maxArea(int[] height) {
    int maxWater = 0;
    for (int i = 0; i < height.length; i++) {
      for (int j = i + 1; j < height.length; j++) {
        int water = Math.min(height[i], height[j]) * (j - i);
        maxWater = Math.max(maxWater, water);
      }
    }
    return maxWater;
  }
}`,
        python: `class Solution:
  def maxArea(self, height: List[int]) -> int:
    max_water = 0
    for i in range(len(height)):
      for j in range(i + 1, len(height)):
        water = min(height[i], height[j]) * (j - i)
        max_water = max(max_water, water)
    return max_water`,
        cpp: `class Solution {
public:
  int maxArea(vector<int>& height) {
    int maxWater = 0;
    for (int i = 0; i < height.size(); i++) {
      for (int j = i + 1; j < height.size(); j++) {
        int water = min(height[i], height[j]) * (j - i);
        maxWater = max(maxWater, water);
      }
    }
    return maxWater;
  }
};`,
      },
      complexity: {
        time: "O(n^2) for checking all pairs of lines",
        space: "O(1) for constant extra space",
      },
      explanation:
        "For each pair of lines, calculate the area of the container formed by taking the minimum height and multiplying by the distance between them. Track the maximum area found.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int maxArea(int[] height) {
    int maxWater = 0;
    int left = 0, right = height.length - 1;
    while (left < right) {
      int water = Math.min(height[left], height[right]) * (right - left);
      maxWater = Math.max(maxWater, water);
      if (height[left] < height[right]) {
        left++;
      } else {
        right--;
      }
    }
    return maxWater;
  }
}`,
        python: `class Solution:
  def maxArea(self, height: List[int]) -> int:
    max_water = 0
    left, right = 0, len(height) - 1
    while left < right:
      water = min(height[left], height[right]) * (right - left)
      max_water = max(max_water, water)
      if height[left] < height[right]:
        left += 1
      else:
        right -= 1
    return max_water`,
        cpp: `class Solution {
public:
  int maxArea(vector<int>& height) {
    int maxWater = 0;
    int left = 0, right = height.size() - 1;
    while (left < right) {
      int water = min(height[left], height[right]) * (right - left);
      maxWater = max(maxWater, water);
      if (height[left] < height[right]) {
        left++;
      } else {
        right--;
      }
    }
    return maxWater;
  }
};`,
      },
      complexity: {
        time: "O(n) for a single pass with two pointers",
        space: "O(1) for constant extra space",
      },
      explanation:
        "Use two pointers starting from the ends of the array. Calculate the area between them and update the maximum. Move the pointer at the shorter line inward, as the area is limited by the shorter height, and moving the taller one won’t increase the area.",
    },
  },
  {
    id: 133,
    status: false,
    star: false,
    problem: "Trapping Rain Water",
    leetcodeLink: "https://leetcode.com/problems/trapping-rain-water/",
    difficulty: "Hard",
    description:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int trap(int[] height) {
    int totalWater = 0;
    for (int i = 0; i < height.length; i++) {
      int leftMax = 0, rightMax = 0;
      for (int j = 0; j < i; j++) {
        leftMax = Math.max(leftMax, height[j]);
      }
      for (int j = i + 1; j < height.length; j++) {
        rightMax = Math.max(rightMax, height[j]);
      }
      int water = Math.min(leftMax, rightMax) - height[i];
      if (water > 0) {
        totalWater += water;
      }
    }
    return totalWater;
  }
}`,
        python: `class Solution:
  def trap(self, height: List[int]) -> int:
    total_water = 0
    for i in range(len(height)):
      left_max = max(height[:i] + [0])
      right_max = max(height[i + 1:] + [0])
      water = min(left_max, right_max) - height[i]
      if water > 0:
        total_water += water
    return total_water`,
        cpp: `class Solution {
public:
  int trap(vector<int>& height) {
    int totalWater = 0;
    for (int i = 0; i < height.size(); i++) {
      int leftMax = 0, rightMax = 0;
      for (int j = 0; j < i; j++) {
        leftMax = max(leftMax, height[j]);
      }
      for (int j = i + 1; j < height.size(); j++) {
        rightMax = max(rightMax, height[j]);
      }
      int water = min(leftMax, rightMax) - height[i];
      if (water > 0) {
        totalWater += water;
      }
    }
    return totalWater;
  }
};`,
      },
      complexity: {
        time: "O(n^2) for finding max heights for each position",
        space: "O(1) for constant extra space",
      },
      explanation:
        "For each position, find the maximum height to its left and right. The water trapped at that position is the minimum of these max heights minus the current height, if positive. Sum all such water amounts.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int trap(int[] height) {
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0, totalWater = 0;
    while (left < right) {
      if (height[left] < height[right]) {
        if (height[left] >= leftMax) {
          leftMax = height[left];
        } else {
          totalWater += leftMax - height[left];
        }
        left++;
      } else {
        if (height[right] >= rightMax) {
          rightMax = height[right];
        } else {
          totalWater += rightMax - height[right];
        }
        right--;
      }
    }
    return totalWater;
  }
}`,
        python: `class Solution:
  def trap(self, height: List[int]) -> int:
    left, right = 0, len(height) - 1
    left_max = right_max = total_water = 0
    while left < right:
      if height[left] < height[right]:
        if height[left] >= left_max:
          left_max = height[left]
        else:
          total_water += left_max - height[left]
        left += 1
      else:
        if height[right] >= right_max:
          right_max = height[right]
        else:
          total_water += right_max - height[right]
        right -= 1
    return total_water`,
        cpp: `class Solution {
public:
  int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, totalWater = 0;
    while (left < right) {
      if (height[left] < height[right]) {
        if (height[left] >= leftMax) {
          leftMax = height[left];
        } else {
          totalWater += leftMax - height[left];
        }
        left++;
      } else {
        if (height[right] >= rightMax) {
          rightMax = height[right];
        } else {
          totalWater += rightMax - height[right];
        }
        right--;
      }
    }
    return totalWater;
  }
};`,
      },
      complexity: {
        time: "O(n) for a single pass with two pointers",
        space: "O(1) for constant extra space",
      },
      explanation:
        "Use two pointers to track the left and right boundaries and maintain the maximum heights seen from both sides. Process the smaller height first, updating the corresponding max height and adding trapped water if the current height is less than the max.",
    },
  },
];
