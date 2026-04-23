# Lesson 8 — Building PostKit: Core Features

## Overview

Today is a self-guided lab. There is no lecture.

You will implement the core PostKit requirements in a suggested order. Each section tells you which requirement to solve, which libraries are involved, how to structure your AI prompt, and how to verify the feature is working.

Work through the sections in order. Later requirements depend on earlier ones being in place. Two requirements fully working are better than five half-built.

**Reference documents:**
- [PostKit Requirements](./PostKit.md)
- [AI Use Policy](./ai-policy.md)
- [Prompt Log](./prompt-log.md)

---

## How to Use This Lesson

Each section follows the same structure:

1. **The requirement** — what the user needs
2. **Libraries involved** — which PostKit packages handle this
3. **What to build** — the specific implementation task
4. **Prompt structure** — how to ask AI for help
5. **Verify it works** — a checklist before moving on
6. **Log it** — add an entry to `PROMPTS.md`

When you hit a pattern you don't understand — `useMemo`, `useEffect`, `useCallback`, TypeScript utility types — ask AI to explain it in the context of what you are building. Do not skip past code you don't understand. Understanding it now means you can change it later.

---

## Build Order

| Step | Requirements | Depends on |
|---|---|---|
| 1 | R8 — Persistence | Nothing — do this first |
| 2 | R1 — Browse posts | R8 |
| 3 | R5 — Create and edit | R1 |
| 4 | R2 + R3 — Filter and sort | R5 (real posts to filter) |
| 5 | R4 — Search | R5 |
| 6 | R6 + R7 — Slug and preview | R5 |

---

## Step 1 — R8: Persistence

### What the user needs

Posts must survive a browser refresh. Data must be saved locally and restored automatically when the user returns.

### Libraries involved

The **storage library** handles serializing and deserializing posts. Your state management (Zustand or Context) connects to it.

If you are using Zustand, the `persist` middleware handles this directly — it wraps your store and saves state to `localStorage` automatically.

If you are using React Context, you will need to call the storage library explicitly on save and load.

### What to build

- Connect your post store to local storage
- Verify that posts created in the app still exist after a hard refresh

### Prompt structure

```
I am building a PostKit app with React and TypeScript.

I am using [Zustand with persist middleware / React Context + storage library].

My Post type is:
[paste your Post type]

My current store looks like this:
[paste your store]

I am using a storage library called [package name]. Its API is:
[paste relevant README section]

I need posts to persist between browser sessions.

Please show me how to connect my store to local storage using this library.
Explain what each part does as you go.
```

### Verify it works

- [ ] Create a post manually in the browser console or via a hardcoded seed
- [ ] Refresh the page — the post is still there
- [ ] Open DevTools → Application → Local Storage — find your stored data

### Log it

Note in your prompt log: what did the storage library actually do vs. what the store middleware did? Were they the same thing or different layers?

---

## Step 2 — R1: Browse Posts

### What the user needs

Users must see a list of their posts. Each post in the list shows the title, status, tags, reading time, and date.

### Libraries involved

- **Reading time library** — estimate how long the post takes to read
- **Date display library** — format `createdAt` or `updatedAt` for display
- **Tag utility library** — normalize and display tags

### What to build

- A list view that reads posts from your store
- Each post card shows: title, status, tags, reading time, date
- Seed the store with two or three posts if it is empty so you have something to display

### Prompt structure

```
I am building a PostListView component in React + TypeScript for PostKit.

My Post type is:
[paste your Post type]

I read posts from my store like this:
[paste your store read pattern]

I need to display each post with: title, status, tags, reading time, and date.

I am using these libraries:
- [reading time package]: [paste relevant API]
- [date display package]: [paste relevant API]
- [tag utility package]: [paste relevant API]

Please write a PostCard component that accepts a Post and renders these fields.
Use the libraries above for reading time, date, and tags.
Do not add styling or features beyond what is described.
```

### Verify it works

- [ ] At least two posts appear in the list
- [ ] Reading time shows a sensible value (e.g. "1 min read")
- [ ] Date shows a formatted string, not an ISO timestamp
- [ ] Tags are displayed — check they are normalized (lowercase, no duplicates)
- [ ] Status is visible for each post

### Log it

Note: did any library return unexpected output for a post with very short body text or empty tags? What did you do about it?

---

## Step 3 — R5: Create and Edit Posts

### What the user needs

Users must be able to create a new post and edit an existing one. They can update the title, body, tags, category, and status. Required fields must be validated before saving.

### Libraries involved

- **Tag utility library** — parse tags from a text input
- **Validation library** — validate post fields before saving (if available)

### What to build

- A post editor view with fields for title, body, tags, category, and status
- Controlled form state — each field is a value in React state
- Validation before create/save — show inline errors for missing required fields
- Connect to your store's `addPost` and `updatePost` operations

### Prompt structure

**For the form:**
```
I am building a post editor in React + TypeScript for PostKit.

My FormState type has these fields: title, body, tagsInput, category.
I need a controlled form where each field updates React state on change.

I am using a tag library called [package name] to parse tags from tagsInput.
Its API: [paste relevant API]

Please write:
1. The FormState type
2. The useState setup
3. A handleChange function that updates a single field
4. An input and textarea connected to the form state

Keep it focused. No styling yet.
```

**For validation:**
```
I have a PostKit post editor with this form state:
[paste your FormState type]

I need a validate function that:
- returns an error message for each invalid field
- checks title is not empty
- checks body is not empty  
- checks that parseTags(tagsInput) returns at least one tag
- checks category is not empty

The return type should allow partial errors — not every field needs an error.

Please write the validate function and the Errors type.
Explain what Partial<Record<keyof FormState, string>> means as you go.
```

### Verify it works

- [ ] Creating a new post adds it to the store and list view
- [ ] Editing an existing post updates it in the store
- [ ] Submitting an empty form shows errors on required fields
- [ ] Errors clear when the user starts typing in a field
- [ ] Tags are parsed correctly from comma-separated input
- [ ] After creating a post, it appears in the list with correct reading time and date

### Log it

Note: how did the tag library handle unusual input — extra spaces, uppercase, empty strings between commas? Did you need to adjust your validation to account for this?

---

## Step 4 — R2 and R3: Filter and Sort

### What the user needs

Users must be able to filter posts by status and by tag. Users must be able to sort by date or title, in either direction.

### Libraries involved

- **Filter/sort library** — `filterByStatus`, `filterByTag`, `sortByDate`, `sortByTitle`

### What to build

- Status filter controls (buttons or tabs for draft, review, published, and all)
- Tag filter control (a select or list of available tags)
- Sort controls (date or title, ascending or descending)
- The visible list is derived from all posts by applying filters and sort in sequence

The derived list should be computed with `useMemo` — it recalculates only when posts or filter settings change, not on every render.

### Prompt structure

```
I am building filter and sort controls for PostKit's post list view.

My Post type is:
[paste your Post type]

I store filter settings in [my store / local state]:
- statusFilter: PostStatus | null
- tagFilter: string | null
- sortField: 'date' | 'title'
- sortDirection: 'asc' | 'desc'

I am using a library called [package name]. Its API:
[paste filterByStatus, filterByTag, sortByDate, sortByTitle signatures]

Please write a useMemo that:
1. Starts with all posts
2. Applies statusFilter if set
3. Applies tagFilter if set
4. Sorts by sortField and sortDirection

Explain what the dependency array should contain and why.
```

### Verify it works

- [ ] Selecting "Draft" shows only draft posts
- [ ] Selecting a tag shows only posts with that tag
- [ ] Clearing filters shows all posts again
- [ ] Sort by date newest shows most recent post first
- [ ] Sort by title A–Z shows posts alphabetically
- [ ] Combining status filter and tag filter works correctly

### Log it

Note: did you encounter any case where filtering produced unexpected results? Was the issue in your code, the library, or the data?

---

## Step 5 — R4: Search

### What the user needs

Users must be able to search posts by title, body, or tags. Results should update as the user types or after they submit.

### Libraries involved

- **Search library** — search posts against a query string

### What to build

- A search input connected to state
- Apply the search library to the post list as part of the filter/sort pipeline
- Search should compose with status and tag filters — a filtered + searched list

### Prompt structure

```
I have a PostKit post list view that already filters and sorts posts with useMemo.

Here is my current useMemo:
[paste your existing filter/sort useMemo]

I need to add search. I am using a library called [package name].
Its API: [paste relevant API]

Please update my useMemo to also apply search when a searchQuery string is set.
The search should run after status and tag filters.

Show me where in the pipeline to add it and why order matters.
```

### Verify it works

- [ ] Typing a word that appears in a post title shows that post
- [ ] Typing a word from a post's body shows that post
- [ ] Typing a tag value shows posts with that tag
- [ ] Clearing the search shows the full (filtered) list again
- [ ] Search and status filter work together — only matching posts in the selected status appear

### Log it

Note: does search interact with the filter correctly? What happens when you search for something and also have a status filter active?

---

## Step 6 — R6 and R7: Slug and Post Preview

### What the user needs

Each post must have a URL-safe slug derived from its title. The post editor must show a preview panel with: slug, excerpt, reading time, formatted date, and status.

### Libraries involved

- **Slug library** — already used when creating the post ID
- **Excerpt library** — generate a short summary from the body
- **Reading time library** — already used in the list view
- **Date display library** — already used in the list view

### What to build

- A preview panel alongside the post editor showing live metadata
- Values update as the user types (they read from form state, not saved post data)
- The slug is the post's ID — show it in the preview
- The excerpt is generated from the current body text
- Reading time is estimated from the current body text
- Date shows the last saved time, or a placeholder for new posts

### Prompt structure

```
I am building a post preview panel for my PostKit post editor.

The preview should show live values derived from the current form state.

My form state is:
[paste your FormState type]

My post object is (may be undefined for new posts):
[paste your Post type]

I am using these libraries:
- [excerpt package]: [paste API]
- [reading time package]: [paste API]
- [date display package]: [paste API]

Please write the four derived values I need to display:
1. excerpt — from form.body
2. readingTime — formatted string from form.body
3. slug — the post id, or a placeholder for new posts
4. displayDate — formatted updatedAt for existing posts, placeholder for new

For each value, show me how to guard against undefined or empty input.
Explain what ?? does and when to use it instead of ||.
```

### Verify it works

- [ ] Typing in the body field updates the excerpt in the preview panel
- [ ] Typing in the body updates the reading time
- [ ] The slug shows the post ID for existing posts and a placeholder for new ones
- [ ] The date shows a readable format, not an ISO string
- [ ] Empty body shows a graceful fallback, not a crash or blank

### Log it

Note: which library required the most guarding for edge case input? What did it return for empty strings?

---

## When You Get Stuck

1. Re-read the library README — the answer is usually there
2. Add `console.log` before the problem line and check the actual value
3. Test the library function in the browser console directly
4. Ask a classmate whose library you are using
5. File a GitHub issue if the library is broken
6. Ask AI with the diagnostic information you gathered in steps 1–3

Do not ask AI to "fix it" without first knowing what is wrong. "It doesn't work" produces bad prompts. "The library returns undefined for empty string input and I need to guard against it" produces good prompts.

---

## Wrap-up (10 min)

Share with the class:

1. Which step did you reach today?
2. Which library integration was hardest? What did you discover?
3. What was one thing AI explained well that you didn't understand before?

---

## Reflection

1. What is the correct build order for these features and why does it matter?
2. Describe the filter and sort pipeline in your own words. What is `useMemo` doing and why is it used here?
3. Which library required the most defensive coding — guards for unexpected output? What does that tell you about the library's design?
4. Paste one prompt from today that produced genuinely useful output. What made it work?
