// src/data/binarySearch.ts
import { Question } from "../types/Question";

export const binarySearchQuestions: Question[] = [
  // ==================== EASY ====================
  {
    id: 28,
    status: false,
    star: false,
    problem: "Binary Search",
    leetcodeLink: "https://leetcode.com/problems/binary-search/",
    difficulty: "Easy",
    description:
      "Given an array of integers nums sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
    ],
    bruteForce: {
      code: {
        java: `public int search(int[] nums, int target) {
  for (int i = 0; i < nums.length; i++) {
    if (nums[i] == target) return i;
  }
  return -1;
}`,
        python: `def search(nums, target):
  for i in range(len(nums)):
    if nums[i] == target:
      return i
  return -1`,
        cpp: `int search(vector<int>& nums, int target) {
  for (int i = 0; i < nums.size(); i++) {
    if (nums[i] == target) return i;
  }
  return -1;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      explanation: "Linear search through the array until target is found.",
    },
    optimal: {
      code: {
        java: `public int search(int[] nums, int target) {
  int left = 0, right = nums.length - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (nums[mid] == target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
        python: `def search(nums, target):
  left, right = 0, len(nums) - 1
  while left <= right:
    mid = (left + right) // 2
    if nums[mid] == target:
      return mid
    if nums[mid] < target:
      left = mid + 1
    else:
      right = mid - 1
  return -1`,
        cpp: `int search(vector<int>& nums, int target) {
  int left = 0, right = nums.size() - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (nums[mid] == target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      },
      complexity: {
        time: "O(log n)",
        space: "O(1)",
      },
      explanation:
        "Standard binary search by repeatedly dividing the search interval in half.",
    },
  },

  // ==================== MEDIUM ====================
  {
    id: 29,
    status: false,
    star: false,
    problem: "Search a 2D Matrix",
    leetcodeLink: "https://leetcode.com/problems/search-a-2d-matrix/",
    difficulty: "Medium",
    description:
      "Write an efficient algorithm that searches for a value in an m x n matrix where each row is sorted in ascending order and the first integer of each row is greater than the last integer of the previous row.",
    examples: [
      {
        input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
        output: "true",
      },
      {
        input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
        output: "false",
      },
    ],
    bruteForce: {
      code: {
        java: `public boolean searchMatrix(int[][] matrix, int target) {
  for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] == target) return true;
    }
  }
  return false;
}`,
        python: `def searchMatrix(matrix, target):
  for row in matrix:
    for num in row:
      if num == target:
        return True
  return False`,
        cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {
  for (auto& row : matrix) {
    for (int num : row) {
      if (num == target) return true;
    }
  }
  return false;
}`,
      },
      complexity: {
        time: "O(m*n)",
        space: "O(1)",
      },
      explanation: "Linear search through all elements in the matrix.",
    },
    optimal: {
      code: {
        java: `public boolean searchMatrix(int[][] matrix, int target) {
  int m = matrix.length, n = matrix[0].length;
  int left = 0, right = m * n - 1;
  
  while (left <= right) {
    int mid = left + (right - left) / 2;
    int midValue = matrix[mid / n][mid % n];
    
    if (midValue == target) return true;
    if (midValue < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return false;
}`,
        python: `def searchMatrix(matrix, target):
  m, n = len(matrix), len(matrix[0])
  left, right = 0, m * n - 1
  
  while left <= right:
    mid = (left + right) // 2
    mid_value = matrix[mid // n][mid % n]
    if mid_value == target:
      return True
    if mid_value < target:
      left = mid + 1
    else:
      right = mid - 1
  return False`,
        cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {
  int m = matrix.size(), n = matrix[0].size();
  int left = 0, right = m * n - 1;
  
  while (left <= right) {
    int mid = left + (right - left) / 2;
    int midValue = matrix[mid / n][mid % n];
    
    if (midValue == target) return true;
    if (midValue < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return false;
}`,
      },
      complexity: {
        time: "O(log(m*n))",
        space: "O(1)",
      },
      explanation:
        "Treat the 2D matrix as a 1D sorted array and perform binary search.",
    },
  },
  {
    id: 30,
    status: false,
    star: false,
    problem: "Koko Eating Bananas",
    leetcodeLink: "https://leetcode.com/problems/koko-eating-bananas/",
    difficulty: "Medium",
    description:
      "Koko loves bananas but can only eat k bananas per hour. Given piles of bananas and h hours, return the minimum integer k such that she can eat all the bananas within h hours.",
    examples: [
      { input: "piles = [3,6,7,11], h = 8", output: "4" },
      { input: "piles = [30,11,23,4,20], h = 5", output: "30" },
    ],
    bruteForce: {
      code: {
        java: `public int minEatingSpeed(int[] piles, int h) {
  int max = Arrays.stream(piles).max().getAsInt();
  for (int k = 1; k <= max; k++) {
    int hours = 0;
    for (int pile : piles) {
      hours += Math.ceil((double)pile / k);
    }
    if (hours <= h) return k;
  }
  return max;
}`,
        python: `def minEatingSpeed(piles, h):
  max_pile = max(piles)
  for k in range(1, max_pile + 1):
    hours = sum((pile + k - 1) // k for pile in piles)
    if hours <= h:
      return k
  return max_pile`,
        cpp: `int minEatingSpeed(vector<int>& piles, int h) {
  int max_pile = *max_element(piles.begin(), piles.end());
  for (int k = 1; k <= max_pile; k++) {
    int hours = 0;
    for (int pile : piles) {
      hours += ceil((double)pile / k);
    }
    if (hours <= h) return k;
  }
  return max_pile;
}`,
      },
      complexity: {
        time: "O(n * m) where m is max pile size",
        space: "O(1)",
      },
      explanation: "Try every possible eating speed from 1 to max pile size.",
    },
    optimal: {
      code: {
        java: `public int minEatingSpeed(int[] piles, int h) {
  int left = 1;
  int right = Arrays.stream(piles).max().getAsInt();
  
  while (left < right) {
    int mid = left + (right - left) / 2;
    int hours = 0;
    for (int pile : piles) {
      hours += Math.ceil((double)pile / mid);
    }
    if (hours <= h) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  
  return left;
}`,
        python: `def minEatingSpeed(piles, h):
  left, right = 1, max(piles)
  
  while left < right:
    mid = (left + right) // 2
    hours = sum((pile + mid - 1) // mid for pile in piles)
    if hours <= h:
      right = mid
    else:
      left = mid + 1
  return left`,
        cpp: `int minEatingSpeed(vector<int>& piles, int h) {
  int left = 1;
  int right = *max_element(piles.begin(), piles.end());
  
  while (left < right) {
    int mid = left + (right - left) / 2;
    int hours = 0;
    for (int pile : piles) {
      hours += ceil((double)pile / mid);
    }
    if (hours <= h) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  
  return left;
}`,
      },
      complexity: {
        time: "O(n log m) where m is max pile size",
        space: "O(1)",
      },
      explanation:
        "Binary search between 1 and max pile size to find minimum valid k.",
    },
  },
  {
    id: 31,
    status: false,
    star: false,
    problem: "Find Minimum In Rotated Sorted Array",
    leetcodeLink:
      "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    difficulty: "Medium",
    description:
      "Given a sorted rotated array of unique elements, return the minimum element.",
    examples: [
      { input: "nums = [3,4,5,1,2]", output: "1" },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0" },
    ],
    bruteForce: {
      code: {
        java: `public int findMin(int[] nums) {
  int min = nums[0];
  for (int num : nums) {
    if (num < min) min = num;
  }
  return min;
}`,
        python: `def findMin(nums):
  return min(nums)`,
        cpp: `int findMin(vector<int>& nums) {
  return *min_element(nums.begin(), nums.end());
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      explanation: "Linear scan through the array to find minimum.",
    },
    optimal: {
      code: {
        java: `public int findMin(int[] nums) {
  int left = 0, right = nums.length - 1;
  
  while (left < right) {
    int mid = left + (right - left) / 2;
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return nums[left];
}`,
        python: `def findMin(nums):
  left, right = 0, len(nums) - 1
  while left < right:
    mid = (left + right) // 2
    if nums[mid] > nums[right]:
      left = mid + 1
    else:
      right = mid
  return nums[left]`,
        cpp: `int findMin(vector<int>& nums) {
  int left = 0, right = nums.size() - 1;
  
  while (left < right) {
    int mid = left + (right - left) / 2;
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return nums[left];
}`,
      },
      complexity: {
        time: "O(log n)",
        space: "O(1)",
      },
      explanation:
        "Binary search to find the pivot point where rotation occurs.",
    },
  },
  {
    id: 32,
    status: false,
    star: false,
    problem: "Search In Rotated Sorted Array",
    leetcodeLink:
      "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    difficulty: "Medium",
    description:
      "Given a sorted rotated array of distinct integers and a target value, return the index of target if found, or -1 if not found.",
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
    ],
    bruteForce: {
      code: {
        java: `public int search(int[] nums, int target) {
  for (int i = 0; i < nums.length; i++) {
    if (nums[i] == target) return i;
  }
  return -1;
}`,
        python: `def search(nums, target):
  for i in range(len(nums)):
    if nums[i] == target:
      return i
  return -1`,
        cpp: `int search(vector<int>& nums, int target) {
  for (int i = 0; i < nums.size(); i++) {
    if (nums[i] == target) return i;
  }
  return -1;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      explanation: "Linear search through the array.",
    },
    optimal: {
      code: {
        java: `public int search(int[] nums, int target) {
  int left = 0, right = nums.length - 1;
  
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (nums[mid] == target) return mid;
    
    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Right half is sorted
    else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  return -1;
}`,
        python: `def search(nums, target):
  left, right = 0, len(nums) - 1
  
  while left <= right:
    mid = (left + right) // 2
    if nums[mid] == target:
      return mid
    
    # Left half is sorted
    if nums[left] <= nums[mid]:
      if nums[left] <= target < nums[mid]:
        right = mid - 1
      else:
        left = mid + 1
    # Right half is sorted
    else:
      if nums[mid] < target <= nums[right]:
        left = mid + 1
      else:
        right = mid - 1
  return -1`,
        cpp: `int search(vector<int>& nums, int target) {
  int left = 0, right = nums.size() - 1;
  
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (nums[mid] == target) return mid;
    
    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Right half is sorted
    else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  return -1;
}`,
      },
      complexity: {
        time: "O(log n)",
        space: "O(1)",
      },
      explanation:
        "Modified binary search that checks which half is sorted and if target lies within that range.",
    },
  },
  {
    id: 33,
    status: false,
    star: false,
    problem: "Time Based Key Value Store",
    leetcodeLink: "https://leetcode.com/problems/time-based-key-value-store/",
    difficulty: "Medium",
    description:
      "Design a time-based key-value store that can store multiple values for the same key at different timestamps and retrieve the value with the largest timestamp less than or equal to the given timestamp.",
    examples: [
      {
        input: `["TimeMap","set","get","get","set","get","get"]\n[[],["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],["foo",4],["foo",5]]`,
        output: `[null,null,"bar","bar",null,"bar2","bar2"]`,
      },
    ],
    bruteForce: {
      code: {
        java: `class TimeMap {
  Map<String, List<Pair<Integer, String>>> map;
  
  public TimeMap() {
    map = new HashMap<>();
  }
  
  public void set(String key, String value, int timestamp) {
    if (!map.containsKey(key)) {
      map.put(key, new ArrayList<>());
    }
    map.get(key).add(new Pair(timestamp, value));
  }
  
  public String get(String key, int timestamp) {
    if (!map.containsKey(key)) return "";
    
    List<Pair<Integer, String>> list = map.get(key);
    for (int i = list.size() - 1; i >= 0; i--) {
      if (list.get(i).getKey() <= timestamp) {
        return list.get(i).getValue();
      }
    }
    return "";
  }
}`,
        python: `class TimeMap:
  def __init__(self):
    self.map = {}
  
  def set(self, key, value, timestamp):
    if key not in self.map:
      self.map[key] = []
    self.map[key].append((timestamp, value))
  
  def get(self, key, timestamp):
    if key not in self.map:
      return ""
    for t, val in reversed(self.map[key]):
      if t <= timestamp:
        return val
    return ""`,
        cpp: `class TimeMap {
  unordered_map<string, vector<pair<int, string>>> map;
public:
  TimeMap() {}
  
  void set(string key, string value, int timestamp) {
    map[key].emplace_back(timestamp, value);
  }
  
  string get(string key, int timestamp) {
    if (map.find(key) == map.end()) return "";
    auto& entries = map[key];
    for (auto it = entries.rbegin(); it != entries.rend(); it++) {
      if (it->first <= timestamp) {
        return it->second;
      }
    }
    return "";
  }
};`,
      },
      complexity: {
        time: "O(1) for set, O(n) for get",
        space: "O(n)",
      },
      explanation:
        "Store values in a list and perform linear search for get operations.",
    },
    optimal: {
      code: {
        java: `class TimeMap {
  Map<String, List<Pair<Integer, String>>> map;
  
  public TimeMap() {
    map = new HashMap<>();
  }
  
  public void set(String key, String value, int timestamp) {
    if (!map.containsKey(key)) {
      map.put(key, new ArrayList<>());
    }
    map.get(key).add(new Pair(timestamp, value));
  }
  
  public String get(String key, int timestamp) {
    if (!map.containsKey(key)) return "";
    
    List<Pair<Integer, String>> list = map.get(key);
    int left = 0, right = list.size() - 1;
    String result = "";
    
    while (left <= right) {
      int mid = left + (right - left) / 2;
      if (list.get(mid).getKey() <= timestamp) {
        result = list.get(mid).getValue();
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return result;
  }
}`,
        python: `class TimeMap:
  def __init__(self):
    self.map = {}
  
  def set(self, key, value, timestamp):
    if key not in self.map:
      self.map[key] = []
    self.map[key].append((timestamp, value))
  
  def get(self, key, timestamp):
    if key not in self.map:
      return ""
    entries = self.map[key]
    left, right = 0, len(entries) - 1
    result = ""
    while left <= right:
      mid = (left + right) // 2
      if entries[mid][0] <= timestamp:
        result = entries[mid][1]
        left = mid + 1
      else:
        right = mid - 1
    return result`,
        cpp: `class TimeMap {
  unordered_map<string, vector<pair<int, string>>> map;
public:
  TimeMap() {}
  
  void set(string key, string value, int timestamp) {
    map[key].emplace_back(timestamp, value);
  }
  
  string get(string key, int timestamp) {
    if (map.find(key) == map.end()) return "";
    auto& entries = map[key];
    auto it = upper_bound(entries.begin(), entries.end(), 
      make_pair(timestamp, ""), 
      [](const pair<int, string>& a, const pair<int, string>& b) {
        return a.first < b.first;
      });
    if (it == entries.begin()) return "";
    return (--it)->second;
  }
};`,
      },
      complexity: {
        time: "O(1) for set, O(log n) for get",
        space: "O(n)",
      },
      explanation:
        "Use binary search to find the most recent timestamp <= target timestamp.",
    },
  },

  // ==================== HARD ====================
  {
    id: 34,
    status: false,
    star: false,
    problem: "Median of Two Sorted Arrays",
    leetcodeLink: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    difficulty: "Hard",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5" },
    ],
    bruteForce: {
      code: {
        java: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
  int[] merged = new int[nums1.length + nums2.length];
  System.arraycopy(nums1, 0, merged, 0, nums1.length);
  System.arraycopy(nums2, 0, merged, nums1.length, nums2.length);
  Arrays.sort(merged);
  
  int n = merged.length;
  if (n % 2 == 0) {
    return (merged[n/2 - 1] + merged[n/2]) / 2.0;
  } else {
    return merged[n/2];
  }
}`,
        python: `def findMedianSortedArrays(nums1, nums2):
  merged = sorted(nums1 + nums2)
  n = len(merged)
  if n % 2 == 0:
    return (merged[n//2 - 1] + merged[n//2]) / 2
  else:
    return merged[n//2]`,
        cpp: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
  vector<int> merged(nums1.begin(), nums1.end());
  merged.insert(merged.end(), nums2.begin(), nums2.end());
  sort(merged.begin(), merged.end());
  
  int n = merged.size();
  if (n % 2 == 0) {
    return (merged[n/2 - 1] + merged[n/2]) / 2.0;
  } else {
    return merged[n/2];
  }
}`,
      },
      complexity: {
        time: "O((m+n) log(m+n))",
        space: "O(m+n)",
      },
      explanation: "Merge both arrays, sort them, then find median.",
    },
    optimal: {
      code: {
        java: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }
  
  int x = nums1.length, y = nums2.length;
  int low = 0, high = x;
  
  while (low <= high) {
    int partitionX = (low + high) / 2;
    int partitionY = (x + y + 1) / 2 - partitionX;
    
    int maxLeftX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
    int minRightX = (partitionX == x) ? Integer.MAX_VALUE : nums1[partitionX];
    
    int maxLeftY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
    int minRightY = (partitionY == y) ? Integer.MAX_VALUE : nums2[partitionY];
    
    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      if ((x + y) % 2 == 0) {
        return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2.0;
      } else {
        return Math.max(maxLeftX, maxLeftY);
      }
    } else if (maxLeftX > minRightY) {
      high = partitionX - 1;
    } else {
      low = partitionX + 1;
    }
  }
  
  throw new IllegalArgumentException();
}`,
        python: `def findMedianSortedArrays(nums1, nums2):
  if len(nums1) > len(nums2):
    nums1, nums2 = nums2, nums1
  
  x, y = len(nums1), len(nums2)
  low, high = 0, x
  
  while low <= high:
    partitionX = (low + high) // 2
    partitionY = (x + y + 1) // 2 - partitionX
    
    maxLeftX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
    minRightX = float('inf') if partitionX == x else nums1[partitionX]
    
    maxLeftY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]
    minRightY = float('inf') if partitionY == y else nums2[partitionY]
    
    if maxLeftX <= minRightY and maxLeftY <= minRightX:
      if (x + y) % 2 == 0:
        return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2
      else:
        return max(maxLeftX, maxLeftY)
    elif maxLeftX > minRightY:
      high = partitionX - 1
    else:
      low = partitionX + 1
  
  raise ValueError("Input arrays are not sorted")`,
        cpp: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
  if (nums1.size() > nums2.size()) {
    return findMedianSortedArrays(nums2, nums1);
  }
  
  int x = nums1.size(), y = nums2.size();
  int low = 0, high = x;
  
  while (low <= high) {
    int partitionX = (low + high) / 2;
    int partitionY = (x + y + 1) / 2 - partitionX;
    
    int maxLeftX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];
    int minRightX = (partitionX == x) ? INT_MAX : nums1[partitionX];
    
    int maxLeftY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];
    int minRightY = (partitionY == y) ? INT_MAX : nums2[partitionY];
    
    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      if ((x + y) % 2 == 0) {
        return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2.0;
      } else {
        return max(maxLeftX, maxLeftY);
      }
    } else if (maxLeftX > minRightY) {
      high = partitionX - 1;
    } else {
      low = partitionX + 1;
    }
  }
  
  throw invalid_argument("Input arrays are not sorted");
}`,
      },
      complexity: {
        time: "O(log(min(m,n)))",
        space: "O(1)",
      },
      explanation:
        "Binary search on the smaller array to find the correct partition.",
    },
  },
];
