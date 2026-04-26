# Decisions

> Permanent decision log for durable product, UX, technical, and workflow decisions.

<!-- Rules:
- Most recent first.
- Do not rewrite old decisions; add a new entry when the decision changes.
- Keep entries short and link to feature files when details matter.
-->

## Entry Format

```text
### YYYY-MM-DD — Decision title

- **Type**: Product | UX | Technical | Workflow
- **Status**: active | superseded
- **Context**:
- **Decision**:
- **Why**:
- **Consequences**:
- **Related**:
```

## Type Guide

- **Product**: What the product is or is not.
- **UX**: User-visible behavior, flow, copy, or interaction model.
- **Technical**: Architecture, data, APIs, dependencies, or implementation direction.
- **Workflow**: How contributors and automation agents collaborate.

## Log

<!-- Add durable project decisions here, most recent first. -->

### 2026-04-26 — Require documentation sweep after meaningful changes

- **Type**: Workflow
- **Status**: active
- **Context**: Project docs are shared memory, but feature ideas, release state, risks, and workflow changes can be missed if contributors rely on manual recall.
- **Decision**: After any meaningful feature, bugfix, product decision, roadmap item, release state, workflow rule, or known risk changes, contributors and automation agents must inspect the relevant docs and update every affected file.
- **Why**: The repository should preserve current state and durable decisions without depending on one person to remember every affected document.
- **Consequences**: Reports should name docs updated, docs inspected with no changes, and key docs intentionally left unchanged when relevant.
- **Related**: `AGENTS.md`, `docs/HANDOFFS.md`
