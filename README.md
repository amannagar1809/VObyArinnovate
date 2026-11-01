# Arinnovate Workspaces

Single-application Next.js site for workspace discovery and service inquiries. The App Router serves the public website and backend Route Handlers from one project.

## Run locally

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin before deployment. Add the database and SMTP settings below to `.env.local`; never commit real credentials.

## Inquiry delivery

The form submits to `/api/inquiries`. The endpoint validates and saves each inquiry in the `inquiries` collection of the `vobyarinnovate` MongoDB database, then emails the configured admin address using SMTP. The record is saved before email delivery, so a notification failure does not discard the inquiry and is reported to the submitter.

Configure these server-side environment variables in `.env.local` and in your deployment environment:

- `MONGODB_URL` - MongoDB connection string. Use a rotated credential, and allow your app's network access in MongoDB Atlas.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` - SMTP server connection and credentials.
- `SMTP_SECURE` - set to `SSL`/`TLS` for implicit TLS, or `STARTTLS` for a connection upgraded with STARTTLS. If omitted, port `465` defaults to implicit TLS.
- `SMTP_FROM` - verified sender address/name accepted by your SMTP provider.
- `ADMIN_EMAIL` - destination for new inquiry notifications.

The form will report an error if MongoDB or SMTP is not configured or available; notification errors are logged server-side. Keep these values private and do not use a `NEXT_PUBLIC_` prefix for secrets.

Before launch, confirm the service descriptions, plan details, supported cities, prices, privacy notice, and email destination match the business. The current plan tiers are quote-based examples.

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

There is no customer account portal, admin dashboard, or payment integration yet. Inquiries are stored in MongoDB and emailed to the configured admin address.