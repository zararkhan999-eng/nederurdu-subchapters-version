---
name: idea
description: "Idea in, reviewed branch out: questions, spec, tickets, parallel TDD build, code review, PR draft. Usage: /idea <idea>  or  /idea autopilot <idea>"
disable-model-invocation: true
---

# Idea → shipped branch

Take one idea from the user and run it end to end through the mattpocock-skills pipeline. The user's job is two answers (the questions round and the plan approval) and the final go-ahead to push. Everything between is yours.

**Modes.** `guided` (default) stops at the two gates below. `autopilot` (argument starts with `autopilot`) skips both gates: take your own recommended answer to every question and record each one under an `## Assumptions` heading in the spec, so the user can audit them later.

**Plugin skills.** Model-invoked ones (`grilling`, `domain-modeling`, `research`, `prototype`, `codebase-design`, `tdd`, `diagnosing-bugs`, `code-review`, `pr`) are called with the Skill tool as `mattpocock-skills:<name>`. User-invoked ones (`to-spec`, `to-tickets`, `implement-spec`, `retro`) can't be fired by the Skill tool, so **read their SKILL.md and follow it as the procedure** for that step, with this skill's gates replacing theirs. Find them in the newest installed version:

```bash
ls -d ~/.claude/plugins/cache/claude-plugins-official/mattpocock-skills/*/skills/engineering | sort -V | tail -1
```

**Project facts** (base branch, tests, ports, Android sync, parallel sessions): read [project.md](project.md) before step 1. They override any generic instruction in the plugin skills.

## Steps

### 1. Frame

Restate the idea in one sentence. Read `docs/agents/*.md` (tracker, labels, domain docs) and `GLOSSARY.md` if present; if `docs/agents/issue-tracker.md` is missing, use the local-markdown tracker (`.scratch/<feature-slug>/`) and say so. Pick a kebab-case `<feature-slug>`. Explore the code the idea touches with an Explore subagent.

Done when: you can name the modules the idea touches and the seam you would test it at.

### 2. Gate 1: questions (guided only)

Call `mattpocock-skills:grilling`. Ask the whole frontier in one round, each with your recommended answer, worded so "yes" accepts everything. Cap at **two rounds**; anything still open after round two, decide yourself and record it as an assumption. Call `mattpocock-skills:domain-modeling` alongside when the idea introduces new course vocabulary, so `GLOSSARY.md` grows.

If a question hinges on how something should *look or feel*, call `mattpocock-skills:prototype` instead of asking in prose. If it hinges on an outside fact (Dutch grammar, Play policy, an API), call `mattpocock-skills:research`.

Done when: every design-tree branch is answered or recorded as an assumption.

### 3. Spec and tickets

Follow `to-spec` to write the spec to the tracker, then `to-tickets` to break it into tracer-bullet tickets with blocking edges. Write both before showing anything.

### 4. Gate 2: plan approval (guided only)

Show in **one message**: the spec's Solution and Out of Scope, the test seam(s), and the numbered ticket list (title, blocked by, what it delivers). Ask one question: approve, or what to change. Iterate until approved.

Done when: the user approves. In autopilot, done when the files are written.

### 5. Build

Follow `implement-spec`: an integration branch `idea/<feature-slug>` cut from the base branch in [project.md](project.md), implementer subagents (`isolation: "worktree"`) working the ticket frontier in parallel, each calling `mattpocock-skills:tdd`, merged back by a merger subagent. Pass each implementer the project.md path. A ticket that fails twice gets `mattpocock-skills:diagnosing-bugs` before a third try.

Done when: every ticket is merged, and the checks in project.md pass on the integration branch.

### 6. Review and fix

Call `mattpocock-skills:code-review` with the fixed point = the base branch, spec = the spec file. Fix every finding in a single implementer subagent, rerun the checks, and run code-review once more. Findings that are judgement calls you choose not to fix go in the final report with a one-line reason.

Done when: the second review has no hard findings and checks are green.

### 7. Hand back

Call `mattpocock-skills:pr` and write the PR body to `.scratch/<feature-slug>/pr.md`, with before/after screenshots from the browser preview for any visible change. **Stop here and ask** before pushing the branch or opening the PR: pushing is the user's call.

Then read `retro`'s SKILL.md and give at most three suggestions for making the next `/idea` run smoother. When a suggestion is about this project, offer to add it to [project.md](project.md).

Final report: branch name, tickets done, test counts, review findings left open, assumptions made, and the push/PR question.
