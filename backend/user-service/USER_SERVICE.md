# User Service

The user-service uses Bun.js with ElysiaJS. All user data, authentication/authorization, and other stuff such as Tier Info, Store, Addons, Agents, Skills, Tools etc. are handled by user-service.

User service uses PostgreSQL with Prisma ORM for quering database and maintaining relationships between entities, ensuring integrity and consistency.

## Features (Tasks)

user-service handles all of the following mentioned tasks

- **JWT authencation:** Signup, login, account verification
- **User Existence:** Verify user existence by email, userId, username
- **User CRUDs:** Read, Update or Delete user-information. Request store user information
- **Store CRUDs:** Create, Read, Update or Delete store data by userId/storeId
- **Tier & Addons:** Handle Tier-limits and user/store addons
- **Teams:** Manage roles, teams, and team members for each store
- **AI Stuff:** Get all AI related stuff such as, Agents, Skills and Tools.

## Project Structure

```
user-service/
├── actions/                                   # all actions and computation logic
│   └── ...
├── lib/
│   ├── generated/
│   │   └── ...                                # generated prisma client
│   │
│   ├── auth-config.ts                         # JWT authentication configuration
│   ├── keys.ts                                # secret (private & pubic keys)
│   ├── mailer.ts                              # nodemailer configuration
│   ├── types.ts                               # TypeScript types
│   ├── cache.ts                               # Redis Cache configuration
│   └── prisma.ts                              # prisma client initialization
│
├── prisma/
│   ├── migrations/
│   │   └── ...                                # prisma migrations
│   ├──schema.prisma                           # Database Schema
│
├── routes/
│   ├── auth.ts                                # authentication routes
│   ├── user.ts                                # user related routes
│   └── ai.ts                                  # routes for agents, skills, tools.
│
├── prisma.config.ts                           # prisma configuration
├── tsconfig.ts                                # typescript configuration
├── index.ts                                   # Starting point of server
├── .env                                       # all your super secrets (push them along with your code ; )
│
└── USER_SERVICE.md                            # you're right here
```

## Data Strategies

See [Database Schema](./prisma/schema.prisma) for getting hold on the BRILLIANT database design.

| Database   | Description                                              |
| ---------- | -------------------------------------------------------- |
| PostgreSQL | For relational data, user, store, agents, tier info etc. |
| Redis      | For caching the retrieved data                           |

Every piece of information retrieved from the database is stored in redis-cache. user-service uses `Cache Aside` techinque for caching recently queried data. The [`withCache()`](./lib/cache.ts) and [`bustCache()`](./lib/cache.ts) functions handles redis-cache.

### Cache Tags, TTL & Usage Location

For debugging purposes, all the cache tags being used along with their time-to-live (TTL) valuse and Usage Location are listed here

| Tag              | TTL    | Location                                |
| ---------------- | ------ | --------------------------------------- |
| users:{userId}   | 24 hrs | [Get User Functions](./actions/auth.ts) |
| agents:{agentId} | 12 hrs | [Agent Functions](./actions/ai.ts)      |

## Get Serving Users

Select the correct folder in cli

```bash
cd backend/user-service
```

Install all dependecies required for user-service

```bash
bun add
```

#### Prisma Initialization

Before starting, run a prisma migration and generate prisma client

```bash
bun x prisma migrate dev --name init
bun x prisma generate
```

#### Prisma Studio

To start prisma studio run the following command

```bash
bun x prisma studio
```

or an alternative

```bash
bun run studio
```

#### Start Server

Execute the following command to start user-service server through terminal or use the `docker compose up` command for whole app.

```bash
bun run dev
```

This will start user-service server at port `3000`

## Configuration

| Name        | URL                       | Description                                                                    |
| ----------- | ------------------------- | ------------------------------------------------------------------------------ |
| SERVER HOST | http://localhost:3000/    | When executed through `bun run dev` command, the server listens on port `3000` |
| DOCKER HOST | http://user-service:3000/ | When executed through Dockerfile, server starts at private docker network      |
