// src/data/linkedList.ts
import { Question } from "../types/Question";

export const linkedListQuestions: Question[] = [
  // ==================== EASY ====================
  {
    id: 35,
    status: false,
    star: false,
    problem: "Reverse Linked List",
    leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/",
    difficulty: "Easy",
    description:
      "Given the head of a singly linked list, reverse the list and return the reversed list.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
    ],
    bruteForce: {
      code: {
        java: `public ListNode reverseList(ListNode head) {
  if (head == null) return null;
  
  List<ListNode> nodes = new ArrayList<>();
  while (head != null) {
    nodes.add(head);
    head = head.next;
  }
  
  for (int i = nodes.size() - 1; i > 0; i--) {
    nodes.get(i).next = nodes.get(i - 1);
  }
  nodes.get(0).next = null;
  
  return nodes.get(nodes.size() - 1);
}`,
        python: `def reverseList(head):
  if not head:
    return None
  
  nodes = []
  current = head
  while current:
    nodes.append(current)
    current = current.next
  
  for i in range(len(nodes) - 1, 0, -1):
    nodes[i].next = nodes[i - 1]
  nodes[0].next = None
  
  return nodes[-1]`,
        cpp: `ListNode* reverseList(ListNode* head) {
  if (!head) return nullptr;
  
  vector<ListNode*> nodes;
  while (head) {
    nodes.push_back(head);
    head = head->next;
  }
  
  for (int i = nodes.size() - 1; i > 0; i--) {
    nodes[i]->next = nodes[i - 1];
  }
  nodes[0]->next = nullptr;
  
  return nodes.back();
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation:
        "Store all nodes in a list and then reverse the links by iterating backward.",
    },
    optimal: {
      code: {
        java: `public ListNode reverseList(ListNode head) {
  ListNode prev = null;
  ListNode curr = head;
  
  while (curr != null) {
    ListNode nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  
  return prev;
}`,
        python: `def reverseList(head):
  prev = None
  current = head
  
  while current:
    next_temp = current.next
    current.next = prev
    prev = current
    current = next_temp
  
  return prev`,
        cpp: `ListNode* reverseList(ListNode* head) {
  ListNode* prev = nullptr;
  ListNode* curr = head;
  
  while (curr) {
    ListNode* nextTemp = curr->next;
    curr->next = prev;
    prev = curr;
    curr = nextTemp;
  }
  
  return prev;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      explanation:
        "Iterative approach using three pointers (prev, curr, next) to reverse links in-place.",
    },
  },
  {
    id: 36,
    status: false,
    star: false,
    problem: "Merge Two Sorted Lists",
    leetcodeLink: "https://leetcode.com/problems/merge-two-sorted-lists/",
    difficulty: "Easy",
    description:
      "Merge two sorted linked lists and return it as a new sorted list.",
    examples: [
      { input: "l1 = [1,2,4], l2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "l1 = [], l2 = []", output: "[]" },
    ],
    bruteForce: {
      code: {
        java: `public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
  List<Integer> values = new ArrayList<>();
  
  while (l1 != null) {
    values.add(l1.val);
    l1 = l1.next;
  }
  while (l2 != null) {
    values.add(l2.val);
    l2 = l2.next;
  }
  
  Collections.sort(values);
  
  ListNode dummy = new ListNode(0);
  ListNode current = dummy;
  for (int val : values) {
    current.next = new ListNode(val);
    current = current.next;
  }
  
  return dummy.next;
}`,
        python: `def mergeTwoLists(l1, l2):
  values = []
  
  while l1:
    values.append(l1.val)
    l1 = l1.next
  while l2:
    values.append(l2.val)
    l2 = l2.next
  
  values.sort()
  
  dummy = ListNode(0)
  current = dummy
  for val in values:
    current.next = ListNode(val)
    current = current.next
  
  return dummy.next`,
        cpp: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
  vector<int> values;
  
  while (l1) {
    values.push_back(l1->val);
    l1 = l1->next;
  }
  while (l2) {
    values.push_back(l2->val);
    l2 = l2->next;
  }
  
  sort(values.begin(), values.end());
  
  ListNode* dummy = new ListNode(0);
  ListNode* current = dummy;
  for (int val : values) {
    current->next = new ListNode(val);
    current = current->next;
  }
  
  return dummy->next;
}`,
      },
      complexity: {
        time: "O((m+n) log(m+n))",
        space: "O(m+n)",
      },
      explanation: "Extract all values, sort them, then create a new list.",
    },
    optimal: {
      code: {
        java: `public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
  ListNode dummy = new ListNode(0);
  ListNode current = dummy;
  
  while (l1 != null && l2 != null) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  
  current.next = l1 != null ? l1 : l2;
  
  return dummy.next;
}`,
        python: `def mergeTwoLists(l1, l2):
  dummy = ListNode(0)
  current = dummy
  
  while l1 and l2:
    if l1.val < l2.val:
      current.next = l1
      l1 = l1.next
    else:
      current.next = l2
      l2 = l2.next
    current = current.next
  
  current.next = l1 if l1 else l2
  
  return dummy.next`,
        cpp: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
  ListNode* dummy = new ListNode(0);
  ListNode* current = dummy;
  
  while (l1 && l2) {
    if (l1->val < l2->val) {
      current->next = l1;
      l1 = l1->next;
    } else {
      current->next = l2;
      l2 = l2->next;
    }
    current = current->next;
  }
  
  current->next = l1 ? l1 : l2;
  
  return dummy->next;
}`,
      },
      complexity: {
        time: "O(m+n)",
        space: "O(1)",
      },
      explanation:
        "Use two pointers to traverse both lists and build the merged list incrementally.",
    },
  },
  {
    id: 37,
    status: false,
    star: false,
    problem: "Linked List Cycle",
    leetcodeLink: "https://leetcode.com/problems/linked-list-cycle/",
    difficulty: "Easy",
    description:
      "Given head of a linked list, determine if the linked list has a cycle.",
    examples: [
      { input: "head = [3,2,0,-4], pos = 1", output: "true" },
      { input: "head = [1,2], pos = 0", output: "true" },
    ],
    bruteForce: {
      code: {
        java: `public boolean hasCycle(ListNode head) {
  Set<ListNode> seen = new HashSet<>();
  
  while (head != null) {
    if (seen.contains(head)) {
      return true;
    }
    seen.add(head);
    head = head.next;
  }
  
  return false;
}`,
        python: `def hasCycle(head):
  seen = set()
  
  while head:
    if head in seen:
      return True
    seen.add(head)
    head = head.next
  
  return False`,
        cpp: `bool hasCycle(ListNode *head) {
  unordered_set<ListNode*> seen;
  
  while (head) {
    if (seen.count(head)) {
      return true;
    }
    seen.insert(head);
    head = head->next;
  }
  
  return false;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation:
        "Use a hash set to track visited nodes. If we encounter a node already in the set, there's a cycle.",
    },
    optimal: {
      code: {
        java: `public boolean hasCycle(ListNode head) {
  if (head == null) return false;
  
  ListNode slow = head;
  ListNode fast = head.next;
  
  while (slow != fast) {
    if (fast == null || fast.next == null) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return true;
}`,
        python: `def hasCycle(head):
  if not head:
    return False
  
  slow = head
  fast = head.next
  
  while slow != fast:
    if not fast or not fast.next:
      return False
    slow = slow.next
    fast = fast.next.next
  
  return True`,
        cpp: `bool hasCycle(ListNode *head) {
  if (!head) return false;
  
  ListNode* slow = head;
  ListNode* fast = head->next;
  
  while (slow != fast) {
    if (!fast || !fast->next) {
      return false;
    }
    slow = slow->next;
    fast = fast->next->next;
  }
  
  return true;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      explanation:
        "Floyd's Tortoise and Hare algorithm. Fast pointer moves twice as fast as slow. If they meet, there's a cycle.",
    },
  },

  // ==================== MEDIUM ====================
  {
    id: 38,
    status: false,
    star: false,
    problem: "Reorder List",
    leetcodeLink: "https://leetcode.com/problems/reorder-list/",
    difficulty: "Medium",
    description:
      "Given a singly linked list L: L0 → L1 → … → Ln-1 → Ln, reorder it to: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …",
    examples: [
      { input: "head = [1,2,3,4]", output: "[1,4,2,3]" },
      { input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]" },
    ],
    bruteForce: {
      code: {
        java: `public void reorderList(ListNode head) {
  if (head == null) return;
  
  List<ListNode> nodes = new ArrayList<>();
  ListNode curr = head;
  while (curr != null) {
    nodes.add(curr);
    curr = curr.next;
  }
  
  int i = 0, j = nodes.size() - 1;
  while (i < j) {
    nodes.get(i).next = nodes.get(j);
    i++;
    if (i == j) break;
    nodes.get(j).next = nodes.get(i);
    j--;
  }
  nodes.get(i).next = null;
}`,
        python: `def reorderList(head):
  if not head:
    return
  
  nodes = []
  current = head
  while current:
    nodes.append(current)
    current = current.next
  
  i, j = 0, len(nodes) - 1
  while i < j:
    nodes[i].next = nodes[j]
    i += 1
    if i == j:
      break
    nodes[j].next = nodes[i]
    j -= 1
  nodes[i].next = None`,
        cpp: `void reorderList(ListNode* head) {
  if (!head) return;
  
  vector<ListNode*> nodes;
  ListNode* curr = head;
  while (curr) {
    nodes.push_back(curr);
    curr = curr->next;
  }
  
  int i = 0, j = nodes.size() - 1;
  while (i < j) {
    nodes[i]->next = nodes[j];
    i++;
    if (i == j) break;
    nodes[j]->next = nodes[i];
    j--;
  }
  nodes[i]->next = nullptr;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation:
        "Store nodes in a list and use two pointers to reorder by alternating between start and end.",
    },
    optimal: {
      code: {
        java: `public void reorderList(ListNode head) {
  if (head == null || head.next == null) return;
  
  // Find the middle of the list
  ListNode slow = head, fast = head;
  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Reverse the second half
  ListNode prev = null, curr = slow, tmp;
  while (curr != null) {
    tmp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = tmp;
  }
  
  // Merge the two halves
  ListNode first = head, second = prev;
  while (second.next != null) {
    tmp = first.next;
    first.next = second;
    first = tmp;
    
    tmp = second.next;
    second.next = first;
    second = tmp;
  }
}`,
        python: `def reorderList(head):
  if not head or not head.next:
    return
  
  # Find the middle
  slow, fast = head, head
  while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
  
  # Reverse the second half
  prev, curr = None, slow
  while curr:
    tmp = curr.next
    curr.next = prev
    prev = curr
    curr = tmp
  
  # Merge the two halves
  first, second = head, prev
  while second.next:
    tmp = first.next
    first.next = second
    first = tmp
    
    tmp = second.next
    second.next = first
    second = tmp`,
        cpp: `void reorderList(ListNode* head) {
  if (!head || !head->next) return;
  
  // Find the middle
  ListNode *slow = head, *fast = head;
  while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
  }
  
  // Reverse the second half
  ListNode *prev = nullptr, *curr = slow, *tmp;
  while (curr) {
    tmp = curr->next;
    curr->next = prev;
    prev = curr;
    curr = tmp;
  }
  
  // Merge the two halves
  ListNode *first = head, *second = prev;
  while (second->next) {
    tmp = first->next;
    first->next = second;
    first = tmp;
    
    tmp = second->next;
    second->next = first;
    second = tmp;
  }
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      explanation:
        "1. Find middle with fast/slow pointers 2. Reverse second half 3. Merge the two halves.",
    },
  },
  {
    id: 39,
    status: false,
    star: false,
    problem: "Remove Nth Node From End of List",
    leetcodeLink:
      "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    difficulty: "Medium",
    description:
      "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
    examples: [
      { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
      { input: "head = [1], n = 1", output: "[]" },
    ],
    bruteForce: {
      code: {
        java: `public ListNode removeNthFromEnd(ListNode head, int n) {
  int length = 0;
  ListNode curr = head;
  while (curr != null) {
    length++;
    curr = curr.next;
  }
  
  if (n == length) {
    return head.next;
  }
  
  curr = head;
  for (int i = 1; i < length - n; i++) {
    curr = curr.next;
  }
  
  curr.next = curr.next.next;
  return head;
}`,
        python: `def removeNthFromEnd(head, n):
  length = 0
  curr = head
  while curr:
    length += 1
    curr = curr.next
  
  if n == length:
    return head.next
  
  curr = head
  for _ in range(length - n - 1):
    curr = curr.next
  
  curr.next = curr.next.next
  return head`,
        cpp: `ListNode* removeNthFromEnd(ListNode* head, int n) {
  int length = 0;
  ListNode* curr = head;
  while (curr) {
    length++;
    curr = curr->next;
  }
  
  if (n == length) {
    return head->next;
  }
  
  curr = head;
  for (int i = 1; i < length - n; i++) {
    curr = curr->next;
  }
  
  curr->next = curr->next->next;
  return head;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      explanation:
        "Calculate length first, then traverse to (length - n)th node to remove it.",
    },
    optimal: {
      code: {
        java: `public ListNode removeNthFromEnd(ListNode head, int n) {
  ListNode dummy = new ListNode(0);
  dummy.next = head;
  ListNode first = dummy;
  ListNode second = dummy;
  
  // Move first n+1 steps ahead
  for (int i = 1; i <= n + 1; i++) {
    first = first.next;
  }
  
  // Move first to end, maintaining gap
  while (first != null) {
    first = first.next;
    second = second.next;
  }
  
  second.next = second.next.next;
  return dummy.next;
}`,
        python: `def removeNthFromEnd(head, n):
  dummy = ListNode(0)
  dummy.next = head
  first = second = dummy
  
  # Move first n+1 steps ahead
  for _ in range(n + 1):
    first = first.next
  
  # Move first to end, maintaining gap
  while first:
    first = first.next
    second = second.next
  
  second.next = second.next.next
  return dummy.next`,
        cpp: `ListNode* removeNthFromEnd(ListNode* head, int n) {
  ListNode* dummy = new ListNode(0);
  dummy->next = head;
  ListNode* first = dummy;
  ListNode* second = dummy;
  
  // Move first n+1 steps ahead
  for (int i = 1; i <= n + 1; i++) {
    first = first->next;
  }
  
  // Move first to end, maintaining gap
  while (first) {
    first = first->next;
    second = second->next;
  }
  
  second->next = second->next->next;
  return dummy->next;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      explanation:
        "Use two pointers with n nodes apart. When first reaches end, second will be at node before target.",
    },
  },
  {
    id: 40,
    status: false,
    star: false,
    problem: "Copy List With Random Pointer",
    leetcodeLink:
      "https://leetcode.com/problems/copy-list-with-random-pointer/",
    difficulty: "Medium",
    description:
      "Construct a deep copy of a linked list where each node has an additional random pointer which could point to any node in the list or null.",
    examples: [
      {
        input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
        output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
      },
      { input: "head = [[1,1],[2,1]]", output: "[[1,1],[2,1]]" },
    ],
    bruteForce: {
      code: {
        java: `public Node copyRandomList(Node head) {
  if (head == null) return null;
  
  Map<Node, Node> map = new HashMap<>();
  Node curr = head;
  
  // First pass: create all nodes
  while (curr != null) {
    map.put(curr, new Node(curr.val));
    curr = curr.next;
  }
  
  // Second pass: assign next and random pointers
  curr = head;
  while (curr != null) {
    map.get(curr).next = map.get(curr.next);
    map.get(curr).random = map.get(curr.random);
    curr = curr.next;
  }
  
  return map.get(head);
}`,
        python: `def copyRandomList(head):
  if not head:
    return None
  
  mapping = {}
  current = head
  
  # First pass: create all nodes
  while current:
    mapping[current] = Node(current.val)
    current = current.next
  
  # Second pass: assign next and random pointers
  current = head
  while current:
    mapping[current].next = mapping.get(current.next)
    mapping[current].random = mapping.get(current.random)
    current = current.next
  
  return mapping[head]`,
        cpp: `Node* copyRandomList(Node* head) {
  if (!head) return nullptr;
  
  unordered_map<Node*, Node*> map;
  Node* curr = head;
  
  // First pass: create all nodes
  while (curr) {
    map[curr] = new Node(curr->val);
    curr = curr->next;
  }
  
  // Second pass: assign next and random pointers
  curr = head;
  while (curr) {
    map[curr]->next = map[curr->next];
    map[curr]->random = map[curr->random];
    curr = curr->next;
  }
  
  return map[head];
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation:
        "Use a hash map to store original node -> copied node mappings for O(1) access to set pointers.",
    },
    optimal: {
      code: {
        java: `public Node copyRandomList(Node head) {
  if (head == null) return null;
  
  // First pass: create interleaved list
  Node curr = head;
  while (curr != null) {
    Node copy = new Node(curr.val);
    copy.next = curr.next;
    curr.next = copy;
    curr = copy.next;
  }
  
  // Second pass: assign random pointers
  curr = head;
  while (curr != null) {
    if (curr.random != null) {
      curr.next.random = curr.random.next;
    }
    curr = curr.next.next;
  }
  
  // Third pass: separate lists
  curr = head;
  Node dummy = new Node(0);
  Node copyCurr = dummy;
  
  while (curr != null) {
    copyCurr.next = curr.next;
    curr.next = curr.next.next;
    
    copyCurr = copyCurr.next;
    curr = curr.next;
  }
  
  return dummy.next;
}`,
        python: `def copyRandomList(head):
  if not head:
    return None
  
  # First pass: create interleaved list
  current = head
  while current:
    copy = Node(current.val)
    copy.next = current.next
    current.next = copy
    current = copy.next
  
  # Second pass: assign random pointers
  current = head
  while current:
    if current.random:
      current.next.random = current.random.next
    current = current.next.next
  
  # Third pass: separate lists
  current = head
  dummy = Node(0)
  copy_current = dummy
  
  while current:
    copy_current.next = current.next
    current.next = current.next.next
    
    copy_current = copy_current.next
    current = current.next
  
  return dummy.next`,
        cpp: `Node* copyRandomList(Node* head) {
  if (!head) return nullptr;
  
  // First pass: create interleaved list
  Node* curr = head;
  while (curr) {
    Node* copy = new Node(curr->val);
    copy->next = curr->next;
    curr->next = copy;
    curr = copy->next;
  }
  
  // Second pass: assign random pointers
  curr = head;
  while (curr) {
    if (curr->random) {
      curr->next->random = curr->random->next;
    }
    curr = curr->next->next;
  }
  
  // Third pass: separate lists
  curr = head;
  Node* dummy = new Node(0);
  Node* copyCurr = dummy;
  
  while (curr) {
    copyCurr->next = curr->next;
    curr->next = curr->next->next;
    
    copyCurr = copyCurr->next;
    curr = curr->next;
  }
  
  return dummy->next;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      explanation:
        "1. Create interleaved list (original -> copy -> original -> copy) 2. Assign random pointers 3. Separate lists.",
    },
  },
  {
    id: 41,
    status: false,
    star: false,
    problem: "Add Two Numbers",
    leetcodeLink: "https://leetcode.com/problems/add-two-numbers/",
    difficulty: "Medium",
    description:
      "Given two non-empty linked lists representing two non-negative integers (digits stored in reverse order), add them and return the sum as a linked list.",
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]" },
      {
        input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        output: "[8,9,9,9,0,0,0,1]",
      },
    ],
    bruteForce: {
      code: {
        java: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
  // Convert both lists to numbers, add them, then convert back
  long num1 = 0, num2 = 0;
  int i = 0;
  
  while (l1 != null) {
    num1 += l1.val * Math.pow(10, i);
    l1 = l1.next;
    i++;
  }
  
  i = 0;
  while (l2 != null) {
    num2 += l2.val * Math.pow(10, i);
    l2 = l2.next;
    i++;
  }
  
  long sum = num1 + num2;
  if (sum == 0) return new ListNode(0);
  
  ListNode dummy = new ListNode(0);
  ListNode curr = dummy;
  
  while (sum > 0) {
    curr.next = new ListNode((int)(sum % 10));
    curr = curr.next;
    sum /= 10;
  }
  
  return dummy.next;
}`,
        python: `def addTwoNumbers(l1, l2):
  # Convert both lists to numbers, add them, then convert back
  num1 = num2 = 0
  i = 0
  
  while l1:
    num1 += l1.val * (10 ** i)
    l1 = l1.next
    i += 1
  
  i = 0
  while l2:
    num2 += l2.val * (10 ** i)
    l2 = l2.next
    i += 1
  
  total = num1 + num2
  if total == 0:
    return ListNode(0)
  
  dummy = ListNode(0)
  current = dummy
  
  while total > 0:
    current.next = ListNode(total % 10)
    current = current.next
    total = total // 10
  
  return dummy.next`,
        cpp: `ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
  // Convert both lists to numbers, add them, then convert back
  long long num1 = 0, num2 = 0;
  int i = 0;
  
  while (l1) {
    num1 += l1->val * pow(10, i);
    l1 = l1->next;
    i++;
  }
  
  i = 0;
  while (l2) {
    num2 += l2->val * pow(10, i);
    l2 = l2->next;
    i++;
  }
  
  long long sum = num1 + num2;
  if (sum == 0) return new ListNode(0);
  
  ListNode* dummy = new ListNode(0);
  ListNode* curr = dummy;
  
  while (sum > 0) {
    curr->next = new ListNode(sum % 10);
    curr = curr->next;
    sum /= 10;
  }
  
  return dummy->next;
}`,
      },
      complexity: {
        time: "O(n+m)",
        space: "O(max(n,m))",
      },
      explanation:
        "Convert both lists to numbers, add them, then convert back to linked list. Note: This fails for very large numbers.",
    },
    optimal: {
      code: {
        java: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
  ListNode dummy = new ListNode(0);
  ListNode curr = dummy;
  int carry = 0;
  
  while (l1 != null || l2 != null || carry != 0) {
    int sum = carry;
    if (l1 != null) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2 != null) {
      sum += l2.val;
      l2 = l2.next;
    }
    
    carry = sum / 10;
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
  }
  
  return dummy.next;
}`,
        python: `def addTwoNumbers(l1, l2):
  dummy = ListNode(0)
  current = dummy
  carry = 0
  
  while l1 or l2 or carry:
    sum_val = carry
    if l1:
      sum_val += l1.val
      l1 = l1.next
    if l2:
      sum_val += l2.val
      l2 = l2.next
    
    carry = sum_val // 10
    current.next = ListNode(sum_val % 10)
    current = current.next
  
  return dummy.next`,
        cpp: `ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
  ListNode* dummy = new ListNode(0);
  ListNode* curr = dummy;
  int carry = 0;
  
  while (l1 || l2 || carry) {
    int sum = carry;
    if (l1) {
      sum += l1->val;
      l1 = l1->next;
    }
    if (l2) {
      sum += l2->val;
      l2 = l2->next;
    }
    
    carry = sum / 10;
    curr->next = new ListNode(sum % 10);
    curr = curr->next;
  }
  
  return dummy->next;
}`,
      },
      complexity: {
        time: "O(max(n,m))",
        space: "O(max(n,m))",
      },
      explanation:
        "Simulate digit-by-digit addition with carry, handling different length lists.",
    },
  },
  {
    id: 42,
    status: false,
    star: false,
    problem: "Find The Duplicate Number",
    leetcodeLink: "https://leetcode.com/problems/find-the-duplicate-number/",
    difficulty: "Medium",
    description:
      "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive, find the duplicate number.",
    examples: [
      { input: "nums = [1,3,4,2,2]", output: "2" },
      { input: "nums = [3,1,3,4,2]", output: "3" },
    ],
    bruteForce: {
      code: {
        java: `public int findDuplicate(int[] nums) {
  Set<Integer> seen = new HashSet<>();
  for (int num : nums) {
    if (seen.contains(num)) {
      return num;
    }
    seen.add(num);
  }
  return -1;
}`,
        python: `def findDuplicate(nums):
  seen = set()
  for num in nums:
    if num in seen:
      return num
    seen.add(num)
  return -1`,
        cpp: `int findDuplicate(vector<int>& nums) {
  unordered_set<int> seen;
  for (int num : nums) {
    if (seen.count(num)) {
      return num;
    }
    seen.insert(num);
  }
  return -1;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation:
        "Use a hash set to track seen numbers, return first duplicate found.",
    },
    optimal: {
      code: {
        java: `public int findDuplicate(int[] nums) {
  // Floyd's Tortoise and Hare
  int slow = nums[0];
  int fast = nums[0];
  
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow != fast);
  
  // Find the entrance to the cycle
  slow = nums[0];
  while (slow != fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  
  return fast;
}`,
        python: `def findDuplicate(nums):
  # Floyd's Tortoise and Hare
  slow = fast = nums[0]
  
  while True:
    slow = nums[slow]
    fast = nums[nums[fast]]
    if slow == fast:
      break
  
  # Find the entrance to the cycle
  slow = nums[0]
  while slow != fast:
    slow = nums[slow]
    fast = nums[fast]
  
  return fast`,
        cpp: `int findDuplicate(vector<int>& nums) {
  // Floyd's Tortoise and Hare
  int slow = nums[0];
  int fast = nums[0];
  
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow != fast);
  
  // Find the entrance to the cycle
  slow = nums[0];
  while (slow != fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  
  return fast;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      explanation:
        "Treat array as linked list with cycles. Use Floyd's algorithm to find cycle start point (duplicate).",
    },
  },

  // ==================== HARD ====================
  {
    id: 43,
    status: false,
    star: false,
    problem: "LRU Cache",
    leetcodeLink: "https://leetcode.com/problems/lru-cache/",
    difficulty: "Hard",
    description:
      "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with operations: LRUCache(int capacity), int get(int key), void put(int key, int value).",
    examples: [
      {
        input: `["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]`,
        output: `[null,null,null,1,null,-1,null,-1,3,4]`,
      },
    ],
    bruteForce: {
      code: {
        java: `class LRUCache {
  Map<Integer, Integer> cache;
  List<Integer> order;
  int capacity;
  
  public LRUCache(int capacity) {
    this.cache = new HashMap<>();
    this.order = new ArrayList<>();
    this.capacity = capacity;
  }
  
  public int get(int key) {
    if (!cache.containsKey(key)) return -1;
    order.remove(Integer.valueOf(key));
    order.add(key);
    return cache.get(key);
  }
  
  public void put(int key, int value) {
    if (cache.containsKey(key)) {
      order.remove(Integer.valueOf(key));
    } else if (cache.size() >= capacity) {
      int lruKey = order.remove(0);
      cache.remove(lruKey);
    }
    cache.put(key, value);
    order.add(key);
  }
}`,
        python: `class LRUCache:
  def __init__(self, capacity: int):
    self.cache = {}
    self.order = []
    self.capacity = capacity
  
  def get(self, key: int) -> int:
    if key not in self.cache:
      return -1
    self.order.remove(key)
    self.order.append(key)
    return self.cache[key]
  
  def put(self, key: int, value: int) -> None:
    if key in self.cache:
      self.order.remove(key)
    elif len(self.cache) >= self.capacity:
      lru_key = self.order.pop(0)
      self.cache.pop(lru_key)
    self.cache[key] = value
    self.order.append(key)`,
        cpp: `class LRUCache {
  unordered_map<int, int> cache;
  vector<int> order;
  int capacity;
public:
  LRUCache(int capacity) : capacity(capacity) {}
  
  int get(int key) {
    if (cache.find(key) == cache.end()) return -1;
    auto it = find(order.begin(), order.end(), key);
    order.erase(it);
    order.push_back(key);
    return cache[key];
  }
  
  void put(int key, int value) {
    if (cache.find(key) != cache.end()) {
      auto it = find(order.begin(), order.end(), key);
      order.erase(it);
    } else if (cache.size() >= capacity) {
      int lruKey = order.front();
      order.erase(order.begin());
      cache.erase(lruKey);
    }
    cache[key] = value;
    order.push_back(key);
  }
};`,
      },
      complexity: {
        time: "O(n) for get and put due to list operations",
        space: "O(capacity)",
      },
      explanation:
        "Use a hash map for key-value pairs and a list to track order of usage. Remove and add operations on the list are O(n).",
    },
    optimal: {
      code: {
        java: `class LRUCache {
  class Node {
    int key, value;
    Node prev, next;
    Node(int k, int v) { key = k; value = v; }
  }
  
  private Map<Integer, Node> cache;
  private Node head, tail;
  private int capacity;
  
  public LRUCache(int capacity) {
    this.cache = new HashMap<>();
    this.capacity = capacity;
    head = new Node(0, 0);
    tail = new Node(0, 0);
    head.next = tail;
    tail.prev = head;
  }
  
  private void remove(Node node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  
  private void add(Node node) {
    node.next = head.next;
    node.prev = head;
    head.next.prev = node;
    head.next = node;
  }
  
  public int get(int key) {
    Node node = cache.get(key);
    if (node == null) return -1;
    remove(node);
    add(node);
    return node.value;
  }
  
  public void put(int key, int value) {
    if (cache.containsKey(key)) {
      remove(cache.get(key));
    }
    Node node = new Node(key, value);
    cache.put(key, node);
    add(node);
    
    if (cache.size() > capacity) {
      Node lru = tail.prev;
      remove(lru);
      cache.remove(lru.key);
    }
  }
}`,
        python: `class ListNode:
  def __init__(self, key=0, value=0):
    self.key = key
    self.value = value
    self.prev = None
    self.next = None

class LRUCache:
  def __init__(self, capacity: int):
    self.cache = {}
    self.capacity = capacity
    self.head = ListNode()
    self.tail = ListNode()
    self.head.next = self.tail
    self.tail.prev = self.head
  
  def _remove(self, node):
    node.prev.next = node.next
    node.next.prev = node.prev
  
  def _add(self, node):
    node.next = self.head.next
    node.prev = self.head
    self.head.next.prev = node
    self.head.next = node
  
  def get(self, key: int) -> int:
    if key in self.cache:
      node = self.cache[key]
      self._remove(node)
      self._add(node)
      return node.value
    return -1
  
  def put(self, key: int, value: int) -> None:
    if key in self.cache:
      self._remove(self.cache[key])
    node = ListNode(key, value)
    self.cache[key] = node
    self._add(node)
    
    if len(self.cache) > self.capacity:
      lru = self.tail.prev
      self._remove(lru)
      del self.cache[lru.key]`,
        cpp: `class LRUCache {
  struct Node {
    int key, value;
    Node *prev, *next;
    Node(int k, int v) : key(k), value(v), prev(nullptr), next(nullptr) {}
  };
  
  unordered_map<int, Node*> cache;
  Node *head, *tail;
  int capacity;
  
public:
  LRUCache(int capacity) : capacity(capacity) {
    head = new Node(0, 0);
    tail = new Node(0, 0);
    head->next = tail;
    tail->prev = head;
  }
  
  void remove(Node* node) {
    node->prev->next = node->next;
    node->next->prev = node->prev;
  }
  
  void add(Node* node) {
    node->next = head->next;
    node->prev = head;
    head->next->prev = node;
    head->next = node;
  }
  
  int get(int key) {
    if (cache.find(key) == cache.end()) return -1;
    Node* node = cache[key];
    remove(node);
    add(node);
    return node->value;
  }
  
  void put(int key, int value) {
    if (cache.find(key) != cache.end()) {
      remove(cache[key]);
    }
    Node* node = new Node(key, value);
    cache[key] = node;
    add(node);
    
    if (cache.size() > capacity) {
      Node* lru = tail->prev;
      remove(lru);
      cache.erase(lru->key);
      delete lru;
    }
  }
};`,
      },
      complexity: {
        time: "O(1) for get and put",
        space: "O(capacity)",
      },
      explanation:
        "Use a hash map for O(1) key-value lookup and a doubly linked list for O(1) insertion/deletion of least recently used items.",
    },
  },
  {
    id: 44,
    status: false,
    star: false,
    problem: "Merge K Sorted Lists",
    leetcodeLink: "https://leetcode.com/problems/merge-k-sorted-lists/",
    difficulty: "Hard",
    description:
      "Merge k sorted linked lists and return it as one sorted list.",
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
      { input: "lists = []", output: "[]" },
    ],
    bruteForce: {
      code: {
        java: `public ListNode mergeKLists(ListNode[] lists) {
  List<Integer> values = new ArrayList<>();
  
  // Collect all values
  for (ListNode list : lists) {
    while (list != null) {
      values.add(list.val);
      list = list.next;
    }
  }
  
  // Sort values
  Collections.sort(values);
  
  // Create result list
  ListNode dummy = new ListNode(0);
  ListNode curr = dummy;
  
  for (int val : values) {
    curr.next = new ListNode(val);
    curr = curr.next;
  }
  
  return dummy.next;
}`,
        python: `def mergeKLists(lists):
  values = []
  
  # Collect all values
  for list_node in lists:
    while list_node:
      values.append(list_node.val)
      list_node = list_node.next
  
  # Sort values
  values.sort()
  
  # Create result list
  dummy = ListNode(0)
  curr = dummy
  
  for val in values:
    curr.next = ListNode(val)
    curr = curr.next
  
  return dummy.next`,
        cpp: `ListNode* mergeKLists(vector<ListNode*>& lists) {
  vector<int> values;
  
  // Collect all values
  for (ListNode* list : lists) {
    while (list) {
      values.push_back(list->val);
      list = list->next;
    }
  }
  
  // Sort values
  sort(values.begin(), values.end());
  
  // Create result list
  ListNode* dummy = new ListNode(0);
  ListNode* curr = dummy;
  
  for (int val : values) {
    curr->next = new ListNode(val);
    curr = curr->next;
  }
  
  return dummy->next;
}`,
      },
      complexity: {
        time: "O(N log N) where N is total number of nodes",
        space: "O(N)",
      },
      explanation:
        "Collect all values from all lists, sort them, then create a new linked list.",
    },
    optimal: {
      code: {
        java: `public ListNode mergeKLists(ListNode[] lists) {
  if (lists == null || lists.length == 0) return null;
  
  PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
  
  // Add first node of each list to priority queue
  for (ListNode list : lists) {
    if (list != null) {
      pq.offer(list);
    }
  }
  
  ListNode dummy = new ListNode(0);
  ListNode curr = dummy;
  
  // Process nodes from priority queue
  while (!pq.isEmpty()) {
    ListNode node = pq.poll();
    curr.next = node;
    curr = curr.next;
    
    if (node.next != null) {
      pq.offer(node.next);
    }
  }
  
  return dummy.next;
}`,
        python: `def mergeKLists(lists):
  if not lists:
    return None
  
  from heapq import heappush, heappop
  heap = []
  
  # Add first node of each list to heap
  for i, list_node in enumerate(lists):
    if list_node:
      heappush(heap, (list_node.val, i, list_node))
  
  dummy = ListNode(0)
  curr = dummy
  
  # Process nodes from heap
  while heap:
    val, i, node = heappop(heap)
    curr.next = node
    curr = curr.next
    
    if node.next:
      heappush(heap, (node.next.val, i, node.next))
  
  return dummy.next`,
        cpp: `ListNode* mergeKLists(vector<ListNode*>& lists) {
  if (lists.empty()) return nullptr;
  
  priority_queue<pair<int, ListNode*>, 
                vector<pair<int, ListNode*>>, 
                greater<>> pq;
  
  // Add first node of each list to priority queue
  for (ListNode* list : lists) {
    if (list) {
      pq.push({list->val, list});
    }
  }
  
  ListNode* dummy = new ListNode(0);
  ListNode* curr = dummy;
  
  // Process nodes from priority queue
  while (!pq.empty()) {
    auto [val, node] = pq.top();
    pq.pop();
    curr->next = node;
    curr = curr->next;
    
    if (node->next) {
      pq.push({node->next->val, node->next});
    }
  }
  
  return dummy->next;
}`,
      },
      complexity: {
        time: "O(N log k) where N is total number of nodes, k is number of lists",
        space: "O(k)",
      },
      explanation:
        "Use a min-heap to keep track of the smallest node among k lists, merging them efficiently.",
    },
  },
  {
    id: 45,
    status: false,
    star: false,
    problem: "Reverse Nodes In K Group",
    leetcodeLink: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
    difficulty: "Hard",
    description:
      "Given a linked list, reverse the nodes of the list k at a time and return its modified list.",
    examples: [
      { input: "head = [1,2,3,4,5], k = 2", output: "[2,1,4,3,5]" },
      { input: "head = [1,2,3,4,5], k = 3", output: "[3,2,1,4,5]" },
    ],
    bruteForce: {
      code: {
        java: `public ListNode reverseKGroup(ListNode head, int k) {
  List<ListNode> nodes = new ArrayList<>();
  
  // Collect all nodes
  ListNode curr = head;
  while (curr != null) {
    nodes.add(curr);
    curr = curr.next;
  }
  
  // Reverse k nodes at a time
  for (int i = 0; i + k <= nodes.size(); i += k) {
    for (int j = 0; j < k / 2; j++) {
      ListNode temp = nodes.get(i + j);
      nodes.set(i + j, nodes.get(i + k - 1 - j));
      nodes.set(i + k - 1 - j, temp);
    }
  }
  
  // Rebuild list
  for (int i = 0; i < nodes.size() - 1; i++) {
    nodes.get(i).next = nodes.get(i + 1);
  }
  if (!nodes.isEmpty()) {
    nodes.get(nodes.size() - 1).next = null;
  }
  
  return nodes.isEmpty() ? null : nodes.get(0);
}`,
        python: `def reverseKGroup(head, k):
  nodes = []
  
  # Collect all nodes
  curr = head
  while curr:
    nodes.append(curr)
    curr = curr.next
  
  # Reverse k nodes at a time
  for i in range(0, len(nodes) - k + 1, k):
    for j in range(k // 2):
      nodes[i + j], nodes[i + k - 1 - j] = nodes[i + k - 1 - j], nodes[i + j]
  
  # Rebuild list
  for i in range(len(nodes) - 1):
    nodes[i].next = nodes[i + 1]
  if nodes:
    nodes[-1].next = None
  
  return nodes[0] if nodes else None`,
        cpp: `ListNode* reverseKGroup(ListNode* head, int k) {
  vector<ListNode*> nodes;
  
  // Collect all nodes
  ListNode* curr = head;
  while (curr) {
    nodes.push_back(curr);
    curr = curr->next;
  }
  
  // Reverse k nodes at a time
  for (int i = 0; i + k <= nodes.size(); i += k) {
    for (int j = 0; j < k / 2; j++) {
      swap(nodes[i + j], nodes[i + k - 1 - j]);
    }
  }
  
  // Rebuild list
  for (int i = 0; i < nodes.size() - 1; i++) {
    nodes[i]->next = nodes[i + 1];
  }
  if (!nodes.empty()) {
    nodes.back()->next = nullptr;
  }
  
  return nodes.empty() ? nullptr : nodes[0];
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      explanation:
        "Store all nodes in a list, reverse k nodes at a time by swapping, then rebuild the list.",
    },
    optimal: {
      code: {
        java: `public ListNode reverseKGroup(ListNode head, int k) {
  if (head == null || k == 1) return head;
  
  ListNode dummy = new ListNode(0);
  dummy.next = head;
  ListNode prevGroup = dummy;
  
  // Count nodes
  int length = 0;
  ListNode curr = head;
  while (curr != null) {
    length++;
    curr = curr.next;
  }
  
  // Reverse k nodes at a time
  while (length >= k) {
    curr = prevGroup.next;
    ListNode nextGroup = curr.next;
    
    // Reverse k nodes
    for (int i = 1; i < k; i++) {
      curr.next = nextGroup.next;
      nextGroup.next = prevGroup.next;
      prevGroup.next = nextGroup;
      nextGroup = curr.next;
    }
    
    prevGroup = curr;
    length -= k;
  }
  
  return dummy.next;
}`,
        python: `def reverseKGroup(head, k):
  if not head or k == 1:
    return head
  
  dummy = ListNode(0)
  dummy.next = head
  prev_group = dummy
  
  # Count nodes
  length = 0
  curr = head
  while curr:
    length += 1
    curr = curr.next
  
  # Reverse k nodes at a time
  while length >= k:
    curr = prev_group.next
    next_group = curr.next
    
    # Reverse k nodes
    for _ in range(k - 1):
      curr.next = next_group.next
      next_group.next = prev_group.next
      prev_group.next = next_group
      next_group = curr.next
    
    prev_group = curr
    length -= k
  
  return dummy.next`,
        cpp: `ListNode* reverseKGroup(ListNode* head, int k) {
  if (!head || k == 1) return head;
  
  ListNode* dummy = new ListNode(0);
  dummy->next = head;
  ListNode* prevGroup = dummy;
  
  // Count nodes
  int length = 0;
  ListNode* curr = head;
  while (curr) {
    length++;
    curr = curr->next;
  }
  
  // Reverse k nodes at a time
  while (length >= k) {
    curr = prevGroup->next;
    ListNode* nextGroup = curr->next;
    
    // Reverse k nodes
    for (int i = 1; i < k; i++) {
      curr->next = nextGroup->next;
      nextGroup->next = prevGroup->next;
      prevGroup->next = nextGroup;
      nextGroup = curr->next;
    }
    
    prevGroup = curr;
    length -= k;
  }
  
  return dummy->next;
}`,
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      explanation:
        "Reverse k nodes at a time in-place by adjusting pointers, using a dummy node to simplify edge cases.",
    },
  },
];
