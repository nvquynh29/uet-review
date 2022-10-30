FROM node:18-alpine as builder

RUN mkdir /app

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn global add typescript && yarn

COPY . .

CMD ["yarn", "start"]
EXPOSE 3000
