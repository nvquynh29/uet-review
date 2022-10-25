FROM node:18-alpine as builder

ENV PORT=5500

WORKDIR /app

COPY . .

RUN npm i -g typescript
RUN yarn
CMD ["sh", "-c", "yarn production"]
