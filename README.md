### Full-Stack JS engineer test assessment - the Quiz Builder

### 1. Start the Frontend (Next.js)

Install dependencies
cd frontend

```bash
npm install
```

Development server

```bash
npm run dev
```

By default it runs on http://localhost:3000
(you can change port with npm run dev -- -p 4000).

Example .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001

### 2. Start the Backend (NestJS + Prisma)

Install dependencies

```bash
cd backend
npm install
```

Install Prisma CLI (if not yet)

```bash
npm install -D prisma
npm install @prisma/client
```

- Configure .env (backend)
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DATABASE,
  POSTGRES_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public"
  PORT=3001

### 3. Set up PostgreSQL Database

Make sure PostgreSQL is installed and running.
On Linux/Mac:

brew install postgresql # (Mac, via brew)
sudo apt install postgresql postgresql-contrib # (Ubuntu/Debian)

Create a database:

psql -U postgres
CREATE DATABASE quizdb;

Ensure .env in backend points to this DB.

### 4. Run Prisma commands

Generate Prisma client and Push schema to DB:

```bash
npx prisma generate

npx prisma db push
```

(Optionally seed DB using prisma/seed.ts.)

### 5 Connect Frontend to Backend

In frontend/.env:
NEXT_PUBLIC_API_URL={backendUrl}

### 6 Create simple quiz

to create simple quiz head to "/create" on Frontend server
or by using Postman send POST request to {backendUrl}/quizzess
with raw body of

```js
{
 "title": "JS Basics Quiz",
 "description": "Test JS fundamentals",
 "questions": [
   {
     "text": "Is JS dynamically typed?",
     "type": "BOOLEAN",
     "answers": [
       { "text": "True", "isCorrect": true },
       { "text": "False", "isCorrect": false }
     ]
   }

 ]
}
```
