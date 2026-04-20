# Lesson 9 — Systems Thinking: What You Built and What to Test

## Overview

You have been building PostKit for two weeks. Today you step back and look at what you actually built — not feature by feature, but as a system.

Understanding your app as a system is not just an academic exercise. It is what lets you answer two practical questions:

1. If I change something, what else might break?
2. Where do I need tests?

These questions have the same answer. The places where change propagates are exactly the places that need to be tested.

---

## Learning Goals

By the end of this lesson you should be able to:

- Describe your PostKit app as a system with boundaries and connections
- Identify which parts of the system are most sensitive to change
- Distinguish between unit tests and integration tests
- Identify the behaviors in PostKit that are most important to test
- Explain what makes a test meaningful versus useless

---

## ⏱️ Part 1 — What You Built (20 min)

### Lecture

A system is a set of parts that work together to produce behavior none of the parts produce alone.

PostKit is a system. No single library filters, searches, formats, and persists posts. The app does that — by composing libraries, connecting state to views, and routing user interactions to the right operations.

But systems have a property that individual components do not: **changes propagate**.

If you rename a field on the `Post` type, nothing breaks immediately. TypeScript may catch some of it. But somewhere downstream — in a library call, a component prop, a store operation — something will fail. The question is whether you find out during development or after the app is shipped.

This is why understanding your system matters. Not to admire it, but to know where it is fragile.

**Three kinds of boundaries in PostKit:**

**Library boundaries** — the point where your app code calls a PostKit library. What goes in? What comes out? What happens if the library behaves unexpectedly?

**State boundaries** — the point where a component reads from or writes to a store. What shape is the data? Who else depends on it?

**View boundaries** — the point where data becomes UI. What assumptions does the component make about its input? What happens if a field is undefined?

The failures that are hardest to debug happen at boundaries. A value produced correctly in the store arrives malformed at the view. A library returns an unexpected type that silently corrupts a derived value. A route change leaves stale state behind.

---

## ⏱️ Part 2 — Map Your System (30 min)

### Active Learning

Work individually for 15 minutes, then compare with a partner for 15 minutes.

**Step 1 — Draw your app (15 min)**

On paper or in a simple diagram tool, map your PostKit app.

Draw:
- A box for each store
- A box for each view/component that uses a store
- A box for each PostKit library you are using
- Arrows showing data flow: store → component, component → library, library → component

Label each arrow with what is being passed: `Post[]`, `string`, `PostStatus`, etc.

Then mark:
- Which connections would break if the `Post` type changed?
- Which connections go through a PostKit library you do not control?
- Which component has the most incoming connections?

**Step 2 — The handoff question (15 min)**

Swap diagrams with a partner.

Without asking any questions, answer these from their diagram alone:

1. Where does post data come from and where does it go?
2. If the filter library returned `null` instead of `[]` for no results, which component would break?
3. If you had to add a new field to `Post`, how many places in their app would need to change?

Discuss what you found. If the diagram could not answer a question, that is a gap worth noting.

---

## ⏱️ Part 3 — Unit Tests vs Integration Tests (20 min)

### Lecture

You have already written unit tests — for your library. A unit test checks one function in isolation:

```ts
test('filterByStatus returns only matching posts', () => {
  const posts = [
    { id: '1', status: 'draft', ... },
    { id: '2', status: 'published', ... },
  ]
  expect(filterByStatus(posts, 'draft')).toHaveLength(1)
})
```

This test tells you the function works. It tells you nothing about whether the app uses the function correctly.

**Integration tests** check behavior across boundaries — that two or more pieces work correctly together.

```tsx
// Render the PostListView, interact with the status filter,
// assert that only the right posts appear
render(<PostListView />)
fireEvent.click(screen.getByText('Draft'))
expect(screen.getAllByTestId('post-card')).toHaveLength(1)
```

This test tells you the filter control, the store, the library, and the component are all connected correctly. It catches failures that unit tests miss.

**The gap between them:**

| What broke | Unit test catches it? | Integration test catches it? |
|---|---|---|
| `filterByStatus` returns wrong results | Yes | Yes |
| Component passes wrong field to `filterByStatus` | No | Yes |
| Store returns stale data after update | No | Yes |
| Library returns `null` instead of `[]` | Only if you test that case | Yes |
| Route change leaves previous filter active | No | Yes |

Unit tests are fast and precise. Integration tests are slower but catch the failures that matter most to users.

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

Look at your system map from Part 2.

For each PostKit acceptance criterion, write:

1. Which connection or boundary is responsible for satisfying it?
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

## ⏱️ Part 6 — Lab: Finish the App and Prepare Test Targets (20 min)

Use the remaining time to:

1. Complete any acceptance criteria not yet implemented
2. Finalize your system map — make sure it reflects your current implementation
3. Write your test target list from the active learning exercise

Your test target list should have at least five specific behaviors you want to verify, each with:
- The behavior in plain language
- The input that would trigger it
- The expected output
- Why it could break silently

You will use this in the next lesson to write test prompts for AI.

---

## ⏱️ Wrap-up (5 min)

Share with the class:

1. Which connection in your system map has the most dependencies?
2. Which acceptance criterion are you least confident is working correctly right now?
3. What is one thing your system map revealed that you did not expect?

---

## Reflection

1. What is the difference between a unit test and an integration test? Give an example from PostKit of each.
2. Look at your system map. If the `Post` type gained a new required field, how many files in your app would need to change?
3. Why is the filter pipeline a higher testing priority than, say, the date formatting library?
4. Describe one behavior from your PostKit app that could break silently — the app would still run, but produce wrong results.
