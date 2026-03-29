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

## Commands

- `pnpm dev`
- `pnpm check`
- `pnpm build`
- `pnpm start`
- `pnpm deploy:netlify`
- `pnpm contentrain:generate`

## Demo routes

- `/`
- `/collections/featured-collection`
- `/products/atlas-travel-jacket`
- `/architecture`

## Contentrain

- Campaigns, collections, products, testimonials, FAQ, navigation, footer, and SEO live in `.contentrain/`
- App Router server components query content through the generated `#contentrain` client
- Product detail and collection pages are statically generated from Contentrain data
- Product imagery, gallery items, highlights, and official Contentrain backlinks are seeded through content files
- The repo follows a content-first Contentrain architecture so merchandising content evolves through schema-backed git changes instead of scattered constants

## Deploy

- Netlify build command: `pnpm deploy:netlify`
- Netlify publish directory: framework-managed
- Keep the publish directory empty in the Netlify UI and let the Next.js runtime be detected automatically
