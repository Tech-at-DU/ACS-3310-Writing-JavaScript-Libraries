# PostKit — Prompt Log

## What This Is

A prompt log is a running record of every significant AI interaction during PostKit development.

You are required to maintain this log throughout the project. It is submitted as part of your Gradescope assignments and referenced in reflection questions.

This is not a punishment. Engineers who can look back at their prompts and explain what improved are better at working with AI. Engineers who cannot are guessing.

---

## Why Keep a Log

Three reasons:

**1. It makes your thinking visible.**
A prompt is a description of a problem. Weak prompts reveal unclear thinking. If you cannot write a prompt that produces useful output, you probably do not understand the problem well enough yet.

**2. It shows how you improved.**
Your Week 4 prompts and your Week 7 prompts should look different. More specific context, more precise asks, less reliance on AI to make decisions. If they look the same, something did not change.

**3. It creates accountability.**
Reflection questions ask you to paste real prompts. A log you have been maintaining all along makes this easy. A log you reconstruct at the end is missing the failures — which are the most useful part.

---

## Format

Keep your prompt log in a file called `PROMPTS.md` in your PostKit app repository.

Add an entry every time you use AI for a significant task — not for every autocomplete suggestion, but whenever you write a deliberate prompt to solve a problem.

Each entry uses this format:

---

```
## [Date] — [Short description of what you were trying to do]

**Requirement:** [Which PostKit requirement were you working on? e.g. R2, R11]

**The prompt:**
[Paste the full prompt exactly as you wrote it]

**What AI produced:**
[Brief description — or paste the relevant output]

**What I had to fix or verify:**
[Be specific. What was wrong? What did you check against the README?
What did you test? What did AI get wrong?]

**What I would do differently:**
[Optional — but useful if the prompt did not work well]
```

---

## Example Entry

```
## 2026-04-21 — Filter pipeline with useMemo

**Requirement:** R2 — Filter posts by status

**The prompt:**
I am building a React + TypeScript app called PostKit.

I have a Zustand store called usePostStore that holds posts: Post[].

Post type:
  { id: string, title: string, status: 'draft'|'review'|'published',
    tags: string[], createdAt: string, updatedAt: string }

I am using a library called postkit-filter-sort. Its API:
  filterByStatus(posts: Post[], status: PostStatus): Post[]
  filterByTag(posts: Post[], tag: string): Post[]
  sortByDate(posts: Post[], direction: 'asc'|'desc'): Post[]

Requirement: users must be able to filter the post list by status.

Please write a useMemo hook that:
- reads posts from usePostStore
- applies filterByStatus when a statusFilter string is set
- returns the filtered array

Keep it focused on just the filter logic. No sorting yet.

**What AI produced:**
A useMemo with the correct dependency array and correct use of filterByStatus.
It also added a sortByDate call I did not ask for.

**What I had to fix or verify:**
- Removed the unsolicited sort call — I will add that separately
- Verified filterByStatus function name against the README (correct)
- Tested: set statusFilter to 'draft', confirmed only draft posts appeared
- Found: the library returns [] not null for no matches — no guard needed

**What I would do differently:**
Add "do not add features I did not ask for" to the prompt constraints.
```

---

## What Makes a Good Entry

**Be specific about what AI got wrong.**
"AI made a small mistake" is not useful. "AI used `filterPosts` instead of `filterByStatus` — it invented a function name that does not exist in the library" is useful.

**Describe what you verified, not just that you verified.**
"I tested it" is not useful. "I set the status filter to 'draft', confirmed only draft posts appeared, then set it to 'published' and confirmed the list updated" is useful.

**Include failures.**
A prompt that produced useless output is more valuable to log than one that worked perfectly. Failures show what you learned to avoid.

---

## Minimum Entries Required

| Phase | Minimum entries |
|---|---|
| PostKit app build (Weeks 4–5) | 5 entries |
| Integration testing (Week 6) | 3 entries |
| Spec change (Week 7) | 4 entries |

These are minimums. Most students will have more.

---

## What Is Not a Prompt Log Entry

- Autocomplete suggestions you accepted without thinking
- Asking AI to explain a concept (useful, but not a log entry)
- Asking AI to fix a syntax error or typo
- Copy-pasting a Stack Overflow answer

Log entries are for deliberate prompts where you described a problem and asked AI to produce code or a test.

---

## Submission

Your `PROMPTS.md` file lives in your PostKit app repository. Gradescope questions will ask you to paste specific entries. Keep the log current — reconstructing it at the end from memory will produce weak answers.
