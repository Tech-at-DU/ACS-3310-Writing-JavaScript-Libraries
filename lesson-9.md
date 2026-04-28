# Lesson 9 — Systems Thinking: Boundaries and What to Test

## Overview

You have been building PostKit for two weeks. Today you step back and look at what you actually built — not feature by feature, but as a system.

Understanding your app as a system is not just an academic exercise. It is what lets you answer two practical questions:

1. If I change something, what else might break?
2. Where do I need tests?

These questions have the same answer. The places where change propagates are exactly the places that need tests.

---

## Learning Goals

By the end of this lesson you should be able to:

- Define what a system boundary is and identify three types in PostKit
- Map the actual boundaries in your own app
- Distinguish between unit tests and integration tests
- Identify the behaviors in PostKit that are most important to test
- Explain what makes a test meaningful versus useless

---

## ⏱️ Part 1 — What Is a Boundary? (15 min)

### Lecture

A **boundary** is any point in your app where one piece of code hands something off to another.

Boundaries are where failures hide. Not because the individual pieces are broken — often each one works fine in isolation. Failures happen at boundaries because the pieces make assumptions about each other, and those assumptions are not always true.

**Three types of boundaries in PostKit:**

---

### Library Boundaries

A library boundary is the point where your app calls a PostKit package.

```ts
// Your code                      ← boundary →  Library code
const time = formatTime(readingTime(form.body))
```

Your code hands `form.body` to `readingTime`. The library does something with it and returns a value. Your code uses that value.

At this boundary:
- What does the library expect? A non-empty string? A specific format?
- What does it return? A number? An object? `undefined` if the input is empty?
- What happens if the input is `""` or `null`?

You do not control what happens inside the library. You only control what you send in and how you handle what comes out. That is the boundary.

---

### State Boundaries

A state boundary is the point where a component reads from or writes to a store.

```ts
// Component reads from the store
const posts = usePostStore(s => s.posts)

// Component writes to the store
const updatePost = usePostStore(s => s.updatePost)
updatePost(post.id, { title: form.title })
```

At this boundary:
- What shape is the data the component expects? (`Post[]` not `Post | null`)
- What happens if the store returns an empty array instead of a populated one?
- If another component writes to the same store, does this component see the update?

Multiple components can share the same state boundary. A write in the editor affects what the list view reads. The boundary is the connection — and it goes in both directions.

---

### View Boundaries

A view boundary is the point where data becomes UI — where a component receives props and decides what to render.

```tsx
// Data crosses into the component here
<PostCard post={post} />
```

Inside `PostCard`, the component makes assumptions: `post.title` is a string, `post.tags` is an array, `post.status` is one of the valid values.

At this boundary:
- What does the component assume about its input?
- What happens if `post.tags` is empty?
- What happens if `post.updatedAt` is `undefined` for a new post?

View boundaries are where silent rendering failures happen. The component renders, nothing crashes, but something is blank or wrong.

---

### Why Boundaries Matter

The failures that are hardest to debug happen at boundaries. A value produced correctly in the store arrives malformed at the view. A library returns an unexpected type that silently corrupts a derived value. A route change leaves stale state behind.

This is why you map boundaries before you write tests. The map tells you where the risk is.

---

## ⏱️ Part 2 — Map Your Boundaries (35 min)

### Active Learning

Work individually for 20 minutes, then compare with a partner for 15 minutes.

This is not a generic diagram. You are mapping **your** app — the actual files, the actual function calls, the actual data shapes you used.

---

**Step 1 — Find your library boundaries (5 min)**

Open your app. Search for every import from a PostKit package.

List each one:
- Which library is it?
- Which file calls it?
- What do you pass in?
- What do you do with the return value?

Example:
```
filterByStatus(posts, statusFilter) → Post[]
  called in: PostListView.tsx inside useMemo
  input: posts from store, statusFilter from UI store
  output: filtered Post[] passed to sortByDate
```

Do this for every PostKit library call in your app.

---

**Step 2 — Find your state boundaries (5 min)**

List every place a component reads from or writes to a store.

Example:
```
usePostStore → posts: Post[]
  read by: PostListView, PostCard, PostDetailView
  written by: PostDetailView (updatePost, addPost, deletePost)
```

Identify any store that more than one component shares. That is a place where a write by one component affects what another component sees.

---

**Step 3 — Find your view boundaries (5 min)**

List the props each major component receives.

Example:
```
PostCard: post: Post
  assumes: post.tags is string[], post.title is non-empty string
  risk: post.tags might be [] if tags were not required
```

For each one, note: what would happen if a prop was undefined, empty, or the wrong shape?

---

**Step 4 — Draw the connections (5 min)**

On paper or a simple diagram tool, draw:

- A box for each store
- A box for each view and major component
- A box for each PostKit library you call
- Arrows between them labeled with what is being passed

Then mark:
- Which connections cross a library boundary? (your code → PostKit package)
- Which connections cross a state boundary? (store → component or component → store)
- Which connections cross a view boundary? (component → child component via props)

---

**Step 5 — Partner review (15 min)**

Swap maps with a partner. Without asking any questions, answer these from their diagram alone:

1. Where does post data come from and where does it end up on screen?
2. If the filter library returned `null` instead of `[]` for no results, which component would break?
3. If `Post.tags` changed from `string[]` to `{ name: string; color: string }[]`, how many places in their app would need to change?

Discuss what you found. If the diagram could not answer a question, that is a gap worth noting.

---

## ⏱️ Part 3 — Unit Tests vs Integration Tests (25 min)

### Lecture

#### What you already know: unit tests

You have written unit tests for your library. A unit test calls one function with known input and checks that it returns the expected output:

```ts
test('filterByStatus returns only matching posts', () => {
  const posts = [
    { id: '1', status: 'draft', title: 'A', ... },
    { id: '2', status: 'published', title: 'B', ... },
  ]
  expect(filterByStatus(posts, 'draft')).toHaveLength(1)
})
```

This runs fast. It is easy to write. It tells you exactly what broke when it fails.

But it only tests the library in isolation. It does not test anything about how the app uses the library.

---

#### The gap unit tests leave

Imagine your unit test passes — `filterByStatus` works correctly. Now imagine that in `PostListView.tsx`, you wrote:

```ts
// Bug: passing the wrong field
result = filterByStatus(result, tagFilter)  // should be statusFilter
```

Your unit test would still pass. The library works fine. The bug is in your app code, at the boundary between the UI and the library — and the unit test cannot see that.

This is the gap: **unit tests verify that pieces work, not that pieces work together.**

---

#### Integration tests: testing behavior across boundaries

An integration test renders a real component, simulates a real user interaction, and checks what actually appears on screen. It crosses boundaries — state, libraries, components — all at once.

Here is what the setup looks like. You need three tools:

```ts
import { render, screen, fireEvent } from '@testing-library/react'
```

- `render` — mounts a component into a simulated browser environment
- `screen` — lets you query what is visible on screen (by text, role, label, etc.)
- `fireEvent` — simulates user interactions (clicks, typing, etc.)

These come from React Testing Library, which is designed to test components the way a user would interact with them — not by inspecting implementation details, but by checking what is actually visible.

---

#### Walking through an example

Here is an integration test for the filter behavior in `PostListView`:

```tsx
test('filtering by draft shows only draft posts', () => {
  // Step 1: Put known data into the store
  usePostStore.setState({
    posts: [
      makePost({ title: 'Draft post', status: 'draft' }),
      makePost({ title: 'Published post', status: 'published' }),
    ]
  })

  // Step 2: Render the component
  render(<PostListView />)

  // Step 3: Simulate clicking the Draft filter button
  fireEvent.click(screen.getByRole('button', { name: 'Draft' }))

  // Step 4: Check what is now on screen
  expect(screen.getByText('Draft post')).toBeInTheDocument()
  expect(screen.queryByText('Published post')).not.toBeInTheDocument()
})
```

**What each step is doing:**

`usePostStore.setState(...)` — Seeds the store with known data so the test is predictable. Without this, the test depends on whatever happened to be in the store, which makes it unreliable.

`render(<PostListView />)` — Mounts the component. The component reads from the store, runs its `useMemo`, and renders the initial list — both posts visible.

`fireEvent.click(...)` — Simulates clicking the Draft button. This updates the store's `statusFilter`, which triggers a re-render, which re-runs the `useMemo`, which calls `filterByStatus`.

`screen.getByText(...)` / `screen.queryByText(...)` — Queries what is now on screen. `getByText` throws if the element is not found. `queryByText` returns `null` instead of throwing — useful for asserting something is *not* there.

---

#### What this test actually exercises

A single test click crosses all three boundary types from Part 1:

1. **View boundary** — the button click updates UI state
2. **State boundary** — the status filter is written to the store and read by `useMemo`
3. **Library boundary** — `filterByStatus` is called with the store data

If any one of those connections is broken, the test fails. It does not tell you exactly which step failed — but it tells you the behavior is broken, which is the first thing you need to know.

---

#### The gap between unit and integration tests

| What broke | Unit test catches it? | Integration test catches it? |
|---|---|---|
| `filterByStatus` returns wrong results | Yes | Yes |
| Component passes wrong field to `filterByStatus` | No | Yes |
| Store returns stale data after update | No | Yes |
| Library returns `null` instead of `[]` | Only if you test that case | Yes |
| Route change leaves previous filter active | No | Yes |

Unit tests are fast and precise — good for testing your library's logic. Integration tests are slower but catch the failures that happen at boundaries, which is where most app bugs live.

**For PostKit, integration tests are more valuable** — because the complexity is not inside any single library or component. It is in how they connect.

---

## ⏱️ Part 4 — What to Test in PostKit (20 min)

### Lecture

Not everything needs a test. The goal is to identify the behaviors that are:

- **Load-bearing** — if this breaks, the app does not work
- **Easy to break accidentally** — changes to nearby code could affect this
- **Hard to verify manually** — you cannot just look and tell if it is right

**The acceptance criteria from PostKit.md are your starting point.** Each one describes a behavior a user depends on. If any of them break silently, that is a failure.

Go through them and think about which are most at risk:

| Acceptance criterion | What could break it |
|---|---|
| Filter by status shows only matching posts | Wrong field passed to library, library bug, stale store data |
| Search returns accurate results | Library not receiving normalized query, posts not re-filtered on change |
| Post editor saves correctly | Validation not running, wrong fields sent to store |
| Posts persist after browser refresh | Storage library not connected to store, wrong key used |
| Slug is unique across posts | `makeUnique` not called, existing slugs not passed correctly |

**The most important things to test are integration points** — places where your code hands off to a library, or where two libraries' outputs compose together.

**The filter pipeline is the highest priority:**

```
user interaction → UI state → useMemo → library calls → rendered list
```

Five steps. A failure at any step produces wrong results silently. A test that exercises all five together is worth more than five tests that each check one step.

---

### Active Learning — Identify Your Test Targets (10 min)

Look at your boundary map from Part 2.

For each PostKit acceptance criterion, write:

1. Which boundary is responsible for satisfying it?
2. What input would cause it to fail silently?
3. Is this something you could verify manually in under 30 seconds? If not, it needs a test.

You will use this list in the next lesson to write test specifications.

---

## ⏱️ Part 5 — What Makes a Test Meaningful (15 min)

### Lecture

A test that never fails is not a test. This was true for your library unit tests and it is true here.

A meaningful integration test:

- **Fails when the behavior is wrong** — if you break the code, the test breaks
- **Passes when the behavior is correct** — not just when no error is thrown
- **Tests one specific behavior** — narrow enough to tell you where the failure is
- **Uses realistic inputs** — the same kinds of data the real app would use

**Signs a test is not meaningful:**

```tsx
// This test passes even if the filter does nothing
test('filter renders', () => {
  render(<PostListView />)
  expect(screen.getByText('Draft')).toBeInTheDocument()
})
```

```tsx
// This test passes even if the list is empty when it should not be
test('post list shows posts', () => {
  render(<PostListView />)
  // no assertion about which posts appear
})
```

**A meaningful version:**

```tsx
test('filtering by draft shows only draft posts', () => {
  // arrange — seed the store with known data
  const posts = [
    makePost({ title: 'Draft post', status: 'draft' }),
    makePost({ title: 'Published post', status: 'published' }),
  ]
  usePostStore.setState({ posts })

  // act — render and interact
  render(<PostListView />)
  fireEvent.click(screen.getByRole('button', { name: 'Draft' }))

  // assert — verify the specific outcome
  expect(screen.getByText('Draft post')).toBeInTheDocument()
  expect(screen.queryByText('Published post')).not.toBeInTheDocument()
})
```

This test would fail if:
- The filter button did not update the store
- The store did not update the visible list
- The library returned the wrong posts
- The component rendered the wrong posts

Any of those failures — the test catches it.

---

## ⏱️ Part 6 — Lab: TEST-TARGETS.md (20 min)

Create a file called `TEST-TARGETS.md` in the root of your PostKit repo. This is your deliverable for today — show it to the instructor before the end of class.

It should have two sections:

---

**Section 1 — Boundary Map**

Describe your system boundaries in text. For each boundary type, list the actual connections in your app:

```md
## Boundary Map

### Library Boundaries
- PostListView.tsx: filterByStatus(posts, statusFilter) → Post[]
- PostListView.tsx: sortByDate(result, sortDirection) → Post[]
- PostDetailView.tsx: formatTime(readingTime(form.body)) → string
- ...

### State Boundaries
- usePostStore → posts: Post[] — read by PostListView, PostCard, PostDetailView
- usePostStore → updatePost — written by PostDetailView
- useUIStore → statusFilter — read by PostListView useMemo
- ...

### View Boundaries
- PostCard receives: post: Post — assumes tags is string[], title is non-empty
- PostDetailView receives: id via useParams — undefined means new post
- ...
```

---

**Section 2 — Test Targets**

List at least five specific behaviors you want to verify. Use this format for each — you will paste these directly into AI prompts in lesson 10, so be precise:

```md
## Test Targets

### T1 — Filter by status shows only matching posts
Behavior: Clicking the Draft filter shows only draft posts in the list
Setup: Store contains two posts — one draft, one published
Action: Render PostListView, click the button labeled 'Draft'
Assert:
  - Draft post title appears in the document
  - Published post title does NOT appear in the document
Failure: Would catch — wrong variable passed to filterByStatus, filter not connected to store

### T2 — ...
```

---

You will use this file in lesson 10 to write test prompts for AI. A complete, specific `TEST-TARGETS.md` means lesson 10 starts with a clear plan. A vague one means lesson 10 starts with guesswork.

---

## ⏱️ Wrap-up (5 min)

Show `TEST-TARGETS.md` to the instructor before leaving.

Share with the class:

1. Which boundary in your app has the most traffic — the most things passing through it?
2. Which acceptance criterion are you least confident is working correctly right now?
3. What is one thing your boundary map revealed that you did not expect?

---

## Reflection

1. Define each of the three boundary types in your own words. Give a specific example of each from your PostKit app — not a generic definition, but the actual file and function.
2. Look at your boundary map. If the `Post` type gained a new required field, how many places in your app would need to change? List them.
3. Why is the filter pipeline a higher testing priority than, say, the date formatting library?
4. Describe one behavior from your PostKit app that could break silently — the app would still run, but produce wrong results. Which boundary would the failure be at?
