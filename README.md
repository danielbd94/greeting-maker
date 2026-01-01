# Greeting Maker — Styled Greeting Card Generator

A Next.js + Node project that generates long, personalized greeting messages (in Hebrew), and displays them on a styled card ready for printing or copying.

## Features
- Form UI for entering event, recipient info and tone
- Server-side API route that generates greeting text using OpenAI
- Optional image fetch from Unsplash for a decorative card background
- Styled printable greeting card with a "Print" button and "Copy text" action

## Requirements
- Node.js 18+ recommended
- An OpenAI API key (required for text generation)
- An Unsplash Access Key (optional, used to fetch background images)

## Quick start
1. Clone or download the repository
2. Copy the environment example into a local env file:

```bash
cp .env.example .env.local
```

3. Install and run locally:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Environment variables
Create a local environment file `.env.local` (this file must NOT be committed). Example variables are in `.env.example`.

- `OPENAI_API_KEY` — your OpenAI API key (server-side only)
- `UNSPLASH_ACCESS_KEY` — optional Unsplash access key for images

Important: Never expose secret keys to the client. Do NOT prefix secret keys with `NEXT_PUBLIC_`.

## Protecting your API keys (do not upload)
- This repository now includes a `.gitignore` that excludes `.env*`, `.env.local`, `.next`, and `node_modules`.
- Before pushing, confirm you have no secrets staged:

```bash
git status --porcelain
```

If you see any `.env` files listed, remove them from git and re-add to `.gitignore`:

```bash
git rm --cached .env.local
git commit -m "remove local env from repo"
```

For deployments (Vercel, Netlify, GitHub Actions), store keys in the provider's secret store (Environment Variables / Secrets) rather than in the repository.

## Project structure (high level)
- `app/` — Next.js app and components
- `app/api/` — server routes used for generation and image search
- `lib/` — helper code: `generateGreeting.ts`, `searchImage.ts`, `events.ts`

## Config files to check
- Edit generation prompts or defaults in [app/lib/generateGreeting.ts](app/lib/generateGreeting.ts)
- Default event keywords live in [app/lib/events.ts](app/lib/events.ts)

## Print & usage
- Use the "Print" button on the card to save as PDF or print
- Use the "Copy" button to copy the generated greeting text

## Deploying
When deploying to Vercel or similar, add `OPENAI_API_KEY` and `UNSPLASH_ACCESS_KEY` to the project's Environment Variables via the provider UI (do not commit them).

## Troubleshooting
- If generation fails, check server logs and verify `OPENAI_API_KEY` is set and valid.

---
If you'd like, I can also:
- Run a quick git-ignore audit and remove any accidentally committed keys
- Update server code to assert that only server-side env keys are used
