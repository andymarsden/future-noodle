# Chat Flow Overview

This document explains how the chat flow is implemented and where the key pieces live.

## High-level flow

- User sends a `Message` to `chat.message.send()`.
- If the message has no `activeFlow`, the message text is passed to the intent engine (`src/lib/chat/intent/engine.js`).
- The intent engine matches input against rules (`src/lib/chat/intent/rules.js`).
- A matching intent can either return a simple assistant text response or start a flow by returning `activeFlow: { id: "..." }`.
- If a flow is started the flow manager (`src/lib/chat/workings.js` -> `flow.start`) looks up the flow in the `flowRegistry` (`src/lib/chat/flows/engine.js`) and returns the first step question as an assistant `Message`.
- If a `Message` already has `activeFlow`, subsequent user replies are handled by `flow.process`, which records the answer on the current step and returns the next step question.

## Key modules and responsibilities

- `src/lib/chat/workings.js`
  - `chat.message.send({ message })` — central entry point. Detects intent, starts flows, or delegates to `flow.process` when `activeFlow` is present.
  - `flow.start(id, conversationId)` — sets `current_step` to the first step and returns the first question.
  - `flow.process(activeFlow, userInput, conversationId)` — saves the answer to the current step, advances to the next step (via `getNextStep`), and returns the next question as a `Message`.

- `src/lib/chat/intent/engine.js` — exposes `intent.detect(text)` which finds a matching rule and executes it.
- `src/lib/chat/intent/rules.js` — list of rule definitions. Example rules:
  - `qrios` rule returns `activeFlow: { id: "onboard" }` to kick off onboarding.
  - `rugby` rule returns `activeFlow: { id: "rugby" }` to start the rugby flow.

- `src/lib/chat/flows/engine.js` — registry mapping flow ids to flow definitions (e.g. `onboard`, `rugby`).
- `src/lib/chat/flows/*.js` — flow definitions. Each flow is an object with `id`, `steps[]` and each step has `id`, `question`, and optional `options`.

## Message shape

Messages use the `Message` class in `src/lib/classes/Message.js`. Important fields:

- `id` — unique message id
- `content` — message payload; assistant responses place the question text in `content.text`.
- `role` — `user` or `assistant`.
- `conversationId` — required; used to associate messages with conversations.
- `activeFlow` — if present, contains the active flow object (including `id`, `current_step`, `steps`, and recorded answers).

## Example triggers

- Typing `qrios start` (or `qrios`) will match the `start-qrios` rule and start the `onboard` flow.
- Typing `rugby` will start the `rugby` flow.

## Where to edit behaviour

- Adjust intent matching / new commands: `src/lib/chat/intent/rules.js`
- Add or change flows: `src/lib/chat/flows/*.js` and ensure they're included in `flows/engine.js`.
- Routing and step progression logic: `src/lib/chat/workings.js` (the `flow` object). This is the place to add branching, validation, persistence, and richer step logic.

## Next steps / suggestions

- Persist `activeFlow.answers` to a database or store between messages.
- Improve `getNextStep` logic to support branching based on answers or option selections.
- Add an AI fallback in `chat.message.send()` when no intent matches.

---
_File generated from repository analysis._
