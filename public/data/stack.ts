// src/data/stack.ts
import { Question } from "../types/Question";

export const stackQuestions: Question[] = [
  // ==================== EASY ====================
  {
    id: 21,
    status: false,
    star: false,
    problem: "Valid Parentheses",
    leetcodeLink: "https://leetcode.com/problems/valid-parentheses/",
    difficulty: "Easy",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      { input: `s = "()"`, output: "true" },
      { input: `s = "()[]{}"`, output: "true" },
    ],
    bruteForce: {
      code: {
        java: `public boolean isValid(String s) {
  while (s.contains("()") || s.contains("[]") || s.contains("{}")) {
    s = s.replace("()", "").replace("[]", "").replace("{}", "");
  }
  return s.isEmpty();
}`,
        python: `def isValid(s):
  while "()" in s or "[]" in s or "{}" in s:
    s = s.replace("()", "").replace("[]", "").replace("{}", "")
  return not s`,
        cpp: `bool isValid(string s) {
  size_t size;
  do {
    size = s.size();
    replaceAll(s, "()", "");
    replaceAll(s, "[]", "");
    replaceAll(s, "{}", "");
  } while (size != s.size());
  return s.empty();
}

void replaceAll(string& s, const string& from, const string& to) {
  size_t pos = 0;
  while((pos = s.find(from, pos)) != string::npos) {
    s.replace(pos, from.length(), to);
    pos += to.length();
  }
}`,
      },
      complexity: {
        time: "O(n²)",
        space: "O(1)",
      },
      explanation:
        "Repeatedly remove valid pairs until string is empty or no more pairs can be removed.",
    },
    optimal: {
      code: {
        java: `public boolean isValid(String s) {
  Stack<Character> stack = new Stack<>();
  for (char c : s.toCharArray()) {
    if (c == '(') stack.push(')');
    else if (c == '[') stack.push(']');
    else if (c == '{') stack.push('}');
    else if (stack.isEmpty() || stack.pop() != c) return false;
  }
  return stack.isEmpty();
}`,
        python: `def isValid(s):
  stack = []
  mapping = {')': '(', ']': '[', '}': '{'}
  for char in s:
    if char in mapping:
      top = stack.pop() if stack else '#'
      if mapping[char] != top:
        return False
    else:
      stack.append(char)
  return not stack`,
        cpp: `bool isValid(string s) {
  stack<char> st;
  for (char c : s) {
    if (c == '(') st.push(')');
    else if (c == '[') st.push(']');
    else if (c == '{') st.push('}');
    else if (st.empty() || st.top() != c) return false;
    else st.pop();
  }
  return st.empty();
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation:
        "Use stack to track expected closing brackets and validate pairs.",
    },
  },
  {
    id: 22,
    status: false,
    star: false,
    problem: "Min Stack",
    leetcodeLink: "https://leetcode.com/problems/min-stack/",
    difficulty: "Easy",
    description:
      "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    examples: [
      {
        input: `["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]`,
        output: `[null,null,null,null,-3,null,0,-2]`,
      },
    ],
    bruteForce: {
      code: {
        java: `class MinStack {
  private List<Integer> data;
  public MinStack() { data = new ArrayList<>(); }
  public void push(int val) { data.add(val); }
  public void pop() { data.remove(data.size()-1); }
  public int top() { return data.get(data.size()-1); }
  public int getMin() { return Collections.min(data); }
}`,
        python: `class MinStack:
  def __init__(self):
    self.stack = []
  def push(self, val):
    self.stack.append(val)
  def pop(self):
    self.stack.pop()
  def top(self):
    return self.stack[-1]
  def getMin(self):
    return min(self.stack)`,
        cpp: `class MinStack {
  vector<int> data;
public:
  MinStack() {}
  void push(int val) { data.push_back(val); }
  void pop() { data.pop_back(); }
  int top() { return data.back(); }
  int getMin() { return *min_element(data.begin(), data.end()); }
};`,
      },
      complexity: {
        time: "O(1) for all except getMin() which is O(n)",
        space: "O(n)",
      },
      explanation: "Simple stack with linear time minimum retrieval.",
    },
    optimal: {
      code: {
        java: `class MinStack {
  private Stack<Integer> stack;
  private Stack<Integer> minStack;
  
  public MinStack() {
    stack = new Stack<>();
    minStack = new Stack<>();
  }
  
  public void push(int val) {
    stack.push(val);
    if (minStack.isEmpty() || val <= minStack.peek()) {
      minStack.push(val);
    }
  }
  
  public void pop() {
    if (stack.pop().equals(minStack.peek())) {
      minStack.pop();
    }
  }
  
  public int top() {
    return stack.peek();
  }
  
  public int getMin() {
    return minStack.peek();
  }
}`,
        python: `class MinStack:
  def __init__(self):
    self.stack = []
    self.min_stack = []
  def push(self, val):
    self.stack.append(val)
    if not self.min_stack or val <= self.min_stack[-1]:
      self.min_stack.append(val)
  def pop(self):
    if self.stack.pop() == self.min_stack[-1]:
      self.min_stack.pop()
  def top(self):
    return self.stack[-1]
  def getMin(self):
    return self.min_stack[-1]`,
        cpp: `class MinStack {
  stack<int> main_stack;
  stack<int> min_stack;
public:
  MinStack() {}
  void push(int val) {
    main_stack.push(val);
    if (min_stack.empty() || val <= min_stack.top()) {
      min_stack.push(val);
    }
  }
  void pop() {
    if (main_stack.top() == min_stack.top()) {
      min_stack.pop();
    }
    main_stack.pop();
  }
  int top() {
    return main_stack.top();
  }
  int getMin() {
    return min_stack.top();
  }
};`,
      },
      complexity: {
        time: "O(1) for all operations",
        space: "O(n)",
      },
      explanation:
        "Use auxiliary stack to track minimums for constant time retrieval.",
    },
  },

  // ==================== MEDIUM ====================
  {
    id: 23,
    status: false,
    star: false,
    problem: "Evaluate Reverse Polish Notation",
    leetcodeLink:
      "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    difficulty: "Medium",
    description:
      "Evaluate the value of an arithmetic expression in Reverse Polish Notation (postfix notation).",
    examples: [
      { input: `tokens = ["2","1","+","3","*"]`, output: "9" },
      { input: `tokens = ["4","13","5","/","+"]`, output: "6" },
    ],
    bruteForce: {
      code: {
        java: `public int evalRPN(String[] tokens) {
  Stack<Integer> stack = new Stack<>();
  for (String token : tokens) {
    if ("+-*/".contains(token)) {
      int b = stack.pop();
      int a = stack.pop();
      switch (token) {
        case "+": stack.push(a + b); break;
        case "-": stack.push(a - b); break;
        case "*": stack.push(a * b); break;
        case "/": stack.push(a / b); break;
      }
    } else {
      stack.push(Integer.parseInt(token));
    }
  }
  return stack.pop();
}`,
        python: `def evalRPN(tokens):
  stack = []
  for token in tokens:
    if token in "+-*/":
      b = stack.pop()
      a = stack.pop()
      if token == '+': stack.append(a + b)
      elif token == '-': stack.append(a - b)
      elif token == '*': stack.append(a * b)
      else: stack.append(int(a / b))
    else:
      stack.append(int(token))
  return stack.pop()`,
        cpp: `int evalRPN(vector<string>& tokens) {
  stack<int> st;
  for (string token : tokens) {
    if (token == "+" || token == "-" || token == "*" || token == "/") {
      int b = st.top(); st.pop();
      int a = st.top(); st.pop();
      if (token == "+") st.push(a + b);
      else if (token == "-") st.push(a - b);
      else if (token == "*") st.push(a * b);
      else st.push(a / b);
    } else {
      st.push(stoi(token));
    }
  }
  return st.top();
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation: "Stack is the natural solution for RPN evaluation.",
    },
    optimal: {
      code: {
        java: `// Same as brute force - stack approach is optimal`,
        python: `# Same as brute force - stack approach is optimal`,
        cpp: `// Same as brute force - stack approach is optimal`,
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation: "Stack approach is already optimal for RPN evaluation.",
    },
  },
  {
    id: 24,
    status: false,
    star: false,
    problem: "Generate Parentheses",
    leetcodeLink: "https://leetcode.com/problems/generate-parentheses/",
    difficulty: "Medium",
    description:
      "Given n pairs of parentheses, generate all combinations of well-formed parentheses.",
    examples: [
      {
        input: "n = 3",
        output: `["((()))","(()())","(())()","()(())","()()()"]`,
      },
      { input: "n = 1", output: `["()"]` },
    ],
    bruteForce: {
      code: {
        java: `public List<String> generateParenthesis(int n) {
  List<String> result = new ArrayList<>();
  generateAll(new char[2 * n], 0, result);
  return result;
}

private void generateAll(char[] current, int pos, List<String> result) {
  if (pos == current.length) {
    if (isValid(current)) {
      result.add(new String(current));
    }
  } else {
    current[pos] = '(';
    generateAll(current, pos + 1, result);
    current[pos] = ')';
    generateAll(current, pos + 1, result);
  }
}

private boolean isValid(char[] current) {
  int balance = 0;
  for (char c : current) {
    if (c == '(') balance++;
    else balance--;
    if (balance < 0) return false;
  }
  return balance == 0;
}`,
        python: `def generateParenthesis(n):
  def generate_all(current):
    if len(current) == 2 * n:
      if valid(current):
        result.append("".join(current))
    else:
      current.append('(')
      generate_all(current)
      current.pop()
      current.append(')')
      generate_all(current)
      current.pop()
  
  def valid(current):
    balance = 0
    for c in current:
      if c == '(': balance += 1
      else: balance -= 1
      if balance < 0: return False
    return balance == 0
  
  result = []
  generate_all([])
  return result`,
        cpp: `vector<string> generateParenthesis(int n) {
  vector<string> result;
  string current;
  generateAll(current, 2 * n, result);
  return result;
}

void generateAll(string& current, int max, vector<string>& result) {
  if (current.size() == max) {
    if (isValid(current)) {
      result.push_back(current);
    }
  } else {
    current.push_back('(');
    generateAll(current, max, result);
    current.pop_back();
    current.push_back(')');
    generateAll(current, max, result);
    current.pop_back();
  }
}

bool isValid(string s) {
  int balance = 0;
  for (char c : s) {
    if (c == '(') balance++;
    else balance--;
    if (balance < 0) return false;
  }
  return balance == 0;
}`,
      },
      complexity: {
        time: "O(2²ⁿ * n)",
        space: "O(2²ⁿ * n)",
      },
      explanation: "Generate all 2²ⁿ possible sequences and validate each one.",
    },
    optimal: {
      code: {
        java: `public List<String> generateParenthesis(int n) {
  List<String> result = new ArrayList<>();
  backtrack(result, "", 0, 0, n);
  return result;
}

private void backtrack(List<String> result, String current, int open, int close, int max) {
  if (current.length() == max * 2) {
    result.add(current);
    return;
  }
  
  if (open < max) {
    backtrack(result, current + "(", open + 1, close, max);
  }
  if (close < open) {
    backtrack(result, current + ")", open, close + 1, max);
  }
}`,
        python: `def generateParenthesis(n):
  def backtrack(current, open_count, close_count):
    if len(current) == 2 * n:
      result.append(current)
      return
    if open_count < n:
      backtrack(current + '(', open_count + 1, close_count)
    if close_count < open_count:
      backtrack(current + ')', open_count, close_count + 1)
  
  result = []
  backtrack("", 0, 0)
  return result`,
        cpp: `vector<string> generateParenthesis(int n) {
  vector<string> result;
  backtrack(result, "", 0, 0, n);
  return result;
}

void backtrack(vector<string>& result, string current, int open, int close, int max) {
  if (current.size() == max * 2) {
    result.push_back(current);
    return;
  }
  if (open < max) {
    backtrack(result, current + "(", open + 1, close, max);
  }
  if (close < open) {
    backtrack(result, current + ")", open, close + 1, max);
  }
}`,
      },
      complexity: {
        time: "O(4ⁿ/√n) - nth Catalan number",
        space: "O(4ⁿ/√n)",
      },
      explanation:
        "Backtracking with constraints to only generate valid combinations.",
    },
  },
  {
    id: 25,
    status: false,
    star: false,
    problem: "Daily Temperatures",
    leetcodeLink: "https://leetcode.com/problems/daily-temperatures/",
    difficulty: "Medium",
    description:
      "Given an array of integers temperatures representing daily temperatures, return an array answer where answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
    examples: [
      {
        input: `temperatures = [73,74,75,71,69,72,76,73]`,
        output: `[1,1,4,2,1,1,0,0]`,
      },
      { input: `temperatures = [30,40,50,60]`, output: `[1,1,1,0]` },
    ],
    bruteForce: {
      code: {
        java: `public int[] dailyTemperatures(int[] temperatures) {
  int[] result = new int[temperatures.length];
  for (int i = 0; i < temperatures.length; i++) {
    for (int j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temperatures[i]) {
        result[i] = j - i;
        break;
      }
    }
  }
  return result;
}`,
        python: `def dailyTemperatures(temperatures):
  result = [0] * len(temperatures)
  for i in range(len(temperatures)):
    for j in range(i+1, len(temperatures)):
      if temperatures[j] > temperatures[i]:
        result[i] = j - i
        break
  return result`,
        cpp: `vector<int> dailyTemperatures(vector<int>& temperatures) {
  vector<int> result(temperatures.size());
  for (int i = 0; i < temperatures.size(); i++) {
    for (int j = i + 1; j < temperatures.size(); j++) {
      if (temperatures[j] > temperatures[i]) {
        result[i] = j - i;
        break;
      }
    }
  }
  return result;
}`,
      },
      complexity: {
        time: "O(n²)",
        space: "O(1) (excluding output)",
      },
      explanation: "For each day, scan forward until finding a warmer day.",
    },
    optimal: {
      code: {
        java: `public int[] dailyTemperatures(int[] temperatures) {
  int[] result = new int[temperatures.length];
  Stack<Integer> stack = new Stack<>();
  
  for (int i = 0; i < temperatures.length; i++) {
    while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
      int idx = stack.pop();
      result[idx] = i - idx;
    }
    stack.push(i);
  }
  
  return result;
}`,
        python: `def dailyTemperatures(temperatures):
  result = [0] * len(temperatures)
  stack = []
  
  for i, temp in enumerate(temperatures):
    while stack and temp > temperatures[stack[-1]]:
      idx = stack.pop()
      result[idx] = i - idx
    stack.append(i)
  
  return result`,
        cpp: `vector<int> dailyTemperatures(vector<int>& temperatures) {
  vector<int> result(temperatures.size());
  stack<int> st;
  
  for (int i = 0; i < temperatures.size(); i++) {
    while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
      int idx = st.top(); st.pop();
      result[idx] = i - idx;
    }
    st.push(i);
  }
  
  return result;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation:
        "Use monotonic stack to track indices of temperatures waiting for warmer days.",
    },
  },
  {
    id: 26,
    status: false,
    star: false,
    problem: "Car Fleet",
    leetcodeLink: "https://leetcode.com/problems/car-fleet/",
    difficulty: "Medium",
    description:
      "Given positions and speeds of cars moving toward a destination, return how many car fleets will arrive at the destination.",
    examples: [
      {
        input: `target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]`,
        output: "3",
      },
      { input: `target = 10, position = [3], speed = [3]`, output: "1" },
    ],
    bruteForce: {
      code: {
        java: `public int carFleet(int target, int[] position, int[] speed) {
  int n = position.length;
  if (n == 0) return 0;
  
  // Pair position and time to reach target
  double[][] cars = new double[n][2];
  for (int i = 0; i < n; i++) {
    cars[i][0] = position[i];
    cars[i][1] = (double)(target - position[i]) / speed[i];
  }
  
  // Sort by position descending
  Arrays.sort(cars, (a, b) -> Double.compare(b[0], a[0]));
  
  int fleets = 1;
  double prevTime = cars[0][1];
  
  for (int i = 1; i < n; i++) {
    if (cars[i][1] > prevTime) {
      fleets++;
      prevTime = cars[i][1];
    }
  }
  
  return fleets;
}`,
        python: `def carFleet(target, position, speed):
  if not position: return 0
  cars = sorted(zip(position, speed), reverse=True)
  fleets = 1
  prev_time = (target - cars[0][0]) / cars[0][1]
  
  for pos, spd in cars[1:]:
    time = (target - pos) / spd
    if time > prev_time:
      fleets += 1
      prev_time = time
  
  return fleets`,
        cpp: `int carFleet(int target, vector<int>& position, vector<int>& speed) {
  int n = position.size();
  if (n == 0) return 0;
  
  vector<pair<int, double>> cars;
  for (int i = 0; i < n; i++) {
    cars.emplace_back(position[i], (double)(target - position[i]) / speed[i]);
  }
  
  sort(cars.begin(), cars.end(), [](auto& a, auto& b) {
    return a.first > b.first;
  });
  
  int fleets = 1;
  double prev_time = cars[0].second;
  
  for (int i = 1; i < n; i++) {
    if (cars[i].second > prev_time) {
      fleets++;
      prev_time = cars[i].second;
    }
  }
  
  return fleets;
}`,
      },
      complexity: {
        time: "O(n log n)",
        space: "O(n)",
      },
      explanation:
        "Sort cars by position and calculate time to target, count fleets when slower cars block faster ones.",
    },
    optimal: {
      code: {
        java: `// The "brute force" solution is already optimal`,
        python: `# The "brute force" solution is already optimal`,
        cpp: `// The "brute force" solution is already optimal`,
      },
      complexity: {
        time: "O(n log n)",
        space: "O(n)",
      },
      explanation:
        "The sorting-based approach is already optimal for this problem.",
    },
  },

  // ==================== HARD ====================
  {
    id: 27,
    status: false,
    star: false,
    problem: "Largest Rectangle In Histogram",
    leetcodeLink:
      "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    difficulty: "Hard",
    description:
      "Given an array of integers heights representing the histogram's bar heights, return the area of the largest rectangle in the histogram.",
    examples: [
      { input: `heights = [2,1,5,6,2,3]`, output: "10" },
      { input: `heights = [2,4]`, output: "4" },
    ],
    bruteForce: {
      code: {
        java: `public int largestRectangleArea(int[] heights) {
  int maxArea = 0;
  for (int i = 0; i < heights.length; i++) {
    int minHeight = Integer.MAX_VALUE;
    for (int j = i; j < heights.length; j++) {
      minHeight = Math.min(minHeight, heights[j]);
      maxArea = Math.max(maxArea, minHeight * (j - i + 1));
    }
  }
  return maxArea;
}`,
        python: `def largestRectangleArea(heights):
  max_area = 0
  for i in range(len(heights)):
    min_height = float('inf')
    for j in range(i, len(heights)):
      min_height = min(min_height, heights[j])
      max_area = max(max_area, min_height * (j - i + 1))
  return max_area`,
        cpp: `int largestRectangleArea(vector<int>& heights) {
  int max_area = 0;
  for (int i = 0; i < heights.size(); i++) {
    int min_height = INT_MAX;
    for (int j = i; j < heights.size(); j++) {
      min_height = min(min_height, heights[j]);
      max_area = max(max_area, min_height * (j - i + 1));
    }
  }
  return max_area;
}`,
      },
      complexity: {
        time: "O(n²)",
        space: "O(1)",
      },
      explanation:
        "Check all possible rectangles by considering every pair of bars.",
    },
    optimal: {
      code: {
        java: `public int largestRectangleArea(int[] heights) {
  Stack<Integer> stack = new Stack<>();
  int maxArea = 0;
  int n = heights.length;
  
  for (int i = 0; i <= n; i++) {
    int h = (i == n) ? 0 : heights[i];
    while (!stack.isEmpty() && h < heights[stack.peek()]) {
      int height = heights[stack.pop()];
      int width = stack.isEmpty() ? i : i - stack.peek() - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  
  return maxArea;
}`,
        python: `def largestRectangleArea(heights):
  stack = []
  max_area = 0
  heights.append(0)  # Add sentinel
  
  for i, h in enumerate(heights):
    while stack and h < heights[stack[-1]]:
      height = heights[stack.pop()]
      width = i if not stack else i - stack[-1] - 1
      max_area = max(max_area, height * width)
    stack.append(i)
  
  return max_area`,
        cpp: `int largestRectangleArea(vector<int>& heights) {
  stack<int> st;
  int max_area = 0;
  heights.push_back(0);  // Sentinel
  
  for (int i = 0; i < heights.size(); i++) {
    while (!st.empty() && heights[i] < heights[st.top()]) {
      int h = heights[st.top()]; st.pop();
      int w = st.empty() ? i : i - st.top() - 1;
      max_area = max(max_area, h * w);
    }
    st.push(i);
  }
  
  return max_area;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation:
        "Use monotonic stack to track bars and calculate maximum area when a smaller bar is encountered.",
    },
  },
];
