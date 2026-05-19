# Frontend

## Responsibilities

The frontend dashboard displays:

- AI readiness scores;
- detected metadata issues;
- AI perception summaries; and
- loading and error states for the audit API.

## Stack

- Next.js
- React
- Tailwind CSS
- Axios

## Running Locally

```bash
npm install
npm run dev
```

The dashboard calls `http://localhost:5000/api/audit` by default. Override the backend host with `NEXT_PUBLIC_API_BASE_URL`.
