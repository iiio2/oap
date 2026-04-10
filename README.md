# Online Assessment Platform

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | SignInPage | Candidate sign-in |
| `/dashboard` | DashboardPage | Candidate dashboard |
| `/exam-test/1` | ExamTestPage | Exam session — step 1 |
| `/exam-test/2` | ExamTestPage | Exam session — step 2 |
| `/exam-test/3` | ExamTestPage | Exam session — step 3 |
| `/complete` | CompletePage | Exam completed confirmation |
| `/timeout` | TimeoutPage | Exam timed out |

## MCP Integration

**Have you worked with any MCP (Model Context Protocol)?**

Yes, I used the **Figma MCP** (`claude.ai Figma`) directly inside Claude Code. It allowed me to pull design context, screenshots, and component metadata straight from a Figma file without leaving the terminal. The workflow was: share a Figma URL → `get_design_context` returns the node's structure, a screenshot, and code hints → adapt the output to the project's stack (React + Tailwind). This eliminated the back-and-forth of manually inspecting frames and copying values.

## AI Tools for Development

**Which AI tools or processes have you used or recommend to speed up frontend development?**

I prefer Claud Code. 

## Offline Mode

If a candidate loses internet during an exam, the strategy is:

1. **Persist state to `localStorage` continuously** — on every answer change and every timer tick, write the current exam state (answers, `timeLeft`, `currentQuestion`) to `localStorage` keyed by exam ID and candidate session. Zustand's `persist` middleware makes this a one-liner.

2. **Detect connectivity with `navigator.onLine` + `online`/`offline` events** — show a non-blocking banner ("You are offline — your progress is saved locally") so the candidate is aware but not panicked.

3. **Queue answer submissions** — instead of firing API calls immediately, push submissions into an in-memory/localStorage queue. A background sync loop (or the `Background Sync` Service Worker API) drains the queue once connectivity is restored.

## Live demo link

https://oap-xi.vercel.app

## Local Setup 

```bash
pnpm i 
pnpm dev
```