// src/data/tries.ts
import { Question } from "../types/Question";

export const trieQuestions: Question[] = [
  // ==================== MEDIUM ====================
  {
    id: 76,
    status: false,
    star: false,
    problem: "Implement Trie (Prefix Tree)",
    leetcodeLink: "https://leetcode.com/problems/implement-trie-prefix-tree/",
    difficulty: "Medium",
    description:
      "Implement a trie with insert, search, and startsWith methods. The trie should store strings composed of lowercase letters a-z.",
    examples: [
      {
        input: `["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
                [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]`,
        output: `[null, null, true, false, true, null, true]`,
      },
    ],
    bruteForce: {
      code: {
        java: `class Trie {
  private Set<String> words;
  private Set<String> prefixes;
  
  public Trie() {
    words = new HashSet<>();
    prefixes = new HashSet<>();
  }
  
  public void insert(String word) {
    words.add(word);
    for (int i = 1; i <= word.length(); i++) {
      prefixes.add(word.substring(0, i));
    }
  }
  
  public boolean search(String word) {
    return words.contains(word);
  }
  
  public boolean startsWith(String prefix) {
    return prefixes.contains(prefix);
  }
}`,
        python: `class Trie:
  def __init__(self):
    self.words = set()
    self.prefixes = set()
  
  def insert(self, word: str) -> None:
    self.words.add(word)
    for i in range(1, len(word) + 1):
      self.prefixes.add(word[:i])
  
  def search(self, word: str) -> bool:
    return word in self.words
  
  def startsWith(self, prefix: str) -> bool:
    return prefix in self.prefixes`,
        cpp: `class Trie {
private:
  unordered_set<string> words;
  unordered_set<string> prefixes;
  
public:
  Trie() {}
  
  void insert(string word) {
    words.insert(word);
    for (int i = 1; i <= word.length(); i++) {
      prefixes.insert(word.substr(0, i));
    }
  }
  
  bool search(string word) {
    return words.find(word) != words.end();
  }
  
  bool startsWith(string prefix) {
    return prefixes.find(prefix) != prefixes.end();
  }
};`,
      },
      complexity: {
        time: "O(n * m) for insert, O(m) for search/startsWith, where n is word length, m is number of words",
        space: "O(n * m) for storing all prefixes and words",
      },
      explanation:
        "Store full words and all possible prefixes in sets. Insert generates all prefixes, search checks words, and startsWith checks prefixes.",
    },
    optimal: {
      code: {
        java: `class Trie {
  class TrieNode {
    TrieNode[] children;
    boolean isEnd;
    
    TrieNode() {
      children = new TrieNode[26];
      isEnd = false;
    }
  }
  
  private TrieNode root;
  
  public Trie() {
    root = new TrieNode();
  }
  
  public void insert(String word) {
    TrieNode node = root;
    for (char c : word.toCharArray()) {
      int index = c - 'a';
      if (node.children[index] == null) {
        node.children[index] = new TrieNode();
      }
      node = node.children[index];
    }
    node.isEnd = true;
  }
  
  public boolean search(String word) {
    TrieNode node = root;
    for (char c : word.toCharArray()) {
      int index = c - 'a';
      if (node.children[index] == null) return false;
      node = node.children[index];
    }
    return node.isEnd;
  }
  
  public boolean startsWith(String prefix) {
    TrieNode node = root;
    for (char c : prefix.toCharArray()) {
      int index = c - 'a';
      if (node.children[index] == null) return false;
      node = node.children[index];
    }
    return true;
  }
}`,
        python: `class Trie:
  def __init__(self):
    self.root = {}
    self.end_symbol = '*'
  
  def insert(self, word: str) -> None:
    node = self.root
    for c in word:
      if c not in node:
        node[c] = {}
      node = node[c]
    node[self.end_symbol] = True
  
  def search(self, word: str) -> bool:
    node = self.root
    for c in word:
      if c not in node:
        return False
      node = node[c]
    return self.end_symbol in node
  
  def startsWith(self, prefix: str) -> bool:
    node = self.root
    for c in prefix:
      if c not in node:
        return False
      node = node[c]
    return True`,
        cpp: `class Trie {
private:
  struct TrieNode {
    vector<TrieNode*> children;
    bool isEnd;
    
    TrieNode() : children(26, nullptr), isEnd(false) {}
  };
  
  TrieNode* root;
  
public:
  Trie() {
    root = new TrieNode();
  }
  
  void insert(string word) {
    TrieNode* node = root;
    for (char c : word) {
      int index = c - 'a';
      if (!node->children[index]) {
        node->children[index] = new TrieNode();
      }
      node = node->children[index];
    }
    node->isEnd = true;
  }
  
  bool search(string word) {
    TrieNode* node = root;
    for (char c : word) {
      int index = c - 'a';
      if (!node->children[index]) return false;
      node = node->children[index];
    }
    return node->isEnd;
  }
  
  bool startsWith(string prefix) {
    TrieNode* node = root;
    for (char c : prefix) {
      int index = c - 'a';
      if (!node->children[index]) return false;
      node = node->children[index];
    }
    return true;
  }
};`,
      },
      complexity: {
        time: "O(m) for insert, search, startsWith, where m is length of word/prefix",
        space:
          "O(ALPHABET_SIZE * N * M) where N is number of words, M is average word length",
      },
      explanation:
        "Use a trie data structure with nodes containing links to children for each letter. Insert builds the path, search checks for word end, and startsWith checks prefix existence.",
    },
  },
  {
    id: 77,
    status: false,
    star: false,
    problem: "Design Add and Search Words Data Structure",
    leetcodeLink:
      "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    difficulty: "Medium",
    description:
      "Design a data structure that supports adding new words and finding if a string matches any previously added word, where the search can contain '.' to represent any letter.",
    examples: [
      {
        input: `["WordDictionary", "addWord", "addWord", "addWord", "search", "search", "search", "search"]
                [[], ["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]]`,
        output: `[null, null, null, null, false, true, true, true]`,
      },
    ],
    bruteForce: {
      code: {
        java: `class WordDictionary {
  private List<String> words;
  
  public WordDictionary() {
    words = new ArrayList<>();
  }
  
  public void addWord(String word) {
    words.add(word);
  }
  
  public boolean search(String word) {
    for (String w : words) {
      if (w.length() != word.length()) continue;
      boolean match = true;
      for (int i = 0; i < word.length(); i++) {
        if (word.charAt(i) != '.' && word.charAt(i) != w.charAt(i)) {
          match = false;
          break;
        }
      }
      if (match) return true;
    }
    return false;
  }
}`,
        python: `class WordDictionary:
  def __init__(self):
    self.words = []
  
  def addWord(self, word: str) -> None:
    self.words.append(word)
  
  def search(self, word: str) -> bool:
    for w in self.words:
      if len(w) != len(word):
        continue
      match = True
      for i in range(len(word)):
        if word[i] != '.' and word[i] != w[i]:
          match = False
          break
      if match:
        return True
    return False`,
        cpp: `class WordDictionary {
private:
  vector<string> words;
  
public:
  WordDictionary() {}
  
  void addWord(string word) {
    words.push_back(word);
  }
  
  bool search(string word) {
    for (const string& w : words) {
      if (w.length() != word.length()) continue;
      bool match = true;
      for (int i = 0; i < word.length(); i++) {
        if (word[i] != '.' && word[i] != w[i]) {
          match = false;
          break;
        }
      }
      if (match) return true;
    }
    return false;
  }
};`,
      },
      complexity: {
        time: "O(n * m) for search, O(1) for addWord, where n is number of words, m is word length",
        space: "O(n * m) for storing words",
      },
      explanation:
        "Store words in a list and check each word against the search pattern, handling '.' as a wildcard by comparing characters.",
    },
    optimal: {
      code: {
        java: `class WordDictionary {
  class TrieNode {
    TrieNode[] children;
    boolean isEnd;
    
    TrieNode() {
      children = new TrieNode[26];
      isEnd = false;
    }
  }
  
  private TrieNode root;
  
  public WordDictionary() {
    root = new TrieNode();
  }
  
  public void addWord(String word) {
    TrieNode node = root;
    for (char c : word.toCharArray()) {
      int index = c - 'a';
      if (node.children[index] == null) {
        node.children[index] = new TrieNode();
      }
      node = node.children[index];
    }
    node.isEnd = true;
  }
  
  public boolean search(String word) {
    return searchDFS(word, 0, root);
  }
  
  private boolean searchDFS(String word, int index, TrieNode node) {
    if (index == word.length()) return node.isEnd;
    
    char c = word.charAt(index);
    if (c == '.') {
      for (TrieNode child : node.children) {
        if (child != null && searchDFS(word, index + 1, child)) {
          return true;
        }
      }
      return false;
    } else {
      int i = c - 'a';
      if (node.children[i] == null) return false;
      return searchDFS(word, index + 1, node.children[i]);
    }
  }
}`,
        python: `class WordDictionary:
  def __init__(self):
    self.root = {}
    self.end_symbol = '*'
  
  def addWord(self, word: str) -> None:
    node = self.root
    for c in word:
      if c not in node:
        node[c] = {}
      node = node[c]
    node[self.end_symbol] = True
  
  def search(self, word: str) -> bool:
    def dfs(index, node):
      if index == len(word):
        return self.end_symbol in node
      
      c = word[index]
      if c == '.':
        for child in node:
          if child != self.end_symbol and dfs(index + 1, node[child]):
            return True
        return False
      else:
        if c not in node:
          return False
        return dfs(index + 1, node[c])
    
    return dfs(0, self.root)`,
        cpp: `class WordDictionary {
private:
  struct TrieNode {
    vector<TrieNode*> children;
    bool isEnd;
    
    TrieNode() : children(26, nullptr), isEnd(false) {}
  };
  
  TrieNode* root;
  
public:
  WordDictionary() {
    root = new TrieNode();
  }
  
  void addWord(string word) {
    TrieNode* node = root;
    for (char c : word) {
      int index = c - 'a';
      if (!node->children[index]) {
        node->children[index] = new TrieNode();
      }
      node = node->children[index];
    }
    node->isEnd = true;
  }
  
  bool search(string word) {
    function<bool(int, TrieNode*)> dfs = [&](int index, TrieNode* node) {
      if (index == word.length()) return node->isEnd;
      
      char c = word[index];
      if (c == '.') {
        for (TrieNode* child : node->children) {
          if (child && dfs(index + 1, child)) return true;
        }
        return false;
      } else {
        int i = c - 'a';
        if (!node->children[i]) return false;
        return dfs(index + 1, node->children[i]);
      }
    };
    
    return dfs(0, root);
  }
};`,
      },
      complexity: {
        time: "O(m) for addWord, O(26^m) worst-case for search with many '.', where m is word length",
        space:
          "O(ALPHABET_SIZE * N * M) for trie storage, where N is number of words, M is average word length",
      },
      explanation:
        "Use a trie to store words. For search, use DFS to handle '.' by exploring all possible children at that position.",
    },
  },

  // ==================== HARD ====================
  {
    id: 78,
    status: false,
    star: false,
    problem: "Word Search II",
    leetcodeLink: "https://leetcode.com/problems/word-search-ii/",
    difficulty: "Hard",
    description:
      "Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells (horizontally or vertically neighboring).",
    examples: [
      {
        input: `board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]`,
        output: `["eat","oath"]`,
      },
      {
        input: `board = [["a","b"],["c","d"]], words = ["abcb"]`,
        output: `[]`,
      },
    ],
    bruteForce: {
      code: {
        java: `class Solution {
  public List<String> findWords(char[][] board, String[] words) {
    List<String> result = new ArrayList<>();
    for (String word : words) {
      if (exist(board, word)) {
        result.add(word);
      }
    }
    return result;
  }
  
  private boolean exist(char[][] board, String word) {
    int m = board.length, n = board[0].length;
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (dfs(board, word, 0, i, j)) {
          return true;
        }
      }
    }
    return false;
  }
  
  private boolean dfs(char[][] board, String word, int index, int i, int j) {
    if (index == word.length()) return true;
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != word.charAt(index)) {
      return false;
    }
    
    char temp = board[i][j];
    board[i][j] = '#';
    
    boolean found = dfs(board, word, index + 1, i + 1, j) ||
                    dfs(board, word, index + 1, i - 1, j) ||
                    dfs(board, word, index + 1, i, j + 1) ||
                    dfs(board, word, index + 1, i, j - 1);
    
    board[i][j] = temp;
    return found;
  }
}`,
        python: `class Solution:
  def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
    result = []
    for word in words:
      if self.exist(board, word):
        result.append(word)
    return result
  
  def exist(self, board: List[List[str]], word: str) -> bool:
    m, n = len(board), len(board[0])
    
    def dfs(index, i, j):
      if index == len(word):
        return True
      if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != word[index]:
        return False
      
      temp = board[i][j]
      board[i][j] = '#'
      
      found = (dfs(index + 1, i + 1, j) or
               dfs(index + 1, i - 1, j) or
               dfs(index + 1, i, j + 1) or
               dfs(index + 1, i, j - 1))
      
      board[i][j] = temp
      return found
    
    for i in range(m):
      for j in range(n):
        if dfs(0, i, j):
          return True
    return False`,
        cpp: `class Solution {
public:
  vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
    vector<string> result;
    for (const string& word : words) {
      if (exist(board, word)) {
        result.push_back(word);
      }
    }
    return result;
  }
  
private:
  bool exist(vector<vector<char>>& board, string word) {
    int m = board.size(), n = board[0].size();
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (dfs(board, word, 0, i, j)) {
          return true;
        }
      }
    }
    return false;
  }
  
  bool dfs(vector<vector<char>>& board, string& word, int index, int i, int j) {
    if (index == word.length()) return true;
    if (i < 0 || i >= board.size() || j < 0 || j >= board[0].size() || board[i][j] != word[index]) {
      return false;
    }
    
    char temp = board[i][j];
    board[i][j] = '#';
    
    bool found = dfs(board, word, index + 1, i + 1, j) ||
                 dfs(board, word, index + 1, i - 1, j) ||
                 dfs(board, word, index + 1, i, j + 1) ||
                 dfs(board, word, index + 1, i, j - 1);
    
    board[i][j] = temp;
    return found;
  }
};`,
      },
      complexity: {
        time: "O(W * M * N * 4^L) where W is number of words, M*N is board size, L is max word length",
        space: "O(L) for recursion stack",
      },
      explanation:
        "For each word, perform DFS on the board to check if it exists, exploring all possible paths from each cell.",
    },
    optimal: {
      code: {
        java: `class Solution {
  class TrieNode {
    TrieNode[] children;
    String word;
    
    TrieNode() {
      children = new TrieNode[26];
      word = null;
    }
  }
  
  public List<String> findWords(char[][] board, String[] words) {
    List<String> result = new ArrayList<>();
    TrieNode root = new TrieNode();
    
    // Build trie
    for (String word : words) {
      TrieNode node = root;
      for (char c : word.toCharArray()) {
        int index = c - 'a';
        if (node.children[index] == null) {
          node.children[index] = new TrieNode();
        }
        node = node.children[index];
      }
      node.word = word;
    }
    
    // Search board
    int m = board.length, n = board[0].length;
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        dfs(board, i, j, root, result);
      }
    }
    
    return result;
  }
  
  private void dfs(char[][] board, int i, int j, TrieNode node, List<String> result) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] == '#') {
      return;
    }
    
    char c = board[i][j];
    int index = c - 'a';
    if (node.children[index] == null) return;
    
    node = node.children[index];
    if (node.word != null) {
      result.add(node.word);
      node.word = null; // Avoid duplicates
    }
    
    char temp = board[i][j];
    board[i][j] = '#';
    
    dfs(board, i + 1, j, node, result);
    dfs(board, i - 1, j, node, result);
    dfs(board, i, j + 1, node, result);
    dfs(board, i, j - 1, node, result);
    
    board[i][j] = temp;
  }
}`,
        python: `class Solution:
  def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
    root = {}
    end_symbol = '*'
    
    # Build trie
    for word in words:
      node = root
      for c in word:
        node = node.setdefault(c, {})
      node[end_symbol] = word
    
    m, n = len(board), len(board[0])
    result = []
    
    def dfs(i, j, node):
      if i < 0 or i >= m or j < 0 or j >= n or board[i][j] not in node:
        return
      
      c = board[i][j]
      next_node = node[c]
      
      if end_symbol in next_node:
        result.append(next_node[end_symbol])
        del next_node[end_symbol]
      
      temp = board[i][j]
      board[i][j] = '#'
      
      dfs(i + 1, j, next_node)
      dfs(i - 1, j, next_node)
      dfs(i, j + 1, next_node)
      dfs(i, j - 1, next_node)
      
      board[i][j] = temp
      
      if not next_node:
        del node[c]
    
    for i in range(m):
      for j in range(n):
        dfs(i, j, root)
    
    return result`,
        cpp: `class Solution {
private:
  struct TrieNode {
    vector<TrieNode*> children;
    string word;
    
    TrieNode() : children(26, nullptr), word("") {}
  };
  
public:
  vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
    TrieNode* root = new TrieNode();
    
    // Build trie
    for (const string& word : words) {
      TrieNode* node = root;
      for (char c : word) {
        int index = c - 'a';
        if (!node->children[index]) {
          node->children[index] = new TrieNode();
        }
        node = node->children[index];
      }
      node->word = word;
    }
    
    vector<string> result;
    int m = board.size(), n = board[0].size();
    
    // Search board
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        dfs(board, i, j, root, result);
      }
    }
    
    return result;
  }
  
private:
  void dfs(vector<vector<char>>& board, int i, int j, TrieNode* node, vector<string>& result) {
    if (i < 0 || i >= board.size() || j < 0 || j >= board[0].size() || board[i][j] == '#') {
      return;
    }
    
    char c = board[i][j];
    int index = c - 'a';
    if (!node->children[index]) return;
    
    node = node->children[index];
    if (!node->word.empty()) {
      result.push_back(node->word);
      node->word = "";
    }
    
    char temp = board[i][j];
    board[i][j] = '#';
    
    dfs(board, i + 1, j, node, result);
    dfs(board, i - 1, j, node, result);
    dfs(board, i, j + 1, node, result);
    dfs(board, i, j - 1, node, result);
    
    board[i][j] = temp;
  }
};`,
      },
      complexity: {
        time: "O(M * N * 4 * 3^(L-1)) where M*N is board size, L is max word length",
        space: "O(ALPHABET_SIZE * N * L) for trie, O(L) for recursion stack",
      },
      explanation:
        "Build a trie from words, then use DFS on the board to find words, pruning paths not in the trie and removing found words to avoid duplicates.",
    },
  },
];
