FROM node:16-alpine as builder

RUN mkdir /app

COPY ./package.json /app
COPY ./yarn.lock /app
COPY . /app

WORKDIR /app

RUN yarn global add typescript && yarn && yarn build

FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html
