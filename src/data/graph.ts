import { Question } from "../types/Question";

export const graphQuestions: Question[] = [
  // ==================== MEDIUM ====================
  {
    id: 79,
    status: false,
    star: false,
    problem: "Number of Islands",
    leetcodeLink: "https://leetcode.com/problems/number-of-islands/",
    difficulty: "Medium",
    description:
      "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    examples: [
      {
        input: `grid = [
          ["1","1","1","1","0"],
          ["1","1","0","1","0"],
          ["1","1","0","0","0"],
          ["0","0","0","0","0"]
        ]`,
        output: "1",
      },
      {
        input: `grid = [
          ["1","1","0","0","0"],
          ["1","1","0","0","0"],
          ["0","0","1","0","0"],
          ["0","0","0","1","1"]
        ]`,
        output: "3",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int numIslands(char[][] grid) {
    int m = grid.length, n = grid[0].length;
    int islands = 0;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j] == '1') {
          islands++;
          markIsland(grid, i, j);
        }
      }
    }
    
    return islands;
  }
  
  private void markIsland(char[][] grid, int i, int j) {
    int m = grid.length, n = grid[0].length;
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != '1') {
      return;
    }
    
    grid[i][j] = '0';
    for (int r = 0; r < m; r++) {
      for (int c = 0; c < n; c++) {
        if (grid[r][c] == '1' && isConnected(grid, i, j, r, c)) {
          markIsland(grid, r, c);
        }
      }
    }
  }
  
  private boolean isConnected(char[][] grid, int i1, int j1, int i2, int j2) {
    return Math.abs(i1 - i2) + Math.abs(j1 - j2) == 1;
  }
}`,
        python: `class Solution:
  def numIslands(self, grid: List[List[str]]) -> int:
    m, n = len(grid), len(grid[0])
    islands = 0
    
    def mark_island(i, j):
      if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] != '1':
        return
      grid[i][j] = '0'
      for r in range(m):
        for c in range(n):
          if grid[r][c] == '1' and abs(i - r) + abs(j - c) == 1:
            mark_island(r, c)
    
    for i in range(m):
      for j in range(n):
        if grid[i][j] == '1':
          islands += 1
          mark_island(i, j)
    
    return islands`,
        cpp: `class Solution {
public:
  int numIslands(vector<vector<char>>& grid) {
    int m = grid.size(), n = grid[0].size();
    int islands = 0;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j] == '1') {
          islands++;
          markIsland(grid, i, j);
        }
      }
    }
    
    return islands;
  }
  
private:
  void markIsland(vector<vector<char>>& grid, int i, int j) {
    int m = grid.size(), n = grid[0].size();
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != '1') {
      return;
    }
    
    grid[i][j] = '0';
    for (int r = 0; r < m; r++) {
      for (int c = 0; c < n; c++) {
        if (grid[r][c] == '1' && (abs(i - r) + abs(j - c) == 1)) {
          markIsland(grid, r, c);
        }
      }
    }
  }
};`,
      },
      complexity: {
        time: "O(M * N * (M * N)) where M*N is grid size, due to scanning grid for each land cell",
        space: "O(M * N) for recursion stack in worst case",
      },
      explanation:
        "For each '1', mark the entire island by checking all cells for connectivity, leading to redundant scans.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int numIslands(char[][] grid) {
    int m = grid.length, n = grid[0].length;
    int islands = 0;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j] == '1') {
          islands++;
          dfs(grid, i, j);
        }
      }
    }
    
    return islands;
  }
  
  private void dfs(char[][] grid, int i, int j) {
    int m = grid.length, n = grid[0].length;
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != '1') {
      return;
    }
    
    grid[i][j] = '0';
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
  }
}`,
        python: `class Solution:
  def numIslands(self, grid: List[List[str]]) -> int:
    m, n = len(grid), len(grid[0])
    islands = 0
    
    def dfs(i, j):
      if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] != '1':
        return
      grid[i][j] = '0'
      dfs(i + 1, j)
      dfs(i - 1, j)
      dfs(i, j + 1)
      dfs(i, j - 1)
    
    for i in range(m):
      for j in range(n):
        if grid[i][j] == '1':
          islands += 1
          dfs(i, j)
    
    return islands`,
        cpp: `class Solution {
public:
  int numIslands(vector<vector<char>>& grid) {
    int m = grid.size(), n = grid[0].size();
    int islands = 0;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j] == '1') {
          islands++;
          dfs(grid, i, j);
        }
      }
    }
    
    return islands;
  }
  
private:
  void dfs(vector<vector<char>>& grid, int i, int j) {
    int m = grid.size(), n = grid[0].size();
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != '1') {
      return;
    }
    
    grid[i][j] = '0';
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
  }
};`,
      },
      complexity: {
        time: "O(M * N) where M*N is grid size",
        space: "O(M * N) for recursion stack in worst case",
      },
      explanation:
        "Use DFS to mark connected '1's as visited in a single pass per island, avoiding redundant scans.",
    },
  },
  {
    id: 80,
    status: false,
    star: false,
    problem: "Max Area of Island",
    leetcodeLink: "https://leetcode.com/problems/max-area-of-island/",
    difficulty: "Medium",
    description:
      "Given a non-empty 2D array grid of 0's and 1's, an island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical). Return the maximum area of an island in the grid.",
    examples: [
      {
        input: `grid = [
          [0,0,1,0,0],
          [0,0,0,0,0],
          [0,1,1,0,0],
          [0,0,0,0,0]
        ]`,
        output: "2",
      },
      {
        input: `grid = [[0,0,0],[0,0,0]]`,
        output: "0",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int maxAreaOfIsland(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    int maxArea = 0;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j] == 1) {
          int area = 0;
          Queue<int[]> queue = new LinkedList<>();
          queue.offer(new int[]{i, j});
          grid[i][j] = 0;
          
          while (!queue.isEmpty()) {
            int[] curr = queue.poll();
            int r = curr[0], c = curr[1];
            area++;
            
            for (int nr = 0; nr < m; nr++) {
              for (int nc = 0; nc < n; nc++) {
                if (grid[nr][nc] == 1 && Math.abs(nr - r) + Math.abs(nc - c) == 1) {
                  queue.offer(new int[]{nr, nc});
                  grid[nr][nc] = 0;
                }
              }
            }
          }
          maxArea = Math.max(maxArea, area);
        }
      }
    }
    
    return maxArea;
  }
}`,
        python: `class Solution:
  def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
    m, n = len(grid), len(grid[0])
    max_area = 0
    
    for i in range(m):
      for j in range(n):
        if grid[i][j] == 1:
          area = 0
          queue = deque([(i, j)])
          grid[i][j] = 0
          
          while queue:
            r, c = queue.popleft()
            area += 1
            for nr in range(m):
              for nc in range(n):
                if grid[nr][nc] == 1 and abs(nr - r) + abs(nc - c) == 1:
                  queue.append((nr, nc))
                  grid[nr][nc] = 0
          
          max_area = max(max_area, area)
    
    return max_area`,
        cpp: `class Solution {
public:
  int maxAreaOfIsland(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    int maxArea = 0;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j] == 1) {
          int area = 0;
          queue<pair<int, int>> q;
          q.push({i, j});
          grid[i][j] = 0;
          
          while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            area++;
            for (int nr = 0; nr < m; nr++) {
              for (int nc = 0; nc < n; nc++) {
                if (grid[nr][nc] == 1 && abs(nr - r) + abs(nc - c) == 1) {
                  q.push({nr, nc});
                  grid[nr][nc] = 0;
                }
              }
            }
          }
          maxArea = max(maxArea, area);
        }
      }
    }
    
    return maxArea;
  }
};`,
      },
      complexity: {
        time: "O(M * N * (M * N)) where M*N is grid size, due to scanning grid for each land cell",
        space: "O(M * N) for queue in worst case",
      },
      explanation:
        "Use BFS to compute area of each island, scanning entire grid for adjacent cells, leading to inefficiency.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int maxAreaOfIsland(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    int maxArea = 0;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j] == 1) {
          maxArea = Math.max(maxArea, dfs(grid, i, j));
        }
      }
    }
    
    return maxArea;
  }
  
  private int dfs(int[][] grid, int i, int j) {
    int m = grid.length, n = grid[0].length;
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != 1) {
      return 0;
    }
    
    grid[i][j] = 0;
    return 1 + dfs(grid, i + 1, j) + dfs(grid, i - 1, j) + 
               dfs(grid, i, j + 1) + dfs(grid, i, j - 1);
  }
}`,
        python: `class Solution:
  def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
    m, n = len(grid), len(grid[0])
    max_area = 0
    
    def dfs(i, j):
      if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] != 1:
        return 0
      grid[i][j] = 0
      return 1 + dfs(i + 1, j) + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1)
    
    for i in range(m):
      for j in range(n):
        if grid[i][j] == 1:
          max_area = max(max_area, dfs(i, j))
    
    return max_area`,
        cpp: `class Solution {
public:
  int maxAreaOfIsland(vector<vector<int>> grid) {
    int m = grid.size(), n = grid[0].size();
    int maxArea = 0;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j]) {
          maxArea = max(maxArea, dfs(grid, i, n));
        }
      }
    }
    
    return maxArea;
  }
  
private:
  int dfs(vector<vector<int>>& grid, int i, int j) {
    int m = grid.size(), n = grid[0].size();
    if (i < 0 || i >= m || j < 0 || j >= n || !grid[i][j]) {
      return 0;
    }
    
    grid[i][j] = 0;
    return 1 + dfs(grid, i + 1, j) + dfs(grid, i - 1, j) + 
           dfs(grid, i, j + 1) + dfs(grid, i, j - 1);
  }
};`,
      },
      complexity: {
        time: "O(M * N) where M*N is grid size",
        space: "O(M * N) for recursion stack in worst case",
      },
      explanation:
        "Use DFS to compute area of each island in a single pass, checking only adjacent cells.",
    },
  },
  {
    id: 81,
    status: false,
    star: false,
    problem: "Clone Graph",
    leetcodeLink: "https://leetcode.com/problems/clone-graph/",
    difficulty: "Medium",
    description:
      "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
    examples: [
      {
        input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        output: "[[2,4],[1,3],[2,4],[1,3]]",
      },
      { input: "adjList = [[]]", output: "[[]]" },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public Node cloneGraph(Node node) {
    if (node == null) return null;
    
    Map<Integer, Node> oldToNew = new HashMap<>();
    Set<Integer> visited = new HashSet<>();
    
    // Create all nodes
    Queue<Node> queue = new LinkedList<>();
    queue.offer(node);
    visited.add(node.val);
    
    while (!queue.isEmpty()) {
      Node curr = queue.poll();
      oldToNew.put(curr.val, new Node(curr.val));
      
      for (Node neighbor : curr.neighbors) {
        if (!visited.contains(neighbor.val)) {
          visited.add(neighbor.val);
          queue.offer(neighbor);
        }
      }
    }
    
    // Connect nodes
    queue.offer(node);
    visited.clear();
    visited.add(node.val);
    
    while (!queue.isEmpty()) {
      Node curr = queue.poll();
      Node newCurr = oldToNew.get(curr.val);
      
      for (Node neighbor : curr.neighbors) {
        newCurr.neighbors.add(oldToNew.get(neighbor.val));
        if (!visited.contains(neighbor.val)) {
          visited.add(neighbor.val);
          queue.offer(neighbor);
        }
      }
    }
    
    return oldToNew.get(node.val);
  }
}`,
        python: `class Solution:
  def cloneGraph(self, node: 'Node') -> 'Node':
    if not node:
      return None
    
    old_to_new = {}
    visited = set()
    
    # Create all nodes
    queue = deque([node])
    visited.add(node.val)
    
    while queue:
      curr = queue.popleft()
      old_to_new[curr.val] = Node(curr.val)
      
      for neighbor in curr.neighbors:
        if neighbor.val not in visited:
          visited.add(neighbor.val)
          queue.append(neighbor)
    
    # Connect nodes
    visited.clear()
    queue.append(node)
    visited.add(node.val)
    
    while queue:
      curr = queue.popleft()
      new_curr = old_to_new[curr.val]
      
      for neighbor in curr.neighbors:
        new_curr.neighbors.append(old_to_new[neighbor.val])
        if neighbor.val not in visited:
          visited.add(neighbor.val)
          queue.append(neighbor)
    
    return old_to_new[node.val]`,
        cpp: `class Solution {
public:
  Node* cloneGraph(Node* node) {
    if (!node) return nullptr;
    
    unordered_map<int, Node*> oldToNew;
    unordered_set<int> visited;
    
    // Create all nodes
    queue<Node*> q;
    q.push(node);
    visited.insert(node->val);
    
    while (!q.empty()) {
      Node* curr = q.front(); q.pop();
      oldToNew[curr->val] = new Node(curr->val);
      
      for (Node* neighbor : curr->neighbors) {
        if (!visited.count(neighbor->val)) {
          visited.insert(neighbor->val);
          q.push(neighbor);
        }
      }
    }
    
    // Connect nodes
    visited.clear();
    q.push(node);
    visited.insert(node->val);
    
    while (!q.empty()) {
      Node* curr = q.front(); q.pop();
      Node* newCurr = oldToNew[curr->val];
      
      for (Node* neighbor : curr->neighbors) {
        newCurr->neighbors.push_back(oldToNew[neighbor->val]);
        if (!visited.count(neighbor->val)) {
          visited.insert(neighbor->val);
          q.push(neighbor);
        }
      }
    }
    
    return oldToNew[node->val];
  }
};`,
      },
      complexity: {
        time: "O(V + E) where V is number of vertices, E is number of edges (two passes)",
        space: "O(V) for map and queue",
      },
      explanation:
        "Use BFS to create nodes in one pass and connect them in another, requiring two traversals.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public Node cloneGraph(Node node) {
    if (node == null) return null;
    
    Map<Node, Node> oldToNew = new HashMap<>();
    return dfs(node, oldToNew);
  }
  
  private Node dfs(Node node, Map<Node, Node> oldToNew) {
    if (oldToNew.containsKey(node)) return oldToNew.get(node);
    
    Node copy = new Node(node.val);
    oldToNew.put(node, copy);
    
    for (Node neighbor : node.neighbors) {
      copy.neighbors.add(dfs(neighbor, oldToNew));
    }
    
    return copy;
  }
}`,
        python: `class Solution:
  def cloneGraph(self, node: 'Node') -> 'Node':
    if not node:
      return None
    
    old_to_new = {}
    
    def dfs(node):
      if node in old_to_new:
        return old_to_new[node]
      
      copy = Node(node.val)
      old_to_new[node] = copy
      
      for neighbor in node.neighbors:
        copy.neighbors.append(dfs(neighbor))
      
      return copy
    
    return dfs(node)`,
        cpp: `class Solution {
public:
  Node* cloneGraph(Node* node) {
    if (!node) return nullptr;
    
    unordered_map<Node*, Node*> oldToNew;
    
    function<Node*(Node*)> dfs = [&](Node* node) {
      if (oldToNew.count(node)) return oldToNew[node];
      
      Node* copy = new Node(node->val);
      oldToNew[node] = copy;
      
      for (Node* neighbor : node->neighbors) {
        copy->neighbors.push_back(dfs(neighbor));
      }
      
      return copy;
    };
    
    return dfs(node);
  }
};`,
      },
      complexity: {
        time: "O(V + E) where V is number of vertices, E is number of edges",
        space: "O(V) for map and recursion stack",
      },
      explanation:
        "Use DFS to create and connect nodes in a single pass, using a map to avoid duplicate nodes.",
    },
  },
  {
    id: 82,
    status: false,
    star: false,
    problem: "Walls and Gates",
    leetcodeLink: "https://leetcode.com/problems/walls-and-gates/",
    difficulty: "Medium",
    description:
      "You are given an m x n grid rooms initialized with three possible values: -1 (wall), 0 (gate), or INF (empty room). Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should remain INF.",
    examples: [
      {
        input: `rooms = [
          [INF,-1,0,INF],
          [INF,INF,INF,-1],
          [INF,-1,INF,-1],
          [0,-1,INF,INF]
        ]`,
        output: `[
          [3,-1,0,1],
          [2,2,1,-1],
          [1,-1,2,-1],
          [0,-1,3,4]
        ]`,
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public void wallsAndGates(int[][] rooms) {
    int m = rooms.length, n = rooms[0].length;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (rooms[i][j] == Integer.MAX_VALUE) {
          rooms[i][j] = findNearestGate(rooms, i, j);
        }
      }
    }
  }
  
  private int findNearestGate(int[][] rooms, int i, int j) {
    int m = rooms.length, n = rooms[0].length;
    Queue<int[]> queue = new LinkedList<>();
    queue.offer(new int[]{i, j});
    boolean[][] visited = new boolean[m][n];
    visited[i][j] = true;
    int distance = 0;
    
    while (!queue.isEmpty()) {
      int size = queue.size();
      for (int k = 0; k < size; k++) {
        int[] curr = queue.poll();
        int r = curr[0], c = curr[1];
        
        if (rooms[r][c] == 0) return distance;
        
        for (int[] dir : new int[][]{{1,0},{-1,0},{0,1},{0,-1}}) {
          int nr = r + dir[0], nc = c + dir[1];
          if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && rooms[nr][nc] != -1) {
            queue.offer(new int[]{nr, nc});
            visited[nr][nc] = true;
          }
        }
      }
      distance++;
    }
    
    return Integer.MAX_VALUE;
  }
}`,
        python: `class Solution:
  def wallsAndGates(self, rooms: List[List[int]]) -> None:
    m, n = len(rooms), len(rooms[0])
    
    def find_nearest_gate(i, j):
      queue = deque([(i, j)])
      visited = [[False] * n for _ in range(m)]
      visited[i][j] = True
      distance = 0
      
      while queue:
        for _ in range(len(queue)):
          r, c = queue.popleft()
          
          if rooms[r][c] == 0:
            return distance
          
          for nr, nc in [(r+1,c), (r-1,c), (r,c+1), (r,c-1)]:
            if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc] and rooms[nr][nc] != -1:
              queue.append((nr, nc))
              visited[nr][nc] = True
        distance += 1
      
      return float('inf')
    
    for i in range(m):
      for j in range(n):
        if rooms[i][j] == float('inf'):
          rooms[i][j] = find_nearest_gate(i, j)`,
        cpp: `class Solution {
public:
  void wallsAndGates(vector<vector<int>>& rooms) {
    int m = rooms.size(), n = rooms[0].size();
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (rooms[i][j] == INT_MAX) {
          rooms[i][j] = findNearestGate(rooms, i, j);
        }
      }
    }
  }
  
private:
  int findNearestGate(vector<vector<int>>& rooms, int i, int j) {
    int m = rooms.size(), n = rooms[0].size();
    queue<pair<int, int>> q;
    q.push({i, j});
    vector<vector<bool>> visited(m, vector<bool>(n, false));
    visited[i][j] = true;
    int distance = 0;
    
    while (!q.empty()) {
      int size = q.size();
      for (int k = 0; k < size; k++) {
        auto [r, c] = q.front(); q.pop();
        
        if (rooms[r][c] == 0) return distance;
        
        for (auto& dir : vector<pair<int, int>>{{1,0}, {-1,0}, {0,1}, {0,-1}}) {
          int nr = r + dir.first, nc = c + dir.second;
          if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && rooms[nr][nc] != -1) {
            q.push({nr, nc});
            visited[nr][nc] = true;
          }
        }
      }
      distance++;
    }
    
    return INT_MAX;
  }
};`,
      },
      complexity: {
        time: "O(M * N * (M * N)) where M*N is grid size, due to BFS for each empty room",
        space: "O(M * N) for queue and visited array",
      },
      explanation:
        "Run BFS from each empty room to find the nearest gate, leading to redundant searches.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public void wallsAndGates(int[][] rooms) {
    int m = rooms.length, n = rooms[0].length;
    Queue<int[]> queue = new LinkedList<>();
    
    // Add all gates to queue
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (rooms[i][j] == 0) {
          queue.offer(new int[]{i, j});
        }
      }
    }
    
    // BFS from gates
    int distance = 0;
    int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    
    while (!queue.isEmpty()) {
      int size = queue.size();
      distance++;
      
      for (int k = 0; k < size; k++) {
        int[] curr = queue.poll();
        int r = curr[0], c = curr[1];
        
        for (int[] dir : dirs) {
          int nr = r + dir[0], nc = c + dir[1];
          if (nr >= 0 && nr < m && nc >= 0 && nc < n && rooms[nr][nc] == Integer.MAX_VALUE) {
            rooms[nr][nc] = distance;
            queue.offer(new int[]{nr, nc});
          }
        }
      }
    }
  }
}`,
        python: `class Solution:
  def wallsAndGates(self, rooms: List[List[int]]) -> None:
    m, n = len(rooms), len(rooms[0])
    queue = deque()
    
    # Add gates to queue
    for i in range(m):
      for j in range(n):
        if rooms[i][j] == 0:
          queue.append((i, j))
    
    # BFS from gates
    distance = 0
    dirs = [(1,0), (-1,0), (0,1), (0,-1)]
    
    while queue:
      for _ in range(len(queue)):
        r, c = queue.popleft()
        
        for nr, nc in [(r+dr, c+dc) for dr, dc in dirs]:
          if 0 <= nr < m and 0 <= nc < n and rooms[nr][nc] == float('inf'):
            rooms[nr][nc] = distance + 1
            queue.append((nr, nc))
      distance += 1`,
        cpp: `class Solution {
public:wallsAndGates(vector<vector<int>>& rooms) {
    int m = rooms.size(), n = rooms[0].size();
    queue<pair<int, int>> q;
    
    // Add all gates to queue
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (rooms[i][j] == 0') {
          q.push({i, j});
        }
      }
    }
    
    // BFS from gates
    int distance = 0;
    vector<pair<int,int>>> dirs = {{1,0}, {-1,0}, {0,0}, {0,-1}};
    
    while (!q.empty()) {
      int size = q.size();
      distance++;
      
      for (int k = 0; k < size; k++) {
        auto [r, c] = q.front(); q.pop();
        
        for (auto& dir : dirs) {
          int nr = r + dir.first, nc = c + dir.second;
          if (nr >= 0 && nr < m && nc >= 0 && nc < n && rooms[nr][nc] == INT_MAX) {
            rooms[nr][nc] = distance;
            q.push({nr, nc});
          }
        }
      }
    }
  }
};`,
      },
      complexity: {
        time: "O(M * N) where M*N is grid size",
        space: "O(M * N) for queue in worst case",
      },
      explanation:
        "Start BFS from all gates simultaneously, updating distances to empty rooms in a single pass.",
    },
  },
  {
    id: 83,
    status: false,
    star: false,
    problem: "Rotting Oranges",
    leetcodeLink: "https://leetcode.com/problems/rotting-oranges/",
    difficulty: "Medium",
    description:
      "You are given an m x n grid where each cell can have one of three values: 0 (empty), 1 (fresh orange), or 2 (rotten orange). Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes until no fresh oranges remain, or -1 if impossible.",
    examples: [
      {
        input: `grid = [[2,1,1],[1,1,0],[0,1,1]]`,
        output: "4",
      },
      {
        input: `grid = [[2,1,1],[0,1,1],[1,0,1]]`,
        output: "-1",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public int orangesRotting(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    int fresh = 0;
    
    // Count fresh oranges
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j] == 1) fresh++;
      }
    }
    
    int minutes = 0;
    boolean changed;
    
    do {
      changed = false;
      int[][] temp = new int[m][n];
      for (int i = 0; i < m; i++) {
        temp[i] = grid[i].clone();
      }
      
      for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
          if (grid[i][j] == 2) {
            for (int[] dir : new int[][]{{1,0},{-1,0},{0,1},{0,-1}}) {
              int ni = i + dir[0], nj = j + dir[1];
              if (ni >= 0 && ni < m && nj >= 0 && nj < n && temp[ni][nj] == 1) {
                temp[ni][nj] = 2;
                fresh--;
                changed = true;
              }
            }
          }
        }
      }
      
      grid = temp;
      if (changed) minutes++;
    } while (changed && fresh > 0);
    
    return fresh == 0 ? minutes : -1;
  }
}`,
        python: `class Solution:
  def orangesRotting(self, grid: List[List[int]]) -> int:
    m, n = len(grid), len(grid[0])
    fresh = sum(row.count(1) for row in grid)
    
    minutes = 0
    while True:
      changed = False
      temp = [row[:] for row in grid]
      
      for i in range(m):
        for j in range(n):
          if grid[i][j] == 2:
            for ni, nj in [(i+1,j), (i-1,j), (i,j+1), (i,j-1)]:
              if 0 <= ni < m and 0 <= nj < n and temp[ni][nj] == 1:
                temp[ni][nj] = 2
                fresh -= 1
                changed = True
      
      grid = temp
      if not changed:
        break
      minutes += 1
    
    return minutes if fresh == 0 else -1`,
        cpp: `class Solution {
public:
  int orangesRotting(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    int fresh = 0;
    
    // Count fresh oranges
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j] == 1) fresh++;
      }
    }
    
    int minutes = 0;
    bool changed;
    
    do {
      changed = false;
      vector<vector<int>> temp = grid;
      
      for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
          if (grid[i][j] == 2) {
            for (auto& dir : vector<pair<int, int>>{{1,0}, {-1,0}, {0,1}, {0,-1}}) {
              int ni = i + dir.first, nj = j + dir.second;
              if (ni >= 0 && ni < m && nj >= 0 && nj < n && temp[ni][nj] == 1) {
                temp[ni][nj] = 2;
                fresh--;
                changed = true;
              }
            }
          }
        }
      }
      
      grid = temp;
      if (changed) minutes++;
    } while (changed && fresh > 0);
    
    return fresh == 0 ? minutes : -1;
  }
};`,
      },
      complexity: {
        time: "O(M * N * T) where M*N is grid size, T is number of minutes needed",
        space: "O(M * N) for temporary grid copy",
      },
      explanation:
        "Simulate rotting process by scanning grid each minute, creating a new grid copy, which is inefficient.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public int orangesRotting(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    Queue<int[]> queue = new LinkedList<>();
    int fresh = 0;
    
    // Add rotten oranges to queue and count fresh
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j] == 2) queue.offer(new int[]{i, j});
        else if (grid[i][j] == 1) fresh++;
      }
    }
    
    if (fresh == 0) return 0;
    
    int minutes = 0;
    int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    
    while (!queue.isEmpty()) {
      int size = queue.size();
      boolean rotted = false;
      
      for (int k = 0; k < size; k++) {
        int[] curr = queue.poll();
        int r = curr[0], c = curr[1];
        
        for (int[] dir : dirs) {
          int nr = r + dir[0], nc = c + dir[1];
          if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
            grid[nr][nc] = 2;
            queue.offer(new int[]{nr, nc});
            fresh--;
            rotted = true;
          }
        }
      }
      
      if (rotted) minutes++;
    }
    
    return fresh == 0 ? minutes : -1;
  }
}`,
        python: `class Solution:
  def orangesRotting(self, grid: List[List[int]]) -> int:
    m, n = len(grid), len(grid[0])
    queue = deque()
    fresh = 0
    
    # Add rotten oranges and count fresh
    for i in range(m):
      for j in range(n):
        if grid[i][j] == 2:
          queue.append((i, j))
        elif grid[i][j] == 1:
          fresh += 1
    
    if fresh == 0:
      return 0
    
    minutes = 0
    dirs = [(1,0), (-1,0), (0,1), (0,-1)]
    
    while queue:
      rotted = False
      for _ in range(len(queue)):
        r, c = queue.popleft()
        
        for nr, nc in [(r+dr, c+dc) for dr, dc in dirs]:
          if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
            grid[nr][nc] = 2
            queue.append((nr, nc))
            fresh -= 1
            rotted = True
      if rotted:
        minutes += 1
    
    return minutes if fresh == 0 else -1`,
        cpp: `class Solution {
public:
  int orangesRotting(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    queue<pair<int, int>> q;
    int fresh = 0;
    
    // Add rotten oranges and count fresh
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j] == 2) q.push({i, j});
        else if (grid[i][j] == 1) fresh++;
      }
    }
    
    if (fresh == 0) return 0;
    
    int minutes = 0;
    vector<pair<int, int>> dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    
    while (!q.empty()) {
      int size = q.size();
      bool rotted = false;
      
      for (int k = 0; k < size; k++) {
        auto [r, c] = q.front(); q.pop();
        
        for (auto& dir : dirs) {
          int nr = r + dir.first, nc = c + dir.second;
          if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
            grid[nr][nc] = 2;
            q.push({nr, nc});
            fresh--;
            rotted = true;
          }
        }
      }
      
      if (rotted) minutes++;
    }
    
    return fresh == 0 ? minutes : -1;
  }
};`,
      },
      complexity: {
        time: "O(M * N) where M*N is grid size",
        space: "O(M * N) for queue in worst case",
      },
      explanation:
        "Use BFS starting from all rotten oranges, spreading rot simultaneously and counting minutes.",
    },
  },
  {
    id: 84,
    status: false,
    star: false,
    problem: "Pacific Atlantic Water Flow",
    leetcodeLink: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    difficulty: "Medium",
    description:
      "Given an m x n matrix heights of non-negative integers representing the height of each unit cell in a continent, the Pacific Ocean touches the left and top edges, and the Atlantic Ocean touches the right and bottom edges. Water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower. Find the list of grid coordinates where water can flow to both the Pacific and Atlantic oceans.",
    examples: [
      {
        input: `heights = [
          [1,2,2,3,5],
          [3,2,3,4,4],
          [2,4,5,3,1],
          [6,7,1,4,5],
          [5,1,1,2,4]
        ]`,
        output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public List<List<Integer>> pacificAtlantic(int[][] heights) {
    List<List<Integer>> result = new ArrayList<>();
    int m = heights.length, n = heights[0].length;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        boolean[] canReach = new boolean[2];
        dfs(heights, i, j, new boolean[m][n], canReach);
        if (canReach[0] && canReach[1]) {
          result.add(Arrays.asList(i, j));
        }
      }
    }
    
    return result;
  }
  
  private void dfs(int[][] heights, int i, int j, boolean[][] visited, boolean[] canReach) {
    int m = heights.length, n = heights[0].length;
    visited[i][j] = true;
    
    if (i == 0 || j == 0) canReach[0] = true; // Pacific
    if (i == m-1 || j == n-1) canReach[1] = true; // Atlantic
    
    int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    for (int[] dir : dirs) {
      int ni = i + dir[0], nj = j + dir[1];
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && !visited[ni][nj] && 
          heights[ni][nj] <= heights[i][j]) {
        dfs(heights, ni, nj, visited, canReach);
      }
    }
  }
}`,
        python: `class Solution:
  def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
    m, n = len(heights), len(heights[0])
    result = []
    
    def dfs(i, j, visited, can_reach):
      visited[i][j] = True
      
      if i == 0 or j == 0:
        can_reach[0] = True  # Pacific
      if i == m-1 or j == n-1:
        can_reach[1] = True  # Atlantic
      
      for ni, nj in [(i+1,j), (i-1,j), (i,j+1), (i,j-1)]:
        if 0 <= ni < m and 0 <= nj < n and not visited[ni][nj] and heights[ni][nj] <= heights[i][j]:
          dfs(ni, nj, visited, can_reach)
    
    for i in range(m):
      for j in range(n):
        can_reach = [False, False]
        dfs(i, j, [[False]*n for _ in range(m)], can_reach)
        if can_reach[0] and can_reach[1]:
          result.append([i, j])
    
    return result`,
        cpp: `class Solution {
public:
  vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
    int m = heights.size(), n = heights[0].size();
    vector<vector<int>> result;
    
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        vector<bool> canReach(2, false);
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        dfs(heights, i, j, visited, canReach);
        if (canReach[0] && canReach[1]) {
          result.push_back({i, j});
        }
      }
    }
    
    return result;
  }
  
private:
  void dfs(vector<vector<int>>& heights, int i, int j, vector<vector<bool>>& visited, vector<bool>& canReach) {
    int m = heights.size(), n = heights[0].size();
    visited[i][j] = true;
    
    if (i == 0 || j == 0) canReach[0] = true; // Pacific
    if (i == m-1 || j == n-1) canReach[1] = true; // Atlantic
    
    vector<pair<int, int>> dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    for (auto& dir : dirs) {
      int ni = i + dir.first, nj = j + dir.second;
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && !visited[ni][nj] && 
          heights[ni][nj] <= heights[i][j]) {
        dfs(heights, ni, nj, visited, canReach);
      }
    }
  }
};`,
      },
      complexity: {
        time: "O(M * N * (M * N)) where M*N is grid size, due to DFS from each cell",
        space: "O(M * N) for visited array and recursion stack",
      },
      explanation:
        "Run DFS from each cell to check if it can reach both oceans, leading to redundant traversals.",
    },
    optimal: {
      code: {
        java: `class Solution {
  public List<List<Integer>> pacificAtlantic(int[][] heights) {
    int m = heights.length, n = heights[0].length;
    boolean[][] pacific = new boolean[m][n];
    boolean[][] atlantic = new boolean[m][n];
    List<List<Integer>> result = new ArrayList<>();
    
    // DFS from ocean borders
    for (int i = 0; i < m; i++) {
      dfs(heights, i, 0, pacific, Integer.MIN_VALUE);
      dfs(heights, i, n-1, atlantic, Integer.MIN_VALUE);
    }
    for (int j = 0; j < n; j++) {
      dfs(heights, 0, j, pacific, Integer.MIN_VALUE);
      dfs(heights, m-1, j, atlantic, Integer.MIN_VALUE);
    }
    
    // Collect cells reachable by both
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (pacific[i][j] && atlantic[i][j]) {
          result.add(Arrays.asList(i, j));
        }
      }
    }
    
    return result;
  }
  
  private void dfs(int[][] heights, int i, int j, boolean[][] reachable, int prevHeight) {
    int m = heights.length, n = heights[0].length;
    if (i < 0 || i >= m || j < 0 || j >= n || reachable[i][j] || heights[i][j] < prevHeight) {
      return;
    }
    
    reachable[i][j] = true;
    int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    for (int[] dir : dirs) {
      dfs(heights, i + dir[0], j + dir[1], reachable, heights[i][j]);
    }
  }
}`,
        python: `class Solution:
  def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
    m, n = len(heights), len(heights[0])
    pacific = [[False] * n for _ in range(m)]
    atlantic = [[False] * n for _ in range(m)]
    result = []
    
    def dfs(i, j, reachable, prev_height):
      if i < 0 or i >= m or j < 0 or j >= n or reachable[i][j] or heights[i][j] < prev_height:
        return
      reachable[i][j] = True
      for ni, nj in [(i+1,j), (i-1,j), (i,j+1), (i,j-1)]:
        dfs(ni, nj, reachable, heights[i][j])
    
    # DFS from ocean borders
    for i in range(m):
      dfs(i, 0, pacific, float('-inf'))
      dfs(i, n-1, atlantic, float('-inf'))
    for j in range(n):
      dfs(0, j, pacific, float('-inf'))
      dfs(m-1, j, atlantic, float('-inf'))
    
    # Collect cells reachable by both
    for i in range(m):
      for j in range(n):
        if pacific[i][j] and atlantic[i][j]:
          result.append([i, j])
    
    return result`,
        cpp: `class Solution {
public:
  vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
    int m = heights.size(), n = heights[0].size();
    vector<vector<bool>> pacific(m, vector<bool>(n, false));
    vector<vector<bool>> atlantic(m, vector<bool>(n, false));
    vector<vector<int>> result;
    
    // DFS from ocean borders
    for (int i = 0; i < m; i++) {
      dfs(heights, i, 0, pacific, INT_MIN);
      dfs(heights, i, n-1, atlantic, INT_MIN);
    }
    for (int j = 0; j < n; j++) {
      dfs(heights, 0, j, pacific, INT_MIN);
      dfs(heights, m-1, j, atlantic, INT_MIN);
    }
    
    // Collect cells reachable by both
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (pacific[i][j] && atlantic[i][j]) {
          result.push_back({i, j});
        }
      }
    }
    
    return result;
  }
  
private:
  void dfs(vector<vector<int>>& heights, int i, int j, vector<vector<bool>>& reachable, int prevHeight) {
    int m = heights.size(), n = heights[0].size();
    if (i < 0 || i >= m || j < 0 || j >= n || reachable[i][j] || heights[i][j] < prevHeight) {
      return;
    }
    
    reachable[i][j] = true;
    vector<pair<int, int>> dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    for (auto& dir : dirs) {
      dfs(heights, i + dir.first, j + dir.second, reachable, heights[i][j]);
    }
  }
};`,
      },
      complexity: {
        time: "O(M * N) where M*N is grid size",
        space: "O(M * N) for reachable arrays and recursion stack",
      },
      explanation:
        "Start DFS from ocean borders to mark cells that can reach each ocean, then find intersection.",
    },
  },
  {
    id: 85,
    status: false,
    star: false,
    problem: "Surrounded Regions",
    leetcodeLink: "https://leetcode.com/problems/surrounded-regions/",
    difficulty: "Medium",
    description:
      "Given an m x n matrix board containing 'X' and 'O', capture all regions that are surrounded by 'X'. A region is captured by flipping all 'O's into 'X's in that surrounded region.",
    examples: [
      {
        input:
          "board = [['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]",
        output:
          "[['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']]",
      },
    ],
    bruteForce: {
      code: {
        java: `public void solve(char[][] board) {
  int m = board.length, n = board[0].length;
  for (int i = 1; i < m - 1; i++) {
    for (int j = 1; j < n - 1; j++) {
      if (board[i][j] == 'O' && isSurrounded(board, i, j)) {
        flipRegion(board, i, j);
      }
    }
  }
}

private boolean isSurrounded(char[][] board, int i, int j) {
  if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != 'O') {
    return true;
  }
  if (i == 0 || i == board.length - 1 || j == 0 || j == board[0].length - 1) {
    return false;
  }
  board[i][j] = '#';
  boolean result = isSurrounded(board, i + 1, j) && isSurrounded(board, i - 1, j) && 
                   isSurrounded(board, i, j + 1) && isSurrounded(board, i, j - 1);
  board[i][j] = 'O';
  return result;
}

private void flipRegion(char[][] board, int i, int j) {
  if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != 'O') {
    return;
  }
  board[i][j] = 'X';
  flipRegion(board, i + 1, j);
  flipRegion(board, i - 1, j);
  flipRegion(board, i, j + 1);
  flipRegion(board, i, j - 1);
}`,
        python: `def solve(board: List[List[str]]) -> None:
  m, n = len(board), len(board[0])
  
  def isSurrounded(i: int, j: int) -> bool:
    if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != 'O':
      return True
    if i == 0 or i == m - 1 or j == 0 or j == n - 1:
      return False
    board[i][j] = '#'
    result = isSurrounded(i + 1, j) and isSurrounded(i - 1, j) and \
             isSurrounded(i, j + 1) and isSurrounded(i, j - 1)
    board[i][j] = 'O'
    return result
  
  def flipRegion(i: int, j: int):
    if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != 'O':
      return
    board[i][j] = 'X'
    flipRegion(i + 1, j)
    flipRegion(i - 1, j)
    flipRegion(i, j + 1)
    flipRegion(i, j - 1)
  
  for i in range(1, m - 1):
    for j in range(1, n - 1):
      if board[i][j] == 'O' and isSurrounded(i, j):
        flipRegion(i, j)`,
        cpp: `void solve(vector<vector<char>>& board) {
  int m = board.size(), n = board[0].size();
  
  function<bool(int, int)> isSurrounded = [&](int i, int j) {
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != 'O') return true;
    if (i == 0 || i == m - 1 || j == 0 || j == n - 1) return false;
    board[i][j] = '#';
    bool result = isSurrounded(i + 1, j) && isSurrounded(i - 1, j) && 
                  isSurrounded(i, j + 1) && isSurrounded(i, j - 1);
    board[i][j] = 'O';
    return result;
  };
  
  function<void(int, int)> flipRegion = [&](int i, int j) {
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != 'O') return;
    board[i][j] = 'X';
    flipRegion(i + 1, j);
    flipRegion(i - 1, j);
    flipRegion(i, j + 1);
    flipRegion(i, j - 1);
  };
  
  for (int i = 1; i < m - 1; i++) {
    for (int j = 1; j < n - 1; j++) {
      if (board[i][j] == 'O' && isSurrounded(i, j)) {
        flipRegion(i, j);
      }
    }
  }
}`,
      },
      complexity: {
        time: "O(m * n * (m * n)) where m, n are board dimensions, due to DFS for each cell",
        space: "O(m * n) for recursion stack",
      },
      explanation:
        "For each 'O' cell, use DFS to check if it's surrounded by 'X' and not connected to the border. If surrounded, flip the region to 'X'.",
    },
    optimal: {
      code: {
        java: `public void solve(char[][] board) {
  int m = board.length, n = board[0].length;
  
  // Mark border-connected 'O's
  for (int i = 0; i < m; i++) {
    if (board[i][0] == 'O') dfs(board, i, 0);
    if (board[i][n - 1] == 'O') dfs(board, i, n - 1);
  }
  for (int j = 0; j < n; j++) {
    if (board[0][j] == 'O') dfs(board, 0, j);
    if (board[m - 1][j] == 'O') dfs(board, m - 1, j);
  }
  
  // Flip remaining 'O' to 'X' and '#' back to 'O'
  for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j%) {
      if (board[i][j] == 'O') board[i][j] = 'X';
      else if (board[i][j] == '#') board[i][j] = 'O';
    }
  }
}

private void dfs(char[][] board, int i, int j) {
  if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != 'O') {
    return;
  }
  board[i][j] = '#';
  dfs(board, i + 1, j);
  dfs(board, i - 1, j);
  dfs(board, i, j + 1);
  dfs(board, i, j - 1);
}`,
        python: `def solve(board: List[List[str]]) -> None:
  m, n = len(board), len(board[0])
  
  def dfs(i: int, j: int):
    if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != 'O':
      return
    board[i][j] = '#'
    dfs(i + 1, j)
    dfs(i - 1, j)
    dfs(i, j + 1)
    dfs(i, j - 1)
  
  # Mark border-connected 'O's
  for i in range(m):
    if board[i][0] == 'O': dfs(i, 0)
    if board[i][n - 1] == 'O': dfs(i, n - 1)
  for j in range(n):
    if board[0][j] == 'O': dfs(0, j)
    if board[m - 1][j] == 'O': dfs(m - 1, j)
  
  # Flip remaining 'O' to 'X' and '#' to 'O'
  for i in range(m):
    for j in range(n):
      if board[i][j] == 'O':
        board[i][j] = 'X'
      elif board[i][j] == '#':
        board[i][j] = 'O'`,
        cpp: `void solve(vector<vector<char>>& board) {
  int m = board.size(), n = board[0].size();
  
  function<void(int, int)> dfs = [&](int i, int j) {
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != 'O') return;
    board[i][j] = '#';
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };
  
  for (int i = 0; i < m; i++) {
    if (board[i][0] == 'O') dfs(i, 0);
    if (board[i][n - 1] == 'O') dfs(i, n - 1);
  }
  for (int j = 0; j < n; j++) {
    if (board[0][j] == 'O') dfs(0, j);
    if (board[m - 1][j] == 'O') dfs(m - 1, j);
  }
  
  for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
      if (board[i][j] == 'O') board[i][j] = 'X';
      else if (board[i][j] == '#') board[i][j] = 'O';
    }
  }
}`,
      },
      complexity: {
        time: "O(m * n) where m, n are board dimensions",
        space: "O(m * n) for recursion stack in worst case",
      },
      explanation:
        "Use DFS from border 'O's to mark connected regions as '#', then flip remaining 'O's to 'X' and '#' back to 'O'.",
    },
  },
  {
    id: 86,
    status: false,
    star: false,
    problem: "Course Schedule",
    leetcodeLink: "https://leetcode.com/problems/course-schedule/",
    difficulty: "Medium",
    description:
      "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array of prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses.",
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
    ],
    bruteForce: {
      code: {
        java: `public boolean canFinish(int numCourses, int[][] prerequisites) {
  List<List<Integer>> graph = new ArrayList<>();
  for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
  for (int[] pre : prerequisites) graph.get(pre[1]).add(pre[0]);
  
  boolean[] visited = new boolean[numCourses];
  for (int i = 0; i < numCourses; i++) {
    if (!visited[i] && hasCycle(graph, i, visited, new boolean[numCourses])) {
      return false;
    }
  }
  return true;
}

private boolean hasCycle(List<List<Integer>> graph, int course, boolean[] visited, boolean[] stack) {
  visited[course] = true;
  stack[course] = true;
  
  for (int next : graph.get(course)) {
    if (!visited[next] && hasCycle(graph, next, visited, stack)) return true;
    else if (stack[next]) return true;
  }
  
  stack[course] = false;
  return false;
}`,
        python: `def canFinish(numCourses: int, prerequisites: List[List[int]]) -> bool:
  graph = [[] for _ in range(numCourses)]
  for a, b in prerequisites:
    graph[b].append(a)
  
  visited = [False] * numCourses
  stack = [False] * numCourses
  
  def hasCycle(course: int) -> bool:
    visited[course] = True
    stack[course] = True
    
    for next_course in graph[course]:
      if not visited[next_course] and hasCycle(next_course):
        return True
      elif stack[next_course]:
        return True
    
    stack[course] = False
    return False
  
  for i in range(numCourses):
    if not visited[i] and hasCycle(i):
      return False
  return True`,
        cpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
  vector<vector<int>> graph(numCourses);
  for (const auto& pre : prerequisites) graph[pre[1]].push_back(pre[0]);
  
  vector<bool> visited(numCourses, false), stack(numCourses, false);
  
  function<bool(int)> hasCycle = [&](int course) {
    visited[course] = true;
    stack[course] = true;
    
    for (int next : graph[course]) {
      if (!visited[next] && hasCycle(next)) return true;
      else if (stack[next]) return true;
    }
    
    stack[course] = false;
    return false;
  };
  
  for (int i = 0; i < numCourses; i++) {
    if (!visited[i] && hasCycle(i)) return false;
  }
  return true;
}`,
      },
      complexity: {
        time: "O(V + E) where V is numCourses, E is number of prerequisites",
        space: "O(V + E) for adjacency list and recursion stack",
      },
      explanation:
        "Build a directed graph and use DFS to detect cycles, indicating impossible course completion.",
    },
    optimal: {
      code: {
        java: `public boolean canFinish(int numCourses, int[][] prerequisites) {
  List<List<Integer>> graph = new ArrayList<>();
  int[] inDegree = new int[numCourses];
  for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
  for (int[] pre : prerequisites) {
    graph.get(pre[1]).add(pre[0]);
    inDegree[pre[0]]++;
  }
  
  Queue<Integer> queue = new LinkedList<>();
  for (int i = 0; i < numCourses; i++) {
    if (inDegree[i] == 0) queue.offer(i);
  }
  
  int count = 0;
  while (!queue.isEmpty()) {
    int course = queue.poll();
    count++;
    for (int next : graph.get(course)) {
      if (--inDegree[next] == 0) queue.offer(next);
    }
  }
  
  return count == numCourses;
}`,
        python: `def canFinish(numCourses: int, prerequisites: List[List[int]]) -> bool:
  graph = [[] for _ in range(numCourses)]
  in_degree = [0] * numCourses
  
  for a, b in prerequisites:
    graph[b].append(a)
    in_degree[a] += 1
  
  queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
  count = 0
  
  while queue:
    course = queue.popleft()
    count += 1
    for next_course in graph[course]:
      in_degree[next_course] -= 1
      if in_degree[next_course] == 0:
        queue.append(next_course)
  
  return count == numCourses`,
        cpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
  vector<vector<int>> graph(numCourses);
  vector<int> inDegree(numCourses, 0);
  
  for (const auto& pre : prerequisites) {
    graph[pre[1]].push_back(pre[0]);
    inDegree[pre[0]]++;
  }
  
  queue<int> q;
  for (int i = 0; i < numCourses; i++) {
    if (inDegree[i] == 0) q.push(i);
  }
  
  int count = 0;
  while (!q.empty()) {
    int course = q.front(); q.pop();
    count++;
    for (int next : graph[course]) {
      if (--inDegree[next] == 0) q.push(next);
    }
  }
  
  return count == numCourses;
}`,
      },
      complexity: {
        time: "O(V + E) where V is numCourses, E is number of prerequisites",
        space: "O(V + E) for adjacency list and queue",
      },
      explanation:
        "Use topological sort with BFS, tracking in-degrees to process courses with no prerequisites first.",
    },
  },
  {
    id: 87,
    status: false,
    star: false,
    problem: "Course Schedule II",
    leetcodeLink: "https://leetcode.com/problems/course-schedule-ii/",
    difficulty: "Medium",
    description:
      "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array of prerequisites. Return the order of courses you should take to finish all courses. If impossible, return an empty array.",
    examples: [
      {
        input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
        output: "[0,2,1,3]",
      },
    ],
    bruteForce: {
      code: {
        java: `public int[] findOrder(int numCourses, int[][] prerequisites) {
  List<List<Integer>> graph = new ArrayList<>();
  for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
  for (int[] pre : prerequisites) graph.get(pre[1]).add(pre[0]);
  
  List<Integer> result = new ArrayList<>();
  boolean[] visited = new boolean[numCourses], stack = new boolean[numCourses];
  
  for (int i = 0; i < numCourses; i++) {
    if (!visited[i] && !dfs(graph, i, visited, stack, result)) {
      return new int[]{};
    }
  }
  
  int[] order = new int[numCourses];
  for (int i = 0; i < numCourses; i++) order[i] = result.get(numCourses - 1 - i);
  return order;
}

private boolean dfs(List<List<Integer>> graph, int course, boolean[] visited, boolean[] stack, List<Integer> result) {
  visited[course] = true;
  stack[course] = true;
  
  for (int next : graph.get(course)) {
    if (!visited[next] && !dfs(graph, next, visited, stack, result)) return false;
    else if (stack[next]) return false;
  }
  
  stack[course] = false;
  result.add(course);
  return true;
}`,
        python: `def findOrder(numCourses: int, prerequisites: List[List[int]]) -> List[int]:
  graph = [[] for _ in range(numCourses)]
  for a, b in prerequisites:
    graph[b].append(a)
  
  visited = [False] * numCourses
  stack = [False] * numCourses
  result = []
  
  def dfs(course: int) -> bool:
    visited[course] = True
    stack[course] = True
    
    for next_course in graph[course]:
      if not visited[next_course] and not dfs(next_course):
        return False
      elif stack[next_course]:
        return False
    
    stack[course] = False
    result.append(course)
    return True
  
  for i in range(numCourses):
    if not visited[i] and not dfs(i):
      return []
  
  return result[::-1]`,
        cpp: `vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
  vector<vector<int>> graph(numCourses);
  for (const auto& pre : prerequisites) graph[pre[1]].push_back(pre[0]);
  
  vector<bool> visited(numCourses, false), stack(numCourses, false);
  vector<int> result;
  
  function<bool(int)> dfs = [&](int course) {
    visited[course] = true;
    stack[course] = true;
    
    for (int next : graph[course]) {
      if (!visited[next] && !dfs(next)) return false;
      else if (stack[next]) return false;
    }
    
    stack[course] = false;
    result.push_back(course);
    return true;
  };
  
  for (int i = 0; i < numCourses; i++) {
    if (!visited[i] && !dfs(i)) return {};
  }
  
  reverse(result.begin(), result.end());
  return result;
}`,
      },
      complexity: {
        time: "O(V + E) where V is numCourses, E is number of prerequisites",
        space: "O(V + E) for adjacency list and recursion stack",
      },
      explanation:
        "Use DFS to detect cycles and build topological order by adding nodes to result after exploring dependencies.",
    },
    optimal: {
      code: {
        java: `public int[] findOrder(int numCourses, int[][] prerequisites) {
  List<List<Integer>> graph = new ArrayList<>();
  int[] inDegree = new int[numCourses];
  for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
  for (int[] pre : prerequisites) {
    graph.get(pre[1]).add(pre[0]);
    inDegree[pre[0]]++;
  }
  
  Queue<Integer> queue = new LinkedList<>();
  int[] order = new int[numCourses];
  int index = 0;
  
  for (int i = 0; i < numCourses; i++) {
    if (inDegree[i] == 0) queue.offer(i);
  }
  
  while (!queue.isEmpty()) {
    int course = queue.poll();
    order[index++] = course;
    for (int next : graph.get(course)) {
      if (--inDegree[next] == 0) queue.offer(next);
    }
  }
  
  return index == numCourses ? order : new int[]{};
}`,
        python: `def findOrder(numCourses: int, prerequisites: List[List[int]]) -> List[int]:
  graph = [[] for _ in range(numCourses)]
  in_degree = [0] * numCourses
  
  for a, b in prerequisites:
    graph[b].append(a)
    in_degree[a] += 1
  
  queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
  order = []
  
  while queue:
    course = queue.popleft()
    order.append(course)
    for next_course in graph[course]:
      in_degree[next_course] -= 1
      if in_degree[next_course] == 0:
        queue.append(next_course)
  
  return order if len(order) == numCourses else []`,
        cpp: `vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
  vector<vector<int>> graph(numCourses);
  vector<int> inDegree(numCourses, 0);
  
  for (const auto& pre : prerequisites) {
    graph[pre[1]].push_back(pre[0]);
    inDegree[pre[0]]++;
  }
  
  queue<int> q;
  vector<int> order;
  
  for (int i = 0; i < numCourses; i++) {
    if (inDegree[i] == 0) q.push(i);
  }
  
  while (!q.empty()) {
    int course = q.front(); q.pop();
    order.push_back(course);
    for (int next : graph[course]) {
      if (--inDegree[next] == 0) q.push(next);
    }
  }
  
  return order.size() == numCourses ? order : vector<int>{};
}`,
      },
      complexity: {
        time: "O(V + E) where V is numCourses, E is number of prerequisites",
        space: "O(V + E) for adjacency list and queue",
      },
      explanation:
        "Use topological sort with BFS, building the course order by processing nodes with no incoming edges.",
    },
  },
  {
    id: 88,
    status: false,
    star: false,
    problem: "Graph Valid Tree",
    leetcodeLink: "https://leetcode.com/problems/graph-valid-tree/",
    difficulty: "Medium",
    description:
      "Given n nodes labeled from 0 to n - 1 and a list of undirected edges, check if these edges form a valid tree.",
    examples: [
      { input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", output: "true" },
    ],
    bruteForce: {
      code: {
        java: `public boolean validTree(int n, int[][] edges) {
  List<List<Integer>> graph = new ArrayList<>();
  for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
  for (int[] edge : edges) {
    graph.get(edge[0]).add(edge[1]);
    graph.get(edge[1]).add(edge[0]);
  }
  
  boolean[] visited = new boolean[n];
  if (hasCycle(graph, 0, -1, visited)) return false;
  
  for (boolean v : visited) if (!v) return false;
  return true;
}

private boolean hasCycle(List<List<Integer>> graph, int node, int parent, boolean[] visited) {
  visited[node] = true;
  
  for (int neighbor : graph.get(node)) {
    if (!visited[neighbor]) {
      if (hasCycle(graph, neighbor, node, visited)) return true;
    } else if (neighbor != parent) {
      return true;
    }
  }
  return false;
}`,
        python: `def validTree(n: int, edges: List[List[int]]) -> bool:
  graph = [[] for _ in range(n)]
  for a, b in edges:
    graph[a].append(b)
    graph[b].append(a)
  
  visited = [False] * n
  
  def hasCycle(node: int, parent: int) -> bool:
    visited[node] = True
    for neighbor in graph[node]:
      if not visited[neighbor]:
        if hasCycle(neighbor, node):
          return True
      elif neighbor != parent:
        return True
    return False
  
  if hasCycle(0, -1):
    return False
  return all(visited)`,
        cpp: `bool validTree(int n, vector<vector<int>>& edges) {
  vector<vector<int>> graph(n);
  for (const auto& edge : edges) {
    graph[edge[0]].push_back(edge[1]);
    graph[edge[1]].push_back(edge[0]);
  }
  
  vector<bool> visited(n, false);
  
  function<bool(int, int)> hasCycle = [&](int node, int parent) {
    visited[node] = true;
    for (int neighbor : graph[node]) {
      if (!visited[neighbor]) {
        if (hasCycle(neighbor, node)) return true;
      } else if (neighbor != parent) {
        return true;
      }
    }
    return false;
  };
  
  if (hasCycle(0, -1)) return false;
  for (bool v : visited) if (!v) return false;
  return true;
}`,
      },
      complexity: {
        time: "O(V + E) where V is n, E is number of edges",
        space: "O(V + E) for adjacency list and recursion stack",
      },
      explanation:
        "Use DFS to detect cycles and ensure all nodes are connected by checking if all are visited.",
    },
    optimal: {
      code: {
        java: `public boolean validTree(int n, int[][] edges) {
  int[] parent = new int[n];
  for (int i = 0; i < n; i++) parent[i] = i;
  
  for (int[] edge : edges) {
    int root1 = find(parent, edge[0]);
    int root2 = find(parent, edge[1]);
    if (root1 == root2) return false;
    parent[root1] = root2;
  }
  
  return edges.length == n - 1;
}

private int find(int[] parent, int x) {
  if (parent[x] != x) parent[x] = find(parent, parent[x]);
  return parent[x];
}`,
        python: `def validTree(n: int, edges: List[List[int]]) -> bool:
  parent = list(range(n))
  
  def find(x: int) -> int:
    if parent[x] != x:
      parent[x] = find(parent[x])
    return parent[x]
  
  for a, b in edges:
    root1, root2 = find(a), find(b)
    if root1 == root2:
      return False
    parent[root1] = root2
  
  return len(edges) == n - 1`,
        cpp: `bool validTree(int n, vector<vector<int>>& edges) {
  vector<int> parent(n);
  iota(parent.begin(), parent.end(), 0);
  
  function<int(int)> find = [&](int x) {
    if (parent[x] != x) parent[x] = find(parent[x]);
    return parent[x];
  };
  
  for (const auto& edge : edges) {
    int root1 = find(edge[0]);
    int root2 = find(edge[1]);
    if (root1 == root2) return false;
    parent[root1] = root2;
  }
  
  return edges.size() == n - 1;
}`,
      },
      complexity: {
        time: "O(E * α(n)) where E is number of edges, α is inverse Ackermann",
        space: "O(n) for union-find data structure",
      },
      explanation:
        "Use Union-Find to detect cycles and verify the number of edges equals n-1 for a valid tree.",
    },
  },
  {
    id: 89,
    status: false,
    star: false,
    problem: "Number of Connected Components in an Undirected Graph",
    leetcodeLink:
      "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
    difficulty: "Medium",
    description:
      "Given n nodes labeled from 0 to n - 1 and a list of undirected edges, return the number of connected components in the graph.",
    examples: [{ input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2" }],
    bruteForce: {
      code: {
        java: `public int countComponents(int n, int[][] edges) {
  List<List<Integer>> graph = new ArrayList<>();
  for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
  for (int[] edge : edges) {
    graph.get(edge[0]).add(edge[1]);
    graph.get(edge[1]).add(edge[0]);
  }
  
  boolean[] visited = new boolean[n];
  int count = 0;
  
  for (int i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(graph, i, visited);
      count++;
    }
  }
  return count;
}

private void dfs(List<List<Integer>> graph, int node, boolean[] visited) {
  visited[node] = true;
  for (int neighbor : graph.get(node)) {
    if (!visited[neighbor]) dfs(graph, neighbor, visited);
  }
}`,
        python: `def countComponents(n: int, edges: List[List[int]]) -> int:
  graph = [[] for _ in range(n)]
  for a, b in edges:
    graph[a].append(b)
    graph[b].append(a)
  
  visited = [False] * n
  
  def dfs(node: int):
    visited[node] = True
    for neighbor in graph[node]:
      if not visited[neighbor]:
        dfs(neighbor)
  
  count = 0
  for i in range(n):
    if not visited[i]:
      dfs(i)
      count += 1
  return count`,
        cpp: `int countComponents(int n, vector<vector<int>>& edges) {
  vector<vector<int>> graph(n);
  for (const auto& edge : edges) {
    graph[edge[0]].push_back(edge[1]);
    graph[edge[1]].push_back(edge[0]);
  }
  
  vector<bool> visited(n, false);
  int count = 0;
  
  function<void(int)> dfs = [&](int node) {
    visited[node] = true;
    for (int neighbor : graph[node]) {
      if (!visited[neighbor]) dfs(neighbor);
    }
  };
  
  for (int i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      count++;
    }
  }
  return count;
}`,
      },
      complexity: {
        time: "O(V + E) where V is n, E is number of edges",
        space: "O(V + E) for adjacency list and recursion stack",
      },
      explanation:
        "Use DFS to explore each connected component, incrementing a counter for each unvisited node that starts a new component.",
    },
    optimal: {
      code: {
        java: `public int countComponents(int n, int[][] edges) {
  int[] parent = new int[n];
  for (int i = 0; i < n; i++) parent[i] = i;
  int components = n;
  
  for (int[] edge : edges) {
    int root1 = find(parent, edge[0]);
    int root2 = find(parent, edge[1]);
    if (root1 != root2) {
      parent[root1] = root2;
      components--;
    }
  }
  return components;
}

private int find(int[] parent, int x) {
  if (parent[x] != x) parent[x] = find(parent, parent[x]);
  return parent[x];
}`,
        python: `def countComponents(n: int, edges: List[List[int]]) -> int:
  parent = list(range(n))
  components = n
  
  def find(x: int) -> int:
    if parent[x] != x:
      parent[x] = find(parent[x])
    return parent[x]
  
  for a, b in edges:
    root1, root2 = find(a), find(b)
    if root1 != root2:
      parent[root1] = root2
      components -= 1
  
  return components`,
        cpp: `int countComponents(int n, vector<vector<int>>& edges) {
  vector<int> parent(n);
  iota(parent.begin(), parent.end(), 0);
  int components = n;
  
  function<int(int)> find = [&](int x) {
    if (parent[x] != x) parent[x] = find(parent[x]);
    return parent[x];
  };
  
  for (const auto& edge : edges) {
    int root1 = find(edge[0]);
    int root2 = find(edge[1]);
    if (root1 != root2) {
      parent[root1] = root2;
      components--;
    }
  }
  return components;
}`,
      },
      complexity: {
        time: "O(E * α(n)) where E is number of edges, α is inverse Ackermann",
        space: "O(n) for union-find data structure",
      },
      explanation:
        "Use Union-Find to merge connected components, reducing the component count when nodes are connected.",
    },
  },
  {
    id: 90,
    status: false,
    star: false,
    problem: "Redundant Connection",
    leetcodeLink: "https://leetcode.com/problems/redundant-connection/",
    difficulty: "Medium",
    description:
      "Given a graph with n nodes and an additional edge that forms a cycle, return an edge that can be removed to make the graph a tree.",
    examples: [{ input: "edges = [[1,2],[1,3],[2,3]]", output: "[2,3]" }],
    bruteForce: {
      code: {
        java: `public int[] findRedundantConnection(int[][] edges) {
  int n = edges.length;
  List<List<Integer>> graph = new ArrayList<>();
  for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());
  
  for (int[] edge : edges) {
    graph.get(edge[0]).add(edge[1]);
    graph.get(edge[1]).add(edge[0]);
    boolean[] visited = new boolean[n + 1];
    if (hasCycle(graph, edge[0], -1, visited)) return edge;
    graph.get(edge[0]).remove(graph.get(edge[0]).size() - 1);
    graph.get(edge[1]).remove(graph.get(edge[1]).size() - 1);
  }
  return new int[]{};
}

private boolean hasCycle(List<List<Integer>> graph, int node, int parent, boolean[] visited) {
  visited[node] = true;
  for (int neighbor : graph.get(node)) {
    if (!visited[neighbor]) {
      if (hasCycle(graph, neighbor, node, visited)) return true;
    } else if (neighbor != parent) {
      return true;
    }
  }
  return false;
}`,
        python: `def findRedundantConnection(edges: List[List[int]]) -> List[int]:
  n = len(edges)
  graph = [[] for _ in range(n + 1)]
  
  def hasCycle(node: int, parent: int, visited: List[bool]) -> bool:
    visited[node] = True
    for neighbor in graph[node]:
      if not visited[neighbor]:
        if hasCycle(neighbor, node, visited):
          return True
      elif neighbor != parent:
        return True
    return False
  
  for a, b in edges:
    graph[a].append(b)
    graph[b].append(a)
    visited = [False] * (n + 1)
    if hasCycle(a, -1, visited):
      return [a, b]
    graph[a].pop()
    graph[b].pop()
  
  return []`,
        cpp: `vector<int> findRedundantConnection(vector<vector<int>>& edges) {
  int n = edges.size();
  vector<vector<int>> graph(n + 1);
  
  function<bool(int, int, vector<bool>&)> hasCycle = [&](int node, int parent, vector<bool>& visited) {
    visited[node] = true;
    for (int neighbor : graph[node]) {
      if (!visited[neighbor]) {
        if (hasCycle(neighbor, node, visited)) return true;
      } else if (neighbor != parent) {
        return true;
      }
    }
    return false;
  };
  
  for (const auto& edge : edges) {
    graph[edge[0]].push_back(edge[1]);
    graph[edge[1]].push_back(edge[0]);
    vector<bool> visited(n + 1, false);
    if (hasCycle(edge[0], -1, visited)) return edge;
    graph[edge[0]].pop_back();
    graph[edge[1]].pop_back();
  }
  
  return {};
}`,
      },
      complexity: {
        time: "O(E * V) where V is n, E is number of edges",
        space: "O(V + E) for adjacency list and recursion stack",
      },
      explanation:
        "Build graph incrementally, checking for cycles with DFS after adding each edge. Return the edge causing a cycle.",
    },
    optimal: {
      code: {
        java: `public int[] findRedundantConnection(int[][] edges) {
  int n = edges.length;
  int[] parent = new int[n + 1];
  for (int i = 0; i <= n; i++) parent[i] = i;
  
  for (int[] edge : edges) {
    int root1 = find(parent, edge[0]);
    int root2 = find(parent, edge[1]);
    if (root1 == root2) return edge;
    parent[root1] = root2;
  }
  return new int[]{};
}

private int find(int[] parent, int x) {
  if (parent[x] != x) parent[x] = find(parent, parent[x]);
  return parent[x];
}`,
        python: `def findRedundantConnection(edges: List[List[int]]) -> List[int]:
  n = len(edges)
  parent = list(range(n + 1))
  
  def find(x: int) -> int:
    if parent[x] != x:
      parent[x] = find(parent[x])
    return parent[x]
  
  for a, b in edges:
    root1, root2 = find(a), find(b)
    if root1 == root2:
      return [a, b]
    parent[root1] = root2
  
  return []`,
        cpp: `vector<int> findRedundantConnection(vector<vector<int>>& edges) {
  int n = edges.size();
  vector<int> parent(n + 1);
  iota(parent.begin(), parent.end(), 0);
  
  function<int(int)> find = [&](int x) {
    if (parent[x] != x) parent[x] = find(parent[x]);
    return parent[x];
  };
  
  for (const auto& edge : edges) {
    int root1 = find(edge[0]);
    int root2 = find(edge[1]);
    if (root1 == root2) return edge;
    parent[root1] = root2;
  }
  
  return {};
}`,
      },
      complexity: {
        time: "O(E * α(n)) where E is number of edges, α is inverse Ackermann",
        space: "O(n) for union-find data structure",
      },
      explanation:
        "Use Union-Find to detect cycles efficiently, returning the edge that connects two nodes in the same component.",
    },
  },
  // ==================== HARD ====================
  {
    id: 91,
    status: false,
    star: false,
    problem: "Word Ladder",
    leetcodeLink: "https://leetcode.com/problems/word-ladder/",
    difficulty: "Hard",
    description:
      "Given two words beginWord and endWord, and a dictionary wordList, return the length of the shortest transformation sequence from beginWord to endWord, such that only one letter can be changed at a time and each transformed word must exist in the wordList.",
    examples: [
      {
        input:
          "beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']",
        output: "5",
      },
    ],
    bruteForce: {
      code: {
        java: `public int ladderLength(String beginWord, String endWord, List<String> wordList) {
  Set<String> dict = new HashSet<>(wordList);
  if (!dict.contains(endWord)) return 0;
  
  Queue<String> queue = new LinkedList<>();
  queue.offer(beginWord);
  Set<String> visited = new HashSet<>();
  visited.add(beginWord);
  int level = 1;
  
  while (!queue.isEmpty()) {
    int size = queue.size();
    for (int i = 0; i < size; i++) {
      String curr = queue.poll();
      if (curr.equals(endWord)) return level;
      
      for (int j = 0; j < curr.length(); j++) {
        for (char c = 'a'; c <= 'z'; c++) {
          StringBuilder next = new StringBuilder(curr);
          next.setCharAt(j, c);
          String nextStr = next.toString();
          if (dict.contains(nextStr) && !visited.contains(nextStr)) {
            queue.offer(nextStr);
            visited.add(nextStr);
          }
        }
      }
    }
    level++;
  }
  return 0;
}`,
        python: `def ladderLength(beginWord: str, endWord: str, wordList: List[str]) -> int:
  dict_set = set(wordList)
  if endWord not in dict_set:
    return 0
  
  queue = deque([(beginWord, 1)])
  visited = {beginWord}
  
  while queue:
    curr, level = queue.popleft()
    if curr == endWord:
      return level
    
    for i in range(len(curr)):
      for c in 'abcdefghijklmnopqrstuvwxyz':
        next_word = curr[:i] + c + curr[i + 1:]
        if next_word in dict_set and next_word not in visited:
          queue.append((next_word, level + 1))
          visited.add(next_word)
  
  return 0`,
        cpp: `int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
  unordered_set<string> dict(wordList.begin(), wordList.end());
  if (!dict.count(endWord)) return 0;
  
  queue<pair<string, int>> q;
  q.push({beginWord, 1});
  unordered_set<string> visited{beginWord};
  
  while (!q.empty()) {
    auto [curr, level] = q.front(); q.pop();
    if (curr == endWord) return level;
    
    for (int i = 0; i < curr.size(); i++) {
      string temp = curr;
      for (char c = 'a'; c <= 'z'; c++) {
        temp[i] = c;
        if (dict.count(temp) && !visited.count(temp)) {
          q.push({temp, level + 1});
          visited.insert(temp);
        }
      }
    }
  }
  return 0;
}`,
      },
      complexity: {
        time: "O(N * 26 * L * log N) where N is wordList size, L is word length",
        space: "O(N) for queue and visited set",
      },
      explanation:
        "Use BFS to find the shortest path, generating all possible one-letter transformations for each word.",
    },
    optimal: {
      code: {
        java: `public int ladderLength(String beginWord, String endWord, List<String> wordList) {
  Set<String> dict = new HashSet<>(wordList);
  if (!dict.contains(endWord)) return 0;
  
  Set<String> beginSet = new HashSet<>(), endSet = new HashSet<>();
  beginSet.add(beginWord);
  endSet.add(endWord);
  Set<String> visited = new HashSet<>();
  int level = 1;
  
  while (!beginSet.isEmpty() && !endSet.isEmpty()) {
    if (beginSet.size() > endSet.size()) {
      Set<String> temp = beginSet; beginSet = endSet; endSet = temp;
    }
    
    Set<String> nextSet = new HashSet<>();
    for (String word : beginSet) {
      char[] chars = word.toCharArray();
      for (int i = 0; i < chars.length; i++) {
        char old = chars[i];
        for (char c = 'a'; c <= 'z'; c++) {
          chars[i] = c;
          String next = new String(chars);
          if (endSet.contains(next)) return level + 1;
          if (dict.contains(next) && !visited.contains(next)) {
            nextSet.add(next);
            visited.add(next);
          }
        }
        chars[i] = old;
      }
    }
    beginSet = nextSet;
    level++;
  }
  return 0;
}`,
        python: `def ladderLength(beginWord: str, endWord: str, wordList: List[str]) -> int:
  dict_set = set(wordList)
  if endWord not in dict_set:
    return 0
  
  begin_set, end_set = {beginWord}, {endWord}
  visited = set()
  level = 1
  
  while begin_set and end_set:
    if len(begin_set) > len(end_set):
      begin_set, end_set = end_set, begin_set
    
    next_set = set()
    for word in begin_set:
      for i in range(len(word)):
        for c in 'abcdefghijklmnopqrstuvwxyz':
          next_word = word[:i] + c + word[i + 1:]
          if next_word in end_set:
            return level + 1
          if next_word in dict_set and next_word not in visited:
            next_set.add(next_word)
            visited.add(next_word)
    begin_set = next_set
    level += 1
  
  return 0`,
        cpp: `int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
  unordered_set<string> dict(wordList.begin(), wordList.end());
  if (!dict.count(endWord)) return 0;
  
  unordered_set<string> beginSet{beginWord}, endSet{endWord};
  unordered_set<string> visited;
  int level = 1;
  
  while (!beginSet.empty() && !endSet.empty()) {
    if (beginSet.size() > endSet.size()) swap(beginSet, endSet);
    
    unordered_set<string> nextSet;
    for (const string& word : beginSet) {
      string temp = word;
      for (int i = 0; i < word.size(); i++) {
        char old = temp[i];
        for (char c = 'a'; c <= 'z'; c++) {
          temp[i] = c;
          if (endSet.count(temp)) return level + 1;
          if (dict.count(temp) && !visited.count(temp)) {
            nextSet.insert(temp);
            visited.insert(temp);
          }
        }
        temp[i] = old;
      }
    }
    beginSet = move(nextSet);
    level++;
  }
  return 0;
}`,
      },
      complexity: {
        time: "O(N * 26 * L) where N is wordList size, L is word length",
        space: "O(N) for sets",
      },
      explanation:
        "Use bidirectional BFS to search from both beginWord and endWord, reducing search space by meeting in the middle.",
    },
  },
];
