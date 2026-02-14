FROM node:24-alpine

RUN apk -U upgrade
RUN apk add curl wget pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm i

COPY . .
RUN pnpm run build

CMD [ "pnpm", "run", "start" ]
