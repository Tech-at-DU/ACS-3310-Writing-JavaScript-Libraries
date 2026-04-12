# AI Use Policy
### ACS 3310 — PostKit Engineering Team

**Version 1.0 | Effective: Week 1**

---

## Purpose

This policy exists because AI tools are part of modern software development, and pretending otherwise would be doing you a disservice.

Most teams you join after this program will have an AI policy of some kind. Some will be permissive. Some will be restrictive for legal or IP reasons. All of them require you to exercise judgment.

This policy is designed to help you build that judgment — not prevent you from using tools that exist.

---

## Guiding Principle

> AI is a fast implementer. You are the engineer.

AI tools can generate code quickly. What they cannot do is understand your users, design an API for a specific system, reason about integration tradeoffs, or take responsibility for the result.

On this team, those are your jobs.

Using AI to avoid doing your job is a problem — not because it breaks a rule, but because it means you leave this course without the skills it was designed to give you.

---

## Policy by Work Type

### Design and Architecture — AI assistance not appropriate

This includes:
- Your API design README (Week 1)
- Decisions about function signatures, parameter names, and return types
- Your analysis of how a spec change affects your library (Week 7)

These deliverables *are* the thinking. There is no implementation underneath them that AI could help accelerate. If AI writes your API design, you have skipped the most important part of library development.

Peer review will surface shallow design work. Reviewers are expected to ask hard questions. "Looks good" is not an acceptable review.

---

### Implementation — AI assistance permitted with disclosure

This includes:
- Writing function bodies
- Writing unit tests
- Debugging logic

You may use AI assistance for implementation. However, your PR description must include a brief **AI use note** stating:

- what you used AI for
- one thing it got wrong or that you had to fix
- one decision you made that AI did not make for you

This is not a punishment. It is a practice. Engineers who can articulate what AI got wrong are more valuable than engineers who cannot.

If you used no AI assistance, write: *"No AI assistance used."*

There is no bonus for not using AI. There is no penalty for using it. The note is required either way.

---

### Tooling and Configuration — AI assistance freely permitted

This includes:
- `tsconfig.json` and build configuration
- `package.json` setup
- npm publish workflow
- CI configuration

Get these right and move on. Spending two hours wrestling with a rollup plugin is not a learning objective.

---

## What Counts as an AI Tool

For purposes of this policy: any tool that generates code or text from a prompt. This includes but is not limited to GitHub Copilot, Cursor, ChatGPT, Claude, and similar.

Searching documentation, reading Stack Overflow answers, and referencing examples from real libraries is not subject to this policy. Use those freely.

---

## Academic Integrity

This policy does not replace the school's academic integrity policy. It supplements it for the specific context of AI tools in a software engineering course.

Submitting AI-generated API design as your own design work, or submitting AI-generated test suites without the required disclosure, violates this policy.

The spirit of the rule: if you cannot explain a decision, defend a tradeoff, or describe a bug you fixed — it is not your work, regardless of what tool produced it.

---

## Why This Policy Is Written This Way

You will work alongside AI tools for most of your career. The question is not whether to use them — it is whether you can direct them, catch their mistakes, and produce outcomes they cannot produce alone.

The engineers who will be most effective in that environment are the ones who deeply understand what they are building and why. That understanding cannot be outsourced.

PostKit is designed to give you that understanding. The libraries, the integration, the spec changes — all of it is practice for the judgment calls that remain human work even when AI handles the implementation.

Use the tools. Do the thinking.

---

*Questions about this policy should be raised with the instructor.*
