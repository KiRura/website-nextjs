FROM oven/bun
RUN apt update
RUN apt upgrade -y

COPY package.json bun.lock* ./
RUN bun i

COPY . .
RUN bun run build

CMD [ "bun", "run", "start" ]