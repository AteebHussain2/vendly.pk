FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

COPY prisma ./prisma/

RUN bun install

RUN bun x prisma generate

COPY . .

EXPOSE 3000

CMD [ "bun", "run", "dev" ]