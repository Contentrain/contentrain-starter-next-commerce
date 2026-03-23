> Source of truth: this starter is exported from the `contentrain-starters` monorepo.
> Internal starter id: `next-commerce`.
# Contentrain Next Commerce

Commerce starter for campaigns, collections, and product detail storytelling.

## Contentrain Ecosystem

- SDK and CLI: [ai.contentrain.io/packages/sdk.html](https://ai.contentrain.io/packages/sdk.html)
- Product guides: [docs.contentrain.io](https://docs.contentrain.io/)
- Content operations UI: [studio.contentrain.io](https://studio.contentrain.io)

## Quick Start

```bash
pnpm install
pnpm dev
```

From the monorepo root you can also run `pnpm dev:next-commerce`.

## Commands

- `pnpm dev`
- `pnpm check`
- `pnpm build`
- `pnpm start`
- `pnpm contentrain:generate`

## Contentrain

- Campaigns, collections, products, testimonials, FAQ, navigation, footer, and SEO live in `.contentrain/`
- App Router server components query content through the generated `#contentrain` client
- Product detail and collection pages are statically generated from Contentrain data
- Product imagery, gallery items, highlights, and official Contentrain backlinks are seeded through content files
- The repo follows a content-first Contentrain architecture so merchandising content evolves through schema-backed git changes instead of scattered constants

## Deploy

- Vercel: `pnpm deploy:vercel`
- Primary deployment target: Vercel
