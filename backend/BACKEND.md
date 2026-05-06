# Backend for vendly

Write a short description of backend someday, probably.

## Pre-requisities

You need have docker installed and initialized. You probably need following databases as well:

| name       | Service-in-Use |
| ---------- | -------------- |
| PostgreSQL | user-service   |
| Cassandra  | ai-service     |

You can host these databases locally if you've got RAM, or in the cloud if you have got money.

Just run the damn `docker compose up --build` command after polishing the [docker template](./docker-compose-template.yml) file.

```bash
cd backend && copy docker-compose-template.yml docker-compose.yml
```

## Available Services

| name         | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| api-gateway  | [API Gateway](./api-gateway/API_GATEWAY.md) for greater insights    |
| user-service | [User Service](./user-service/USER_SERVICE.md) for greater insights |
| ai-service   | [AI Service](./ai-service/AI_SERVICE.md) for greater insights       |

## Project Structure

## Get Started
