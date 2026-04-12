# PostKit — Spec Change Assignment

## Overview

Real software changes after it ships.

Requirements evolve, product needs shift, and systems that seemed complete turn out to need new capabilities. As a developer, your job is not just to build — it is to **adapt**.

This assignment simulates that reality.

The PostKit spec has changed. Your task is to update your library and your app to meet the new requirements.

---

## What Changed

### 1. The `Post` type has two new fields

```ts
export type PostStatus = 'draft' | 'review' | 'published' | 'archived'

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
  publishedAt: string | null   // NEW — null if not yet published
  wordCount: number            // NEW — precomputed at save time
}
```

`publishedAt` is set when a post is first moved to `published` status. It is `null` for drafts and posts in review.

`wordCount` is computed from the post body when the post is saved or updated.

### 2. A new status: `'archived'`

Posts can now be archived. Archived posts are no longer active but are kept for historical reference.

`archived` posts should:
- not appear in the default post list view
- be retrievable via an explicit filter
- not be editable

### 3. The Post List View shows `publishedAt` instead of `createdAt` for published posts

Display logic:
- if `status === 'published'` and `publishedAt` is not null → show formatted `publishedAt`
- otherwise → show formatted `updatedAt`

---

## What You Must Do

### Part 1 — Update Your Library

Determine which parts of the spec change affect your library.

For each affected function or behavior:

1. Update the implementation
2. Update your tests
3. Update your README
4. Publish a new version to npm using the correct semver bump

**Semver requirement:** You must choose the correct version bump and explain why in your PR description.

---

### Part 2 — Update the PostKit App

Update your PostKit app to reflect all spec changes:

1. Handle `publishedAt` in the post editor (set it when status changes to `published`)
2. Handle `wordCount` (compute and store it when saving a post)
3. Support the `archived` status in filters
4. Update the post list view to display `publishedAt` for published posts
5. Prevent editing of archived posts

---

### Part 3 — Integration Notes

At least one library you depend on may need to update before your app can fully work.

If a classmate's library has not been updated yet:

- document the gap in your app code with a comment
- implement a temporary workaround if possible
- open an issue on their repository describing what you need

This is normal in real development. You do not wait — you document and work around.

---

## Deliverables

### Library Repository

- updated implementation
- updated and passing tests
- updated README with accurate examples
- new version published to npm
- PR with semver rationale in the description

### PostKit App Repository

- all spec changes implemented
- libraries updated to new versions (where available)
- any workarounds documented in code comments

---

## Grading Rubric

| Criteria | Points |
|---|---:|
| Correct library update with passing tests | 25 |
| Correct semver bump with explanation | 10 |
| Updated README matches new behavior | 15 |
| App reflects all spec changes | 30 |
| Workarounds documented where needed | 10 |
| Integration issues reported to classmates | 10 |

---

## Which Libraries Are Affected

Use this as a starting point. Your own analysis may reveal additional impacts.

| Library | Likely impact |
|---|---|
| Validation | must validate new `publishedAt` field; must recognize `'archived'` as a valid status |
| Filter / Sort | must support filtering by `'archived'` status; default list should exclude archived |
| Reading Time | `wordCount` should now be used where available instead of recomputing |
| Date / Display | must handle `publishedAt` display logic; must return a label for `'archived'` status |
| Storage | must save and load posts with new fields correctly |
| Search | should not return archived posts in default search results |
| Slug | not directly affected — but verify edge cases still pass |
| Excerpt | not directly affected |
| UI Components | status badge must handle `'archived'`; post card may need to show `publishedAt` |

---

## Key Idea

This assignment tests something different from building something new.

It tests whether your library was designed well enough to **absorb change**.

A clear API, good tests, and accurate documentation make this easier. A library built without those things makes every change harder than it needs to be.

> The cost of a poor design is paid every time the system changes.
