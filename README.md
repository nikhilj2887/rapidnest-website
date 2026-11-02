# RapidNest website

Next.js 16 App Router, React 19, TypeScript and Tailwind CSS 4. Existing EmailJS and Google Analytics integrations are retained.

```sh
npm run dev
npm run lint
npm test
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
# In a second terminal, while the production server is running:
npm run test:http
```

Service content lives in `app/data/services.ts`. Client and partner records in `app/data/relationships.ts` require verified relationships and publication approval before rendering. Case studies in `app/data/case-studies.ts` render only with `publicationApproval: "approved"`; no studies are currently approved.

The contact form preserves the existing EmailJS `name`, `email`, and `message` template contract. Optional details are appended to `message`. Public keys are public configuration; provider origin restrictions and abuse controls must be reviewed in the EmailJS dashboard. Tests mock submission and do not send live inquiries.

See [the implementation and verification report](docs/enterprise-redesign-review.md) for audit findings, routes, pending facts, test limitations, and preview instructions. Do not deploy to production or push to a production-connected branch without approval.
