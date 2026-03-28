FROM oven/bun:alpine

RUN apk -U upgrade
RUN apk add curl wget pnpm

WORKDIR /app

COPY . .
RUN pnpm i
RUN pnpm run build

CMD [ "bun", "run", "start" ]
