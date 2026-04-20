# Lesson 8 — Building PostKit: Patterns and Integration

## Overview

Today is a lab session focused on implementing PostKit features correctly and understanding the React patterns behind them.

You will look at three patterns that appear repeatedly in PostKit — derived data with `useMemo`, side effects and cleanup with `useEffect`, and controlled forms. You will also work through a concrete example of how multiple libraries compose in a single feature, and practice diagnosing integration failures.

By the end of class you should have at least two PostKit requirements fully implemented and working.

---

## Learning Goals

By the end of this lesson you should be able to:

- Use `useMemo` to compute derived data efficiently
- Use `useEffect` correctly for side effects and cleanup
- Build controlled forms with validation
- Compose multiple libraries in a single feature
- Diagnose whether a failure is in your code, the library, or the integration

---

## ⏱️ Part 1 — React Patterns in PostKit (25 min)

### Lecture

Three patterns appear in almost every PostKit feature. Understanding them before you need them saves significant debugging time.

---

### Pattern 1 — Derived Data with `useMemo`

PostKit's list view shows a filtered, sorted, searched subset of all posts. This derived list is computed from the full post array plus whatever filters are active.

You could compute it directly in the render:

```tsx
function PostListView() {
  const posts = usePostStore(s => s.posts)
  const visible = filterByStatus(posts, statusFilter) // runs every render
  // ...
}
```

This works but recalculates on every render — even when posts and filters have not changed.

`useMemo` memoizes the result. The calculation only re-runs when its dependencies change:

```tsx
const visible = useMemo(() => {
  let result = posts
  if (statusFilter) result = filterByStatus(result, statusFilter)
  if (tagFilter)    result = filterByTag(result, tagFilter)
  if (searchQuery)  result = searchPosts(result, searchQuery)
  return sortByDate(result, sortDirection)
}, [posts, statusFilter, tagFilter, searchQuery, sortDirection])
```

The dependency array `[posts, statusFilter, ...]` tells React: only recompute when one of these values changes.

**When to use `useMemo`:**
- Computing a filtered or sorted list
- Deriving a value from a large array
- Any calculation that is expensive and depends on specific values

**When not to bother:**
- Simple calculations on small data
- Values that always change anyway

---

### Pattern 2 — Side Effects with `useEffect`

A side effect is anything that reaches outside the component: timers, subscriptions, network requests, manual DOM changes. `useEffect` is the correct place to handle these.

In PostKit, two common uses:

**Syncing form state when the route changes:**

```tsx
// When navigating from /posts/a to /posts/b, the component
// may not remount — the form needs to reset manually
useEffect(() => {
  if (post) {
    setForm({
      title: post.title,
      body: post.body,
      tagsInput: post.tags.join(', '),
    })
  }
}, [post?.id]) // only re-run when the post ID changes
```

**Autosave with debounce:**

```tsx
useEffect(() => {
  if (isNew) return // don't autosave a post that hasn't been created yet
  const timer = setTimeout(save, 500)
  return () => clearTimeout(timer) // cleanup: cancel the timer if form changes again
}, [form, isNew, save])
```

The return value from `useEffect` is a **cleanup function**. It runs before the effect re-runs, and when the component unmounts. Without the cleanup here, every keystroke would start a 500ms timer that never gets cancelled — firing many redundant saves.

**The dependency array controls when the effect runs:**

| Dependency array | Runs |
|---|---|
| No array | After every render |
| `[]` | Once on mount |
| `[a, b]` | When `a` or `b` changes |

---

### Pattern 3 — Controlled Forms

A controlled form keeps form values in React state and updates state on every change. This gives you a single source of truth for the form data.

```tsx
const [form, setForm] = useState({ title: '', body: '', tagsInput: '' })

function handleChange(field: keyof typeof form, value: string) {
  setForm(prev => ({ ...prev, [field]: value }))
}

return (
  <input
    value={form.title}
    onChange={e => handleChange('title', e.target.value)}
  />
)
```

**Validation** runs against the form state before save or submit:

```tsx
type Errors = Partial<Record<keyof typeof form, string>>

function validate(form: FormState): Errors {
  const errors: Errors = {}
  if (!form.title.trim()) errors.title = 'Title is required.'
  if (!form.body.trim())  errors.body = 'Body is required.'
  return errors
}

function handleCreate() {
  const errs = validate(form)
  if (Object.keys(errs).length > 0) {
    setErrors(errs)
    return
  }
  // proceed with save
}
```

Display errors inline, next to each field. Clear a field's error when the user starts typing in it.

---

## ⏱️ Part 2 — Composing Libraries in One Feature (20 min)

### Lecture

The PostKit post preview panel uses four libraries simultaneously:

```tsx
const excerpt  = createExcerpt(form.body, 160)       // excerpt library
const readTime = formatTime(readingTime(form.body))   // reading time library
const slug     = post?.id ?? '—'                     // slug (used as id in store)
const date     = post ? formatDate(post.updatedAt) : '—' // date library
```

Each library is responsible for exactly one thing. The component composes their outputs.

This is the system at work. None of these libraries knows about the others. They each take simple inputs and return simple outputs. The component is the integration layer.

**What can go wrong here:**

| Problem | Likely cause |
|---|---|
| `createExcerpt` returns `undefined` | Empty string input not handled by library |
| `formatTime` throws | `readingTime` returned `null` instead of `0` |
| Date shows "Invalid Date" | Library expects ISO string, received something else |
| Slug is `undefined` | Post ID was not set correctly at creation |

In each case the fix is different. You need to know which library produced the bad value before you can decide what to do.

---

## ⏱️ Part 3 — Diagnosing Integration Failures (20 min)

### Lecture

When something breaks in PostKit, the failure is rarely obvious. A component crashes, but the cause could be in your code, in one of the libraries, or in how you connected them.

**A systematic approach:**

**Step 1 — Isolate the failure**

Add a `console.log` before the problem line. Print the exact value going into the library call.

```tsx
console.log('body input to createExcerpt:', form.body)
const excerpt = createExcerpt(form.body, 160)
```

Does the input look right? If not, the bug is upstream of the library.

**Step 2 — Test the library in isolation**

Open the browser console. Call the library function directly with the exact value you saw:

```js
import { createExcerpt } from 'postkit-excerpt'
createExcerpt('', 160) // what does it return?
```

Does it behave as the README says? If not, this is a library bug — file an issue.

**Step 3 — Check your types**

TypeScript will often catch mismatches at compile time. If you have type errors you are suppressing or ignoring, fix them before debugging runtime behavior. The type error is usually pointing directly at the problem.

**Step 4 — Check the integration point**

If the library works in isolation but fails in the component, the problem is in how you are connecting them. Common causes:
- Calling the function before data is available (undefined on first render)
- Passing the wrong field from the Post object
- Expecting a different return type than what the library produces

**Step 5 — Document and work around**

If a library has a genuine bug you cannot fix, guard against its output:

```tsx
const excerpt = createExcerpt(form.body, 160) ?? 'No excerpt available'
```

Add a comment explaining why the guard is there:

```tsx
// postkit-excerpt returns undefined for empty input (issue #3)
// guard until library is updated
const excerpt = createExcerpt(form.body, 160) ?? ''
```

This makes your workaround visible and traceable.

---

### Active Learning — Diagnose a Failure (15 min)

Work in pairs.

Consider this scenario:

```tsx
const visible = useMemo(() => {
  let result = posts
  if (statusFilter) result = filterByStatus(result, statusFilter)
  if (searchQuery)  result = searchPosts(result, searchQuery)
  return sortByDate(result, sortDirection)
}, [posts, statusFilter, searchQuery, sortDirection])
```

The list shows no posts when a status filter is applied, even though matching posts exist.

Work through the diagnostic steps:

1. What would you log, and where?
2. How would you test `filterByStatus` in isolation?
3. What are three possible causes?
4. If the library is confirmed broken, how do you document the workaround?

Discuss your approach with your pair. Be ready to share.

---

## ⏱️ Part 4 — Lab: Two Features End to End (75 min)

Work on your PostKit app.

### Goal

By the end of class, implement two requirements fully — working in the UI, connected to real libraries, with no hardcoded data.

Good first targets:

**R1 + R2 + R3 — Post list with filter and sort**
This is the core of the app. Implement the list view with status filter and date sort working end to end. Use `useMemo` for the derived list.

**R5 — Post editor with validation**
Implement the controlled form, connect the tag utility library for parsing tags, and add inline validation before save.

**R7 — Post preview panel**
Add the sidebar showing slug, excerpt, reading time, and formatted date. Connect all four libraries.

### Working with AI on these features

When you reach for AI, write a prompt that includes:

1. The requirement you are solving (from PostKit.md)
2. The React pattern you need (useMemo, useEffect, controlled form)
3. The store structure you are using
4. The library APIs involved (paste from README)
5. A specific, scoped ask

After AI generates code:
- Read every line before using it
- Ask AI to explain any pattern you don't recognize
- Verify every library call against the README
- Test it against the requirement

### When you get stuck

Use the diagnostic steps from Part 3. Isolate before you escalate.

If you are stuck for more than 15 minutes on one problem:
1. Move to a different requirement
2. Ask a classmate
3. File a GitHub issue on the relevant library
4. Ask the instructor

Progress on two requirements is better than being blocked on one.

---

## ⏱️ Wrap-up (5 min)

Share with the class:

1. Which requirements did you implement?
2. What was the hardest integration problem you hit?
3. What AI prompt produced the most useful output?

---

## Reflection

1. Explain `useMemo` in your own words. When would removing it break something?
2. Why does the autosave `useEffect` need a cleanup function? What would happen without it?
3. Describe the diagnostic steps you would take if a library call silently returns the wrong value.
4. Which two requirements did you implement today? What libraries did each one use?
