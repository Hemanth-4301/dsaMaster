import { Question } from "../types/Question";

export const treeQuestions: Question[] = [
  // ==================== EASY ====================
  {
    id: 61,
    status: false,
    star: false,
    problem: "Invert Binary Tree",
    leetcodeLink: "https://leetcode.com/problems/invert-binary-tree/",
    difficulty: "Easy",
    description:
      "Given the root of a binary tree, invert the tree, and return its root.",
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" },
    ],
    bruteForce: {
      code: {
        java: `public TreeNode invertTree(TreeNode root) {
  if (root == null) return null;
  
  Queue<TreeNode> queue = new LinkedList<>();
  queue.offer(root);
  
  while (!queue.isEmpty()) {
    TreeNode node = queue.poll();
    TreeNode temp = node.left;
    node.left = node.right;
    node.right = temp;
    
    if (node.left != null) queue.offer(node.left);
    if (node.right != null) queue.offer(node.right);
  }
  
  return root;
}`,
        python: `def invertTree(root: Optional[TreeNode]) -> Optional[TreeNode]:
  if not root:
    return None
  
  queue = deque([root])
  
  while queue:
    node = queue.popleft()
    node.left, node.right = node.right, node.left
    
    if node.left:
      queue.append(node.left)
    if node.right:
      queue.append(node.right)
  
  return root`,
        cpp: `TreeNode* invertTree(TreeNode* root) {
  if (!root) return nullptr;
  
  queue<TreeNode*> q;
  q.push(root);
  
  while (!q.empty()) {
    TreeNode* node = q.front(); q.pop();
    swap(node->left, node->right);
    
    if (node->left) q.push(node->left);
    if (node->right) q.push(node->right);
  }
  
  return root;
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(w) where w is the maximum width of the tree",
      },
      explanation:
        "Use BFS to swap left and right children of each node iteratively.",
    },
    optimal: {
      code: {
        java: `public TreeNode invertTree(TreeNode root) {
  if (root == null) return null;
  
  TreeNode temp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(temp);
  
  return root;
}`,
        python: `def invertTree(root: Optional[TreeNode]) -> Optional[TreeNode]:
  if not root:
    return None
  
  root.left, root.right = invertTree(root.right), invertTree(root.left)
  
  return root`,
        cpp: `TreeNode* invertTree(TreeNode* root) {
  if (!root) return nullptr;
  
  swap(root->left, root->right);
  invertTree(root->left);
  invertTree(root->right);
  
  return root;
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(h) where h is the height of the tree",
      },
      explanation:
        "Use recursive DFS to swap left and right children, leveraging the call stack.",
    },
  },
  {
    id: 62,
    status: false,
    star: false,
    problem: "Maximum Depth of Binary Tree",
    leetcodeLink: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    difficulty: "Easy",
    description: "Given the root of a binary tree, return its maximum depth.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    bruteForce: {
      code: {
        java: `public int maxDepth(TreeNode root) {
  if (root == null) return 0;
  
  Queue<TreeNode> queue = new LinkedList<>();
  queue.offer(root);
  int depth = 0;
  
  while (!queue.isEmpty()) {
    int size = queue.size();
    depth++;
    for (int i = 0; i < size; i++) {
      TreeNode node = queue.poll();
      if (node.left != null) queue.offer(node.left);
      if (node.right != null) queue.offer(node.right);
    }
  }
  
  return depth;
}`,
        python: `def maxDepth(root: Optional[TreeNode]) -> int:
  if not root:
    return 0
  
  queue = deque([(root, 1)])
  max_depth = 0
  
  while queue:
    node, depth = queue.popleft()
    max_depth = max(max_depth, depth)
    
    if node.left:
      queue.append((node.left, depth + 1))
    if node.right:
      queue.append((node.right, depth + 1))
  
  return max_depth`,
        cpp: `int maxDepth(TreeNode* root) {
  if (!root) return 0;
  
  queue<pair<TreeNode*, int>> q;
  q.push({root, 1});
  int maxDepth = 0;
  
  while (!q.empty()) {
    auto [node, depth] = q.front(); q.pop();
    maxDepth = max(maxDepth, depth);
    
    if (node->left) q.push({node->left, depth + 1});
    if (node->right) q.push({node->right, depth + 1});
  }
  
  return maxDepth;
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(w) where w is the maximum width of the tree",
      },
      explanation: "Use BFS to count levels iteratively.",
    },
    optimal: {
      code: {
        java: `public int maxDepth(TreeNode root) {
  if (root == null) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}`,
        python: `def maxDepth(root: Optional[TreeNode]) -> int:
  if not root:
    return 0
  return max(maxDepth(root.left), maxDepth(root.right)) + 1`,
        cpp: `int maxDepth(TreeNode* root) {
  if (!root) return 0;
  return max(maxDepth(root->left), maxDepth(root->right)) + 1;
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(h) where h is the height of the tree",
      },
      explanation:
        "Use recursive DFS to compute the maximum depth of left and right subtrees.",
    },
  },
  {
    id: 63,
    status: false,
    star: false,
    problem: "Same Tree",
    leetcodeLink: "https://leetcode.com/problems/same-tree/",
    difficulty: "Easy",
    description:
      "Given the roots of two binary trees p and q, return true if they are the same or false otherwise.",
    examples: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
      { input: "p = [1,2], q = [1,null,2]", output: "false" },
    ],
    bruteForce: {
      code: {
        java: `public boolean isSameTree(TreeNode p, TreeNode q) {
  if (p == null && q == null) return true;
  if (p == null || q == null) return false;
  
  Queue<TreeNode> queueP = new LinkedList<>();
  Queue<TreeNode> queueQ = new LinkedList<>();
  queueP.offer(p);
  queueQ.offer(q);
  
  while (!queueP.isEmpty() && !queueQ.isEmpty()) {
    TreeNode nodeP = queueP.poll();
    TreeNode nodeQ = queueQ.poll();
    
    if (nodeP.val != nodeQ.val) return false;
    
    if (nodeP.left != null && nodeQ.left != null) {
      queueP.offer(nodeP.left);
      queueQ.offer(nodeQ.left);
    } else if (nodeP.left != null || nodeQ.left != null) {
      return false;
    }
    
    if (nodeP.right != null && nodeQ.right != null) {
      queueP.offer(nodeP.right);
      queueQ.offer(nodeQ.right);
    } else if (nodeP.right != null || nodeQ.right != null) {
      return false;
    }
  }
  
  return queueP.isEmpty() && queueQ.isEmpty();
}`,
        python: `def isSameTree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
  if not p and not q:
    return True
  if not p or not q:
    return False
  
  queue_p = deque([p])
  queue_q = deque([q])
  
  while queue_p and queue_q:
    node_p = queue_p.popleft()
    node_q = queue_q.popleft()
    
    if node_p.val != node_q.val:
      return False
    
    if (node_p.left is None) != (node_q.left is None):
      return False
    if node_p.left:
      queue_p.append(node_p.left)
      queue_q.append(node_q.left)
    
    if (node_p.right is None) != (node_q.right is None):
      return False
    if node_p.right:
      queue_p.append(node_p.right)
      queue_q.append(node_q.right)
  
  return not queue_p and not queue_q`,
        cpp: `bool isSameTree(TreeNode* p, TreeNode* q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  
  queue<TreeNode*> qp, qq;
  qp.push(p);
  qq.push(q);
  
  while (!qp.empty() && !qq.empty()) {
    TreeNode* np = qp.front(); qp.pop();
    TreeNode* nq = qq.front(); qq.pop();
    
    if (np->val != nq->val) return false;
    
    if ((np->left != nullptr) != (nq->left != nullptr)) return false;
    if (np->left) {
      qp.push(np->left);
      qq.push(nq->left);
    }
    
    if ((np->right != nullptr) != (nq->right != nullptr)) return false;
    if (np->right) {
      qp.push(np->right);
      qq.push(nq->right);
    }
  }
  
  return qp.empty() && qq.empty();
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(w) where w is the maximum width of the tree",
      },
      explanation:
        "Use BFS to compare nodes level by level, checking values and structure.",
    },
    optimal: {
      code: {
        java: `public boolean isSameTree(TreeNode p, TreeNode q) {
  if (p == null && q == null) return true;
  if (p == null || q == null) return false;
  return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
        python: `def isSameTree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
  if not p and not q:
    return True
  if not p or not q or p.val != q.val:
    return False
  return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`,
        cpp: `bool isSameTree(TreeNode* p, TreeNode* q) {
  if (!p && !q) return true;
  if (!p || !q || p->val != q->val) return false;
  return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(h) where h is the height of the tree",
      },
      explanation: "Use recursive DFS to compare nodes, values, and structure.",
    },
  },

  // ==================== MEDIUM ====================
  {
    id: 64,
    status: false,
    star: false,
    problem: "Diameter of Binary Tree",
    leetcodeLink: "https://leetcode.com/problems/diameter-of-binary-tree/",
    difficulty: "Medium",
    description:
      "Given the root of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes.",
    examples: [
      { input: "root = [1,2,3,4,5]", output: "3" },
      { input: "root = [1,2]", output: "1" },
    ],
    bruteForce: {
      code: {
        java: `public int diameterOfBinaryTree(TreeNode root) {
  if (root == null) return 0;
  
  int maxDiameter = 0;
  Queue<TreeNode> queue = new LinkedList<>();
  queue.offer(root);
  
  while (!queue.isEmpty()) {
    TreeNode node = queue.poll();
    int leftHeight = height(node.left);
    int rightHeight = height(node.right);
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
    
    if (node.left != null) queue.offer(node.left);
    if (node.right != null) queue.offer(node.right);
  }
  
  return maxDiameter;
}

private int height(TreeNode node) {
  if (node == null) return 0;
  return 1 + Math.max(height(node.left), height(node.right));
}`,
        python: `def diameterOfBinaryTree(root: Optional[TreeNode]) -> int:
  if not root:
    return 0
  
  max_diameter = 0
  queue = deque([root])
  
  while queue:
    node = queue.popleft()
    left_height = height(node.left)
    right_height = height(node.right)
    max_diameter = max(max_diameter, left_height + right_height)
    
    if node.left:
      queue.append(node.left)
    if node.right:
      queue.append(node.right)
  
  return max_diameter

def height(node):
  if not node:
    return 0
  return 1 + max(height(node.left), height(node.right))`,
        cpp: `int diameterOfBinaryTree(TreeNode* root) {
  if (!root) return 0;
  
  int maxDiameter = 0;
  queue<TreeNode*> q;
  q.push(root);
  
  while (!q.empty()) {
    TreeNode* node = q.front(); q.pop();
    int leftHeight = height(node->left);
    int rightHeight = height(node->right);
    maxDiameter = max(maxDiameter, leftHeight + rightHeight);
    
    if (node->left) q.push(node->left);
    if (node->right) q.push(node->right);
  }
  
  return maxDiameter;
}

int height(TreeNode* node) {
  if (!node) return 0;
  return 1 + max(height(node->left), height(node->right));
}`,
      },
      complexity: {
        time: "O(n^2) where n is the number of nodes",
        space: "O(w) where w is the maximum width",
      },
      explanation:
        "Use BFS to check each node, computing heights of left and right subtrees.",
    },
    optimal: {
      code: {
        java: `public int diameterOfBinaryTree(TreeNode root) {
  int[] maxDiameter = new int[1];
  height(root, maxDiameter);
  return maxDiameter[0];
}

private int height(TreeNode node, int[] maxDiameter) {
  if (node == null) return 0;
  int left = height(node.left, maxDiameter);
  int right = height(node.right, maxDiameter);
  maxDiameter[0] = Math.max(maxDiameter[0], left + right);
  return 1 + Math.max(left, right);
}`,
        python: `def diameterOfBinaryTree(root: Optional[TreeNode]) -> int:
  max_diameter = 0
  
  def height(node):
    nonlocal max_diameter
    if not node:
      return 0
    left = height(node.left)
    right = height(node.right)
    max_diameter = max(max_diameter, left + right)
    return 1 + max(left, right)
  
  height(root)
  return max_diameter`,
        cpp: `int diameterOfBinaryTree(TreeNode* root) {
  int maxDiameter = 0;
  
  function<int(TreeNode*)> height = [&](TreeNode* node) {
    if (!node) return 0;
    int left = height(node->left);
    int right = height(node->right);
    maxDiameter = max(maxDiameter, left + right);
    return 1 + max(left, right);
  };
  
  height(root);
  return maxDiameter;
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(h) where h is the height of the tree",
      },
      explanation:
        "Use DFS to compute height and update diameter in a single pass.",
    },
  },
  {
    id: 65,
    status: false,
    star: false,
    problem: "Balanced Binary Tree",
    leetcodeLink: "https://leetcode.com/problems/balanced-binary-tree/",
    difficulty: "Medium",
    description:
      "Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "true" },
      { input: "root = [1,2,2,3,3,null,null,4,4]", output: "false" },
    ],
    bruteForce: {
      code: {
        java: `public boolean isBalanced(TreeNode root) {
  if (root == null) return true;
  
  Queue<TreeNode> queue = new LinkedList<>();
  queue.offer(root);
  
  while (!queue.isEmpty()) {
    TreeNode node = queue.poll();
    int leftHeight = height(node.left);
    int rightHeight = height(node.right);
    if (Math.abs(leftHeight - rightHeight) > 1) return false;
    
    if (node.left != null) queue.offer(node.left);
    if (node.right != null) queue.offer(node.right);
  }
  
  return true;
}

private int height(TreeNode node) {
  if (node == null) return 0;
  return 1 + Math.max(height(node.left), height(node.right));
}`,
        python: `def isBalanced(root: Optional[TreeNode]) -> bool:
  if not root:
    return True
  
  queue = deque([root])
  
  while queue:
    node = queue.popleft()
    left_height = height(node.left)
    right_height = height(node.right)
    if abs(left_height - right_height) > 1:
      return False
    
    if node.left:
      queue.append(node.left)
    if node.right:
      queue.append(node.right)
  
  return True

def height(node):
  if not node:
    return 0
  return 1 + max(height(node.left), height(node.right))`,
        cpp: `bool isBalanced(TreeNode* root) {
  if (!root) return true;
  
  queue<TreeNode*> q;
  q.push(root);
  
  while (!q.empty()) {
    TreeNode* node = q.front(); q.pop();
    int leftHeight = height(node->left);
    int rightHeight = height(node->right);
    if (abs(leftHeight - rightHeight) > 1) return false;
    
    if (node->left) q.push(node->left);
    if (node->right) q.push(node->right);
  }
  
  return true;
}

int height(TreeNode* node) {
  if (!node) return 0;
  return 1 + max(height(node->left), height(node->right));
}`,
      },
      complexity: {
        time: "O(n^2) where n is the number of nodes",
        space: "O(w) where w is the maximum width",
      },
      explanation: "Use BFS to check each node, computing heights repeatedly.",
    },
    optimal: {
      code: {
        java: `public boolean isBalanced(TreeNode root) {
  return height(root) != -1;
}

private int height(TreeNode node) {
  if (node == null) return 0;
  
  int left = height(node.left);
  if (left == -1) return -1;
  
  int right = height(node.right);
  if (right == -1) return -1;
  
  if (Math.abs(left - right) > 1) return -1;
  
  return 1 + Math.max(left, right);
}`,
        python: `def isBalanced(root: Optional[TreeNode]) -> bool:
  def height(node):
    if not node:
      return 0
    
    left = height(node.left)
    if left == -1:
      return -1
    
    right = height(node.right)
    if right == -1:
      return -1
    
    if abs(left - right) > 1:
      return -1
    
    return 1 + max(left, right)
  
  return height(root) != -1`,
        cpp: `bool isBalanced(TreeNode* root) {
  function<int(TreeNode*)> height = [&](TreeNode* node) {
    if (!node) return 0;
    
    int left = height(node->left);
    if (left == -1) return -1;
    
    int right = height(node->right);
    if (right == -1) return -1;
    
    if (abs(left - right) > 1) return -1;
    
    return 1 + max(left, right);
  };
  
  return height(root) != -1;
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(h) where h is the height of the tree",
      },
      explanation:
        "Use DFS to check balance and compute height in a single pass, returning -1 for unbalanced subtrees.",
    },
  },
  {
    id: 66,
    status: false,
    star: false,
    problem: "Subtree of Another Tree",
    leetcodeLink: "https://leetcode.com/problems/subtree-of-another-tree/",
    difficulty: "Medium",
    description:
      "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.",
    examples: [
      { input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true" },
      {
        input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]",
        output: "false",
      },
    ],
    bruteForce: {
      code: {
        java: `public boolean isSubtree(TreeNode root, TreeNode subRoot) {
  if (root == null) return false;
  
  Queue<TreeNode> queue = new LinkedList<>();
  queue.offer(root);
  
  while (!queue.isEmpty()) {
    TreeNode node = queue.poll();
    if (isSameTree(node, subRoot)) return true;
    
    if (node.left != null) queue.offer(node.left);
    if (node.right != null) queue.offer(node.right);
  }
  
  return false;
}

private boolean isSameTree(TreeNode p, TreeNode q) {
  if (p == null && q == null) return true;
  if (p == null || q == null) return false;
  return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
        python: `def isSubtree(root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
  if not root:
    return False
  
  queue = deque([root])
  
  while queue:
    node = queue.popleft()
    if is_same_tree(node, subRoot):
      return True
    
    if node.left:
      queue.append(node.left)
    if node.right:
      queue.append(node.right)
  
  return False

def is_same_tree(p, q):
  if not p and not q:
    return True
  if not p or not q or p.val != q.val:
    return False
  return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)`,
        cpp: `bool isSubtree(TreeNode* root, TreeNode* subRoot) {
  if (!root) return false;
  
  queue<TreeNode*> q;
  q.push(root);
  
  while (!q.empty()) {
    TreeNode* node = q.front(); q.pop();
    if (isSameTree(node, subRoot)) return true;
    
    if (node->left) q.push(node->left);
    if (node->right) q.push(node->right);
  }
  
  return false;
}

bool isSameTree(TreeNode* p, TreeNode* q) {
  if (!p && !q) return true;
  if (!p || !q || p->val != q->val) return false;
  return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}`,
      },
      complexity: {
        time: "O(n * m) where n is nodes in root, m is nodes in subRoot",
        space: "O(w) where w is the maximum width",
      },
      explanation:
        "Use BFS to check each node as a potential root of subRoot, using isSameTree.",
    },
    optimal: {
      code: {
        java: `public boolean isSubtree(TreeNode root, TreeNode subRoot) {
  if (subRoot == null) return true;
  if (root == null) return false;
  return isSameTree(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

private boolean isSameTree(TreeNode p, TreeNode q) {
  if (p == null && q == null) return true;
  if (p == null || q == null) return false;
  return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
        python: `def isSubtree(root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
  if not subRoot:
    return True
  if not root:
    return False
  return is_same_tree(root, subRoot) or isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)

def is_same_tree(p, q):
  if not p and not q:
    return True
  if not p or not q or p.val != q.val:
    return False
  return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)`,
        cpp: `bool isSubtree(TreeNode* root, TreeNode* subRoot) {
  if (!subRoot) return true;
  if (!root) return false;
  return isSameTree(root, subRoot) || isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
}

bool isSameTree(TreeNode* p, TreeNode* q) {
  if (!p && !q) return true;
  if (!p || !q || p->val != q->val) return false;
  return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}`,
      },
      complexity: {
        time: "O(n * m) where n is nodes in root, m is nodes in subRoot",
        space: "O(h) where h is the height of the tree",
      },
      explanation:
        "Use recursive DFS to check each node as a potential root of subRoot.",
    },
  },
  {
    id: 67,
    status: false,
    star: false,
    problem: "Lowest Common Ancestor of a Binary Search Tree",
    leetcodeLink:
      "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    difficulty: "Medium",
    description:
      "Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.",
    examples: [
      {
        input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
        output: "6",
      },
      {
        input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",
        output: "2",
      },
    ],
    bruteForce: {
      code: {
        java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
  List<TreeNode> pathP = new ArrayList<>();
  List<TreeNode> pathQ = new ArrayList<>();
  
  findPath(root, p, pathP);
  findPath(root, q, pathQ);
  
  TreeNode lca = null;
  for (int i = 0; i < Math.min(pathP.size(), pathQ.size()); i++) {
    if (pathP.get(i) == pathQ.get(i)) {
      lca = pathP.get(i);
    } else {
      break;
    }
  }
  
  return lca;
}

private boolean findPath(TreeNode root, TreeNode target, List<TreeNode> path) {
  if (root == null) return false;
  
  path.add(root);
  if (root == target) return true;
  
  if (findPath(root.left, target, path) || findPath(root.right, target, path)) {
    return true;
  }
  
  path.remove(path.size() - 1);
  return false;
}`,
        python: `def lowestCommonAncestor(root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
  def find_path(node, target, path):
    if not node:
      return False
    
    path.append(node)
    if node == target:
      return True
    
    if find_path(node.left, target, path) or find_path(node.right, target, path):
      return True
    
    path.pop()
    return False
  
  path_p = []
  path_q = []
  find_path(root, p, path_p)
  find_path(root, q, path_q)
  
  lca = None
  for i in range(min(len(path_p), len(path_q))):
    if path_p[i] == path_q[i]:
      lca = path_p[i]
    else:
      break
  
  return lca`,
        cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
  vector<TreeNode*> pathP, pathQ;
  
  function<bool(TreeNode*, TreeNode*, vector<TreeNode*>&)> findPath = [&](TreeNode* node, TreeNode* target, vector<TreeNode*>& path) {
    if (!node) return false;
    
    path.push_back(node);
    if (node == target) return true;
    
    if (findPath(node->left, target, path) || findPath(node->right, target, path)) {
      return true;
    }
    
    path.pop_back();
    return false;
  };
  
  findPath(root, p, pathP);
  findPath(root, q, pathQ);
  
  TreeNode* lca = nullptr;
  for (int i = 0; i < min(pathP.size(), pathQ.size()); i++) {
    if (pathP[i] == pathQ[i]) {
      lca = pathP[i];
    } else {
      break;
    }
  }
  
  return lca;
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(h) where h is the height of the tree",
      },
      explanation: "Find paths to p and q, then identify the last common node.",
    },
    optimal: {
      code: {
        java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
  while (root != null) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else {
      return root;
    }
  }
  return null;
}`,
        python: `def lowestCommonAncestor(root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
  while root:
    if p.val < root.val and q.val < root.val:
      root = root.left
    elif p.val > root.val and q.val > root.val:
      root = root.right
    else:
      return root
  return None`,
        cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
  while (root) {
    if (p->val < root->val && q->val < root->val) {
      root = root->left;
    } else if (p->val > root->val && q->val > root->val) {
      root = root->right;
    } else {
      return root;
    }
  }
  return nullptr;
}`,
      },
      complexity: {
        time: "O(h) where h is the height of the tree",
        space: "O(1)",
      },
      explanation:
        "Use BST properties to traverse iteratively, finding the split point.",
    },
  },
  {
    id: 68,
    status: false,
    star: false,
    problem: "Binary Tree Level Order Traversal",
    leetcodeLink:
      "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    difficulty: "Medium",
    description:
      "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
      },
      { input: "root = [1]", output: "[[1]]" },
    ],
    bruteForce: {
      code: {
        java: `public List<List<Integer>> levelOrder(TreeNode root) {
  List<List<Integer>> result = new ArrayList<>();
  if (root == null) return result;
  
  Queue<TreeNode> queue = new LinkedList<>();
  queue.offer(root);
  
  while (!queue.isEmpty()) {
    List<Integer> level = new ArrayList<>();
    int size = queue.size();
    
    for (int i = 0; i < size; i++) {
      TreeNode node = queue.poll();
      level.add(node.val);
      
      if (node.left != null) queue.offer(node.left);
      if (node.right != null) queue.offer(node.right);
    }
    
    result.add(level);
  }
  
  return result;
}`,
        python: `def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:
  if not root:
    return []
  
  result = []
  queue = deque([root])
  
  while queue:
    level = []
    size = len(queue)
    
    for _ in range(size):
      node = queue.popleft()
      level.append(node.val)
      
      if node.left:
        queue.append(node.left)
      if node.right:
        queue.append(node.right)
    
    result.append(level)
  
  return result`,
        cpp: `vector<vector<int>> levelOrder(TreeNode* root) {
  vector<vector<int>> result;
  if (!root) return result;
  
  queue<TreeNode*> q;
  q.push(root);
  
  while (!q.empty()) {
    vector<int> level;
    int size = q.size();
    
    for (int i = 0; i < size; i++) {
      TreeNode* node = q.front(); q.pop();
      level.push_back(node->val);
      
      if (node->left) q.push(node->left);
      if (node->right) q.push(node->right);
    }
    
    result.push_back(level);
  }
  
  return result;
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(w) where w is the maximum width",
      },
      explanation: "Use BFS to process nodes level by level.",
    },
    optimal: {
      code: {
        java: `public List<List<Integer>> levelOrder(TreeNode root) {
  List<List<Integer>> result = new ArrayList<>();
  if (root == null) return result;
  
  dfs(root, 0, result);
  return result;
}

private void dfs(TreeNode node, int level, List<List<Integer>> result) {
  if (node == null) return;
  
  if (result.size() == level) {
    result.add(new ArrayList<>());
  }
  
  result.get(level).add(node.val);
  
  dfs(node.left, level + 1, result);
  dfs(node.right, level + 1, result);
}`,
        python: `def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:
  result = []
  if not root:
    return result
  
  def dfs(node, level):
    if not node:
      return
    
    if len(result) == level:
      result.append([])
    
    result[level].append(node.val)
    
    dfs(node.left, level + 1)
    dfs(node.right, level + 1)
  
  dfs(root, 0)
  return result`,
        cpp: `vector<vector<int>> levelOrder(TreeNode* root) {
  vector<vector<int>> result;
  if (!root) return result;
  
  function<void(TreeNode*, int)> dfs = [&](TreeNode* node, int level) {
    if (!node) return;
    
    if (result.size() == level) {
      result.push_back({});
    }
    
    result[level].push_back(node->val);
    
    dfs(node->left, level + 1);
    dfs(node->right, level + 1);
  };
  
  dfs(root, 0);
  return result;
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(h) where h is the height of the tree",
      },
      explanation:
        "Use DFS with level tracking to build the result, reducing queue overhead.",
    },
  },
  {
    id: 69,
    status: false,
    star: false,
    problem: "Binary Tree Right Side View",
    leetcodeLink: "https://leetcode.com/problems/binary-tree-right-side-view/",
    difficulty: "Medium",
    description:
      "Given the root of a binary tree, return the values of the nodes you can see from the right side, ordered from top to bottom.",
    examples: [
      { input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]" },
      { input: "root = [1,null,3]", output: "[1,3]" },
    ],
    bruteForce: {
      code: {
        java: `public List<Integer> rightSideView(TreeNode root) {
  List<Integer> result = new ArrayList<>();
  if (root == null) return result;
  
  Queue<TreeNode> queue = new LinkedList<>();
  queue.offer(root);
  
  while (!queue.isEmpty()) {
    int size = queue.size();
    for (int i = 0; i < size; i++) {
      TreeNode node = queue.poll();
      if (i == size - 1) result.add(node.val);
      
      if (node.left != null) queue.offer(node.left);
      if (node.right != null) queue.offer(node.right);
    }
  }
  
  return result;
}`,
        python: `def rightSideView(root: Optional[TreeNode]) -> List[int]:
  if not root:
    return []
  
  result = []
  queue = deque([root])
  
  while queue:
    size = len(queue)
    for i in range(size):
      node = queue.popleft()
      if i == size - 1:
        result.append(node.val)
      
      if node.left:
        queue.append(node.left)
      if node.right:
        queue.append(node.right)
  
  return result`,
        cpp: `vector<int> rightSideView(TreeNode* root) {
  vector<int> result;
  if (!root) return result;
  
  queue<TreeNode*> q;
  q.push(root);
  
  while (!q.empty()) {
    int size = q.size();
    for (int i = 0; i < size; i++) {
      TreeNode* node = q.front(); q.pop();
      if (i == size - 1) result.push_back(node->val);
      
      if (node->left) q.push(node->left);
      if (node->right) q.push(node->right);
    }
  }
  
  return result;
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(w) where w is the maximum width",
      },
      explanation: "Use BFS, adding the last node of each level to the result.",
    },
    optimal: {
      code: {
        java: `public List<Integer> rightSideView(TreeNode root) {
  List<Integer> result = new ArrayList<>();
  if (root == null) return result;
  
  dfs(root, 0, result);
  return result;
}

private void dfs(TreeNode node, int level, List<Integer> result) {
  if (node == null) return;
  
  if (result.size() == level) {
    result.add(node.val);
  }
  
  dfs(node.right, level + 1, result);
  dfs(node.left, level + 1, result);
}`,
        python: `def rightSideView(root: Optional[TreeNode]) -> List[int]:
  result = []
  if not root:
    return result
  
  def dfs(node, level):
    if not node:
      return
    
    if len(result) == level:
      result.append(node.val)
    
    dfs(node.right, level + 1)
    dfs(node.left, level + 1)
  
  dfs(root, 0)
  return result`,
        cpp: `vector<int> rightSideView(TreeNode* root) {
  vector<int> result;
  if (!root) return result;
  
  function<void(TreeNode*, int)> dfs = [&](TreeNode* node, int level) {
    if (!node) return;
    
    if (result.size() == level) {
      result.push_back(node->val);
    }
    
    dfs(node->right, level + 1);
    dfs(node->left, level + 1);
  };
  
  dfs(root, 0);
  return result;
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(h) where h is the height of the tree",
      },
      explanation:
        "Use DFS, processing right child first and adding the first node at each level.",
    },
  },
  {
    id: 70,
    status: false,
    star: false,
    problem: "Count Good Nodes In Binary Tree",
    leetcodeLink:
      "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
    difficulty: "Medium",
    description:
      "Given a binary tree root, a node X is good if there is no node with a value greater than X's value in the path from root to X. Return the number of good nodes.",
    examples: [
      { input: "root = [3,1,4,3,null,1,5]", output: "4" },
      { input: "root = [3,3,null,4,2]", output: "3" },
    ],
    bruteForce: {
      code: {
        java: `public int goodNodes(TreeNode root) {
  if (root == null) return 0;
  
  int count = 0;
  Queue<TreeNode> queue = new LinkedList<>();
  queue.offer(root);
  
  while (!queue.isEmpty()) {
    TreeNode node = queue.poll();
    if (isGood(node, root.val)) count++;
    
    if (node.left != null) queue.offer(node.left);
    if (node.right != null) queue.offer(node.right);
  }
  
  return count;
}

private boolean isGood(TreeNode node, int maxVal) {
  List<Integer> path = new ArrayList<>();
  findPath(node, path);
  for (int val : path) {
    if (val > maxVal) return false;
  }
  return true;
}

private boolean findPath(TreeNode node, List<Integer> path) {
  if (node == null) return false;
  path.add(node.val);
  return true;
}`,
        python: `def goodNodes(root: TreeNode) -> int:
  if not root:
    return 0
  
  count = 0
  queue = deque([root])
  
  while queue:
    node = queue.popleft()
    if is_good(node, root.val):
      count += 1
    
    if node.left:
      queue.append(node.left)
    if node.right:
      queue.append(node.right)
  
  return count

def is_good(node, max_val):
  path = []
  find_path(node, path)
  return all(val <= max_val for val in path)

def find_path(node, path):
  if not node:
    return False
  path.append(node.val)
  return True`,
        cpp: `int goodNodes(TreeNode* root) {
  if (!root) return 0;
  
  int count = 0;
  queue<TreeNode*> q;
  q.push(root);
  
  while (!q.empty()) {
    TreeNode* node = q.front(); q.pop();
    if (isGood(node, root->val)) count++;
    
    if (node->left) q.push(node->left);
    if (node->right) q.push(node->right);
  }
  
  return count;
}

bool isGood(TreeNode* node, int maxVal) {
  vector<int> path;
  findPath(node, path);
  for (int val : path) {
    if (val > maxVal) return false;
  }
  return true;
}

bool findPath(TreeNode* node, vector<int>& path) {
  if (!node) return false;
  path.push_back(node->val);
  return true;
}`,
      },
      complexity: {
        time: "O(n^2) due to path checking for each node",
        space: "O(w) where w is the maximum width",
      },
      explanation:
        "Use BFS and check the path to each node to ensure no larger values.",
    },
    optimal: {
      code: {
        java: `public int goodNodes(TreeNode root) {
  return dfs(root, Integer.MIN_VALUE);
}

private int dfs(TreeNode node, int maxVal) {
  if (node == null) return 0;
  
  int count = node.val >= maxVal ? 1 : 0;
  maxVal = Math.max(maxVal, node.val);
  
  return count + dfs(node.left, maxVal) + dfs(node.right, maxVal);
}`,
        python: `def goodNodes(root: TreeNode) -> int:
  def dfs(node, max_val):
    if not node:
      return 0
    
    count = 1 if node.val >= max_val else 0
    max_val = max(max_val, node.val)
    
    return count + dfs(node.left, max_val) + dfs(node.right, max_val)
  
  return dfs(root, float('-inf'))`,
        cpp: `int goodNodes(TreeNode* root) {
  function<int(TreeNode*, int)> dfs = [&](TreeNode* node, int maxVal) {
    if (!node) return 0;
    
    int count = node->val >= maxVal ? 1 : 0;
    maxVal = max(maxVal, node->val);
    
    return count + dfs(node->left, maxVal) + dfs(node->right, maxVal);
  };
  
  return dfs(root, INT_MIN);
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(h) where h is the height of the tree",
      },
      explanation:
        "Use DFS, tracking the maximum value along the path to each node.",
    },
  },
  {
    id: 71,
    status: false,
    star: false,
    problem: "Validate Binary Search Tree",
    leetcodeLink: "https://leetcode.com/problems/validate-binary-search-tree/",
    difficulty: "Medium",
    description:
      "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    examples: [
      { input: "root = [2,1,3]", output: "true" },
      { input: "root = [5,1,4,null,null,3,6]", output: "false" },
    ],
    bruteForce: {
      code: {
        java: `public boolean isValidBST(TreeNode root) {
  if (root == null) return true;
  
  Queue<TreeNode> queue = new LinkedList<>();
  queue.offer(root);
  
  while (!queue.isEmpty()) {
    TreeNode node = queue.poll();
    
    if (!isValidSubtree(node.left, Long.MIN_VALUE, node.val) ||
        !isValidSubtree(node.right, node.val, Long.MAX_VALUE)) {
      return false;
    }
    
    if (node.left != null) queue.offer(node.left);
    if (node.right != null) queue.offer(node.right);
  }
  
  return true;
}

private boolean isValidSubtree(TreeNode node, long min, long max) {
  if (node == null) return true;
  
  if (node.val <= min || node.val >= max) return false;
  
  return isValidSubtree(node.left, min, node.val) && isValidSubtree(node.right, node.val, max);
}`,
        python: `def isValidBST(root: Optional[TreeNode]) -> bool:
  if not root:
    return True
  
  queue = deque([root])
  
  while queue:
    node = queue.popleft()
    
    if not is_valid_subtree(node.left, float('-inf'), node.val) or \
       not is_valid_subtree(node.right, node.val, float('inf')):
      return False
    
    if node.left:
      queue.append(node.left)
    if node.right:
      queue.append(node.right)
  
  return True

def is_valid_subtree(node, min_val, max_val):
  if not node:
    return True
  
  if node.val <= min_val or node.val >= max_val:
    return False
  
  return is_valid_subtree(node.left, min_val, node.val) and \
         is_valid_subtree(node.right, node.val, max_val)`,
        cpp: `bool isValidBST(TreeNode* root) {
  if (!root) return true;
  
  queue<TreeNode*> q;
  q.push(root);
  
  while (!q.empty()) {
    TreeNode* node = q.front(); q.pop();
    
    if (!isValidSubtree(node->left, LLONG_MIN, node->val) ||
        !isValidSubtree(node->right, node->val, LLONG_MAX)) {
      return false;
    }
    
    if (node->left) q.push(node->left);
    if (node->right) q.push(node->right);
  }
  
  return true;
}

bool isValidSubtree(TreeNode* node, long long min, long long max) {
  if (!node) return true;
  
  if (node->val <= min || node->val >= max) return false;
  
  return isValidSubtree(node->left, min, node->val) &&
         isValidSubtree(node->right, node->val, max);
}`,
      },
      complexity: {
        time: "O(n^2) due to repeated subtree validations",
        space: "O(w) where w is the maximum width",
      },
      explanation:
        "Use BFS to check each node, validating subtrees with range checks.",
    },
    optimal: {
      code: {
        java: `public boolean isValidBST(TreeNode root) {
  return isValid(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private boolean isValid(TreeNode node, long min, long max) {
  if (node == null) return true;
  
  if (node.val <= min || node.val >= max) return false;
  
  return isValid(node.left, min, node.val) && isValid(node.right, node.val, max);
}`,
        python: `def isValidBST(root: Optional[TreeNode]) -> bool:
  def is_valid(node, min_val, max_val):
    if not node:
      return True
    
    if node.val <= min_val or node.val >= max_val:
      return False
    
    return is_valid(node.left, min_val, node.val) and \
           is_valid(node.right, node.val, max_val)
  
  return is_valid(root, float('-inf'), float('inf'))`,
        cpp: `bool isValidBST(TreeNode* root) {
  function<bool(TreeNode*, long long, long long)> isValid = [&](TreeNode* node, long long min, long long max) {
    if (!node) return true;
    
    if (node->val <= min || node->val >= max) return false;
    
    return isValid(node->left, min, node->val) && isValid(node->right, node->val, max);
  };
  
  return isValid(root, LLONG_MIN, LLONG_MAX);
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(h) where h is the height of the tree",
      },
      explanation: "Use recursive DFS with range checks in a single pass.",
    },
  },
  {
    id: 72,
    status: false,
    star: false,
    problem: "Kth Smallest Element In a BST",
    leetcodeLink:
      "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    difficulty: "Medium",
    description:
      "Given the root of a binary search tree and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
    examples: [
      { input: "root = [3,1,4,null,2], k = 1", output: "1" },
      { input: "root = [5,3,6,2,4,null,null,1], k = 3", output: "3" },
    ],
    bruteForce: {
      code: {
        java: `public int kthSmallest(TreeNode root, int k) {
  List<Integer> values = new ArrayList<>();
  inorder(root, values);
  return values.get(k - 1);
}

private void inorder(TreeNode node, List<Integer> values) {
  if (node == null) return;
  inorder(node.left, values);
  values.add(node.val);
  inorder(node.right, values);
}`,
        python: `def kthSmallest(root: Optional[TreeNode], k: int) -> int:
  values = []
  
  def inorder(node):
    if not node:
      return
    inorder(node.left)
    values.append(node.val)
    inorder(node.right)
  
  inorder(root)
  return values[k - 1]`,
        cpp: `int kthSmallest(TreeNode* root, int k) {
  vector<int> values;
  
  function<void(TreeNode*)> inorder = [&](TreeNode* node) {
    if (!node) return;
    inorder(node->left);
    values.push_back(node->val);
    inorder(node->right);
  };
  
  inorder(root);
  return values[k - 1];
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(n) for storing values",
      },
      explanation:
        "Perform inorder traversal to collect all values, then return the kth element.",
    },
    optimal: {
      code: {
        java: `public int kthSmallest(TreeNode root, int k) {
  int[] count = new int[]{k};
  int[] result = new int[1];
  inorder(root, count, result);
  return result[0];
}

private void inorder(TreeNode node, int[] count, int[] result) {
  if (node == null) return;
  
  inorder(node.left, count, result);
  
  count[0]--;
  if (count[0] == 0) {
    result[0] = node.val;
    return;
  }
  
  inorder(node.right, count, result);
}`,
        python: `def kthSmallest(root: Optional[TreeNode], k: int) -> int:
  def inorder(node):
    nonlocal k, result
    if not node:
      return
    
    inorder(node.left)
    
    k -= 1
    if k == 0:
      result = node.val
      return
    
    inorder(node.right)
  
  result = 0
  inorder(root)
  return result`,
        cpp: `int kthSmallest(TreeNode* root, int k) {
  int count = k;
  int result;
  
  function<void(TreeNode*)> inorder = [&](TreeNode* node) {
    if (!node) return;
    
    inorder(node->left);
    
    if (--count == 0) {
      result = node->val;
      return;
    }
    
    inorder(node->right);
  };
  
  inorder(root);
  return result;
}`,
      },
      complexity: {
        time: "O(h + k) where h is the height of the tree",
        space: "O(h) for recursion stack",
      },
      explanation:
        "Use inorder traversal, stopping after finding the kth element.",
    },
  },
  {
    id: 73,
    status: false,
    star: false,
    problem: "Construct Binary Tree From Preorder And Inorder Traversal",
    leetcodeLink:
      "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    difficulty: "Medium",
    description:
      "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.",
    examples: [
      {
        input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
        output: "[3,9,20,null,null,15,7]",
      },
      { input: "preorder = [-1], inorder = [-1]", output: "[-1]" },
    ],
    bruteForce: {
      code: {
        java: `public TreeNode buildTree(int[] preorder, int[] inorder) {
  if (preorder.length == 0) return null;
  
  TreeNode root = new TreeNode(preorder[0]);
  int index = 0;
  for (int i = 0; i < inorder.length; i++) {
    if (inorder[i] == root.val) {
      index = i;
      break;
    }
  }
  
  int[] leftInorder = Arrays.copyOfRange(inorder, 0, index);
  int[] rightInorder = Arrays.copyOfRange(inorder, index + 1, inorder.length);
  int[] leftPreorder = Arrays.copyOfRange(preorder, 1, index + 1);
  int[] rightPreorder = Arrays.copyOfRange(preorder, index + 1, preorder.length);
  
  root.left = buildTree(leftPreorder, leftInorder);
  root.right = buildTree(rightPreorder, rightInorder);
  
  return root;
}`,
        python: `def buildTree(preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
  if not preorder:
    return None
  
  root = TreeNode(preorder[0])
  index = inorder.index(root.val)
  
  left_inorder = inorder[:index]
  right_inorder = inorder[index + 1:]
  left_preorder = preorder[1:index + 1]
  right_preorder = preorder[index + 1:]
  
  root.left = buildTree(left_preorder, left_inorder)
  root.right = buildTree(right_preorder, right_inorder)
  
  return root`,
        cpp: `TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
  if (preorder.empty()) return nullptr;
  
  TreeNode* root = new TreeNode(preorder[0]);
  int index = 0;
  for (int i = 0; i < inorder.size(); i++) {
    if (inorder[i] == root->val) {
      index = i;
      break;
    }
  }
  
  vector<int> leftInorder(inorder.begin(), inorder.begin() + index);
  vector<int> rightInorder(inorder.begin() + index + 1, inorder.end());
  vector<int> leftPreorder(preorder.begin() + 1, preorder.begin() + index + 1);
  vector<int> rightPreorder(preorder.begin() + index + 1, preorder.end());
  
  root->left = buildTree(leftPreorder, leftInorder);
  root->right = buildTree(rightPreorder, rightInorder);
  
  return root;
}`,
      },
      complexity: {
        time: "O(n^2) due to array copying and searching",
        space: "O(n^2) for array copies",
      },
      explanation:
        "Recursively build the tree by finding the root in inorder and splitting arrays.",
    },
    optimal: {
      code: {
        java: `public TreeNode buildTree(int[] preorder, int[] inorder) {
  Map<Integer, Integer> map = new HashMap<>();
  for (int i = 0; i < inorder.length; i++) {
    map.put(inorder[i], i);
  }
  return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1, map);
}

private TreeNode build(int[] preorder, int preStart, int preEnd, 
                      int[] inorder, int inStart, int inEnd, Map<Integer, Integer> map) {
  if (preStart > preEnd) return null;
  
  TreeNode root = new TreeNode(preorder[preStart]);
  int index = map.get(root.val);
  int leftSize = index - inStart;
  
  root.left = build(preorder, preStart + 1, preStart + leftSize, 
                    inorder, inStart, index - 1, map);
  root.right = build(preorder, preStart + leftSize + 1, preEnd, 
                     inorder, index + 1, inEnd, map);
  
  return root;
}`,
        python: `def buildTree(preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
  map_inorder = {val: idx for idx, val in enumerate(inorder)}
  
  def build(pre_start, pre_end, in_start, in_end):
    if pre_start > pre_end:
      return None
    
    root = TreeNode(preorder[pre_start])
    index = map_inorder[root.val]
    left_size = index - in_start
    
    root.left = build(pre_start + 1, pre_start + left_size, in_start, index - 1)
    root.right = build(pre_start + left_size + 1, pre_end, index + 1, in_end)
    
    return root
  
  return build(0, len(preorder) - 1, 0, len(inorder) - 1)`,
        cpp: `TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
  unordered_map<int, int> map;
  for (int i = 0; i < inorder.size(); i++) {
    map[inorder[i]] = i;
  }
  
  function<TreeNode*(int, int, int, int)> build = [&](int preStart, int preEnd, int inStart, int inEnd) {
    if (preStart > preEnd) return nullptr;
    
    TreeNode* root = new TreeNode(preorder[preStart]);
    int index = map[root->val];
    int leftSize = index - inStart;
    
    root->left = build(preStart + 1, preStart + leftSize, inStart, index - 1);
    root->right = build(preStart + leftSize + 1, preEnd, index + 1, inEnd);
    
    return root;
  };
  
  return build(0, preorder.size() - 1, 0, inorder.size() - 1);
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(n) for the hash map",
      },
      explanation:
        "Use a hash map to find root indices and avoid array copying.",
    },
  },

  // ==================== HARD ====================
  {
    id: 74,
    status: false,
    star: false,
    problem: "Binary Tree Maximum Path Sum",
    leetcodeLink: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    difficulty: "Hard",
    description:
      "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Given the root of a binary tree, return the maximum path sum of any non-empty path.",
    examples: [
      { input: "root = [1,2,3]", output: "6" },
      { input: "root = [-10,9,20,null,null,15,7]", output: "42" },
    ],
    bruteForce: {
      code: {
        java: `public int maxPathSum(TreeNode root) {
  List<TreeNode> nodes = new ArrayList<>();
  collectNodes(root, nodes);
  
  int maxSum = Integer.MIN_VALUE;
  
  for (TreeNode node : nodes) {
    maxSum = Math.max(maxSum, findMaxPath(node));
  }
  
  return maxSum;
}

private void collectNodes(TreeNode node, List<TreeNode> nodes) {
  if (node == null) return;
  nodes.add(node);
  collectNodes(node.left, nodes);
  collectNodes(node.right, nodes);
}

private int findMaxPath(TreeNode root) {
  if (root == null) return 0;
  
  int leftMax = Math.max(findMaxPath(root.left), 0);
  int rightMax = Math.max(findMaxPath(root.right), 0);
  
  return root.val + leftMax + rightMax;
}`,
        python: `def maxPathSum(root: Optional[TreeNode]) -> int:
  nodes = []
  
  def collect_nodes(node):
    if not node:
      return
    nodes.append(node)
    collect_nodes(node.left)
    collect_nodes(node.right)
  
  def find_max_path(node):
    if not node:
      return 0
    
    left_max = max(find_max_path(node.left), 0)
    right_max = max(find_max_path(node.right), 0)
    
    return node.val + left_max + right_max
  
  collect_nodes(root)
  return max(find_max_path(node) for node in nodes) if nodes else float('-inf')`,
        cpp: `int maxPathSum(TreeNode* root) {
  vector<TreeNode*> nodes;
  
  function<void(TreeNode*)> collectNodes = [&](TreeNode* node) {
    if (!node) return;
    nodes.push_back(node);
    collectNodes(node->left);
    collectNodes(node->right);
  };
  
  function<int(TreeNode*)> findMaxPath = [&](TreeNode* node) {
    if (!node) return 0;
    
    int leftMax = max(findMaxPath(node->left), 0);
    int rightMax = max(findMaxPath(node->right), 0);
    
    return node->val + leftMax + rightMax;
  };
  
  collectNodes(root);
  int maxSum = INT_MIN;
  for (TreeNode* node : nodes) {
    maxSum = max(maxSum, findMaxPath(node));
  }
  
  return maxSum;
}`,
      },
      complexity: {
        time: "O(n^2) due to repeated path calculations",
        space: "O(n) for storing nodes",
      },
      explanation:
        "Collect all nodes and compute the maximum path sum for each, checking all possible paths.",
    },
    optimal: {
      code: {
        java: `public int maxPathSum(TreeNode root) {
  int[] maxSum = new int[]{Integer.MIN_VALUE};
  maxGain(root, maxSum);
  return maxSum[0];
}

private int maxGain(TreeNode node, int[] maxSum) {
  if (node == null) return 0;
  
  int leftGain = Math.max(maxGain(node.left, maxSum), 0);
  int rightGain = Math.max(maxGain(node.right, maxSum), 0);
  
  int pathSum = node.val + leftGain + rightGain;
  maxSum[0] = Math.max(maxSum[0], pathSum);
  
  return node.val + Math.max(leftGain, rightGain);
}`,
        python: `def maxPathSum(root: Optional[TreeNode]) -> int:
  max_sum = float('-inf')
  
  def max_gain(node):
    nonlocal max_sum
    if not node:
      return 0
    
    left_gain = max(max_gain(node.left), 0)
    right_gain = max(max_gain(node.right), 0)
    
    path_sum = node.val + left_gain + right_gain
    max_sum = max(max_sum, path_sum)
    
    return node.val + max(left_gain, right_gain)
  
  max_gain(root)
  return max_sum`,
        cpp: `int maxPathSum(TreeNode* root) {
  int maxSum = INT_MIN;
  
  function<int(TreeNode*)> maxGain = [&](TreeNode* node) {
    if (!node) return 0;
    
    int leftGain = max(maxGain(node->left), 0);
    int rightGain = max(maxGain(node->right), 0);
    
    int pathSum = node->val + leftGain + rightGain;
    maxSum = max(maxSum, pathSum);
    
    return node->val + max(leftGain, rightGain);
  };
  
  maxGain(root);
  return maxSum;
}`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(h) where h is the height of the tree",
      },
      explanation:
        "Use DFS to compute the maximum path sum in a single pass, tracking the maximum at each node while returning the best single-path sum.",
    },
  },
  {
    id: 75,
    status: false,
    star: false,
    problem: "Serialize and Deserialize Binary Tree",
    leetcodeLink:
      "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    difficulty: "Hard",
    description:
      "Serialization is the process of converting a data structure or object into a sequence of bits. Design an algorithm to serialize and deserialize a binary tree.",
    examples: [
      {
        input: "root = [1,2,3,null,null,4,5]",
        output: "[1,2,3,null,null,4,5]",
      },
      { input: "root = []", output: "[]" },
    ],
    bruteForce: {
      code: {
        java: `public class Codec {
  public String serialize(TreeNode root) {
    if (root == null) return "null";
    
    StringBuilder sb = new StringBuilder();
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
      TreeNode node = queue.poll();
      if (node == null) {
        sb.append("null,");
        continue;
      }
      
      sb.append(node.val).append(",");
      queue.offer(node.left);
      queue.offer(node.right);
    }
    
    return sb.toString();
  }

  public TreeNode deserialize(String data) {
    String[] tokens = data.split(",");
    if (tokens[0].equals("null")) return null;
    
    TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    int i = 1;
    
    while (!queue.isEmpty() && i < tokens.length) {
      TreeNode node = queue.poll();
      
      if (!tokens[i].equals("null")) {
        node.left = new TreeNode(Integer.parseInt(tokens[i]));
        queue.offer(node.left);
      }
      i++;
      
      if (i < tokens.length && !tokens[i].equals("null")) {
        node.right = new TreeNode(Integer.parseInt(tokens[i]));
        queue.offer(node.right);
      }
      i++;
    }
    
    return root;
  }
}`,
        python: `class Codec:
  def serialize(self, root: Optional[TreeNode]) -> str:
    if not root:
      return "null"
    
    result = []
    queue = deque([root])
    
    while queue:
      node = queue.popleft()
      if not node:
        result.append("null")
        continue
      result.append(str(node.val))
      queue.append(node.left)
      queue.append(node.right)
    
    return ",".join(result)

  def deserialize(self, data: str) -> Optional[TreeNode]:
    if data == "null":
      return None
    
    tokens = data.split(",")
    root = TreeNode(int(tokens[0]))
    queue = deque([root])
    i = 1
    
    while queue and i < len(tokens):
      node = queue.popleft()
      
      if tokens[i] != "null":
        node.left = TreeNode(int(tokens[i]))
        queue.append(node.left)
      i += 1
      
      if i < len(tokens) and tokens[i] != "null":
        node.right = TreeNode(int(tokens[i]))
        queue.append(node.right)
      i += 1
    
    return root`,
        cpp: `class Codec {
public:
  string serialize(TreeNode* root) {
    if (!root) return "null";
    
    stringstream ss;
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
      TreeNode* node = q.front(); q.pop();
      if (!node) {
        ss << "null,";
        continue;
      }
      
      ss << node->val << ",";
      q.push(node->left);
      q.push(node->right);
    }
    
    return ss.str();
  }

  TreeNode* deserialize(string data) {
    stringstream ss(data);
    string token;
    vector<string> tokens;
    
    while (getline(ss, token, ',')) {
      tokens.push_back(token);
    }
    
    if (tokens[0] == "null") return nullptr;
    
    TreeNode* root = new TreeNode(stoi(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    int i = 1;
    
    while (!q.empty() && i < tokens.size()) {
      TreeNode* node = q.front(); q.pop();
      
      if (tokens[i] != "null") {
        node->left = new TreeNode(stoi(tokens[i]));
        q.push(node->left);
      }
      i++;
      
      if (i < tokens.size() && tokens[i] != "null") {
        node->right = new TreeNode(stoi(tokens[i]));
        q.push(node->right);
      }
      i++;
    }
    
    return root;
  }
};`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(n) for queue and string storage",
      },
      explanation:
        "Use BFS to serialize the tree level by level, including nulls, and deserialize by reconstructing the tree using a queue.",
    },
    optimal: {
      code: {
        java: `public class Codec {
  public String serialize(TreeNode root) {
    StringBuilder sb = new StringBuilder();
    serializeDFS(root, sb);
    return sb.toString();
  }

  private void serializeDFS(TreeNode node, StringBuilder sb) {
    if (node == null) {
      sb.append("null,");
      return;
    }
    
    sb.append(node.val).append(",");
    serializeDFS(node.left, sb);
    serializeDFS(node.right, sb);
  }

  public TreeNode deserialize(String data) {
    String[] tokens = data.split(",");
    int[] index = {0};
    return deserializeDFS(tokens, index);
  }

  private TreeNode deserializeDFS(String[] tokens, int[] index) {
    if (index[0] >= tokens.length || tokens[index[0]].equals("null")) {
      index[0]++;
      return null;
    }
    
    TreeNode node = new TreeNode(Integer.parseInt(tokens[index[0]++]));
    node.left = deserializeDFS(tokens, index);
    node.right = deserializeDFS(tokens, index);
    
    return node;
  }
}`,
        python: `class Codec:
  def serialize(self, root: Optional[TreeNode]) -> str:
    def serialize_dfs(node):
      if not node:
        return "null"
      return f"{node.val},{serialize_dfs(node.left)},{serialize_dfs(node.right)}"
    
    return serialize_dfs(root)

  def deserialize(self, data: str) -> Optional[TreeNode]:
    tokens = data.split(",")
    
    def deserialize_dfs(index):
      if index[0] >= len(tokens) or tokens[index[0]] == "null":
        index[0] += 1
        return None
      
      node = TreeNode(int(tokens[index[0]]))
      index[0] += 1
      node.left = deserialize_dfs(index)
      node.right = deserialize_dfs(index)
      
      return node
    
    return deserialize_dfs([0])`,
        cpp: `class Codec {
public:
  string serialize(TreeNode* root) {
    stringstream ss;
    serializeDFS(root, ss);
    return ss.str();
  }

  void serializeDFS(TreeNode* node, stringstream& ss) {
    if (!node) {
      ss << "null,";
      return;
    }
    
    ss << node->val << ",";
    serializeDFS(node->left, ss);
    serializeDFS(node->right, ss);
  }

  TreeNode* deserialize(string data) {
    stringstream ss(data);
    string token;
    vector<string> tokens;
    
    while (getline(ss, token, ',')) {
      tokens.push_back(token);
    }
    
    int index = 0;
    return deserializeDFS(tokens, index);
  }

  TreeNode* deserializeDFS(vector<string>& tokens, int& index) {
    if (index >= tokens.size() || tokens[index] == "null") {
      index++;
      return nullptr;
    }
    
    TreeNode* node = new TreeNode(stoi(tokens[index++]));
    node->left = deserializeDFS(tokens, index);
    node->right = deserializeDFS(tokens, index);
    
    return node;
  }
};`,
      },
      complexity: {
        time: "O(n) where n is the number of nodes",
        space: "O(h) for recursion stack",
      },
      explanation:
        "Use DFS (preorder traversal) to serialize and deserialize, reducing space overhead by avoiding queue usage.",
    },
  },
];
