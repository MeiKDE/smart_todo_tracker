This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Run Prisma migrations:

# Create a new migration

npx prisma migrate dev --name init

# Generate Prisma Client

npx prisma generate

# If you want to see your database in the browser

npx prisma studio

## update your Prisma client.

run npx prisma generate

## note to self

# verify the database and user exist

psql -U mei -p 5433 -d todo

# Create user if it doesn't exist

CREATE USER mei WITH PASSWORD 'mei';

# Create database if it doesn't exist

CREATE DATABASE todo;

# Grant privileges

GRANT ALL PRIVILEGES ON DATABASE todo TO mei;

# Use Prisma CLI to test the connection:

# Test the database connection

npx prisma db pull

# Check current state of the database

npx prisma studio
