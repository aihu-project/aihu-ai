# aihu-ai

`@aihu/ai` is a standalone, server-side adapter package. It normalizes
OpenAI, Anthropic, Gemini, and generic `Response` streams to
`ReadableStream<string>` for aihu `$stream` consumers.

Use Bun 1.3.14 and Node 22 for local checks. The provider SDKs are optional
peer dependencies and must remain type-only imports; the package must not
gain a runtime dependency on any provider or `@aihu/*` package.

Run `bun run check:ci` before opening a PR. Release tags must exactly match
the package version, and publication is performed only by the tag workflow
after `NPM_TOKEN` authentication succeeds.
