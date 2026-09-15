# @aihu/ai

> **Aihu** — agentic discovery and interaction, for human purpose.

Thin adapters from AI SDK stream types to ReadableStream<string> for aihu $stream collections.

Standalone package for normalizing provider streams before they enter an
aihu `$stream` collection. The package has no runtime dependency on another
`@aihu/*` package and does not bundle any provider SDK.

<!-- BEGIN_HANDWRITTEN: prose -->
Each adapter takes a provider's native stream and returns a plain
`ReadableStream<string>` of text deltas, ready to feed an aihu `$stream`
collection:

```ts
import { fromAnthropic, fromGemini, fromOpenAI, fromResponse } from '@aihu/ai'

// Anthropic SDK message stream
const anthropicText = fromAnthropic(await anthropic.messages.stream({ ... }))

// OpenAI SDK chat-completion stream
const openaiText = fromOpenAI(await openai.chat.completions.create({ stream: true, ... }))

// Google Generative AI stream
const geminiText = fromGemini(await model.generateContentStream({ ... }))

// Any fetch() Response with a body (no provider SDK required)
const responseText = fromResponse(await fetch('/api/stream'))
```

`fromAnthropic`, `fromGemini`, and `fromOpenAI` import their SDK's types with
`import type` only, so the corresponding peer dependency need not be
installed unless that adapter is actually used. `fromResponse` has no SDK
dependency at all.
<!-- END_HANDWRITTEN: prose -->

## Install

<!-- BEGIN_AUTOGEN: install -->
<!-- regenerate: bun scripts/sync-readme.ts (also runs in pre-commit + CI) -->

```bash
npm install @aihu/ai
# or
bun add @aihu/ai
```

<sub><i>Auto-generated against `@aihu/ai@0.1.1`.</i></sub>

<!-- END_AUTOGEN: install -->

## Package facts

<!-- BEGIN_AUTOGEN: stats -->
<!-- regenerate: bun scripts/sync-readme.ts (also runs in pre-commit + CI) -->

| | |
|---|---|
| **Version** | `0.1.1` |
| **Tier** | C — Agent surface — AI SDK stream adapters for `$stream` collections |
| **Published files** | 3 entries |
| **License** | MIT |

<sub><i>Auto-generated against `@aihu/ai@0.1.1`.</i></sub>

<!-- END_AUTOGEN: stats -->

## Exports

<!-- BEGIN_AUTOGEN: exports -->
<!-- regenerate: bun scripts/sync-readme.ts (also runs in pre-commit + CI) -->

| Subpath | ESM | CJS |
|---|---|---|
| `.` | `./dist/index.js` | `—` |

<sub><i>Auto-generated against `@aihu/ai@0.1.1`.</i></sub>

<!-- END_AUTOGEN: exports -->

## Dependencies

<!-- BEGIN_AUTOGEN: deps -->
<!-- regenerate: bun scripts/sync-readme.ts (also runs in pre-commit + CI) -->

**Peer dependencies:**

- `openai` — `>=4.0.0`
- `@anthropic-ai/sdk` — `>=0.20.0`
- `@google/generative-ai` — `>=0.3.0`

<sub><i>Auto-generated against `@aihu/ai@0.1.1`.</i></sub>

<!-- END_AUTOGEN: deps -->

## See also

<!-- BEGIN_AUTOGEN: see-also -->
<!-- regenerate: bun scripts/sync-readme.ts (also runs in pre-commit + CI) -->

- [@aihu/agent](https://github.com/aihu-project/aihu-agent)
- [@aihu/mcp](https://github.com/aihu-project/aihu-mcp)
- [Aihu framework](https://github.com/aihu-project/aihu)

<sub><i>Auto-generated against `@aihu/ai@0.1.1`.</i></sub>

<!-- END_AUTOGEN: see-also -->

## License

<!-- BEGIN_AUTOGEN: license -->
<!-- regenerate: bun scripts/sync-readme.ts (also runs in pre-commit + CI) -->

MIT — see [LICENSE](LICENSE).

<sub><i>Auto-generated against `@aihu/ai@0.1.1`.</i></sub>

<!-- END_AUTOGEN: license -->
