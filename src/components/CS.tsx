import React, { useState } from "react";

const CS: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = [
    { name: "Operating Systems", id: "os" },
    { name: "Computer Networks", id: "cn" },
    { name: "OOP in Java", id: "oop" },
    { name: "DBMS", id: "dbms" },
  ];

  const questions: { [key: string]: { question: string; answer: string }[] } = {
    os: [
      {
        question:
          "What is an operating system, and what are its primary functions?",
        answer:
          "An operating system (OS) is system software that manages computer hardware and software resources, acting as an intermediary between users and hardware. Its primary functions include: \n1. Process Management: Creating, scheduling, and terminating processes, managing CPU allocation via scheduling algorithms (e.g., Round Robin). \n2. Memory Management: Allocating and deallocating memory to processes, implementing virtual memory. \n3. File System Management: Organizing, storing, and retrieving data on storage devices. \n4. Device Management: Handling I/O devices via drivers. \n5. Security and Access Control: Ensuring authorized access to resources. For example, Linux uses a kernel to manage these tasks, while Windows provides a GUI for user interaction.",
      },
      {
        question:
          "Can you explain the difference between a process and a thread in detail?",
        answer:
          "A process is an independent program in execution with its own address space, including code, data, and stack. It has its own resources, like file descriptors. A thread is a lightweight unit of execution within a process, sharing the process's memory and resources. Key differences: \n- Isolation: Processes are isolated; threads share memory. \n- Overhead: Creating/switching processes is slower due to separate memory allocation, while threads are faster. \n- Communication: Processes use IPC (e.g., pipes); threads communicate via shared variables. For example, in a web browser, each tab might be a process, with threads handling tasks like rendering within a tab.",
      },
      {
        question: "What is a deadlock, and how can it be prevented?",
        answer:
          "A deadlock occurs when two or more processes are blocked, each waiting for a resource held by another, forming a cycle. The four conditions for deadlock are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. \nPrevention: \n1. Avoid Mutual Exclusion: Make resources sharable where possible. \n2. Prevent Hold and Wait: Require processes to request all resources at once. \n3. Allow Preemption: Forcefully take resources from a process. \n4. Break Circular Wait: Assign a priority order to resources, ensuring requests follow this order. For example, a database system might use resource ordering to prevent deadlocks during transactions.",
      },
      {
        question: "What is virtual memory, and how does it work?",
        answer:
          "Virtual memory creates an illusion of a large, contiguous memory space by mapping virtual addresses to physical memory or disk. It allows processes to use more memory than physically available. \nHow it works: The OS uses paging or segmentation, storing pages on disk and loading them into RAM as needed. A page table maps virtual to physical addresses. If a page is not in memory, a page fault triggers loading from disk. For example, Linux uses demand paging to load only required pages, improving efficiency.",
      },
      {
        question: "What is the difference between paging and segmentation?",
        answer:
          "Paging divides memory into fixed-size pages (e.g., 4KB), mapping virtual to physical addresses via a page table, minimizing fragmentation. Segmentation divides memory into variable-sized segments (e.g., code, data), based on logical divisions, with a segment table for mapping. \nKey differences: Paging is fixed-size, transparent to programmers; segmentation is variable-sized, programmer-visible. Paging avoids external fragmentation, while segmentation may cause it. For example, Linux uses paging for memory management, while older systems like Multics used segmentation.",
      },
    ],
    cn: [
      {
        question: "Can you explain the OSI model and its layers?",
        answer:
          "The OSI model is a framework for networking with 7 layers: \n1. Physical: Transmits raw bits (e.g., cables). \n2. Data Link: Ensures error-free transfer between adjacent nodes (e.g., Ethernet). \n3. Network: Routes packets (e.g., IP). \n4. Transport: Provides reliable data transfer (e.g., TCP). \n5. Session: Manages sessions between applications. \n6. Presentation: Handles data formatting and encryption. \n7. Application: Provides user interfaces (e.g., HTTP). For example, a web request uses HTTP (Application) over TCP (Transport) and IP (Network).",
      },
      {
        question: "What is the difference between TCP and UDP?",
        answer:
          "TCP is connection-oriented, ensuring reliable, ordered delivery via handshakes and retransmissions, used in HTTP. UDP is connectionless, faster, but unreliable, used in video streaming. \nDetails: TCP uses sequence numbers and acknowledgments; UDP has no such mechanisms, reducing overhead but risking packet loss.",
      },
      {
        question: "How does DNS resolve a domain name to an IP address?",
        answer:
          "DNS translates domain names (e.g., google.com) to IP addresses. \nProcess: A client queries a recursive resolver, which checks: \n1. Root Servers: Identify TLD (.com). \n2. TLD Servers: Point to authoritative servers. \n3. Authoritative Servers: Return the IP. Caching reduces latency. For example, resolving google.com may return 142.250.190.78.",
      },
      {
        question: "What is the difference between a hub, switch, and router?",
        answer:
          "A hub broadcasts data to all ports (Layer 1). A switch forwards data to specific MAC addresses (Layer 2). A router routes packets between networks using IP addresses (Layer 3). For example, a switch uses a MAC table to direct traffic, unlike a hub's broadcast.",
      },
      {
        question: "What is an IP address, and how do IPv4 and IPv6 differ?",
        answer:
          "An IP address uniquely identifies devices in a network. \nIPv4: 32-bit (e.g., 192.168.1.1), ~4.3 billion addresses. \nIPv6: 128-bit (e.g., 2001:0db8::1), vastly larger address space. IPv6 supports autoconfiguration and eliminates NAT. For example, IPv6 is used for IoT scalability.",
      },
    ],
    oop: [
      {
        question:
          "What are the core principles of OOP, and how are they implemented in Java?",
        answer:
          "The four pillars are: \n1. Encapsulation: Bundles data and methods, using private fields and public getters/setters (e.g., private int age; public int getAge()). \n2. Inheritance: Allows a class to inherit another using extends (e.g., class Dog extends Animal). \n3. Polymorphism: Enables method overriding (runtime) and overloading (compile-time). \n4. Abstraction: Hides complexity via abstract classes or interfaces (e.g., interface Shape { void draw(); }). For example, a Car class encapsulates speed, inherits from Vehicle, and overrides move().",
      },
      {
        question: "What is encapsulation, and how is it achieved in Java?",
        answer:
          "Encapsulation restricts direct access to object data, exposing it via methods. In Java, use private fields and public getters/setters. For example: \nclass Person { private String name; public String getName() { return name; } public void setName(String name) { this.name = name; } } This ensures controlled access and data validation.",
      },
      {
        question:
          "What is the difference between method overloading and overriding?",
        answer:
          "Overloading occurs in the same class with methods of the same name but different parameters (e.g., void add(int a, int b) vs void add(double a, double b)). Overriding occurs when a subclass redefines a superclass method with the same signature (e.g., @Override void display()). Overloading is resolved at compile-time; overriding at runtime.",
      },
      {
        question: "What is an interface in Java, and why is it used?",
        answer:
          'An interface defines abstract methods that classes must implement, using implements. It supports multiple inheritance and abstraction. For example: \ninterface Animal { void eat(); } class Dog implements Animal { public void eat() { System.out.println("Dog eats"); } } Interfaces ensure contract-based programming.',
      },
      {
        question:
          "How does an abstract class differ from an interface in Java?",
        answer:
          "An abstract class can have concrete and abstract methods, instance variables, and single inheritance via extends. An interface (pre-Java 8) has only abstract methods and constants, supporting multiple inheritance via implements. For example, an abstract class Vehicle might have a concrete start() method, while an interface Drivable defines drive().",
      },
    ],
    dbms: [
      {
        question: "What is a DBMS, and what are its key functions?",
        answer:
          "A DBMS (Database Management System) manages databases, enabling data storage, retrieval, and manipulation. \nFunctions: \n1. Data Definition: Define schemas (e.g., SQL CREATE). \n2. Data Manipulation: Query and update data (e.g., SELECT, INSERT). \n3. Data Integrity: Ensure accuracy via constraints. \n4. Security: Control access. For example, MySQL manages relational data with these functions.",
      },
      {
        question: "What is normalization, and why is it important?",
        answer:
          "Normalization organizes data to eliminate redundancy and ensure integrity via normal forms: \n1. 1NF: No repeating groups. \n2. 2NF: No partial dependencies. \n3. 3NF: No transitive dependencies. It reduces anomalies during insertions, updates, and deletions. For example, splitting a table with customer and order data into separate tables achieves 2NF.",
      },
      {
        question: "What is the difference between SQL and NoSQL databases?",
        answer:
          "SQL databases are relational, use structured schemas, and support SQL (e.g., MySQL). NoSQL databases are non-relational, handle unstructured data, and scale horizontally (e.g., MongoDB). \nDetails: SQL is suited for structured data; NoSQL for scalability and flexibility. For example, MongoDB stores JSON-like documents.",
      },
      {
        question: "What is a primary key, and why is it used?",
        answer:
          "A primary key uniquely identifies each record in a table, ensuring no duplicates or nulls. It enforces entity integrity. For example: \nCREATE TABLE Students (ID INT PRIMARY KEY, Name VARCHAR(50)); ID ensures unique student records.",
      },
      {
        question: "What is a foreign key, and how does it work?",
        answer:
          "A foreign key references a primary key in another table, establishing relationships. For example: \nCREATE TABLE Orders (OrderID INT, StudentID INT, FOREIGN KEY (StudentID) REFERENCES Students(ID)); It ensures referential integrity.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 mt-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        Technical Interview Questions
      </h1>

      {selectedSubject ? (
        <div>
          <button
            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            onClick={() => setSelectedSubject(null)}
          >
            Back to Subjects
          </button>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 border-b-2 border-gray-300 dark:border-gray-700 pb-2">
            {subjects.find((s) => s.id === selectedSubject)?.name}
          </h2>
          <div className="space-y-6">
            {questions[selectedSubject].map((q, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <h3 className="text-lg sm:text-xl font-medium">{`${
                  index + 1
                }. ${q.question}`}</h3>
                <p className="text-sm sm:text-base whitespace-pre-line">
                  {q.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow"
              onClick={() => setSelectedSubject(subject.id)}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-center">
                {subject.name}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CS;
