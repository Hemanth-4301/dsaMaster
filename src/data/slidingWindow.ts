// src/data/slidingWindow.ts
import { Question } from "../types/Question";

export const slidingWindowQuestions: Question[] = [
  // ==================== EASY ====================
  {
    id: 15,
    status: false,
    star: false,
    problem: "Best Time to Buy And Sell Stock",
    leetcodeLink:
      "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    difficulty: "Easy",
    description:
      "Given an array prices where prices[i] is the price of a given stock on the ith day, return the maximum profit you can achieve from one transaction.",
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5" },
      { input: "prices = [7,6,4,3,1]", output: "0" },
    ],
    bruteForce: {
      code: {
        java: `public int maxProfit(int[] prices) {
  int max = 0;
  for (int i = 0; i < prices.length; i++) {
    for (int j = i + 1; j < prices.length; j++) {
      max = Math.max(max, prices[j] - prices[i]);
    }
  }
  return max;
}`,
        python: `def maxProfit(prices):
  max_profit = 0
  for i in range(len(prices)):
    for j in range(i+1, len(prices)):
      max_profit = max(max_profit, prices[j]-prices[i])
  return max_profit`,
        cpp: `int maxProfit(vector<int>& prices) {
  int max_profit = 0;
  for (int i = 0; i < prices.size(); i++) {
    for (int j = i + 1; j < prices.size(); j++) {
      max_profit = max(max_profit, prices[j] - prices[i]);
    }
  }
  return max_profit;
}`,
      },
      complexity: {
        time: "O(n²)",
        space: "O(1)",
      },
      explanation: "Check all possible pairs of buy and sell dates.",
    },
    optimal: {
      code: {
        java: `public int maxProfit(int[] prices) {
  int minPrice = Integer.MAX_VALUE;
  int maxProfit = 0;
  
  for (int price : prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }
  return maxProfit;
}`,
        python: `def maxProfit(prices):
  min_price = float('inf')
  max_profit = 0
  for price in prices:
    if price < min_price:
      min_price = price
    else:
      max_profit = max(max_profit, price - min_price)
  return max_profit`,
        cpp: `int maxProfit(vector<int>& prices) {
  int min_price = INT_MAX;
  int max_profit = 0;
  for (int price : prices) {
    if (price < min_price) {
      min_price = price;
    } else {
      max_profit = max(max_profit, price - min_price);
    }
  }
  return max_profit;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      explanation:
        "Track minimum price and calculate potential profit at each day.",
    },
  },

  // ==================== MEDIUM ====================
  {
    id: 16,
    status: false,
    star: false,
    problem: "Longest Substring Without Repeating Characters",
    leetcodeLink:
      "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    difficulty: "Medium",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      { input: `s = "abcabcbb"`, output: "3" },
      { input: `s = "bbbbb"`, output: "1" },
    ],
    bruteForce: {
      code: {
        java: `public int lengthOfLongestSubstring(String s) {
  int max = 0;
  for (int i = 0; i < s.length(); i++) {
    Set<Character> set = new HashSet<>();
    int j = i;
    while (j < s.length() && !set.contains(s.charAt(j))) {
      set.add(s.charAt(j++));
    }
    max = Math.max(max, j - i);
  }
  return max;
}`,
        python: `def lengthOfLongestSubstring(s):
  max_len = 0
  for i in range(len(s)):
    seen = set()
    j = i
    while j < len(s) and s[j] not in seen:
      seen.add(s[j])
      j += 1
    max_len = max(max_len, j - i)
  return max_len`,
        cpp: `int lengthOfLongestSubstring(string s) {
  int max_len = 0;
  for (int i = 0; i < s.size(); i++) {
    unordered_set<char> set;
    int j = i;
    while (j < s.size() && set.find(s[j]) == set.end()) {
      set.insert(s[j++]);
    }
    max_len = max(max_len, j - i);
  }
  return max_len;
}`,
      },
      complexity: {
        time: "O(n²)",
        space: "O(min(n, m))",
      },
      explanation: "Check all substrings for duplicates.",
    },
    optimal: {
      code: {
        java: `public int lengthOfLongestSubstring(String s) {
  Map<Character, Integer> map = new HashMap<>();
  int max = 0;
  for (int left = 0, right = 0; right < s.length(); right++) {
    char c = s.charAt(right);
    if (map.containsKey(c)) {
      left = Math.max(left, map.get(c) + 1);
    }
    map.put(c, right);
    max = Math.max(max, right - left + 1);
  }
  return max;
}`,
        python: `def lengthOfLongestSubstring(s):
  char_map = {}
  left = max_len = 0
  for right, char in enumerate(s):
    if char in char_map:
      left = max(left, char_map[char] + 1)
    char_map[char] = right
    max_len = max(max_len, right - left + 1)
  return max_len`,
        cpp: `int lengthOfLongestSubstring(string s) {
  unordered_map<char, int> map;
  int max_len = 0;
  for (int left = 0, right = 0; right < s.size(); right++) {
    if (map.find(s[right]) != map.end()) {
      left = max(left, map[s[right]] + 1);
    }
    map[s[right]] = right;
    max_len = max(max_len, right - left + 1);
  }
  return max_len;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(min(n, m))",
      },
      explanation: "Sliding window with hashmap tracking last seen indices.",
    },
  },
  {
    id: 17,
    status: false,
    star: false,
    problem: "Longest Repeating Character Replacement",
    leetcodeLink:
      "https://leetcode.com/problems/longest-repeating-character-replacement/",
    difficulty: "Medium",
    description:
      "Given string s and integer k, return the length of the longest substring containing the same letter after at most k replacements.",
    examples: [
      { input: `s = "ABAB", k = 2`, output: "4" },
      { input: `s = "AABABBA", k = 1`, output: "4" },
    ],
    bruteForce: {
      code: {
        java: `public int characterReplacement(String s, int k) {
  int max = 0;
  for (int i = 0; i < s.length(); i++) {
    int[] count = new int[26];
    int currentMax = 0;
    for (int j = i; j < s.length(); j++) {
      count[s.charAt(j) - 'A']++;
      currentMax = Math.max(currentMax, count[s.charAt(j) - 'A']);
      if (j - i + 1 - currentMax > k) break;
      max = Math.max(max, j - i + 1);
    }
  }
  return max;
}`,
        python: `def characterReplacement(s, k):
  max_len = 0
  for i in range(len(s)):
    count = [0] * 26
    current_max = 0
    for j in range(i, len(s)):
      count[ord(s[j]) - ord('A')] += 1
      current_max = max(current_max, count[ord(s[j]) - ord('A')])
      if (j - i + 1 - current_max) > k:
        break
      max_len = max(max_len, j - i + 1)
  return max_len`,
        cpp: `int characterReplacement(string s, int k) {
  int max_len = 0;
  for (int i = 0; i < s.size(); i++) {
    int count[26] = {0};
    int current_max = 0;
    for (int j = i; j < s.size(); j++) {
      count[s[j] - 'A']++;
      current_max = max(current_max, count[s[j] - 'A']);
      if (j - i + 1 - current_max > k) break;
      max_len = max(max_len, j - i + 1);
    }
  }
  return max_len;
}`,
      },
      complexity: {
        time: "O(n²)",
        space: "O(1)",
      },
      explanation: "Check all substrings while counting character frequencies.",
    },
    optimal: {
      code: {
        java: `public int characterReplacement(String s, int k) {
  int[] count = new int[26];
  int maxCount = 0, maxLen = 0;
  int left = 0;
  
  for (int right = 0; right < s.length(); right++) {
    maxCount = Math.max(maxCount, ++count[s.charAt(right) - 'A']);
    while (right - left + 1 - maxCount > k) {
      count[s.charAt(left) - 'A']--;
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
        python: `def characterReplacement(s, k):
  count = [0] * 26
  max_count = max_len = left = 0
  
  for right in range(len(s)):
    count[ord(s[right]) - ord('A')] += 1
    max_count = max(max_count, count[ord(s[right]) - ord('A')])
    if (right - left + 1 - max_count) > k:
      count[ord(s[left]) - ord('A')] -= 1
      left += 1
    max_len = max(max_len, right - left + 1)
  return max_len`,
        cpp: `int characterReplacement(string s, int k) {
  int count[26] = {0};
  int max_count = 0, max_len = 0;
  int left = 0;
  
  for (int right = 0; right < s.size(); right++) {
    max_count = max(max_count, ++count[s[right] - 'A']);
    while (right - left + 1 - max_count > k) {
      count[s[left] - 'A']--;
      left++;
    }
    max_len = max(max_len, right - left + 1);
  }
  return max_len;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      explanation: "Sliding window tracking max frequency in current window.",
    },
  },
  {
    id: 18,
    status: false,
    star: false,
    problem: "Permutation In String",
    leetcodeLink: "https://leetcode.com/problems/permutation-in-string/",
    difficulty: "Medium",
    description:
      "Given two strings s1 and s2, return true if s2 contains a permutation of s1.",
    examples: [
      { input: `s1 = "ab", s2 = "eidbaooo"`, output: "true" },
      { input: `s1 = "ab", s2 = "eidboaoo"`, output: "false" },
    ],
    bruteForce: {
      code: {
        java: `public boolean checkInclusion(String s1, String s2) {
  if (s1.length() > s2.length()) return false;
  
  char[] s1Arr = s1.toCharArray();
  Arrays.sort(s1Arr);
  String sortedS1 = new String(s1Arr);
  
  for (int i = 0; i <= s2.length() - s1.length(); i++) {
    String window = s2.substring(i, i + s1.length());
    char[] windowArr = window.toCharArray();
    Arrays.sort(windowArr);
    if (sortedS1.equals(new String(windowArr))) {
      return true;
    }
  }
  return false;
}`,
        python: `def checkInclusion(s1, s2):
  if len(s1) > len(s2): return False
  s1_sorted = sorted(s1)
  for i in range(len(s2) - len(s1) + 1):
    if sorted(s2[i:i+len(s1)]) == s1_sorted:
      return True
  return False`,
        cpp: `bool checkInclusion(string s1, string s2) {
  if (s1.size() > s2.size()) return false;
  sort(s1.begin(), s1.end());
  for (int i = 0; i <= s2.size() - s1.size(); i++) {
    string window = s2.substr(i, s1.size());
    sort(window.begin(), window.end());
    if (s1 == window) return true;
  }
  return false;
}`,
      },
      complexity: {
        time: "O(n * m log m)",
        space: "O(m)",
      },
      explanation:
        "Sort s1 and check all windows in s2 by sorting and comparing.",
    },
    optimal: {
      code: {
        java: `public boolean checkInclusion(String s1, String s2) {
  if (s1.length() > s2.length()) return false;
  
  int[] s1Count = new int[26];
  int[] s2Count = new int[26];
  
  for (int i = 0; i < s1.length(); i++) {
    s1Count[s1.charAt(i) - 'a']++;
    s2Count[s2.charAt(i) - 'a']++;
  }
  
  int matches = 0;
  for (int i = 0; i < 26; i++) {
    if (s1Count[i] == s2Count[i]) matches++;
  }
  
  for (int i = s1.length(); i < s2.length(); i++) {
    if (matches == 26) return true;
    
    int left = s2.charAt(i - s1.length()) - 'a';
    s2Count[left]--;
    if (s2Count[left] == s1Count[left]) matches++;
    else if (s2Count[left] == s1Count[left] - 1) matches--;
    
    int right = s2.charAt(i) - 'a';
    s2Count[right]++;
    if (s2Count[right] == s1Count[right]) matches++;
    else if (s2Count[right] == s1Count[right] + 1) matches--;
  }
  
  return matches == 26;
}`,
        python: `def checkInclusion(s1, s2):
  if len(s1) > len(s2): return False
  
  s1_count = [0] * 26
  s2_count = [0] * 26
  
  for i in range(len(s1)):
    s1_count[ord(s1[i]) - ord('a')] += 1
    s2_count[ord(s2[i]) - ord('a')] += 1
  
  matches = 0
  for i in range(26):
    if s1_count[i] == s2_count[i]:
      matches += 1
  
  for i in range(len(s1), len(s2)):
    if matches == 26: return True
    
    left = ord(s2[i - len(s1)]) - ord('a')
    s2_count[left] -= 1
    if s2_count[left] == s1_count[left]:
      matches += 1
    elif s2_count[left] == s1_count[left] - 1:
      matches -= 1
    
    right = ord(s2[i]) - ord('a')
    s2_count[right] += 1
    if s2_count[right] == s1_count[right]:
      matches += 1
    elif s2_count[right] == s1_count[right] + 1:
      matches -= 1
  
  return matches == 26`,
        cpp: `bool checkInclusion(string s1, string s2) {
  if (s1.size() > s2.size()) return false;
  
  vector<int> s1Count(26, 0);
  vector<int> s2Count(26, 0);
  
  for (int i = 0; i < s1.size(); i++) {
    s1Count[s1[i] - 'a']++;
    s2Count[s2[i] - 'a']++;
  }
  
  int matches = 0;
  for (int i = 0; i < 26; i++) {
    if (s1Count[i] == s2Count[i]) matches++;
  }
  
  for (int i = s1.size(); i < s2.size(); i++) {
    if (matches == 26) return true;
    
    int left = s2[i - s1.size()] - 'a';
    s2Count[left]--;
    if (s2Count[left] == s1Count[left]) matches++;
    else if (s2Count[left] == s1Count[left] - 1) matches--;
    
    int right = s2[i] - 'a';
    s2Count[right]++;
    if (s2Count[right] == s1Count[right]) matches++;
    else if (s2Count[right] == s1Count[right] + 1) matches--;
  }
  
  return matches == 26;
}`,
      },
      complexity: {
        time: "O(n + m)",
        space: "O(1)",
      },
      explanation: "Sliding window with frequency count and matches tracking.",
    },
  },

  // ==================== HARD ====================
  {
    id: 19,
    status: false,
    star: false,
    problem: "Minimum Window Substring",
    leetcodeLink: "https://leetcode.com/problems/minimum-window-substring/",
    difficulty: "Hard",
    description:
      "Given two strings s and t, return the minimum window in s which will contain all characters in t.",
    examples: [
      { input: `s = "ADOBECODEBANC", t = "ABC"`, output: `"BANC"` },
      { input: `s = "a", t = "a"`, output: `"a"` },
    ],
    bruteForce: {
      code: {
        java: `public String minWindow(String s, String t) {
  if (s.length() < t.length()) return "";
  
  Map<Character, Integer> tMap = new HashMap<>();
  for (char c : t.toCharArray()) {
    tMap.put(c, tMap.getOrDefault(c, 0) + 1);
  }
  
  String minWindow = "";
  int minLength = Integer.MAX_VALUE;
  
  for (int i = 0; i < s.length(); i++) {
    for (int j = i + t.length(); j <= s.length(); j++) {
      String window = s.substring(i, j);
      if (containsAll(window, tMap)) {
        if (window.length() < minLength) {
          minLength = window.length();
          minWindow = window;
        }
        break;
      }
    }
  }
  
  return minWindow;
}

private boolean containsAll(String s, Map<Character, Integer> tMap) {
  Map<Character, Integer> sMap = new HashMap<>();
  for (char c : s.toCharArray()) {
    sMap.put(c, sMap.getOrDefault(c, 0) + 1);
  }
  
  for (Map.Entry<Character, Integer> entry : tMap.entrySet()) {
    if (sMap.getOrDefault(entry.getKey(), 0) < entry.getValue()) {
      return false;
    }
  }
  return true;
}`,
        python: `def minWindow(s, t):
  if len(t) > len(s): return ""
  
  t_count = {}
  for c in t:
    t_count[c] = t_count.get(c, 0) + 1
  
  min_window = ""
  min_length = float('inf')
  
  for i in range(len(s)):
    for j in range(i + len(t), len(s) + 1):
      window = s[i:j]
      if contains_all(window, t_count):
        if len(window) < min_length:
          min_length = len(window)
          min_window = window
        break
  
  return min_window

def contains_all(s, t_count):
  s_count = {}
  for c in s:
    s_count[c] = s_count.get(c, 0) + 1
  
  for c, count in t_count.items():
    if s_count.get(c, 0) < count:
      return False
  return True`,
        cpp: `string minWindow(string s, string t) {
  if (s.size() < t.size()) return "";
  
  unordered_map<char, int> tMap;
  for (char c : t) tMap[c]++;
  
  string minWindow = "";
  int minLength = INT_MAX;
  
  for (int i = 0; i < s.size(); i++) {
    for (int j = i + t.size(); j <= s.size(); j++) {
      string window = s.substr(i, j - i);
      if (containsAll(window, tMap)) {
        if (window.size() < minLength) {
          minLength = window.size();
          minWindow = window;
        }
        break;
      }
    }
  }
  
  return minWindow;
}

bool containsAll(string s, unordered_map<char, int> tMap) {
  unordered_map<char, int> sMap;
  for (char c : s) sMap[c]++;
  
  for (auto& entry : tMap) {
    if (sMap[entry.first] < entry.second) return false;
  }
  return true;
}`,
      },
      complexity: {
        time: "O(n³)",
        space: "O(n + m)",
      },
      explanation:
        "Check all possible substrings of s and verify if they contain all characters of t.",
    },
    optimal: {
      code: {
        java: `public String minWindow(String s, String t) {
  if (s.length() < t.length()) return "";
  
  Map<Character, Integer> tMap = new HashMap<>();
  for (char c : t.toCharArray()) {
    tMap.put(c, tMap.getOrDefault(c, 0) + 1);
  }
  
  int required = tMap.size();
  int formed = 0;
  int left = 0;
  int minLength = Integer.MAX_VALUE;
  int minLeft = 0;
  
  Map<Character, Integer> windowCounts = new HashMap<>();
  
  for (int right = 0; right < s.length(); right++) {
    char c = s.charAt(right);
    windowCounts.put(c, windowCounts.getOrDefault(c, 0) + 1);
    
    if (tMap.containsKey(c) && windowCounts.get(c).intValue() == tMap.get(c).intValue()) {
      formed++;
    }
    
    while (formed == required && left <= right) {
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        minLeft = left;
      }
      
      char leftChar = s.charAt(left);
      windowCounts.put(leftChar, windowCounts.get(leftChar) - 1);
      if (tMap.containsKey(leftChar)) {
        if (windowCounts.get(leftChar) < tMap.get(leftChar)) {
          formed--;
        }
      }
      left++;
    }
  }
  
  return minLength == Integer.MAX_VALUE ? "" : s.substring(minLeft, minLeft + minLength);
}`,
        python: `def minWindow(s, t):
  if len(t) > len(s): return ""
  
  t_count = {}
  for c in t:
    t_count[c] = t_count.get(c, 0) + 1
  
  required = len(t_count)
  formed = 0
  left = 0
  min_length = float('inf')
  min_left = 0
  
  window_counts = {}
  
  for right in range(len(s)):
    c = s[right]
    window_counts[c] = window_counts.get(c, 0) + 1
    
    if c in t_count and window_counts[c] == t_count[c]:
      formed += 1
    
    while formed == required and left <= right:
      if right - left + 1 < min_length:
        min_length = right - left + 1
        min_left = left
      
      left_char = s[left]
      window_counts[left_char] -= 1
      if left_char in t_count:
        if window_counts[left_char] < t_count[left_char]:
          formed -= 1
      left += 1
  
  return "" if min_length == float('inf') else s[min_left:min_left + min_length]`,
        cpp: `string minWindow(string s, string t) {
  if (s.size() < t.size()) return "";
  
  unordered_map<char, int> tMap;
  for (char c : t) tMap[c]++;
  
  int required = tMap.size();
  int formed = 0;
  int left = 0;
  int minLength = INT_MAX;
  int minLeft = 0;
  
  unordered_map<char, int> windowCounts;
  
  for (int right = 0; right < s.size(); right++) {
    char c = s[right];
    windowCounts[c]++;
    
    if (tMap.count(c) && windowCounts[c] == tMap[c]) {
      formed++;
    }
    
    while (formed == required && left <= right) {
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        minLeft = left;
      }
      
      char leftChar = s[left];
      windowCounts[leftChar]--;
      if (tMap.count(leftChar)) {
        if (windowCounts[leftChar] < tMap[leftChar]) {
          formed--;
        }
      }
      left++;
    }
  }
  
  return minLength == INT_MAX ? "" : s.substr(minLeft, minLength);
}`,
      },
      complexity: {
        time: "O(n + m)",
        space: "O(n + m)",
      },
      explanation:
        "Sliding window approach with hash maps to track character counts and formed matches.",
    },
  },
  {
    id: 20,
    status: false,
    star: false,
    problem: "Sliding Window Maximum",
    leetcodeLink: "https://leetcode.com/problems/sliding-window-maximum/",
    difficulty: "Hard",
    description:
      "Given an array nums and an integer k, return the max sliding window containing the maximum numbers from each window of size k moving from left to right.",
    examples: [
      { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    bruteForce: {
      code: {
        java: `public int[] maxSlidingWindow(int[] nums, int k) {
  if (nums == null || k <= 0) return new int[0];
  int n = nums.length;
  int[] result = new int[n - k + 1];
  
  for (int i = 0; i <= n - k; i++) {
    int max = Integer.MIN_VALUE;
    for (int j = i; j < i + k; j++) {
      max = Math.max(max, nums[j]);
    }
    result[i] = max;
  }
  return result;
}`,
        python: `def maxSlidingWindow(nums, k):
  if not nums: return []
  return [max(nums[i:i+k]) for i in range(len(nums)-k+1)]`,
        cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
  if (nums.empty()) return {};
  vector<int> result;
  for (int i = 0; i <= nums.size()-k; i++) {
    result.push_back(*max_element(nums.begin()+i, nums.begin()+i+k));
  }
  return result;
}`,
      },
      complexity: {
        time: "O(n*k)",
        space: "O(n)",
      },
      explanation: "For each window, compute maximum by scanning all elements.",
    },
    optimal: {
      code: {
        java: `public int[] maxSlidingWindow(int[] nums, int k) {
  if (nums == null || k <= 0) return new int[0];
  int n = nums.length;
  int[] result = new int[n - k + 1];
  Deque<Integer> q = new ArrayDeque<>();
  
  for (int i = 0; i < n; i++) {
    while (!q.isEmpty() && q.peek() < i - k + 1) {
      q.poll();
    }
    while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) {
      q.pollLast();
    }
    q.offer(i);
    if (i >= k - 1) {
      result[i - k + 1] = nums[q.peek()];
    }
  }
  return result;
}`,
        python: `def maxSlidingWindow(nums, k):
  from collections import deque
  q = deque()
  result = []
  
  for i, num in enumerate(nums):
    while q and q[0] < i - k + 1:
      q.popleft()
    while q and nums[q[-1]] < num:
      q.pop()
    q.append(i)
    if i >= k - 1:
      result.append(nums[q[0]])
  return result`,
        cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
  deque<int> dq;
  vector<int> result;
  
  for (int i = 0; i < nums.size(); i++) {
    while (!dq.empty() && dq.front() < i - k + 1) {
      dq.pop_front();
    }
    while (!dq.empty() && nums[dq.back()] < nums[i]) {
      dq.pop_back();
    }
    dq.push_back(i);
    if (i >= k - 1) {
      result.push_back(nums[dq.front()]);
    }
  }
  return result;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(k)",
      },
      explanation:
        "Use deque to maintain indices of potential maximums in current window.",
    },
  },
];
