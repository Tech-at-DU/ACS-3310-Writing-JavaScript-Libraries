# PostKit — Prompt Log

## What This Is

A prompt log is a running record of your significant AI interactions during PostKit development.

You are not submitting this as a separate assignment. It lives in your app repository as `PROMPTS.md` and exists for one practical reason: **Gradescope questions will ask you to paste real prompts and describe real outcomes**. Students who maintained a log answer those questions in minutes. Students who reconstruct from memory produce vague, unconvincing answers.

Keep it current. Two minutes per entry during development is worth hours at submission time.

---

## Two Entry Formats

Use the **short form** for most entries — anything you might want to reference later. Use the **long form** for entries you know you'll cite in a Gradescope question, or for any interaction that taught you something significant.

---

### Short Form

```
## [Date] — [What you were trying to do]

**Requirement:** R[number]

**Prompt summary:** [One or two sentences describing what you asked]

**Outcome:** [What AI produced, what worked, what you had to fix]
```

**Example:**

```
## 2026-04-22 — Filter pipeline

**Requirement:** R2

**Prompt summary:** Asked AI to write a useMemo for filtering posts by status
and tag using postkit-filter-sort. Included my Post type and the library API.

**Outcome:** Correct structure. AI added an unsolicited sort call I removed.
Verified filterByStatus against the README — function name was correct.
```

---

### Long Form

Use this when you want a full record — for Gradescope questions or for anything that revealed something important.

```
## [Date] — [What you were trying to do]

**Requirement:** R[number]

**The prompt:**
[Paste the full prompt]

**What AI produced:**
[Describe or paste the output]

**What I had to fix or verify:**
[Specific. What was wrong? What did you check? What did you test?]

**What I learned:**
[Optional — what did this reveal about the library, the pattern, or your own code?]
```

**Example:**

```
## 2026-04-22 — Autosave debounce

**Requirement:** R5

**The prompt:**
I am building a PostKit post editor with autosave. I want changes to save
500ms after the user stops typing. My save function is defined with useCallback.

Here is my current useEffect:
[pasted code]

Please explain:
1. What the cleanup function does — trace what happens if the user types
   three characters quickly
2. What would happen if I removed it
3. Why save is in the dependency array

**What AI produced:**
Clear explanation of debounce pattern. Explained that without cleanup, each
keystroke would schedule a save that fires regardless of subsequent keystrokes.
Explained that save must be in the dependency array because useEffect closes
over it — if save changes, the effect needs to re-run with the new version.

**What I had to fix or verify:**
Tested: typed rapidly, confirmed only one save fired 500ms after last keystroke.
Checked DevTools network tab — no duplicate saves.

**What I learned:**
The isFirstRender.current pattern prevents the autosave from firing immediately
on mount. Without it, opening an existing post triggers an immediate save.
```

---

## What Counts as a Log Entry

Log entries are for deliberate prompts where you described a problem and asked AI to produce code, an explanation, or a diagnosis.

**Log these:**
- Asking AI to implement a feature or component
- Asking AI to explain a pattern you encountered
- Asking AI to help diagnose a bug
- Asking AI to write a test

**Skip these:**
- Autocomplete suggestions you accepted without thinking
- Syntax corrections or typo fixes
- Generic questions ("what is React?")

---

## How the Log Supports Gradescope

Gradescope questions will ask things like:

- *"Paste one prompt from Week 4 and one from Week 7 for a similar task. What changed?"*
- *"Paste the prompt that produced your most useful test. What did you have to fix?"*
- *"What did AI get wrong, and how did you catch it?"*

These questions cannot be answered convincingly without real prompts. A log maintained throughout the project makes them easy. A log reconstructed at the end makes them hard.

The quality of your Gradescope answers reflects whether you kept the log. There is no separate log grade — but the log is what makes the reflection questions answerable.

---

## Keeping It Honest

The prompt log is not graded on whether you used AI a lot or a little. It is a record of how you worked.

A log with three detailed entries where you genuinely struggled and learned something is more valuable than twenty generic entries that all say "AI generated the code and it worked."

The most useful entries are the ones where something went wrong.
