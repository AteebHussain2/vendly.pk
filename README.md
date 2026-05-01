# Vendly - AI powered e-commerce platform

Vendly is an immersive, first ever AI powered e-commerce platform. Vendly focuses on utilizing AI with its edge breaking capabilities to simplify e-commerce. Vendly acts as a gaurd between your store and AI so everything remains intact. (Of course, there is room for NEEEEERDS tooo, a special one indeed.)

# Pre-requisities

### Docker

- You need have docker desktop installed in your device with WSL ubuntu/linux integration. Visit [docker installation guide](https://docs.docker.com/desktop/setup/install/windows-install/) for setup.
- No container running or existing that conflicts with the name of service containers. Check names [here](./backend/docker-compose.yml)
- NodeJS configured and running. Download it [here](https://nodejs.org/en/download/current)
- PNPM installed and configured. If not, install from [here](https://pnpm.io/installation)
- Bun.js kicking your bun. Here's how: [Kick-start bun](https://bun.com/docs/installation)

# About

We have AI automation everywhere, autonomous agents coding applications and doing homework to job-work. Costing `$$` more than ever. Most of the available e-commerce platforms are still old, cluttered and chaotic. Too many plugins and integration that will over-whelm any non-tech guy. They too cost `$$`.

Vendly saves the efforts, solves 90% of the store setup in just 10% of the time. Vendly provides an interface for AI Chat, talk with it, spout random words and let the AI understand it.

You can setup your store with-in minutes. Vendly provides numerous templates for your project, and custom builts for your needs. A dedicated CRM, Inventory Management System, Teams and Real-time Chat with detailed Analytics for NERDS.

# Features

Yet to decide. jk.. I'm not writing them

# Tech Stack

Vendly is built modern-stack for cutting edge security and scalability. The primary stack consists of

| Name         | Description                                                |
| ------------ | ---------------------------------------------------------- |
| Next.js      | Frontend: built with React.js for server actions and cache |
| TypeScript   | For type-safing and schema strict data and predictability  |
| Tailwind CSS | CSS styling within HTML                                    |
| Shad/cn UI   | For pre-built UI components                                |
| Bun.js       | JavaScript run-time for backend services, uses TypeScript  |
| ElysiaJS     | For backend servers                                        |
| Redis        | For Server-side cache                                      |
| JWT          | Authentication and verification across multiple services   |
| Prisma       | ORM for accessing PostgreSQL databases                     |
| Docker       | Docker containerization for each backend service.          |

# Infrastructure

Vendly is a multi-tenant platform; focusing on [privacy](https://vendly-pk.vercel.app/privacy), data integrity and providing seemless interaction with store and AI. Henceforth, it is based on `micro-services` architecture. It comprises of separate individual and dependent services and databases. More details on infra are described below:

- **Frontend:** Utilizes Next.js with TypeScript + React.js. View [FRONTEND.md](./frontend/FRONTEND.md) for greater insights.
- **API Gateway:** Uses ElysiaJS with middleware for authorization and re-routing requests to individual services. All requests hit the exposed gateway url. They are authorized by JWT and re-routed to addressed services. View [API_GATEWAY.md](./backend/api-gateway/API_GATEWAY.md) for more insights.
- **Backend:** Backend uses Bun.js with TypeScript. View [BACKEND.md](./backend/BACKEND.md) for greater insights.

# Get Started

Get started with this project. Contributions following [contribution rules](./CONTRIBUTION.md) are allowed under [MIT License](./LICENSE.md).

Before starting, star the repository.

### Clone Repo

Execute the following statement in terminal where you want the repository to be cloned.

```bash
git clone https://github.com/AteebHussain2/vendly.pk.git
```

### Setup Environment Variables & Keys

Copy `.env.example` in frontend to `.env`. Replace place-holder values with actual keys. You can get more details [here](./ENVIRONMENT_VARIABLES.md)

```bash
cd frontend && copy ./.env.example .env
```

In a new terminal, Copy `.env.example` in each of the backend service to `.env`. Replace place-holder values with actual keys. You can get more details [here](./ENVIRONMENT_VARIABLES.md)

Execute following instructions line by line:

```bash
cd backend
cd api-gateway && copy ./.env.example .env
cd ../user-service && copy ./.env.example .env
```

Now, create a public and private keys to sign and verify JWT as described in the following table.

| Key         | Destination  |
| ----------- | ------------ |
| private.pem | user-service |
| public.pem  | api-gateway  |

Execute the following commands in terminal.

```bash
I DON'T KNOW THE COMMANDS FIGURE IT OUT
```

### Install Dependencies

Run the following commands in terminal for starting the application.

#### Frontend Server

```bash
cd frontend && pnpm run dev
```

#### Backend Server

```bash
cd backend && docker compose up --build -d
```

# License

This project is created under MIT license and allows fair usage.
