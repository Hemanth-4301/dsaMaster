// src/data/bit.ts
import { Question } from "../types/Question";

export const bitQuestions: Question[] = [
  // ==================== EASY ====================
  {
    id: 123,
    status: false,
    star: false,
    problem: "Single Number",
    leetcodeLink: "https://leetcode.com/problems/single-number/",
    difficulty: "Easy",
    description:
      "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
    examples: [
      {
        input: "nums = [2,2,1]",
        output: "1",
      },
      {
        input: "nums = [4,1,2,1,2]",
        output: "4",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int singleNumber(int[] nums) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int num : nums) {
      map.put(num, map.getOrDefault(num, 0) + 1);
    }
    for (int num : nums) {
      if (map.get(num) == 1) {
        return num;
      }
    }
    return -1;
  }
}`,
        python: `class Solution:
  def singleNumber(self, nums: List[int]) -> int:
    count = {}
    for num in nums:
      count[num] = count.get(num, 0) + 1
    for num in nums:
      if count[num] == 1:
        return num
    return -1`,
        cpp: `class Solution {
public:
  int singleNumber(vector<int>& nums) {
    unordered_map<int, int> map;
    for (int num : nums) {
      map[num]++;
    }
    for (int num : nums) {
      if (map[num] == 1) {
        return num;
      }
    }
    return -1;
  }
};`,
      },
      complexity: {
        time: "O(n) for iterating through the array twice",
        space: "O(n) for storing the frequency map",
      },
      explanation:
        "Use a hash map to count the occurrences of each number. Then, iterate through the array to find the number with a count of 1.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) {
      result ^= num;
    }
    return result;
  }
}`,
        python: `class Solution:
  def singleNumber(self, nums: List[int]) -> int:
    result = 0
    for num in nums:
      result ^= num
    return result`,
        cpp: `class Solution {
public:
  int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int num : nums) {
      result ^= num;
    }
    return result;
  }
};`,
      },
      complexity: {
        time: "O(n) for a single pass through the array",
        space: "O(1) for storing only the result",
      },
      explanation:
        "Use the XOR operation to cancel out pairs of numbers. Since XOR is commutative and associative, all pairs will cancel out (a ^ a = 0), leaving the single number (a ^ 0 = a).",
    },
  },
  {
    id: 124,
    status: false,
    star: false,
    problem: "Number of 1 Bits",
    leetcodeLink: "https://leetcode.com/problems/number-of-1-bits/",
    difficulty: "Easy",
    description:
      "Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).",
    examples: [
      {
        input: "n = 00000000000000000000000000001011",
        output: "3",
      },
      {
        input: "n = 00000000000000000000000010000000",
        output: "1",
      },
    ],
    bruteForce: {
      code: {
        java: `public class Solution {
  public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
      count += n & 1;
      n = n >>> 1;
    }
    return count;
  }
}`,
        python: `class Solution:
  def hammingWeight(self, n: int) -> int:
    count = 0
    while n:
      count += n & 1
      n = n >> 1
    return count`,
        cpp: `class Solution {
public:
  int hammingWeight(uint32_t n) {
    int count = 0;
    while (n) {
      count += n & 1;
      n = n >> 1;
    }
    return count;
  }
};`,
      },
      complexity: {
        time: "O(32) for checking each bit in a 32-bit integer",
        space: "O(1) for storing only the count",
      },
      explanation:
        "Iterate through each bit of the number, check if it's set (1), and count the number of set bits.",
    },
    optimal: {
      code: {
        java: `public class Solution {
  public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
      n = n & (n - 1);
      count++;
    }
    return count;
  }
}`,
        python: `class Solution:
  def hammingWeight(self, n: int) -> int:
    count = 0
    while n:
      n = n & (n - 1)
      count += 1
    return count`,
        cpp: `class Solution {
public:
  int hammingWeight(uint32_t n) {
    int count = 0;
    while (n) {
      n = n & (n - 1);
      count++;
    }
    return count;
  }
};`,
      },
      complexity: {
        time: "O(k) where k is the number of set bits",
        space: "O(1) for storing only the count",
      },
      explanation:
        "Use Brian Kernighan's algorithm: n & (n - 1) clears the least significant set bit. Repeat until n becomes 0, counting the number of operations.",
    },
  },
  {
    id: 125,
    status: false,
    star: false,
    problem: "Counting Bits",
    leetcodeLink: "https://leetcode.com/problems/counting-bits/",
    difficulty: "Easy",
    description:
      "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.",
    examples: [
      {
        input: "n = 2",
        output: "[0,1,1]",
      },
      {
        input: "n = 5",
        output: "[0,1,1,2,1,2]",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int[] countBits(int n) {
    int[] ans = new int[n + 1];
    for (int i = 0; i <= n; i++) {
      ans[i] = countOnes(i);
    }
    return ans;
  }
  
  private int countOnes(int num) {
    int count = 0;
    while (num != 0) {
      count += num & 1;
      num = num >>> 1;
    }
    return count;
  }
}`,
        python: `class Solution:
  def countBits(self, n: int) -> List[int]:
    ans = []
    for i in range(n + 1):
      ans.append(bin(i).count('1'))
    return ans`,
        cpp: `class Solution {
public:
  vector<int> countBits(int n) {
    vector<int> ans(n + 1);
    for (int i = 0; i <= n; i++) {
      ans[i] = __builtin_popcount(i);
    }
    return ans;
  }
};`,
      },
      complexity: {
        time: "O(n * 32) for counting bits in each number up to n",
        space: "O(n) for the output array",
      },
      explanation:
        "For each number from 0 to n, count the number of 1's in its binary representation using a helper function or built-in method.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int[] countBits(int n) {
    int[] ans = new int[n + 1];
    for (int i = 1; i <= n; i++) {
      ans[i] = ans[i & (i - 1)] + 1;
    }
    return ans;
  }
}`,
        python: `class Solution:
  def countBits(self, n: int) -> List[int]:
    ans = [0] * (n + 1)
    for i in range(1, n + 1):
      ans[i] = ans[i & (i - 1)] + 1
    return ans`,
        cpp: `class Solution {
public:
  vector<int> countBits(int n) {
    vector<int> ans(n + 1);
    for (int i = 1; i <= n; i++) {
      ans[i] = ans[i & (i - 1)] + 1;
    }
    return ans;
  }
};`,
      },
      complexity: {
        time: "O(n) for a single pass through the array",
        space: "O(n) for the output array",
      },
      explanation:
        "Use dynamic programming: ans[i] = ans[i & (i - 1)] + 1. The expression i & (i - 1) clears the least significant set bit, so ans[i] is one more than the count for the cleared bit.",
    },
  },
  {
    id: 126,
    status: false,
    star: false,
    problem: "Reverse Bits",
    leetcodeLink: "https://leetcode.com/problems/reverse-bits/",
    difficulty: "Easy",
    description: "Reverse bits of a given 32 bits unsigned integer.",
    examples: [
      {
        input: "n = 00000010100101000001111010011100",
        output: "964176192 (00111001011110000010100101000000)",
      },
      {
        input: "n = 11111111111111111111111111111101",
        output: "3221225471 (10111111111111111111111111111111)",
      },
    ],
    bruteForce: {
      code: {
        java: `public class Solution {
  public int reverseBits(int n) {
    int result = 0;
    for (int i = 0; i < 32; i++) {
      result = (result << 1) | (n & 1);
      n = n >>> 1;
    }
    return result;
  }
}`,
        python: `class Solution:
  def reverseBits(self, n: int) -> int:
    result = 0
    for _ in range(32):
      result = (result << 1) | (n & 1)
      n = n >> 1
    return result`,
        cpp: `class Solution {
public:
  uint32_t reverseBits(uint32_t n) {
    uint32_t result = 0;
    for (int i = 0; i < 32; i++) {
      result = (result << 1) | (n & 1);
      n = n >> 1;
    }
    return result;
  }
};`,
      },
      complexity: {
        time: "O(32) for processing each bit",
        space: "O(1) for storing only the result",
      },
      explanation:
        "Iterate through each bit of the input number, extract the least significant bit, and append it to the result after shifting the result left.",
    },
    optimal: {
      code: {
        java: `public class Solution {
  public int reverseBits(int n) {
    n = (n >>> 16) | (n << 16);
    n = ((n & 0xff00ff00) >>> 8) | ((n & 0x00ff00ff) << 8);
    n = ((n & 0xf0f0f0f0) >>> 4) | ((n & 0x0f0f0f0f) << 4);
    n = ((n & 0xcccccccc) >>> 2) | ((n & 0x33333333) << 2);
    n = ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1);
    return n;
  }
}`,
        python: `class Solution:
  def reverseBits(self, n: int) -> int:
    n = (n >> 16) | (n << 16)
    n = ((n & 0xff00ff00) >> 8) | ((n & 0x00ff00ff) << 8)
    n = ((n & 0xf0f0f0f0) >> 4) | ((n & 0x0f0f0f0f) << 4)
    n = ((n & 0xcccccccc) >> 2) | ((n & 0x33333333) << 2)
    n = ((n & 0xaaaaaaaa) >> 1) | ((n & 0x55555555) << 1)
    return n`,
        cpp: `class Solution {
public:
  uint32_t reverseBits(uint32_t n) {
    n = (n >> 16) | (n << 16);
    n = ((n & 0xff00ff00) >> 8) | ((n & 0x00ff00ff) << 8);
    n = ((n & 0xf0f0f0f0) >> 4) | ((n & 0x0f0f0f0f) << 4);
    n = ((n & 0xcccccccc) >> 2) | ((n & 0x33333333) << 2);
    n = ((n & 0xaaaaaaaa) >> 1) | ((n & 0x55555555) << 1);
    return n;
  }
};`,
      },
      complexity: {
        time: "O(1) for fixed operations on 32-bit integer",
        space: "O(1) for in-place operations",
      },
      explanation:
        "Use divide and conquer to reverse bits in chunks: swap 16-bit halves, then 8-bit, 4-bit, 2-bit, and finally 1-bit chunks.",
    },
  },
  {
    id: 127,
    status: false,
    star: false,
    problem: "Missing Number",
    leetcodeLink: "https://leetcode.com/problems/missing-number/",
    difficulty: "Easy",
    description:
      "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    examples: [
      {
        input: "nums = [3,0,1]",
        output: "2",
      },
      {
        input: "nums = [0,1]",
        output: "2",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int missingNumber(int[] nums) {
    Arrays.sort(nums);
    for (int i = 0; i < nums.length; i++) {
      if (nums[i] != i) {
        return i;
      }
    }
    return nums.length;
  }
}`,
        python: `class Solution:
  def missingNumber(self, nums: List[int]) -> int:
    nums.sort()
    for i in range(len(nums)):
      if nums[i] != i:
        return i
    return len(nums)`,
        cpp: `class Solution {
public:
  int missingNumber(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    for (int i = 0; i < nums.size(); i++) {
      if (nums[i] != i) {
        return i;
      }
    }
    return nums.size();
  }
};`,
      },
      complexity: {
        time: "O(n log n) for sorting",
        space: "O(1) for in-place sorting (or O(n) if sorting is not in-place)",
      },
      explanation:
        "Sort the array and iterate through it to find the first index where nums[i] != i. If all indices match, the missing number is n.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int missingNumber(int[] nums) {
    int n = nums.length;
    int expectedSum = n * (n + 1) / 2;
    int actualSum = 0;
    for (int num : nums) {
      actualSum += num;
    }
    return expectedSum - actualSum;
  }
}`,
        python: `class Solution:
  def missingNumber(self, nums: List[int]) -> int:
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum`,
        cpp: `class Solution {
public:
  int missingNumber(vector<int>& nums) {
    int n = nums.size();
    int expectedSum = n * (n + 1) / 2;
    int actualSum = 0;
    for (int num : nums) {
      actualSum += num;
    }
    return expectedSum - actualSum;
  }
};`,
      },
      complexity: {
        time: "O(n) for calculating the sum",
        space: "O(1) for storing only the sums",
      },
      explanation:
        "Calculate the expected sum of numbers from 0 to n using the formula n*(n+1)/2. Subtract the actual sum of the array to find the missing number.",
    },
  },
  {
    id: 128,
    status: false,
    star: false,
    problem: "Sum of Two Integers",
    leetcodeLink: "https://leetcode.com/problems/sum-of-two-integers/",
    difficulty: "Medium",
    description:
      "Given two integers a and b, return the sum of the two integers without using the operators + and -.",
    examples: [
      {
        input: "a = 1, b = 2",
        output: "3",
      },
      {
        input: "a = 2, b = 3",
        output: "5",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int getSum(int a, int b) {
    while (b != 0) {
      int carry = a & b;
      a = a ^ b;
      b = carry << 1;
    }
    return a;
  }
}`,
        python: `class Solution:
  def getSum(self, a: int, b: int) -> int:
    while b != 0:
      carry = a & b
      a = a ^ b
      b = carry << 1
    return a`,
        cpp: `class Solution {
public:
  int getSum(int a, int b) {
    while (b != 0) {
      int carry = a & b;
      a = a ^ b;
      b = carry << 1;
    }
    return a;
  }
};`,
      },
      complexity: {
        time: "O(1) for fixed 32-bit integers",
        space: "O(1) for in-place operations",
      },
      explanation:
        "Use bitwise operations to simulate addition: XOR gives the sum without carry, AND gives the carry. Shift the carry left and repeat until there is no carry.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int getSum(int a, int b) {
    return b == 0 ? a : getSum(a ^ b, (a & b) << 1);
  }
}`,
        python: `class Solution:
  def getSum(self, a: int, b: int) -> int:
    return a if b == 0 else self.getSum(a ^ b, (a & b) << 1)`,
        cpp: `class Solution {
public:
  int getSum(int a, int b) {
    return b == 0 ? a : getSum(a ^ b, (a & b) << 1);
  }
};`,
      },
      complexity: {
        time: "O(1) for fixed 32-bit integers",
        space: "O(1) for tail recursion (or O(n) for non-tail recursion)",
      },
      explanation:
        "Recursive version of the bitwise addition: base case when b is 0, otherwise recursively compute sum and carry.",
    },
  },
  {
    id: 129,
    status: false,
    star: false,
    problem: "Reverse Integer",
    leetcodeLink: "https://leetcode.com/problems/reverse-integer/",
    difficulty: "Medium",
    description:
      "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
    examples: [
      {
        input: "x = 123",
        output: "321",
      },
      {
        input: "x = -123",
        output: "-321",
      },
      {
        input: "x = 120",
        output: "21",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int reverse(int x) {
    long reversed = 0;
    while (x != 0) {
      reversed = reversed * 10 + x % 10;
      x /= 10;
    }
    if (reversed > Integer.MAX_VALUE || reversed < Integer.MIN_VALUE) {
      return 0;
    }
    return (int) reversed;
  }
}`,
        python: `class Solution:
  def reverse(self, x: int) -> int:
    reversed_num = 0
    sign = -1 if x < 0 else 1
    x = abs(x)
    while x != 0:
      reversed_num = reversed_num * 10 + x % 10
      x = x // 10
    reversed_num *= sign
    if reversed_num < -2**31 or reversed_num > 2**31 - 1:
      return 0
    return reversed_num`,
        cpp: `class Solution {
public:
  int reverse(int x) {
    long reversed = 0;
    while (x != 0) {
      reversed = reversed * 10 + x % 10;
      x /= 10;
    }
    if (reversed > INT_MAX || reversed < INT_MIN) {
      return 0;
    }
    return reversed;
  }
};`,
      },
      complexity: {
        time: "O(log x) for processing each digit",
        space: "O(1) for storing only the reversed number",
      },
      explanation:
        "Iterate through each digit of the input number, build the reversed number digit by digit, and check for overflow before returning.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int reverse(int x) {
    int reversed = 0;
    while (x != 0) {
      int digit = x % 10;
      x /= 10;
      if (reversed > Integer.MAX_VALUE / 10 || (reversed == Integer.MAX_VALUE / 10 && digit > 7)) {
        return 0;
      }
      if (reversed < Integer.MIN_VALUE / 10 || (reversed == Integer.MIN_VALUE / 10 && digit < -8)) {
        return 0;
      }
      reversed = reversed * 10 + digit;
    }
    return reversed;
  }
}`,
        python: `class Solution:
  def reverse(self, x: int) -> int:
    reversed_num = 0
    sign = -1 if x < 0 else 1
    x = abs(x)
    while x != 0:
      digit = x % 10
      x = x // 10
      if reversed_num > (2**31 - 1) // 10 or (reversed_num == (2**31 - 1) // 10 and digit > 7):
        return 0
      if reversed_num < (-2**31) // 10 or (reversed_num == (-2**31) // 10 and digit < -8):
        return 0
      reversed_num = reversed_num * 10 + digit
    reversed_num *= sign
    return reversed_num`,
        cpp: `class Solution {
public:
  int reverse(int x) {
    int reversed = 0;
    while (x != 0) {
      int digit = x % 10;
      x /= 10;
      if (reversed > INT_MAX / 10 || (reversed == INT_MAX / 10 && digit > 7)) {
        return 0;
      }
      if (reversed < INT_MIN / 10 || (reversed == INT_MIN / 10 && digit < -8)) {
        return 0;
      }
      reversed = reversed * 10 + digit;
    }
    return reversed;
  }
};`,
      },
      complexity: {
        time: "O(log x) for processing each digit",
        space: "O(1) for storing only the reversed number",
      },
      explanation:
        "Iterate through each digit of the input number, build the reversed number digit by digit, and check for overflow before each multiplication and addition.",
    },
  },
];
