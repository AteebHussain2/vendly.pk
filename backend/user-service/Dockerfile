FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY prisma ./prisma/

RUN bun x prisma generate

COPY . .

EXPOSE 3000

CMD [ "bun", "run", "dev" ]