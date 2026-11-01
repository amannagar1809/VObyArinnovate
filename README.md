# Arinnovate Workspaces

Single-application Next.js site for workspace discovery and service inquiries. The App Router serves the public website and backend Route Handlers from one project.

## Run locally

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin before deployment.

## Inquiry delivery

The form submits to `/api/inquiries`. Set `INQUIRY_WEBHOOK_URL` to an HTTPS endpoint connected to your team's inquiry workflow. The endpoint receives a JSON `workspace_inquiry` event with the submitted contact and workspace details. Requests are not stored by this app; without a webhook, the form reports that online requests are unavailable instead of claiming a submission succeeded.

Before launch, confirm the service descriptions, plan details, supported cities, prices, privacy notice, and webhook destination match the business. The current plan tiers are quote-based examples.

## Project layout

- `src/app/` - server-rendered pages, layouts, metadata, and API routes
- `src/app/api/` - backend HTTP endpoints (`/api/health`, `/api/inquiries`)
- `src/app/InquiryForm.tsx` - client-side inquiry form and request states
- `src/lib/` - shared application configuration and utilities
- `public/` - static assets
- `.env.example` - local environment variable template

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - serve the production build
- `npm run lint` - run ESLint

There is no customer account portal, admin dashboard, database, or payment integration yet. Add those after the launch inquiry workflow and business requirements are validated.