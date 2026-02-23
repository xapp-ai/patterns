# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@xapp/patterns` is a TypeScript library providing common design patterns and data structures. The library exports abstract base classes for Builder, Graph, Tree, and Translator patterns.

## Development Commands

```bash
# Build the project (compiles TypeScript to lib/)
npm run build

# Clean build artifacts
npm run clean

# Run linter
npm run lint

# Run all tests
npm run test

# Run a single test file
npx mocha src/path/to/file.test.ts
```

## Architecture

### Source Structure

All source code lives in `src/`, organized by pattern:
- `src/Builder/` - Builder pattern implementation
- `src/Graph/` - Graph data structure with DFS/BFS traversal
- `src/Tree/` - Tree data structure with node-based hierarchy
- `src/Translator.ts` - Generic translator pattern for transforming objects
- Tests are co-located in `__test__/` subdirectories within each pattern folder

### Key Patterns

**Builder Pattern** (`src/Builder/AbstractBuilder.ts`)
- Extend `AbstractBuilder<T>` to create fluent builder APIs
- Implement the abstract `build()` method to construct the target object
- Use method chaining (return `this`) for fluent API design

**Graph** (`src/Graph/AbstractGraph.ts`)
- Directed graph with vertices and edges
- Supports DFS and BFS traversal methods
- Methods: `addVertex()`, `removeVertex()`, `addEdge()`, `removeEdge()`, `traverseDFS()`, `traverseBFS()`

**Tree** (`src/Tree/AbstractTree.ts`)
- Generic tree structure with `Node<D>` type
- Root-based with children arrays
- Supports DFS (pre-order/post-order) and BFS traversal
- Uses `find()` for node lookup via BFS

**Translator** (`src/Translator.ts`)
- Abstract class for transforming objects from type F to type T
- Supports optional props parameter of type P for translation context
- Implement `translate(from: F, props?: P): T`

### TypeScript Configuration

- Uses `@xapp/config` as the base tsconfig
- Source: `src/`, Output: `lib/`
- Test files excluded from build (anything in `__test__/`)
- Mocha runs tests with ts-node ESM loader

### Release Process

- Automated via semantic-release
- Follows conventional commits specification
- Releases to npm on main branch
- Updates CHANGELOG.md automatically

## Important Notes

### Module System
- This project uses **CommonJS** (not ESM)
- Testing libraries must support CommonJS (Chai 4.x, not 6.x which is ESM-only)
- Tests use ts-node/register for TypeScript execution

### ESLint Configuration
- Uses **flat config format** (eslint.config.mjs) - ESLint 9+
- Config includes special handling for test files to disable `no-unused-expressions` for Chai assertions
- ESLint 10+ requires Node 20.19+, so we use ESLint 9 for broader Node support

### Dependency Constraints
- `@xapp/config` has outdated peer dependency on TypeScript 3 (requires --legacy-peer-deps)
- Semantic-release packages require specific Node versions (12.x compatible with Node 20)
- When updating testing libraries, check module system compatibility
