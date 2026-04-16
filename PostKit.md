# PostKit — Application Requirements

---

## What Are Requirements?

In professional software development, a **requirements document** describes what a system must do from the perspective of the people who will use it. It defines the problem, not the solution.

Requirements are different from a technical spec:

| Requirements | Technical Spec |
|---|---|
| Describes what users need | Describes how to build it |
| Written before implementation | Written during or after design |
| Guides decisions | Prescribes decisions |
| Stable across implementations | Changes with technology choices |

A product manager, designer, or client typically writes requirements. Engineers read them and make implementation decisions. Those decisions — which libraries to use, how to structure components, how to handle edge cases — are the engineer's job.

In a professional project, you might receive requirements in different forms:

- A written document like this one
- A set of user stories in a project management tool (Linear, Jira, GitHub Issues)
- Acceptance criteria attached to design mockups
- A conversation with a stakeholder

Regardless of form, your job is the same: understand what the user needs, then make good decisions about how to build it.

**In this project**, you are the engineer. These requirements describe what PostKit users need. Your implementation decisions — including which class libraries to use and how to compose them — are yours to make.

---

## Overview

PostKit is a lightweight content publishing tool for writers who manage multiple posts in different states of completion.

Users write posts, organize them, and move them through a workflow from draft to published. They need to find posts quickly, understand their status at a glance, and trust that their work is saved.

---

## Users

PostKit has one type of user: **a writer** who creates, edits, and manages their own posts.

---

## Data

PostKit manages **posts**. Each post has:

- a unique identifier
- a title
- a body (the written content)
- an author
- one or more tags
- a category
- a status indicating where it is in the workflow
- timestamps recording when it was created and last updated

Posts move through a defined workflow: **draft → review → published**.

---

## Requirements

Each requirement below describes something the user must be able to do, or something the system must do on the user's behalf.

---

### R1 — Browse Posts

Users need to see all of their posts in one place.

For each post in the list, the user must be able to see:
- the title
- the current status
- the tags
- how long the post will take to read
- when it was created or last updated

The list must remain useful as the number of posts grows. Users must be able to narrow and reorder it without losing their place.

---

### R2 — Filter Posts

Users need to find posts by status or topic.

The system must allow users to:
- show only posts with a specific status
- show only posts containing a specific tag

Filters should be combinable where reasonable.

---

### R3 — Sort Posts

Users need to control the order posts appear in.

The system must allow users to sort posts by:
- date (newest first or oldest first)
- title (A–Z or Z–A)

---

### R4 — Search Posts

Users need to find a specific post quickly when they remember something about its content.

The system must allow users to search across post titles, body content, and tags. Results should reflect the current search as the user types or after they submit.

---

### R5 — Create and Edit Posts

Users need to write new posts and update existing ones.

The system must allow users to:
- create a new post
- edit the title, body, tags, category, and status of any existing post
- receive feedback when required fields are missing or invalid

The system should prevent saving a post that does not meet minimum validity requirements.

---

### R6 — Understand Post URLs

Users publishing content need each post to have a stable, readable URL identifier.

The system must generate a URL-safe identifier (slug) from the post title. Slugs must be unique — no two posts can share the same slug.

---

### R7 — Preview Post Metadata

Before publishing, users want to see how their post will appear to readers.

The system must show users a preview of:
- the generated slug
- a short excerpt from the body
- the estimated reading time
- the formatted publish or update date
- the current status in a readable form

---

### R8 — Save and Restore Work

Users expect their posts to still be there when they return.

The system must save posts locally so that data is not lost between sessions. Posts must be restored automatically when the user returns to the app.

---

### R9 — Export and Import Posts (Recommended)

Users may want to back up their posts or move them between devices.

The system should allow users to:
- export all posts as a downloadable file
- import posts from a previously exported file

---

### R10 — Consistent Visual Language

The interface should feel coherent. Similar things should look similar. Status indicators, tag displays, and post cards should be visually consistent across the app.

---

## Technical Constraints

These constraints are fixed. They are not implementation decisions — they are project requirements.

**You must use React and TypeScript.**

**You must use the libraries built by your classmates.** These libraries exist to handle specific responsibilities within PostKit. Reimplementing functionality that a library already provides is not permitted.

The libraries cover: slug generation, excerpt creation, reading time estimation, tag handling, post validation, filtering and sorting, search, date and status display, local storage, and UI components.

If a library has a bug or gap, document it and work around it. If a library you need was not completed, raise it with the class — the group will decide how to handle it.

**Do not modify another student's library.** Open an issue. Submit a PR only for small, obvious fixes with the author's agreement.

---

## Acceptance Criteria

Your implementation is complete when a user can:

- [ ] See a list of their posts with title, status, tags, reading time, and date
- [ ] Filter the list by status or tag
- [ ] Sort the list by date or title
- [ ] Search posts and get accurate results
- [ ] Create a new post and see it appear in the list
- [ ] Edit an existing post and see the changes saved
- [ ] See validation feedback when required fields are missing
- [ ] See a slug, excerpt, reading time, and formatted date in the post preview
- [ ] Close and reopen the browser and find their posts still there

---

## A Note on Implementation Decisions

Requirements describe the *what*. You decide the *how*.

When you sit down to implement a feature, you should be able to answer:
- What does the user need this to do?
- Which library handles this responsibility?
- What does the library's API expect, and what does it return?
- How does this connect to the rest of the app?

If you are using an AI tool, use it to help answer the *how* — after you have understood the *what*. Describe the requirement you are solving, provide the library documentation, and ask AI to help you implement that specific piece. Then verify it meets the requirement before moving on.

An AI that generates an entire application from a single prompt will produce something that looks like it works and is difficult to understand, modify, or fix. An AI that helps you implement one requirement at a time, guided by your understanding, produces code you can own.

You will be asked to explain and extend your implementation later in the term. Build something you understand.
