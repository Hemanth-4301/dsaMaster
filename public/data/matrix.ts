import { Question } from "../types/Question";

export const matrixQuestions: Question[] = [
  // ==================== MEDIUM ====================
  {
    id: 134,
    status: false,
    star: false,
    problem: "Rotate Image",
    leetcodeLink: "https://leetcode.com/problems/rotate-image/",
    difficulty: "Medium",
    description:
      "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.",
    examples: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        output: "[[7,4,1],[8,5,2],[9,6,3]]",
      },
      {
        input: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
        output: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public void rotate(int[][] matrix) {
    int n = matrix.length;
    int[][] temp = new int[n][n];
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        temp[j][n - 1 - i] = matrix[i][j];
      }
    }
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        matrix[i][j] = temp[i][j];
      }
    }
  }
}`,
        python: `class Solution:
  def rotate(self, matrix: List[List[int]]) -> None:
    n = len(matrix)
    temp = [[0] * n for _ in range(n)]
    for i in range(n):
      for j in range(n):
        temp[j][n - 1 - i] = matrix[i][j]
    for i in range(n):
      for j in range(n):
        matrix[i][j] = temp[i][j]`,
        cpp: `class Solution {
public:
  void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    vector<vector<int>> temp(n, vector<int>(n));
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        temp[j][n - 1 - i] = matrix[i][j];
      }
    }
    matrix = temp;
  }
};`,
      },
      complexity: {
        time: "O(n^2) for copying elements to a temporary matrix",
        space: "O(n^2) for the temporary matrix",
      },
      explanation:
        "Create a temporary matrix to store the rotated result. For each element at position (i, j), place it at (j, n-1-i) in the temporary matrix. Then copy the temporary matrix back to the original matrix.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public void rotate(int[][] matrix) {
    int n = matrix.length;
    // Transpose matrix (swap elements across diagonal)
    for (int i = 0; i < n; i++) {
      for (int j = i; j < n; j++) {
        int temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
      }
    }
    // Reverse each row
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n / 2; j++) {
        int temp = matrix[i][j];
        matrix[i][j] = matrix[i][n - 1 - j];
        matrix[i][n - 1 - j] = temp;
      }
    }
  }
}`,
        python: `class Solution:
  def rotate(self, matrix: List[List[int]]) -> None:
    n = len(matrix)
    # Transpose matrix
    for i in range(n):
      for j in range(i, n):
        matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Reverse each row
    for i in range(n):
      matrix[i].reverse()`,
        cpp: `class Solution {
public:
  void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    // Transpose matrix
    for (int i = 0; i < n; i++) {
      for (int j = i; j < n; j++) {
        swap(matrix[i][j], matrix[j][i]);
      }
    }
    // Reverse each row
    for (int i = 0; i < n; i++) {
      reverse(matrix[i].begin(), matrix[i].end());
    }
  }
};`,
      },
      complexity: {
        time: "O(n^2) for transposing and reversing the matrix",
        space: "O(1) for in-place operations",
      },
      explanation:
        "Rotate the matrix in-place by first transposing it (swapping elements across the main diagonal) and then reversing each row. This achieves a 90-degree clockwise rotation without extra space.",
    },
  },
  {
    id: 135,
    status: false,
    star: false,
    problem: "Spiral Matrix",
    leetcodeLink: "https://leetcode.com/problems/spiral-matrix/",
    difficulty: "Medium",
    description:
      "Given an m x n matrix, return all elements of the matrix in spiral order (clockwise starting from top-left).",
    examples: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        output: "[1,2,3,6,9,8,7,4,5]",
      },
      {
        input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
        output: "[1,2,3,4,8,12,11,10,9,5,6,7]",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();
    if (matrix.length == 0) return result;
    int m = matrix.length, n = matrix[0].length;
    boolean[][] visited = new boolean[m][n];
    int[] dr = {0, 1, 0, -1};
    int[] dc = {1, 0, -1, 0};
    int r = 0, c = 0, di = 0;
    for (int i = 0; i < m * n; i++) {
      result.add(matrix[r][c]);
      visited[r][c] = true;
      int nr = r + dr[di];
      int nc = c + dc[di];
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
        r = nr;
        c = nc;
      } else {
        di = (di + 1) % 4;
        r += dr[di];
        c += dc[di];
      }
    }
    return result;
  }
}`,
        python: `class Solution:
  def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
    if not matrix:
      return []
    m, n = len(matrix), len(matrix[0])
    result = []
    visited = [[False] * n for _ in range(m)]
    dr = [0, 1, 0, -1]
    dc = [1, 0, -1, 0]
    r = c = di = 0
    for _ in range(m * n):
      result.append(matrix[r][c])
      visited[r][c] = True
      nr, nc = r + dr[di], c + dc[di]
      if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc]:
        r, c = nr, nc
      else:
        di = (di + 1) % 4
        r += dr[di]
        c += dc[di]
    return result`,
        cpp: `class Solution {
public:
  vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    if (matrix.empty()) return result;
    int m = matrix.size(), n = matrix[0].size();
    vector<vector<bool>> visited(m, vector<bool>(n, false));
    int dr[] = {0, 1, 0, -1};
    int dc[] = {1, 0, -1, 0};
    int r = 0, c = 0, di = 0;
    for (int i = 0; i < m * n; i++) {
      result.push_back(matrix[r][c]);
      visited[r][c] = true;
      int nr = r + dr[di];
      int nc = c + dc[di];
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
        r = nr;
        c = nc;
      } else {
        di = (di + 1) % 4;
        r += dr[di];
        c += dc[di];
      }
    }
    return result;
  }
};`,
      },
      complexity: {
        time: "O(m * n) for visiting each element",
        space: "O(m * n) for the visited matrix",
      },
      explanation:
        "Use a visited matrix to track processed elements. Move in a spiral direction (right, down, left, up) using direction arrays. Change direction when hitting a boundary or visited cell.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();
    if (matrix.length == 0) return result;
    int top = 0, bottom = matrix.length - 1;
    int left = 0, right = matrix[0].length - 1;
    while (top <= bottom && left <= right) {
      for (int i = left; i <= right; i++) result.add(matrix[top][i]);
      top++;
      for (int i = top; i <= bottom; i++) result.add(matrix[i][right]);
      right--;
      if (top <= bottom) {
        for (int i = right; i >= left; i--) result.add(matrix[bottom][i]);
        bottom--;
      }
      if (left <= right) {
        for (int i = bottom; i >= top; i--) result.add(matrix[i][left]);
        left++;
      }
    }
    return result;
  }
}`,
        python: `class Solution:
  def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
    if not matrix:
      return []
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
      for i in range(left, right + 1):
        result.append(matrix[top][i])
      top += 1
      for i in range(top, bottom + 1):
        result.append(matrix[i][right])
      right -= 1
      if top <= bottom:
        for i in range(right, left - 1, -1):
          result.append(matrix[bottom][i])
        bottom -= 1
      if left <= right:
        for i in range(bottom, top - 1, -1):
          result.append(matrix[i][left])
        left += 1
    return result`,
        cpp: `class Solution {
public:
  vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    if (matrix.empty()) return result;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    while (top <= bottom && left <= right) {
      for (int i = left; i <= right; i++) result.push_back(matrix[top][i]);
      top++;
      for (int i = top; i <= bottom; i++) result.push_back(matrix[i][right]);
      right--;
      if (top <= bottom) {
        for (int i = right; i >= left; i--) result.push_back(matrix[bottom][i]);
        bottom--;
      }
      if (left <= right) {
        for (int i = bottom; i >= top; i--) result.push_back(matrix[i][left]);
        left++;
      }
    }
    return result;
  }
};`,
      },
      complexity: {
        time: "O(m * n) for visiting each element",
        space: "O(1) for constant extra space (excluding output)",
      },
      explanation:
        "Use four pointers (top, bottom, left, right) to define the boundaries of the unvisited matrix. Traverse each layer in a spiral order, updating boundaries after each direction is processed.",
    },
  },
  {
    id: 136,
    status: false,
    star: false,
    problem: "Set Matrix Zeroes",
    leetcodeLink: "https://leetcode.com/problems/set-matrix-zeroes/",
    difficulty: "Medium",
    description:
      "Given an m x n integer matrix, if an element is 0, set its entire row and column to 0's. You must do it in-place.",
    examples: [
      {
        input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
        output: "[[1,0,1],[0,0,0],[1,0,1]]",
      },
      {
        input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
        output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public void setZeroes(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    boolean[][] zero = new boolean[m][n];
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (matrix[i][j] == 0) {
          zero[i][j] = true;
        }
      }
    }
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (zero[i][j]) {
          for (int k = 0; k < m; k++) matrix[k][j] = 0;
          for (int k = 0; k < n; k++) matrix[i][k] = 0;
        }
      }
    }
  }
}`,
        python: `class Solution:
  def setZeroes(self, matrix: List[List[int]]) -> None:
    m, n = len(matrix), len(matrix[0])
    zero = [[False] * n for _ in range(m)]
    for i in range(m):
      for j in range(n):
        if matrix[i][j] == 0:
          zero[i][j] = True
    for i in range(m):
      for j in range(n):
        if zero[i][j]:
          for k in range(m):
            matrix[k][j] = 0
          for k in range(n):
            matrix[i][k] = 0`,
        cpp: `class Solution {
public:
  void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    vector<vector<bool>> zero(m, vector<bool>(n, false));
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (matrix[i][j] == 0) {
          zero[i][j] = true;
        }
      }
    }
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (zero[i][j]) {
          for (int k = 0; k < m; k++) matrix[k][j] = 0;
          for (int k = 0; k < n; k++) matrix[i][k] = 0;
        }
      }
    }
  }
};`,
      },
      complexity: {
        time: "O(m * n) for scanning and updating the matrix",
        space: "O(m * n) for the temporary matrix",
      },
      explanation:
        "Use a temporary matrix to mark positions with zeros. Then, for each zero position, set its entire row and column to zero in the original matrix.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public void setZeroes(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    boolean firstRow = false, firstCol = false;
    for (int i = 0; i < m; i++) {
      if (matrix[i][0] == 0) firstCol = true;
    }
    for (int j = 0; j < n; j++) {
      if (matrix[0][j] == 0) firstRow = true;
    }
    for (int i = 1; i < m; i++) {
      for (int j = 1; j < n; j++) {
        if (matrix[i][j] == 0) {
          matrix[i][0] = 0;
          matrix[0][j] = 0;
        }
      }
    }
    for (int i = 1; i < m; i++) {
      if (matrix[i][0] == 0) {
        for (int j = 1; j < n; j++) matrix[i][j] = 0;
      }
    }
    for (int j = 1; j < n; j++) {
      if (matrix[0][j] == 0) {
        for (int i = 1; i < m; i++) matrix[i][j] = 0;
      }
    }
    if (firstCol) {
      for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
    if (firstRow) {
      for (int j = 0; j < n; j++) matrix[0][j] = 0;
    }
  }
}`,
        python: `class Solution:
  def setZeroes(self, matrix: List[List[int]]) -> None:
    m, n = len(matrix), len(matrix[0])
    first_row = first_col = False
    for i in range(m):
      if matrix[i][0] == 0:
        first_col = True
    for j in range(n):
      if matrix[0][j] == 0:
        first_row = True
    for i in range(1, m):
      for j in range(1, n):
        if matrix[i][j] == 0:
          matrix[i][0] = matrix[0][j] = 0
    for i in range(1, m):
      if matrix[i][0] == 0:
        for j in range(1, n):
          matrix[i][j] = 0
    for j in range(1, n):
      if matrix[0][j] == 0:
        for i in range(1, m):
          matrix[i][j] = 0
    if first_col:
      for i in range(m):
        matrix[i][0] = 0
    if first_row:
      for j in range(n):
        matrix[0][j] = 0`,
        cpp: `class Solution {
public:
  void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    bool firstRow = false, firstCol = false;
    for (int i = 0; i < m; i++) {
      if (matrix[i][0] == 0) firstCol = true;
    }
    for (int j = 0; j < n; j++) {
      if (matrix[0][j] == 0) firstRow = true;
    }
    for (int i = 1; i < m; i++) {
      for (int j = 1; j < n; j++) {
        if (matrix[i][j] == 0) {
          matrix[i][0] = matrix[0][j] = 0;
        }
      }
    }
    for (int i = 1; i < m; i++) {
      if (matrix[i][0] == 0) {
        for (int j = 1; j < n; j++) matrix[i][j] = 0;
      }
    }
    for (int j = 1; j < n; j++) {
      if (matrix[0][j] == 0) {
        for (int i = 1; i < m; i++) matrix[i][j] = 0;
      }
    }
    if (firstCol) {
      for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
    if (firstRow) {
      for (int j = 0; j < n; j++) matrix[0][j] = 0;
    }
  }
};`,
      },
      complexity: {
        time: "O(m * n) for scanning the matrix",
        space: "O(1) for using the matrix itself as storage",
      },
      explanation:
        "Use the first row and column as markers to indicate which rows and columns should be set to zero. Store the state of the first row and column separately to avoid overwriting. Process the rest of the matrix, then update rows and columns based on markers.",
    },
  },
  {
    id: 137,
    status: false,
    star: false,
    problem: "Happy Number",
    leetcodeLink: "https://leetcode.com/problems/happy-number/",
    difficulty: "Easy",
    description:
      "Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.",
    examples: [
      {
        input: "n = 19",
        output: "true",
      },
      {
        input: "n = 2",
        output: "false",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public boolean isHappy(int n) {
    Set<Integer> seen = new HashSet<>();
    while (n != 1) {
      if (seen.contains(n)) return false;
      seen.add(n);
      int sum = 0;
      while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
      }
      n = sum;
    }
    return true;
  }
}`,
        python: `class Solution:
  def isHappy(self, n: int) -> bool:
    seen = set()
    while n != 1:
      if n in seen:
        return False
      seen.add(n)
      n = sum(int(d) ** 2 for d in str(n))
    return True`,
        cpp: `class Solution {
public:
  bool isHappy(int n) {
    unordered_set<int> seen;
    while (n != 1) {
      if (seen.count(n)) return false;
      seen.insert(n);
      int sum = 0;
      while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
      }
      n = sum;
    }
    return true;
  }
};`,
      },
      complexity: {
        time: "O(log n) for processing digits, potentially repeated",
        space: "O(log n) for storing seen numbers",
      },
      explanation:
        "Repeatedly compute the sum of squares of digits. Use a set to detect cycles. If the number becomes 1, it’s happy; if a cycle is detected, it’s not.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public boolean isHappy(int n) {
    int slow = n, fast = n;
    do {
      slow = squareSum(slow);
      fast = squareSum(squareSum(fast));
      if (fast == 1) return true;
    } while (slow != fast);
    return slow == 1;
  }
  private int squareSum(int n) {
    int sum = 0;
    while (n > 0) {
      int digit = n % 10;
      sum += digit * digit;
      n /= 10;
    }
    return sum;
  }
}`,
        python: `class Solution:
  def isHappy(self, n: int) -> bool:
    def square_sum(n):
      return sum(int(d) ** 2 for d in str(n))
    slow = fast = n
    while True:
      slow = square_sum(slow)
      fast = square_sum(square_sum(fast))
      if fast == 1:
        return True
      if slow == fast:
        return slow == 1`,
        cpp: `class Solution {
public:
  bool isHappy(int n) {
    int slow = n, fast = n;
    do {
      slow = squareSum(slow);
      fast = squareSum(squareSum(fast));
      if (fast == 1) return true;
    } while (slow != fast);
    return slow == 1;
  }
private:
  int squareSum(int n) {
    int sum = 0;
    while (n > 0) {
      int digit = n % 10;
      sum += digit * digit;
      n /= 10;
    }
    return sum;
  }
};`,
      },
      complexity: {
        time: "O(log n) for processing digits, potentially repeated",
        space: "O(1) for constant extra space",
      },
      explanation:
        "Use Floyd’s cycle detection (tortoise and hare) to detect loops. Compute the sum of squares of digits for slow (one step) and fast (two steps). If they meet, check if the meeting point is 1 (happy number).",
    },
  },
  {
    id: 138,
    status: false,
    star: false,
    problem: "Plus One",
    leetcodeLink: "https://leetcode.com/problems/plus-one/",
    difficulty: "Easy",
    description:
      "You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's. Increment the large integer by one and return the resulting array of digits.",
    examples: [
      {
        input: "digits = [1,2,3]",
        output: "[1,2,4]",
      },
      {
        input: "digits = [9,9]",
        output: "[1,0,0]",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int[] plusOne(int[] digits) {
    StringBuilder sb = new StringBuilder();
    for (int digit : digits) {
      sb.append(digit);
    }
    String num = new BigInteger(sb.toString()).add(BigInteger.ONE).toString();
    int[] result = new int[num.length()];
    for (int i = 0; i < num.length(); i++) {
      result[i] = num.charAt(i) - '0';
    }
    return result;
  }
}`,
        python: `class Solution:
  def plusOne(self, digits: List[int]) -> List[int]:
    num = int("".join(map(str, digits))) + 1
    return [int(d) for d in str(num)]`,
        cpp: `class Solution {
public:
  vector<int> plusOne(vector<int>& digits) {
    string num;
    for (int digit : digits) {
      num += to_string(digit);
    }
    long long val = stoll(num) + 1;
    string result = to_string(val);
    vector<int> ans;
    for (char c : result) {
      ans.push_back(c - '0');
    }
    return ans;
  }
};`,
      },
      complexity: {
        time: "O(n) for converting digits to number and back",
        space: "O(n) for storing the string and result array",
      },
      explanation:
        "Convert the digit array to a string, parse it as an integer, add one, and convert back to an array of digits. Handles large numbers but uses extra space.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int[] plusOne(int[] digits) {
    int n = digits.length;
    for (int i = n - 1; i >= 0; i--) {
      if (digits[i] < 9) {
        digits[i]++;
        return digits;
      }
      digits[i] = 0;
    }
    int[] result = new int[n + 1];
    result[0] = 1;
    return result;
  }
}`,
        python: `class Solution:
  def plusOne(self, digits: List[int]) -> List[int]:
    for i in range(len(digits) - 1, -1, -1):
      if digits[i] < 9:
        digits[i] += 1
        return digits
      digits[i] = 0
    return [1] + [0] * len(digits)`,
        cpp: `class Solution {
public:
  vector<int> plusOne(vector<int>& digits) {
    int n = digits.size();
    for (int i = n - 1; i >= 0; i--) {
      if (digits[i] < 9) {
        digits[i]++;
        return digits;
      }
      digits[i] = 0;
    }
    vector<int> result(n + 1, 0);
    result[0] = 1;
    return result;
  }
};`,
      },
      complexity: {
        time: "O(n) for scanning digits",
        space: "O(1) for in-place modification (or O(n) if new array is needed)",
      },
      explanation:
        "Start from the least significant digit. If it’s less than 9, increment and return. Otherwise, set it to 0 and carry over. If all digits are 9, create a new array with an extra digit set to 1.",
    },
  },
  {
    id: 139,
    status: false,
    star: false,
    problem: "Pow(x, n)",
    leetcodeLink: "https://leetcode.com/problems/powx-n/",
    difficulty: "Medium",
    description:
      "Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).",
    examples: [
      {
        input: "x = 2.00000, n = 10",
        output: "1024.00000",
      },
      {
        input: "x = 2.10000, n = 3",
        output: "9.26100",
      },
      {
        input: "x = 2.00000, n = -2",
        output: "0.25000",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public double myPow(double x, int n) {
    double result = 1.0;
    long absN = Math.abs((long) n);
    for (int i = 0; i < absN; i++) {
      result *= x;
    }
    return n < 0 ? 1.0 / result : result;
  }
}`,
        python: `class Solution:
  def myPow(self, x: float, n: int) -> float:
    result = 1.0
    abs_n = abs(n)
    for _ in range(abs_n):
      result *= x
    return 1.0 / result if n < 0 else result`,
        cpp: `class Solution {
public:
  double myPow(double x, int n) {
    double result = 1.0;
    long absN = abs((long)n);
    for (int i = 0; i < absN; i++) {
      result *= x;
    }
    return n < 0 ? 1.0 / result : result;
  }
};`,
      },
      complexity: {
        time: "O(n) for iterating n times",
        space: "O(1) for constant extra space",
      },
      explanation:
        "Multiply x by itself n times. For negative n, take the reciprocal of the result. This is inefficient for large n.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public double myPow(double x, int n) {
    long N = n;
    if (N < 0) {
      x = 1 / x;
      N = -N;
    }
    double result = 1.0, current = x;
    while (N > 0) {
      if ((N & 1) == 1) {
        result *= current;
      }
      current *= current;
      N >>= 1;
    }
    return result;
  }
}`,
        python: `class Solution:
  def myPow(self, x: float, n: int) -> float:
    if n < 0:
      x = 1 / x
      n = -n
    result, current = 1.0, x
    while n > 0:
      if n & 1:
        result *= current
      current *= current
      n >>= 1
    return result`,
        cpp: `class Solution {
public:
  double myPow(double x, int n) {
    long N = n;
    if (N < 0) {
      x = 1 / x;
      N = -N;
    }
    double result = 1.0, current = x;
    while (N > 0) {
      if (N & 1) {
        result *= current;
      }
      current *= current;
      N >>= 1;
    }
    return result;
  }
};`,
      },
      complexity: {
        time: "O(log n) for binary exponentiation",
        space: "O(1) for constant extra space",
      },
      explanation:
        "Use binary exponentiation. Convert n to binary and multiply the result by x^(2^i) whenever the i-th bit is 1. Square x in each iteration. For negative n, use 1/x and positive n.",
    },
  },
  {
    id: 140,
    status: false,
    star: false,
    problem: "Multiply Strings",
    leetcodeLink: "https://leetcode.com/problems/multiply-strings/",
    difficulty: "Medium",
    description:
      "Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string. You must not use any built-in BigInteger library or convert the inputs to integer directly.",
    examples: [
      {
        input: "num1 = \"2\", num2 = \"3\"",
        output: "\"6\"",
      },
      {
        input: "num1 = \"123\", num2 = \"456\"",
        output: "\"56088\"",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public String multiply(String num1, String num2) {
    int m = num1.length(), n = num2.length();
    int[] result = new int[m + n];
    for (int i = m - 1; i >= 0; i--) {
      for (int j = n - 1; j >= 0; j--) {
        int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
        int sum = mul + result[i + j + 1];
        result[i + j + 1] = sum % 10;
        result[i + j] += sum / 10;
      }
    }
    StringBuilder sb = new StringBuilder();
    for (int num : result) {
      if (!(sb.length() == 0 && num == 0)) {
        sb.append(num);
      }
    }
    return sb.length() == 0 ? "0" : sb.toString();
  }
}`,
        python: `class Solution:
  def multiply(self, num1: str, num2: str) -> str:
    m, n = len(num1), len(num2)
    result = [0] * (m + n)
    for i in range(m - 1, -1, -1):
      for j in range(n - 1, -1, -1):
        mul = (int(num1[i]) * int(num2[j]))
        sum_val = mul + result[i + j + 1]
        result[i + j + 1] = sum_val % 10
        result[i + j] += sum_val // 10
    result_str = ''.join(map(str, result)).lstrip('0')
    return result_str if result_str else '0'`,
        cpp: `class Solution {
public:
  string multiply(string num1, string num2) {
    int m = num1.size(), n = num2.size();
    vector<int> result(m + n, 0);
    for (int i = m - 1; i >= 0; i--) {
      for (int j = n - 1; j >= 0; j--) {
        int mul = (num1[i] - '0') * (num2[j] - '0');
        int sum = mul + result[i + j + 1];
        result[i + j + 1] = sum % 10;
        result[i + j] += sum / 10;
      }
    }
    string ans;
    for (int num : result) {
      if (!(ans.empty() && num == 0)) {
        ans += to_string(num);
      }
    }
    return ans.empty() ? "0" : ans;
  }
};`,
      },
      complexity: {
        time: "O(m * n) for multiplying each digit pair",
        space: "O(m + n) for the result array",
      },
      explanation:
        "Simulate manual multiplication by multiplying each digit pair and storing results in an array, handling carries. Convert the final array to a string, removing leading zeros.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public String multiply(String num1, String num2) {
    if (num1.equals("0") || num2.equals("0")) return "0";
    int m = num1.length(), n = num2.length();
    int[] result = new int[m + n];
    for (int i = m - 1; i >= 0; i--) {
      for (int j = n - 1; j >= 0; j--) {
        int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
        int p1 = i + j, p2 = i + j + 1;
        int sum = mul + result[p2];
        result[p2] = sum % 10;
        result[p1] += sum / 10;
      }
    }
    StringBuilder sb = new StringBuilder();
    for (int num : result) {
      if (!(sb.length() == 0 && num == 0)) {
        sb.append(num);
      }
    }
    return sb.length() == 0 ? "0" : sb.toString();
  }
}`,
        python: `class Solution:
  def multiply(self, num1: str, num2: str) -> str:
    if num1 == "0" or num2 == "0":
      return "0"
    m, n = len(num1), len(num2)
    result = [0] * (m + n)
    for i in range(m - 1, -1, -1):
      for j in range(n - 1, -1, -1):
        mul = (int(num1[i]) * int(num2[j]))
        p1, p2 = i + j, i + j + 1
        sum_val = mul + result[p2]
        result[p2] = sum_val % 10
        result[p1] += sum_val // 10
    result_str = ''.join(map(str, result)).lstrip('0')
    return result_str if result_str else '0'`,
        cpp: `class Solution {
public:
  string multiply(string num1, string num2) {
    if (num1 == "0" || num2 == "0") return "0";
    int m = num1.size(), n = num2.size();
    vector<int> result(m + n, 0);
    for (int i = m - 1; i >= 0; i--) {
      for (int j = n - 1; j >= 0; j--) {
        int mul = (num1[i] - '0') * (num2[j] - '0');
        int p1 = i + j, p2 = i + j + 1;
        int sum = mul + result[p2];
        result[p2] = sum % 10;
        result[p1] += sum / 10;
      }
    }
    string ans;
    for (int num : result) {
      if (!(ans.empty() && num == 0)) {
        ans += to_string(num);
      }
    }
    return ans.empty() ? "0" : ans;
  }
};`,
      },
      complexity: {
        time: "O(m * n) for multiplying each digit pair",
        space: "O(m + n) for the result array",
      },
      explanation:
        "Optimize by checking for zero inputs early. Use the same digit-by-digit multiplication but with clearer indexing (p1, p2) for carry and sum positions. Convert the result array to a string, removing leading zeros.",
    },
  },
  {
    id: 141,
    status: false,
    star: false,
    problem: "Detect Squares",
    leetcodeLink: "https://leetcode.com/problems/detect-squares/",
    difficulty: "Medium",
    description:
      "You are given a stream of points on the X-Y plane. Design an algorithm that adds new points and counts the number of ways to form axis-aligned squares with the given points.",
    examples: [
      {
        input: '["DetectSquares", "add", "add", "add", "count", "add", "count"]\n[[], [[3, 10]], [[11, 2]], [[3, 2]], [[11, 10]], [[14, 8]], [[11, 10]]]',
        output: "[null, null, null, null, 1, null, 2]",
      },
    ],
    bruteForce: {
      code: {
        java: `class DetectSquares {
  List<int[]> points;
  public DetectSquares() {
    points = new ArrayList<>();
  }
  public void add(int[] point) {
    points.add(point);
  }
  public int count(int[] point) {
    int px = point[0], py = point[1], count = 0;
    for (int[] p : points) {
      int x = p[0], y = p[1];
      if (x != px && y != py && Math.abs(px - x) == Math.abs(py - y)) {
        boolean found1 = false, found2 = false;
        for (int[] p2 : points) {
          if (p2[0] == x && p2[1] == py) found1 = true;
          if (p2[0] == px && p2[1] == y) found2 = true;
        }
        if (found1 && found2) count++;
      }
    }
    return count;
  }
}`,
        python: `class DetectSquares:
  def __init__(self):
    self.points = []
  def add(self, point: List[int]) -> None:
    self.points.append(point)
  def count(self, point: List[int]) -> int:
    px, py = point
    count = 0
    for x, y in self.points:
      if x != px and y != py and abs(px - x) == abs(py - y):
        found1 = found2 = False
        for x2, y2 in self.points:
          if x2 == x and y2 == py:
            found1 = True
          if x2 == px and y2 == y:
            found2 = True
        if found1 and found2:
          count += 1
    return count`,
        cpp: `class DetectSquares {
  vector<pair<int, int>> points;
public:
  DetectSquares() {}
  void add(vector<int> point) {
    points.push_back({point[0], point[1]});
  }
  int count(vector<int> point) {
    int px = point[0], py = point[1], count = 0;
    for (auto [x, y] : points) {
      if (x != px && y != py && abs(px - x) == abs(py - y)) {
        bool found1 = false, found2 = false;
        for (auto [x2, y2] : points) {
          if (x2 == x && y2 == py) found1 = true;
          if (x2 == px && y2 == y) found2 = true;
        }
        if (found1 && found2) count++;
      }
    }
    return count;
  }
};`,
      },
      complexity: {
        time: "O(n^2) for count, where n is the number of points",
        space: "O(n) for storing points",
      },
      explanation:
        "Store all points in a list. For each point in count, check for potential square corners by ensuring equal side lengths. Verify the other two corners exist in the list.",
    },
    optimal: {
      code: {
        java: `class DetectSquares {
  Map<Integer, Map<Integer, Integer>> points;
  public DetectSquares() {
    points = new HashMap<>();
  }
  public void add(int[] point) {
    int x = point[0], y = point[1];
    points.computeIfAbsent(x, k -> new HashMap<>()).merge(y, 1, Integer::sum);
  }
  public int count(int[] point) {
    int px = point[0], py = point[1], count = 0;
    for (int x : points.keySet()) {
      if (x == px) continue;
      int dist = Math.abs(px - x);
      for (int y : points.get(x).keySet()) {
        if (Math.abs(py - y) == dist) {
          count += points.get(x).get(y) * 
                   points.getOrDefault(px, new HashMap<>()).getOrDefault(y, 0) * 
                   points.getOrDefault(x, new HashMap<>()).getOrDefault(py, 0);
        }
      }
    }
    return count;
  }
}`,
        python: `class DetectSquares:
  def __init__(self):
    self.points = {}
  def add(self, point: List[int]) -> None:
    x, y = point
    if x not in self.points:
      self.points[x] = {}
    self.points[x][y] = self.points[x].get(y, 0) + 1
  def count(self, point: List[int]) -> int:
    px, py = point
    count = 0
    for x in self.points:
      if x == px:
        continue
      dist = abs(px - x)
      for y in self.points[x]:
        if abs(py - y) == dist:
          count += self.points[x][y] * \
                   self.points.get(px, {}).get(y, 0) * \
                   self.points.get(x, {}).get(py, 0)
    return count`,
        cpp: `class DetectSquares {
  unordered_map<int, unordered_map<int, int>> points;
public:
  DetectSquares() {}
  void add(vector<int> point) {
    points[point[0]][point[1]]++;
  }
  int count(vector<int> point) {
    int px = point[0], py = point[1], count = 0;
    for (auto& [x, yMap] : points) {
      if (x == px) continue;
      int dist = abs(px - x);
      for (auto& [y, freq] : yMap) {
        if (abs(py - y) == dist) {
          count += freq * points[px][y] * points[x][py];
        }
      }
    }
    return count;
  }
};`,
      },
      complexity: {
        time: "O(n) for count, where n is the number of unique x-coordinates",
        space: "O(n) for storing points in a hash map",
      },
      explanation:
        "Use a hash map to store point counts by x and y coordinates. For each point in count, find points with equal side lengths (forming a square) and multiply the frequencies of the three other corners to calculate the number of squares.",
    },
  },
];