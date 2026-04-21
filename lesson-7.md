# Lesson 7 — Building PostKit: Architecture and AI

## Overview

PostKit is more than a list of components. It is an application with shared data, multiple views, navigation, and persistence. Before writing any feature code, you need to understand hom the requirements define the architectural decisions that make the app possible.

Today's lesson covers three foundational concepts — state management, routing, and styling — and how to use AI effectively as a learning and building tool while you develop PostKit. Its about asking and answering the right questions before any code is written.

**Reference documents:**
- [PostKit Requirements](./PostKit.md)
- [AI Use Policy](./ai-policy.md)

---

## Learning Goals

By the end of this lesson you should be able to:

- Explain why local component state is insufficient for a multi-view app
- Describe what state management libraries solve and name your options
- Explain what client-side routing does and why PostKit needs it
- Write an effective AI prompt that produces useful, verifiable output
- Use AI to understand a pattern, not just generate code
- Scaffold your PostKit app with architecture decisions made deliberately

---

## ⏱️ Part 1 — The Architecture Problem (20 min)

### Lecture



Before asking AI for code, think about what PostKit actually needs by understanding the requirements.

Open [PostKit.md](./PostKit.md) and look at the requirements. Now ask: what does the application need to manage?

- A list of posts that can be created, edited, and deleted
- Filters and sort controls that affect what appears in the list
- A search query that narrows results
- Posts that survive a browser refresh
- Distinct views for the list, the editor, and settings

Now ask: what breaks if you put all of this into a single React component?

Everything. One component managing all posts, all UI state, all views, all persistence becomes unreadable. You cannot test pieces of it, you cannot reuse anything, and every change risks breaking everything else.

The solution is to separate concerns deliberately:

| Concern | What handles it |
|---|---|
| Post data and operations | A store (state management) |
| Which view is shown | A router |
| UI interaction state | Local component state |
| Persistence | The storage library + store middleware (this might not be obvious unless you are familiar with options available, it will need research.) |
| Display logic | Components |

These are not arbitrary conventions. Each one is a boundary — a place where responsibilities change hands. Understanding where the boundaries are before you start building saves significant time.

---

## ⏱️ Part 2 — State Management (20 min)

### Lecture

**The problem local state cannot solve:**

```tsx
// PostListView needs to read posts
const [posts, setPosts] = useState([])

// PostDetailView also needs to read and update posts
// But it's a different component in a different view
// How does it access the same posts?
```

You could lift state up to a common parent — `App.tsx` — and pass posts down as props. This works for small apps. For PostKit, you'd be passing posts, setters, filters, and search state through every level of the component tree. This is called **prop drilling**, and it makes components brittle and hard to reuse.

**State management** solves this by moving shared data outside the component tree entirely. Components subscribe to the store and read exactly what they need. Any component can update the store. All subscribers re-render automatically.

```
[Store: posts, filters, search]
        ↑ subscribe / dispatch
   ┌────┴────────┐
PostListView  PostDetailView
```

**Your options:**

**React Context** — built into React, no install required. You wrap your app in a provider and consume values anywhere in the tree. Works well for data that _does not change often_. Can cause performance issues if overused for frequently-changing data.

```tsx
const PostContext = createContext<PostStore | null>(null)

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      <Routes />
    </PostContext.Provider>
  )
}
```

**Zustand** — a lightweight library (`npm install zustand`). You define a store as a function, and any component can use it with a simple hook. Supports persistence middleware out of the box, which connects directly to PostKit's storage requirement.

```tsx
const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: [],
      addPost: (fields) => { /* ... */ },
      updatePost: (id, changes) => { /* ... */ },
    }),
    { name: 'postkit-posts' }
  )
)

// In any component:
const posts = usePostStore(s => s.posts)
```

**Redux Toolkit** — the standard for large-scale applications with complex state interactions, multiple developers, and strict patterns. More setup than PostKit needs, but worth knowing it exists.

**What to use for PostKit:** React Context or Zustand are both reasonable. Zustand's persistence middleware makes the storage requirement easy to satisfy in one place. Context keeps your dependencies minimal.

The choice is yours — but make it deliberately, and understand why.

Knowing your options is only half the problem. Knowing which question to ask is the other half. A conversation with AI or a teammate can surface the right tool quickly — but only if you know what to ask for. Read the requirements: PostKit needs data shared across multiple views, and posts must survive a browser refresh. Those two facts tell you what to look for — a global state solution with persistence support. The tool that fits is a research question. The requirement that defines the need is not.

---

## ⏱️ Part 3 — Routing (15 min)

### Lecture

**The problem conditional rendering cannot solve:**

Without routing, you'd show different views by toggling state:

```tsx
const [view, setView] = useState<'list' | 'editor'>('list')

return view === 'list' ? <PostList /> : <PostEditor />
```

This breaks immediately when you need:
- The browser back button to navigate between views
- A URL the user can bookmark or share
- Linking directly to a specific post (`/posts/my-post-slug`)
- The URL to reflect what is on screen

**Client-side routing** intercepts navigation events and renders the correct component for the current URL — without a full page reload. The URL changes, the browser history updates, the back button works. From the user's perspective it behaves like a normal website. From the developer's perspective it is all still one React app.

Are these features described in the requirements? If so where? Your job is identifying features like this first, then idenrifying the solution. 

**Your options:**

**React Router** — the most widely used routing library for React. Declarative route definitions, URL parameters, nested routes, and programmatic navigation.

```tsx
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostListView />} />
      <Route path="/posts/:id" element={<PostDetailView />} />
      <Route path="/posts/new" element={<PostDetailView />} />
    </Routes>
  )
}
```

URL parameters (`:id`) let you read the post identifier from the URL in the component:

```tsx
const { id } = useParams<{ id: string }>()
const post = posts.find(p => p.id === id)
```

**TanStack Router** — a newer alternative with stronger TypeScript support and type-safe route parameters. More setup, but increasingly popular in TypeScript-first projects.

**What to use for PostKit:** React Router is the practical choice. It is the most documented, the most searched, and the one AI tools have the most training data on.

Install:
```bash
npm install react-router-dom
```

Wrap your app:
```tsx
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

---

## ⏱️ Part 4 — Styling (10 min)

### Lecture

Styling is a decision you should make once, early, and not revisit constantly. The options differ in how they scope styles and how they handle dynamic values.

**CSS Modules** — plain CSS, scoped to a single component file. No extra dependencies. Works everywhere. Good choice if you want full control.

```tsx
import styles from './PostCard.module.css'
<div className={styles.card}>
```

**Tailwind CSS** — utility classes applied directly in JSX. No switching between files. Components look verbose but are self-contained. Excellent for rapid development.

```tsx
<div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm">
```

Install: `npm install -D tailwindcss` and follow the Vite setup guide.

**styled-components / Emotion** — CSS written in JavaScript, colocated with components. Supports dynamic styles based on props. More setup, larger bundle.

**What matters most:** pick one approach and use it consistently. Mixing strategies creates confusion.

---

### Styling Prompts: Tool vs. Character

Your choice of styling tool — Tailwind, CSS Modules, styled-components — tells AI *how* to write styles. It does not tell AI what the app should feel like. Those are two different things, and both belong in your prompt.

Look at R10:

> The interface should feel coherent. Similar things should look similar. Status indicators, tag displays, and post cards should be visually consistent across the app.

This requirement tells AI almost nothing about aesthetic direction. Coherence is a property of any design. A chaotic app can be coherently chaotic.

What AI needs from you is the *character* of the app — **what it feels like** to use it, **who it is for**, **what it should prioritize**. PostKit is a writing tool. Writers need focus. *That tells you something about what the interface should and should not do.*

**Compare these two prompts:**

```
Use Tailwind. Implement R10 — consistent visual language.
```

```
Use Tailwind. PostKit is a writing tool for people who need to focus.
The interface should be quiet and uncluttered — high whitespace, muted
colors, minimal decoration. Nothing should compete with the content.
Status badges and tags should be subtle, not colorful. Post cards should
feel like a clean list, not a dashboard.
```

Both prompts choose Tailwind. The second produces a completely different result — because it gives AI a user and a purpose, not just a tool and a requirement.

**The lesson:** your styling choice sets the implementation. Your description of the user experience sets the direction. AI will optimize toward whatever character you describe. If you describe nothing, it will default to a generic SaaS aesthetic — prominent buttons, card shadows, accent colors — which may have nothing to do with what PostKit should feel like.

Before you write your styling prompt, answer these questions:
- Who is using PostKit and what are they trying to do?
- What should the app feel like when it is working well?
- What should it *not* look like?

Put those answers in your prompt. R10 is the requirement. Your answers are the brief.

---

## ⏱️ Part 5 — Prompt Writing Best Practices (20 min)

### Lecture

There are two distinct ways to work with AI on a project like PostKit. Knowing which to use and when is the difference between AI as a thinking partner and AI as a code dispenser.

---

### Strategy 1 — The Initialization Conversation

Before writing a single line of code, have a conversation with AI that builds shared context. This is not about generating code. It is about making sure AI understands the project well enough to help you make good decisions.

The sequence that works:

**Step 1 — Describe the app**
Give AI a short overview of what PostKit is and who it is for. This sets the character of the project before any technical decisions are made.

**Step 2 — Walk through the requirements one by one**
Share each requirement from [PostKit.md](./PostKit.md) individually. After each one, let AI respond and ask questions. Answer them. This forces both you and AI to think about each requirement in isolation before the whole picture is assembled.

You will be surprised what comes up. AI may ask about things you had not considered — how persistence should work, what happens when a user has no posts, whether search should be case-sensitive. These are real design questions. Answering them now is better than discovering them mid-implementation.

**Step 3 — Share technical constraints**
After the requirements, provide the constraints: React + TypeScript, Zustand or Context, the PostKit libraries and their APIs.

**Step 4 — Share the acceptance criteria**
Let AI see what "done" looks like from the user's perspective.

**Step 5 — Ask if AI is ready**
This is the most important step. Ask:

> "Do you think we are ready to start building this app? Is there any information you might need from me first?"

This inverts the usual dynamic. Instead of you guessing what context AI needs, you let AI tell you. An AI that asks "how do you want to handle posts with duplicate titles?" or "what styling approach do you have in mind?" is surfacing decisions you need to make before coding begins.

Answer every question. Then start building.

**Why this produces better results than jumping straight to implementation:**

AI has now reasoned through the entire project before writing any code. When you ask it to implement a specific feature later, it already knows the data model, the constraints, the libraries, and what "done" looks like. It is far less likely to invent things or make inconsistent choices.

---

### Strategy 2 — The Implementation Prompt

Once context is established, use structured implementation prompts for each feature. This is what you reach for mid-project when you know exactly what you are building.

**The anatomy of an effective implementation prompt:**

```
1. CONTEXT      — What are you building? What exists already?
2. CONSTRAINT   — What technologies, libraries, or patterns must you use?
3. REQUIREMENT  — What specific user need are you solving? (from PostKit.md)
4. LIBRARY DOCS — The actual API documentation for any library involved
5. ASK          — One specific, scoped output request
6. OUTPUT FORM  — What do you want back? (component, function, explanation)
```

**A prompt that will produce useful output:**

```
I am building a React + TypeScript app called PostKit.

I have a Zustand store called usePostStore that holds an array of Post objects.
The Post type is:
  { id: string, title: string, body: string, tags: string[], 
    status: 'draft' | 'review' | 'published', createdAt: string, updatedAt: string }

I am using a library called postkit-filter-sort. Its API is:
  filterByStatus(posts: Post[], status: PostStatus): Post[]
  filterByTag(posts: Post[], tag: string): Post[]
  sortByDate(posts: Post[], direction: 'asc' | 'desc'): Post[]

Requirement (R2): users must be able to filter the post list by status and sort by date.

Please write a React component called PostListView that:
- reads posts from usePostStore
- renders a status filter (buttons for draft, review, published, and all)
- renders a date sort toggle (newest / oldest)
- applies the filters using the postkit-filter-sort library
- renders a list of post titles

Keep the component focused. Do not add styling or features beyond what is described.
```

**Why this works:**
- AI knows the exact type it is working with
- AI knows the exact library API — it cannot invent it
- The requirement is scoped to one thing
- "Keep it focused" prevents AI from adding features you didn't ask for

**A prompt that will waste your time:**

```
Build me the PostKit app using these libraries: [list of package names]
```

AI will generate a plausible-looking app that invents all the library APIs, uses the wrong types, and is difficult to understand or modify. It will also make all the architecture decisions for you — which means you will not understand them and will not be able to explain or change them.

---

### When to Use Each Strategy

| Situation | Strategy |
|---|---|
| Starting a new project | Initialization conversation |
| Implementing a specific feature | Implementation prompt |
| Making an architecture decision | Initialization conversation |
| Integrating a library you know | Implementation prompt |
| Unsure what questions to ask | Ask AI what it needs to know |

---

**Using AI to learn, not just generate:**

When AI produces code you do not fully understand, do not skip past it. Ask follow-up questions:

- "Explain what `useMemo` is doing in that component and why it is needed."
- "Why did you use `useCallback` here instead of a regular function?"
- "What would happen if I removed the dependency array from that `useEffect`?"

This is the most effective use of AI as a learning tool. The code is the context for the explanation. You get an answer that is specific to what you are actually building, not a generic tutorial.

**After every AI response, ask yourself:**
1. Do I understand every line?
2. Have I verified every library call against the README?
3. Does this satisfy the requirement I stated?
4. What would I change or fix?

If you cannot answer these, you are not ready to use the code.

---

## ⏱️ Part 6 — Active Learning: Architecture Planning (15 min)

Work in pairs.

Before opening an AI tool or writing any code, plan your PostKit app architecture.

Answer these questions in writing:

1. **State:** What data needs to be shared across components? Will you use Context or Zustand? Why?
2. **Routing:** What views does your app need? What URLs will they have? What URL parameters do you need?
3. **Stores:** If using Zustand, how many stores will you have? What goes in each?
4. **Persistence:** How will the storage library connect to your state management?
5. **Build order:** Which requirement will you implement first? Why?

Write this down before asking AI anything. This is your brief. Your AI prompts will be better because of it.

---

## ⏱️ Part 7 — Lab: Scaffold PostKit (45 min)

Work on your PostKit app.

### Goals for today

- [ ] Architecture decisions made and written down
- [ ] Routing installed and basic routes working
- [ ] State management chosen and initial store created
- [ ] At least one hardcoded post rendering in the list view
- [ ] The `Post` type imported from `types.ts`

### Suggested approach

**Step 1 — Install dependencies**
```bash
npm install react-router-dom zustand
```

**Step 2 — Wrap App in BrowserRouter**
In `main.tsx`, wrap `<App />` in `<BrowserRouter>`.

**Step 3 — Define routes in App.tsx**
Add routes for `/` (list view) and `/posts/:id` (editor/detail view).

**Step 4 — Create the post store**
Write the Zustand store with at minimum: `posts`, `addPost`, `updatePost`.

**Step 5 — Render posts in the list view**
Read posts from the store and render a simple list of titles. No styling required yet.

### When to use AI

Write your prompt following the structure from Part 5. Include:
- Your Post type
- Your store structure (if asking for component code)
- The specific requirement you are implementing
- The library API if a library is involved

Ask AI to explain anything you do not understand before moving on.

---

## ⏱️ Wrap-up (10 min)

Share with the class:

1. What state management approach did you choose and why?
2. What does your route structure look like?
3. What was the most useful AI prompt you wrote today?

---

## Reflection

1. Why is shared state management necessary for an app like PostKit? What breaks without it?
2. What does client-side routing give you that conditional rendering cannot?
3. Describe the prompt you wrote for your first AI interaction today. What made it effective or ineffective?
4. What did you ask AI to explain to you (not generate)? What did you learn?
