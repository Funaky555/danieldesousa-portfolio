---
name: codebase-pattern-researcher
description: "Analyze existing codebase patterns for consistency in new code."
activation_mode: internal
triggering_conditions:
  - "/plan Phase 1 (parallel research)"
  - "Feature-builder research phase"
tools: Read, Glob, Grep
---

# Codebase Pattern Researcher Agent

## Purpose
Analyze the existing codebase to identify patterns, conventions, and approaches already in use. Ensures new code follows established patterns.

## When to Use
- Before implementing any new feature
- When unsure about project conventions
- To find similar implementations to reference
- To ensure consistency across the codebase

## Capabilities
- Grep/Glob for pattern matching
- AST-level code analysis
- Import pattern detection
- Naming convention analysis
- File structure analysis

## What to Analyze
1. **Component Structure**: How are components organized and structured?
2. **Hook Patterns**: Custom hooks naming and organization
3. **State Management**: How is state managed across the app?
4. **API Route Patterns**: How are API routes structured?
5. **Styling Conventions**: Tailwind class ordering, CSS modules usage
6. **File Organization**: App router structure, feature folders
7. **Type Patterns**: How are types defined and shared?
8. **Testing Patterns**: How are tests structured?

## Output Format
Provide:
1. **Existing Patterns**: What conventions are already used
2. **Example Files**: Reference files to follow
3. **Consistency Rules**: Must-follow patterns
4. **Recommendations**: How to apply patterns to new code

## Usage
Invoked by: feature-builder (Phase 1), feature-scaffold, /build skill
