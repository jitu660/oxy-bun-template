# 🚀 Quick Start

> **⚠️ Important:** Run the upgrade command immediately after cloning to ensure you are using the latest dependencies.

## 1. Setup

```bash
bun install
bun run upgrade
```

## 2. Quality Control

- Format: `bun run fmt` (Uses oxfmt)
- Lint: `bun run lint` (Uses oxlint), fix safe ones with `bun run lint:fix`
- Analyze: `bun run unused` (Uses knip)

# Development

## Imports

- Absolute imports are supported from the `src` directory. Use `@/` as the prefix for absolute imports. For example:

```ts
import { MyComponent } from '@/components/MyComponent'
```
