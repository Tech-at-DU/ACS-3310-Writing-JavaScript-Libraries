# PostKit

# PostKit — Final Application Specification

## Overview

In this project, you will build a complete application called **PostKit**.

PostKit is a lightweight **content publishing app** that allows users to:

- create and edit posts  
- organize posts with tags and categories  
- generate slugs and summaries  
- search, filter, and sort content  
- view formatted metadata (dates, reading time, status)  

---

## Core Requirement

This application **must use the libraries created by your classmates**.

You may NOT reimplement functionality that already exists in a library.

Instead, your job is to:

- install each package from npm  
- use the exported functions/components  
- integrate them into a working app  

---

## Shared Data Model

All features in PostKit are built around this type:

```ts
export type PostStatus = 'draft' | 'review' | 'published'

export type Post = {
  id: string
  title: string
  body: string
  author: string
  tags: string[]
  category: string
  status: PostStatus
  createdAt: string
  updatedAt: string
}
```

---

## Application Features

Your PostKit app must include the following features.

---

### 1. Post List View

Display a list of posts showing:

- title  
- status  
- tags  
- reading time  
- created or updated date  

**Must use:**
- filter/sort library  
- date formatting library  
- reading time library  
- tag utility library  

---

### 2. Search

Users must be able to search posts.

- search by title, body, or tags  
- results update as user types or on submit  

**Must use:**
- search library  

---

### 3. Filter and Sort

Users must be able to:

- filter by status  
- filter by tag  
- sort by date or title  

**Must use:**
- filter/sort library  

---

### 4. Post Editor

Users must be able to:

- create a new post  
- edit an existing post  
- update title, body, tags, category, and status  

**Must use:**
- validation library  
- tag utility library  

---

### 5. Post Preview / Summary

Display a preview of a post showing:

- slug  
- excerpt  
- reading time  
- formatted date  
- status label  

**Must use:**
- slug library  
- excerpt library  
- reading time library  
- date formatting library  

---

### 6. Slug Generation

Each post must have a slug derived from its title.

- slugs must be URL-safe  
- slugs must be unique  

**Must use:**
- slug library  

---

### 7. Persistence

Posts must be saved and loaded locally.

- data persists between page reloads  

**Must use:**
- storage library  

---

### 8. Import / Export (Optional but recommended)

Users can:

- export posts as JSON  
- import posts from JSON  

**Must use:**
- storage library  

---

### 9. UI Components

Your app must use shared UI components where provided.

Examples:

- search input  
- tag list  
- status badge  
- post card  

**Must use:**
- component library (if assigned)

---

## Technical Requirements

- Use **React + TypeScript**  
- Use **npm packages from your classmates**   
- Do not reimplement library logic  

---

## What You Must Not Do

- Do NOT rewrite library functionality yourself  
- Do NOT bypass a package because it is inconvenient  
- Do NOT modify another student’s package  

If a package has issues:  
👉 document the problem and work around it carefully, report an issue, or make a pull request. 

---

## Minimum Completion Requirements

Your app is complete when:

- all major features are implemented  
- all required libraries are used  
- the app runs without errors  
- data persists correctly  
- search, filter, and sort all work  

---

## Evaluation Criteria

Your project will be evaluated on:

### 1. Integration
- did you use all required libraries correctly?

### 2. Functionality
- does the app behave as expected?

### 3. Code Quality
- is your code readable and organized?

### 4. Correct Use of APIs
- did you follow each package’s documented behavior?

### 5. Completeness
- are all required features implemented?

---

## Key Idea

This project is not about building everything yourself.

It is about:

> using well-designed libraries to build a complete system

---

## Final Thought

If your app feels difficult to build, that is part of the assignment.

You are experiencing what real developers face when working with external libraries:

- unclear APIs  
- edge cases  
- unexpected behavior  

Your job is to **make it work anyway**.
