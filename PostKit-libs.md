# PostKit — Library Package Specs

Each student will implement **one library** for the PostKit ecosystem.

All libraries:
- are written in TypeScript
- export **3 to 7 functions or components**
- include unit tests
- include a README with examples
- are published to npm
- are designed to be used by other developers

Students will design the **function names, parameter names, and exact function signatures** themselves.

However, each package must satisfy the required behaviors described below.

---

# Shared Types

Libraries that operate on posts should use these shared types.

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

export type PostSummary = {
  id: string
  title: string
  slug: string
  excerpt: string
  readingTime: number
  tags: string[]
  status: PostStatus
}
```

You must use these types if they are specified in the library code you are responsible for. 

---

# Package 1 — Slug Library [Faith](https://github.com/FaithKauwe/postkit-slug-library)

## Purpose
Convert post titles into URL-safe slugs.

## Required Functions

Your package must include functions that can:

1. **Create a slug from a title**
  - **Input:** a title string
  - **Output:** a slug string
  - **Description:** convert a post title into a lowercase, URL-safe slug

2. **Check whether a slug is valid**
  - **Input:** a slug string
  - **Output:** a boolean
  - **Description:** return whether a slug matches your library’s slug rules

3. **Make a slug unique**
  - **Input:** a slug string and a list of existing slugs
  - **Output:** a unique slug string
  - **Description:** return a slug that does not conflict with existing slugs

---

# Package 2 — Excerpt Library [Killian](https://github.com/KJSDR/3310-Excerpt-Library)

## Purpose
Generate short summaries from post content.

## Required Functions

Your package must include functions that can:

1. **Create an excerpt from text**
  - **Input:** a text string and a maximum length
  - **Output:** a shortened string
  - **Description:** return a readable summary of the content

2. **Truncate text by word count**
  - **Input:** a text string and a maximum number of words
  - **Output:** a shortened string
  - **Description:** shorten text without counting characters only

3. **Normalize whitespace**
  - **Input:** a text string
  - **Output:** a cleaned string
  - **Description:** remove extra spaces, tabs, or line breaks

---

# Package 3 — Reading Time Library [Julia](https://github.com/dejmedus/postkit-reading-time)

## Purpose
Estimate how long a post takes to read.

## Required Functions

Your package must include functions that can:

1. **Count words in text**
  - **Input:** a text string
  - **Output:** a number
  - **Description:** return the number of words in the text

2. **Estimate reading time**
  - **Input:** a text string
  - **Output:** a number
  - **Description:** return the estimated reading time in minutes

3. **Format reading time for display**
  - **Input:** a number of minutes
  - **Output:** a display string
  - **Description:** convert reading time into a human-readable label

---

# Package 4 — Tag Utility Library [Ca'Sandra](https://github.com/CaSandraSmith/tag-utility-lib)

## Purpose
Parse, normalize, validate, and clean tag data.

## Required Functions

Your package must include functions that can:

1. **Parse tags from user input**
  - **Input:** a text string
  - **Output:** an array of tag strings
  - **Description:** split raw input into usable tags

2. **Normalize a tag**
  - **Input:** a tag string
  - **Output:** a cleaned tag string
  - **Description:** standardize case and whitespace

3. **Remove duplicate tags**
  - **Input:** an array of tag strings
  - **Output:** an array of unique tag strings
  - **Description:** keep tags unique while preserving usable order

4. **Validate a tag**
  - **Input:** a tag string
  - **Output:** a boolean
  - **Description:** return whether a tag follows your package rules

---

# Package 5 — Validation Library Sunil

## Purpose
Validate post data before saving or publishing.

## Required Functions

Your package must include functions that can:

1. **Validate a title**
  - **Input:** a title string
  - **Output:** a boolean or validation result
  - **Description:** check whether the title is acceptable

2. **Validate post body text**
  - **Input:** a body string
  - **Output:** a boolean or validation result
  - **Description:** check whether the content body is acceptable

3. **Validate post status**
  - **Input:** a status string
  - **Output:** a boolean or validation result
  - **Description:** check whether the status is one of the allowed values

4. **Validate a full post object**
  - **Input:** a `Post`
  - **Output:** a boolean or validation result
  - **Description:** check whether the post is valid as a whole

---

# Package 6 — Filter / Sort Library [Bernadette](https://github.com/beaquino18/postkit-filter-sort)

## Purpose
Filter and sort posts for display.

## Required Functions

Your package must include functions that can:

1. **Filter posts by status**
  - **Input:** an array of `Post` objects and a status
  - **Output:** an array of `Post` objects
  - **Description:** return only posts matching the selected status

2. **Filter posts by tag**
  - **Input:** an array of `Post` objects and a tag string
  - **Output:** an array of `Post` objects
  - **Description:** return only posts containing the selected tag

3. **Sort posts by date**
  - **Input:** an array of `Post` objects and an optional sort direction
  - **Output:** an array of `Post` objects
  - **Description:** return posts ordered by date

4. **Sort posts by title**
  - **Input:** an array of `Post` objects and an optional sort direction
  - **Output:** an array of `Post` objects
  - **Description:** return posts ordered alphabetically by title

---

# Package 7 — Search Library [Jimmy](https://github.com/Jimmy-Vu/ACS-3310-Search-Library)

## Purpose
Search post content.

## Required Functions

Your package must include functions that can:

1. **Build searchable text from a post**
  - **Input:** a `Post`
  - **Output:** a string
  - **Description:** combine searchable fields into one search string

2. **Check whether a post matches a query**
  - **Input:** a `Post` and a query string
  - **Output:** a boolean
  - **Description:** return whether the post matches the search query

3. **Search a list of posts**
  - **Input:** an array of `Post` objects and a query string
  - **Output:** an array of `Post` objects
  - **Description:** return only matching posts

---

# Package 8 — Date / Display Library [Ivan](https://github.com/lawrence-ivan-reyes/acs-3310-postkit)

## Purpose
Format dates and labels for the UI.

## Required Functions

Your package must include functions that can:

1. **Format a date for display**
  - **Input:** a date string
  - **Output:** a display string
  - **Description:** convert an ISO-like date into readable text

2. **Format a relative date**
  - **Input:** a date string
  - **Output:** a display string
  - **Description:** return labels like “today” or “2 days ago”

3. **Convert status to a label**
  - **Input:** a `PostStatus`
  - **Output:** a display string
  - **Description:** return a human-friendly label for a post status

4. **Convert status to a color/token name**
  - **Input:** a `PostStatus`
  - **Output:** a string
  - **Description:** return a display token that UI code can use for styling

---

# Package 9 — Storage Library David

## Purpose
Persist posts locally and support import/export.

## Required Functions

Your package must include functions that can:

1. **Save posts**
  - **Input:** a storage key string and an array of `Post` objects
  - **Output:** no return value or a success result
  - **Description:** save post data locally

2. **Load posts**
  - **Input:** a storage key string
  - **Output:** an array of `Post` objects
  - **Description:** retrieve previously saved posts

3. **Export posts**
  - **Input:** an array of `Post` objects
  - **Output:** a JSON string
  - **Description:** convert posts into exportable JSON text

4. **Import posts**
  - **Input:** a JSON string
  - **Output:** an array of `Post` objects
  - **Description:** parse JSON into usable post data

---

# Package 10 — UI Component Library Ashley 

## Purpose
Provide reusable UI components for the PostKit app.

## Required Components

Your package must include **3 to 5 reusable React components**.

Choose from this list:
- search input
- tag list
- status badge
- post card
- empty state view

## Input / Output Expectations

Each component should:
- accept typed props
- return rendered UI
- be reusable in different parts of the app
- avoid depending on hidden app state

## Description
These components should make the PostKit UI easier to build and reuse.

---

# Testing Requirements

Each package must include:
- at least **2 normal tests** per function
- at least **1 edge case** per function
- invalid input tests **when relevant**
- meaningful assertions

Tests must fail when behavior is incorrect.

---

# Key Idea

You are building a real package that other developers will use.

Your API must be:
- clear
- predictable
- well tested
- documented well enough that another student can integrate it into PostKit
