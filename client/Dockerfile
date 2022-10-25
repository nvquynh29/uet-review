FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN npm i -g typescript && yarn && yarn build

FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html
