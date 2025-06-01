// src/data/heaps.ts
import { Question } from "../types/Question";

export const heapQuestions: Question[] = [
  // ==================== EASY ====================
  {
    id: 46,
    status: false,
    star: false,
    problem: "Last Stone Weight",
    leetcodeLink: "https://leetcode.com/problems/last-stone-weight/",
    difficulty: "Easy",
    description: "Given an array of integers representing stone weights, each turn, smash the two heaviest stones together. If they are equal, both are destroyed; otherwise, the smaller is destroyed and the larger is reduced by the smaller's weight. Return the weight of the last stone, or 0 if none remain.",
    examples: [
      { input: "stones = [2,7,4,1,8,1]", output: "1" },
      { input: "stones = [1]", output: "1" }
    ],
    bruteForce: {
      code: {
        java: `public int lastStoneWeight(int[] stones) {
  List<Integer> list = new ArrayList<>();
  for (int stone : stones) list.add(stone);
  
  while (list.size() > 1) {
    Collections.sort(list);
    int n = list.size();
    int y = list.remove(n - 1);
    int x = list.remove(n - 2);
    if (x != y) list.add(y - x);
  }
  
  return list.isEmpty() ? 0 : list.get(0);
}`,
        python: `def lastStoneWeight(stones):
  stones = stones[:]
  while len(stones) > 1:
    stones.sort()
    y = stones.pop()
    x = stones.pop()
    if x != y:
      stones.append(y - x)
  return stones[0] if stones else 0`,
        cpp: `int lastStoneWeight(vector<int>& stones) {
  vector<int> list(stones);
  
  while (list.size() > 1) {
    sort(list.begin(), list.end());
    int n = list.size();
    int y = list.back(); list.pop_back();
    int x = list.back(); list.pop_back();
    if (x != y) list.push_back(y - x);
  }
  
  return list.empty() ? 0 : list[0];
}`
      },
      complexity: {
        time: "O(n^2 log n) where n is the number of stones",
        space: "O(n)"
      },
      explanation: "Sort the array in each iteration to find the two largest stones, remove them, and add the difference back if they are not equal."
    },
    optimal: {
      code: {
        java: `public int lastStoneWeight(int[] stones) {
  PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);
  for (int stone : stones) pq.offer(stone);
  
  while (pq.size() > 1) {
    int y = pq.poll();
    int x = pq.poll();
    if (x != y) pq.offer(y - x);
  }
  
  return pq.isEmpty() ? 0 : pq.poll();
}`,
        python: `def lastStoneWeight(stones):
  import heapq
  stones = [-s for s in stones]  # Max heap
  heapq.heapify(stones)
  
  while len(stones) > 1:
    y = -heapq.heappop(stones)
    x = -heapq.heappop(stones)
    if x != y:
      heapq.heappush(stones, -(y - x))
  
  return -stones[0] if stones else 0`,
        cpp: `int lastStoneWeight(vector<int>& stones) {
  priority_queue<int> pq(stones.begin(), stones.end());
  
  while (pq.size() > 1) {
    int y = pq.top(); pq.pop();
    int x = pq.top(); pq.pop();
    if (x != y) pq.push(y - x);
  }
  
  return pq.empty() ? 0 : pq.top();
}`
      },
      complexity: {
        time: "O(n log n) where n is the number of stones",
        space: "O(n)"
      },
      explanation: "Use a max heap to efficiently retrieve the two heaviest stones in O(log n) time, reducing the overall complexity."
    }
  },

  // ==================== MEDIUM ====================
  {
    id: 47,
    status: false,
    star: false,
    problem: "Kth Largest Element In a Stream",
    leetcodeLink: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
    difficulty: "Medium",
    description: "Design a class to find the kth largest element in a stream. Initialize with an array and k, then support adding new elements and returning the kth largest.",
    examples: [
      { input: `["KthLargest","add","add","add","add","add"]\n[[3,[4,5,8,2]],[3],[5],[10],[9],[4]]`, output: `[null,4,5,5,8,8]` }
    ],
    bruteForce: {
      code: {
        java: `class KthLargest {
  List<Integer> list;
  int k;
  
  public KthLargest(int k, int[] nums) {
    this.list = new ArrayList<>();
    this.k = k;
    for (int num : nums) list.add(num);
  }
  
  public int add(int val) {
    list.add(val);
    Collections.sort(list);
    return list.get(list.size() - k);
  }
}`,
        python: `class KthLargest:
  def __init__(self, k: int, nums: List[int]):
    self.list = nums[:]
    self.k = k
  
  def add(self, val: int) -> int:
    self.list.append(val)
    self.list.sort()
    return self.list[-self.k]`,
        cpp: `class KthLargest {
  vector<int> list;
  int k;
public:
  KthLargest(int k, vector<int>& nums) : k(k) {
    list = nums;
  }
  
  int add(int val) {
    list.push_back(val);
    sort(list.begin(), list.end());
    return list[list.size() - k];
  }
};`
      },
      complexity: {
        time: "O(n log n) for add, O(n log n) for init",
        space: "O(n)"
      },
      explanation: "Store all elements in a list, sort on each add to find the kth largest element."
    },
    optimal: {
      code: {
        java: `class KthLargest {
  PriorityQueue<Integer> pq;
  int k;
  
  public KthLargest(int k, int[] nums) {
    this.k = k;
    this.pq = new PriorityQueue<>();
    for (int num : nums) {
      pq.offer(num);
      if (pq.size() > k) pq.poll();
    }
  }
  
  public int add(int val) {
    pq.offer(val);
    if (pq.size() > k) pq.poll();
    return pq.peek();
  }
}`,
        python: `class KthLargest:
  def __init__(self, k: int, nums: List[int]):
    import heapq
    self.k = k
    self.pq = nums[:]
    heapq.heapify(self.pq)
    while len(self.pq) > k:
      heapq.heappop(self.pq)
  
  def add(self, val: int) -> int:
    heapq.heappush(self.pq, val)
    if len(self.pq) > self.k:
      heapq.heappop(self.pq)
    return self.pq[0]`,
        cpp: `class KthLargest {
  priority_queue<int, vector<int>, greater<int>> pq;
  int k;
public:
  KthLargest(int k, vector<int>& nums) : k(k) {
    for (int num : nums) {
      pq.push(num);
      if (pq.size() > k) pq.pop();
    }
  }
  
  int add(int val) {
    pq.push(val);
    if (pq.size() > k) pq.pop();
    return pq.top();
  }
};`
      },
      complexity: {
        time: "O(n log n) for init, O(log k) for add",
        space: "O(k)"
      },
      explanation: "Use a min-heap of size k to maintain the k largest elements, ensuring the kth largest is always at the top."
    }
  },
  {
    id: 48,
    status: false,
    star: false,
    problem: "K Closest Points to Origin",
    leetcodeLink: "https://leetcode.com/problems/k-closest-points-to-origin/",
    difficulty: "Medium",
    description: "Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).",
    examples: [
      { input: "points = [[1,3],[-2,2]], k = 1", output: "[[-2,2]]" },
      { input: "points = [[3,3],[5,-1],[-2,4]], k = 2", output: "[[3,3],[-2,4]]" }
    ],
    bruteForce: {
      code: {
        java: `public int[][] kClosest(int[][] points, int k) {
  List<int[]> list = new ArrayList<>();
  for (int[] point : points) list.add(point);
  
  list.sort((a, b) -> (a[0] * a[0] + a[1] * a[1]) - (b[0] * b[0] + b[1] * b[1]));
  
  int[][] result = new int[k][2];
  for (int i = 0; i < k; i++) result[i] = list.get(i);
  
  return result;
}`,
        python: `def kClosest(points: List[List[int]], k: int) -> List[List[int]]:
  points.sort(key=lambda p: p[0]**2 + p[1]**2)
  return points[:k]`,
        cpp: `vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
  sort(points.begin(), points.end(), 
       [](const vector<int>& a, const vector<int>& b) {
         return (a[0] * a[0] + a[1] * a[1]) < (b[0] * b[0] + b[1] * b[1]);
       });
  return vector<vector<int>>(points.begin(), points.begin() + k);
}`
      },
      complexity: {
        time: "O(n log n) where n is the number of points",
        space: "O(n)"
      },
      explanation: "Sort all points by their Euclidean distance to the origin and return the first k points."
    },
    optimal: {
      code: {
        java: `public int[][] kClosest(int[][] points, int k) {
  PriorityQueue<int[]> pq = new PriorityQueue<>(
    (a, b) -> (b[0] * b[0] + b[1] * b[1]) - (a[0] * a[0] + a[1] * a[1]));
  
  for (int[] point : points) {
    pq.offer(point);
    if (pq.size() > k) pq.poll();
  }
  
  int[][] result = new int[k][2];
  for (int i = 0; i < k; i++) result[i] = pq.poll();
  
  return result;
}`,
        python: `def kClosest(points: List[List[int]], k: int) -> List[List[int]]:
  import heapq
  heap = []
  for x, y in points:
    dist = -(x**2 + y**2)  # Max heap
    heapq.heappush(heap, (dist, x, y))
    if len(heap) > k:
      heapq.heappop(heap)
  
  return [[x, y] for _, x, y in heap]`,
        cpp: `vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
  priority_queue<pair<int, vector<int>>> pq;
  
  for (const auto& point : points) {
    int dist = point[0] * point[0] + point[1] * point[1];
    pq.push({dist, point});
    if (pq.size() > k) pq.pop();
  }
  
  vector<vector<int>> result;
  while (!pq.empty()) {
    result.push_back(pq.top().second);
    pq.pop();
  }
  
  return result;
}`
      },
      complexity: {
        time: "O(n log k) where n is the number of points",
        space: "O(k)"
      },
      explanation: "Use a max heap of size k to keep the k closest points, popping the farthest when size exceeds k."
    }
  },
  {
    id: 49,
    status: false,
    star: false,
    problem: "Kth Largest Element In An Array",
    leetcodeLink: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    difficulty: "Medium",
    description: "Given an integer array nums and an integer k, return the kth largest element in the array.",
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
      { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" }
    ],
    bruteForce: {
      code: {
        java: `public int findKthLargest(int[] nums, int k) {
  Arrays.sort(nums);
  return nums[nums.length - k];
}`,
        python: `def findKthLargest(nums: List[int], k: int) -> int:
  nums.sort()
  return nums[-k]`,
        cpp: `int findKthLargest(vector<int>& nums, int k) {
  sort(nums.begin(), nums.end());
  return nums[nums.size() - k];
}`
      },
      complexity: {
        time: "O(n log n) where n is the array length",
        space: "O(1)"
      },
      explanation: "Sort the entire array and return the (n-k)th element."
    },
    optimal: {
      code: {
        java: `public int findKthLargest(int[] nums, int k) {
  PriorityQueue<Integer> pq = new PriorityQueue<>();
  for (int num : nums) {
    pq.offer(num);
    if (pq.size() > k) pq.poll();
  }
  return pq.peek();
}`,
        python: `def findKthLargest(nums: List[int], k: int) -> int:
  import heapq
  heap = []
  for num in nums:
    heapq.heappush(heap, num)
    if len(heap) > k:
      heapq.heappop(heap)
  return heap[0]`,
        cpp: `int findKthLargest(vector<int>& nums, int k) {
  priority_queue<int, vector<int>, greater<int>> pq;
  for (int num : nums) {
    pq.push(num);
    if (pq.size() > k) pq.pop();
  }
  return pq.top();
}`
      },
      complexity: {
        time: "O(n log k) where n is the array length",
        space: "O(k)"
      },
      explanation: "Use a min-heap of size k to maintain the k largest elements, returning the smallest of them."
    }
  },
  {
    id: 50,
    status: false,
    star: false,
    problem: "Task Scheduler",
    leetcodeLink: "https://leetcode.com/problems/task-scheduler/",
    difficulty: "Medium",
    description: "Given a char array representing tasks CPU needs to do and a non-negative integer n, return the least number of intervals the CPU will take to finish all tasks, with a cooldown of n intervals between same tasks.",
    examples: [
      { input: "tasks = ['A','A','A','B','B','B'], n = 2", output: "8" },
      { input: "tasks = ['A','A','A','B','B','B'], n = 0", output: "6" }
    ],
    bruteForce: {
      code: {
        java: `public int leastInterval(char[] tasks, int n) {
  Map<Character, Integer> count = new HashMap<>();
  for (char task : tasks) count.merge(task, 1, Integer::sum);
  
  List<Character> taskList = new ArrayList<>();
  while (!count.isEmpty()) {
    List<Character> temp = new ArrayList<>();
    for (char task : count.keySet()) {
      temp.add(task);
      count.put(task, count.get(task) - 1);
      if (count.get(task) == 0) count.remove(task);
    }
    
    taskList.addAll(temp);
    for (int i = 0; i < n && !count.isEmpty(); i++) taskList.add(null);
  }
  
  return taskList.size();
}`,
        python: `def leastInterval(tasks: List[str], n: int) -> int:
  count = {}
  for task in tasks:
    count[task] = count.get(task, 0) + 1
  
  result = []
  while count:
    temp = []
    for task in list(count.keys()):
      temp.append(task)
      count[task] -= 1
      if count[task] == 0:
        del count[task]
    
    result.extend(temp)
    if count:
      result.extend([None] * n)
  
  return len(result)`,
        cpp: `int leastInterval(vector<char>& tasks, int n) {
  unordered_map<char, int> count;
  for (char task : tasks) count[task]++;
  
  vector<char> taskList;
  while (!count.empty()) {
    vector<char> temp;
    for (auto it = count.begin(); it != count.end();) {
      temp.push_back(it->first);
      if (--it->second == 0) count.erase(it++);
      else ++it;
    }
    
    taskList.insert(taskList.end(), temp.begin(), temp.end());
    if (!count.empty()) taskList.insert(taskList.end(), n, 0);
  }
  
  return taskList.size();
}`
      },
      complexity: {
        time: "O(n * m) where n is number of tasks, m is number of unique tasks",
        space: "O(m)"
      },
      explanation: "Simulate the process by selecting tasks in rounds, adding idle slots as needed."
    },
    optimal: {
      code: {
        java: `public int leastInterval(char[] tasks, int n) {
  int[] count = new int[26];
  for (char task : tasks) count[task - 'A']++;
  
  PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);
  for (int c : count) if (c > 0) pq.offer(c);
  
  int time = 0;
  while (!pq.isEmpty()) {
    List<Integer> temp = new ArrayList<>();
    int cycle = n + 1;
    
    while (cycle > 0 && !pq.isEmpty()) {
      int maxCount = pq.poll();
      if (maxCount > 1) temp.add(maxCount - 1);
      time++;
      cycle--;
    }
    
    for (int c : temp) pq.offer(c);
    if (!pq.isEmpty()) time += cycle; // Add idle time
  }
  
  return time;
}`,
        python: `def leastInterval(tasks: List[str], n: int) -> int:
  from heapq import heappush, heappop
  count = [0] * 26
  for task in tasks:
    count[ord(task) - ord('A')] += 1
  
  pq = [-c for c in count if c > 0]
  heapq.heapify(pq)
  
  time = 0
  while pq:
    temp = []
    cycle = n + 1
    while cycle > 0 and pq:
      max_count = -heappop(pq)
      if max_count > 1:
        temp.append(-(max_count - 1))
      time += 1
      cycle -= 1
    
    for c in temp:
      heappush(pq, c)
    if pq:
      time += cycle  # Add idle time
  
  return time`,
        cpp: `int leastInterval(vector<char>& tasks, int n) {
  vector<int> count(26);
  for (char task : tasks) count[task - 'A']++;
  
  priority_queue<int> pq;
  for (int c : count) if (c > 0) pq.push(c);
  
  int time = 0;
  while (!pq.empty()) {
    vector<int> temp;
    int cycle = n + 1;
    
    while (cycle > 0 && !pq.empty()) {
      int maxCount = pq.top(); pq.pop();
      if (maxCount > 1) temp.push_back(maxCount - 1);
      time++;
      cycle--;
    }
    
    for (int c : temp) pq.push(c);
    if (!pq.empty()) time += cycle; // Add idle time
  }
  
  return time;
}`
      },
      complexity: {
        time: "O(n log m) where n is number of tasks, m is number of unique tasks",
        space: "O(m)"
      },
      explanation: "Use a max heap to schedule tasks with highest frequency first, processing in cycles of n+1."
    }
  },
  {
    id: 51,
    status: false,
    star: false,
    problem: "Design Twitter",
    leetcodeLink: "https://leetcode.com/problems/design-twitter/",
    difficulty: "Medium",
    description: "Design a simplified Twitter where users can post tweets, follow/unfollow users, and see the 10 most recent tweets in their news feed from themselves and followed users.",
    examples: [
      { 
        input: `["Twitter","postTweet","getNewsFeed","follow","postTweet","getNewsFeed","unfollow","getNewsFeed"]\n[[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]]`, 
        output: `[null,null,[5],null,null,[6,5],null,[5]]` 
      }
    ],
    bruteForce: {
      code: {
        java: `class Twitter {
  Map<Integer, List<int[]>> tweets; // userId -> [tweetId, time]
  Map<Integer, Set<Integer>> follows;
  int time;
  
  public Twitter() {
    tweets = new HashMap<>();
    follows = new HashMap<>();
    time = 0;
  }
  
  public void postTweet(int userId, int tweetId) {
    tweets.computeIfAbsent(userId, k -> new ArrayList<>()).add(new int[]{tweetId, time++});
  }
  
  public List<Integer> getNewsFeed(int userId) {
    List<int[]> allTweets = new ArrayList<>();
    Set<Integer> followees = follows.getOrDefault(userId, new HashSet<>());
    followees.add(userId);
    
    for (int followee : followees) {
      if (tweets.containsKey(followee)) {
        allTweets.addAll(tweets.get(followee));
      }
    }
    
    allTweets.sort((a, b) -> b[1] - a[1]);
    List<Integer> result = new ArrayList<>();
    for (int i = 0; i < Math.min(10, allTweets.size()); i++) {
      result.add(allTweets.get(i)[0]);
    }
    return result;
  }
  
  public void follow(int followerId, int followeeId) {
    follows.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
  }
  
  public void unfollow(int followerId, int followeeId) {
    if (followerId != followeeId) {
      follows.getOrDefault(followerId, new HashSet<>()).remove(followeeId);
    }
  }
}`,
        python: `class Twitter:
  def __init__(self):
    self.tweets = {}  # userId -> [(tweetId, time)]
    self.follows = {}  # userId -> set(followeeIds)
    self.time = 0
  
  def postTweet(self, userId: int, tweetId: int) -> None:
    if userId not in self.tweets:
      self.tweets[userId] = []
    self.tweets[userId].append((tweetId, self.time))
    self.time += 1
  
  def getNewsFeed(self, userId: int) -> List[int]:
    followees = self.follows.get(userId, set()) | {userId}
    all_tweets = []
    for followee in followees:
      if followee in self.tweets:
        all_tweets.extend(self.tweets[followee])
    
    all_tweets.sort(key=lambda x: x[1], reverse=True)
    return [tweetId for tweetId, _ in all_tweets[:10]]
  
  def follow(self, followerId: int, followeeId: int) -> None:
    if followerId != followeeId:
      self.follows.setdefault(followerId, set()).add(followeeId)
  
  def unfollow(self, followerId: int, followeeId: int) -> None:
    if followerId != followeeId:
      self.follows.get(followerId, set()).discard(followeeId)`,
        cpp: `class Twitter {
  unordered_map<int, vector<pair<int, int>>> tweets; // userId -> {tweetId, time}
  unordered_map<int, unordered_set<int>> follows;
  int time;
public:
  Twitter() : time(0) {}
  
  void postTweet(int userId, int tweetId) {
    tweets[userId].push_back({tweetId, time++});
  }
  
  vector<int> getNewsFeed(int userId) {
    vector<pair<int, int>> allTweets;
    auto followees = follows[userId];
    followees.insert(userId);
    
    for (int followee : followees) {
      for (auto& tweet : tweets[followee]) {
        allTweets.push_back(tweet);
      }
    }
    
    sort(allTweets.begin(), allTweets.end(), 
         [](const auto& a, const auto& b) { return a.second > b.second; });
    
    vector<int> result;
    for (int i = 0; i < min(10, (int)allTweets.size()); i++) {
      result.push_back(allTweets[i].first);
    }
    return result;
  }
  
  void follow(int followerId, int followeeId) {
    if (followerId != followeeId) {
      follows[followerId].insert(followeeId);
    }
  }
  
  void unfollow(int followerId, int followeeId) {
    if (followerId != followeeId) {
      follows[followerId].erase(followeeId);
    }
  }
};`
      },
      complexity: {
        time: "O(n log n) for getNewsFeed where n is total tweets, O(1) for others",
        space: "O(n) where n is total tweets and follow relationships"
      },
      explanation: "Store tweets and follow relationships in maps, sort all tweets for news feed."
    },
    optimal: {
      code: {
        java: `class Twitter {
  Map<Integer, List<int[]>> tweets;
  Map<Integer, Set<Integer>> follows;
  int time;
  
  public Twitter() {
    tweets = new HashMap<>();
    follows = new HashMap<>();
    time = 0;
  }
  
  public void postTweet(int userId, int tweetId) {
    tweets.computeIfAbsent(userId, k -> new ArrayList<>()).add(new int[]{tweetId, time++});
  }
  
  public List<Integer> getNewsFeed(int userId) {
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    Set<Integer> followees = follows.getOrDefault(userId, new HashSet<>());
    followees.add(userId);
    
    for (int followee : followees) {
      if (tweets.containsKey(followee)) {
        List<int[]> userTweets = tweets.get(followee);
        for (int i = userTweets.size() - 1; i >= Math.max(0, userTweets.size() - 10); i--) {
          pq.offer(userTweets.get(i));
          if (pq.size() > 10) pq.poll();
        }
      }
    }
    
    List<Integer> result = new ArrayList<>();
    while (!pq.isEmpty()) result.add(0, pq.poll()[0]);
    return result;
  }
  
  public void follow(int followerId, int followeeId) {
    follows.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
  }
  
  public void unfollow(int followerId, int followeeId) {
    if (followerId != followeeId) {
      follows.getOrDefault(followerId, new HashSet<>()).remove(followeeId);
    }
  }
}`,
        python: `class Twitter:
  def __init__(self):
    self.tweets = {}  # userId -> [(tweetId, time)]
    self.follows = {}  # userId -> set(followeeIds)
    self.time = 0
  
  def postTweet(self, userId: int, tweetId: int) -> None:
    if userId not in self.tweets:
      self.tweets[userId] = []
    self.tweets[userId].append((tweetId, self.time))
    self.time += 1
  
  def getNewsFeed(self, userId: int) -> List[int]:
    import heapq
    heap = []
    followees = self.follows.get(userId, set()) | {userId}
    
    for followee in followees:
      if followee in self.tweets:
        for tweet in self.tweets[followee][-10:][::-1]:
          heapq.heappush(heap, (tweet[1], tweet[0]))
          if len(heap) > 10:
            heapq.heappop(heap)
    
    return [tweetId for _, tweetId in sorted(heap, reverse=True)]
  
  def follow(self, followerId: int, followeeId: int) -> None:
    if followerId != followeeId:
      self.follows.setdefault(followerId, set()).add(followeeId)
  
  def unfollow(self, followerId: int, followeeId: int) -> None:
    if followerId != followeeId:
      self.follows.get(followerId, set()).discard(followeeId)`,
        cpp: `class Twitter {
  unordered_map<int, vector<pair<int, int>>> tweets;
  unordered_map<int, unordered_set<int>> follows;
  int time;
public:
  Twitter() : time(0) {}
  
  void postTweet(int userId, int tweetId) {
    tweets[userId].push_back({tweetId, time++});
  }
  
  vector<int> getNewsFeed(int userId) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    auto followees = follows[userId];
    followees.insert(userId);
    
    for (int followee : followees) {
      auto& userTweets = tweets[followee];
      for (int i = userTweets.size() - 1; i >= max(0, (int)userTweets.size() - 10); i--) {
        pq.push(userTweets[i]);
        if (pq.size() > 10) pq.pop();
      }
    }
    
    vector<int> result;
    while (!pq.empty()) {
      result.push_back(pq.top().first);
      pq.pop();
    }
    reverse(result.begin(), result.end());
    return result;
  }
  
  void follow(int followerId, int followeeId) {
    if (followerId != followeeId) {
      follows[followerId].insert(followeeId);
    }
  }
  
  void unfollow(int followerId, int followeeId) {
    if (followerId != followeeId) {
      follows[followerId].erase(followeeId);
    }
  }
};`
      },
      complexity: {
        time: "O(k log m) for getNewsFeed where k is number of followees, m is tweets per user",
        space: "O(n) where n is total tweets and follow relationships"
      },
      explanation: "Use a min-heap to maintain the 10 most recent tweets from followees, limiting heap size to 10."
    }
  },

  // ==================== HARD ====================
  {
    id: 52,
    status: false,
    star: false,
    problem: "Find Median From Data Stream",
    leetcodeLink: "https://leetcode.com/problems/find-median-from-data-stream/",
    difficulty: "Hard",
    description: "Design a data structure that supports adding numbers from a data stream and finding the median of all numbers added so far.",
    examples: [
      { 
        input: `["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n[[],[1],[2],[],[3],[]]`, 
        output: `[null,null,null,1.5,null,2.0]` 
      }
    ],
    bruteForce: {
      code: {
        java: `class MedianFinder {
  List<Integer> list;
  
  public MedianFinder() {
    list = new ArrayList<>();
  }
  
  public void addNum(int num) {
    list.add(num);
    Collections.sort(list);
  }
  
  public double findMedian() {
    int n = list.size();
    if (n % 2 == 0) {
      return (list.get(n / 2 - 1) + list.get(n / 2)) / 2.0;
    }
    return list.get(n / 2);
  }
}`,
        python: `class MedianFinder:
  def __init__(self):
    self.list = []
  
  def addNum(self, num: int) -> None:
    self.list.append(num)
    self.list.sort()
  
  def findMedian(self) -> float:
    n = len(self.list)
    if n % 2 == 0:
      return (self.list[n // 2 - 1] + self.list[n // 2]) / 2
    return self.list[n // 2]`,
        cpp: `class MedianFinder {
  vector<int> list;
public:
  MedianFinder() {}
  
  void addNum(int num) {
    list.push_back(num);
    sort(list.begin(), list.end());
  }
  
  double findMedian() {
    int n = list.size();
    if (n % 2 == 0) {
      return (list[n / 2 - 1] + list[n / 2]) / 2.0;
    }
    return list[n / 2];
  }
};`
      },
      complexity: {
        time: "O(n log n) for addNum, O(1) for findMedian",
        space: "O(n)"
      },
      explanation: "Store all numbers in a list and sort after each addition to find the median."
    },
    optimal: {
      code: {
        java: `class MedianFinder {
  PriorityQueue<Integer> small; // Max heap for smaller half
  PriorityQueue<Integer> large; // Min heap for larger half
  
  public MedianFinder() {
    small = new PriorityQueue<>((a, b) -> b - a);
    large = new PriorityQueue<>();
  }
  
  public void addNum(int num) {
    small.offer(num);
    large.offer(small.poll());
    if (large.size() > small.size()) {
      small.offer(large.poll());
    }
  }
  
  public double findMedian() {
    if (small.size() > large.size()) {
      return small.peek();
    }
    return (small.peek() + large.peek()) / 2.0;
  }
}`,
        python: `class MedianFinder:
  def __init__(self):
    import heapq
    self.small = []  # Max heap (negated)
    self.large = []  # Min heap
  
  def addNum(self, num: int) -> None:
    heapq.heappush(self.small, -num)
    heapq.heappush(self.large, -heapq.heappop(self.small))
    if len(self.large) > len(self.small):
      heapq.heappush(self.small, -heapq.heappop(self.large))
  
  def findMedian(self) -> float:
    if len(self.small) > len(self.large):
      return -self.small[0]
    return (-self.small[0] + self.large[0]) / 2`,
        cpp: `class MedianFinder {
  priority_queue<int> small; // Max heap
  priority_queue<int, vector<int>, greater<int>> large; // Min heap
public:
  MedianFinder() {}
  
  void addNum(int num) {
    small.push(num);
    large.push(small.top());
    small.pop();
    if (large.size() > small.size()) {
      small.push(large.top());
      large.pop();
    }
  }
  
  double findMedian() {
    if (small.size() > large.size()) {
      return small.top();
    }
    return (small.top() + large.top()) / 2.0;
  }
};`
      },
      complexity: {
        time: "O(log n) for addNum, O(1) for findMedian",
        space: "O(n)"
      },
      explanation: "Use two heaps: a max heap for the smaller half and a min heap for the larger half, keeping them balanced to find the median in O(1)."
    }
  }
];