FROM node:16-alpine as builder

RUN mkdir /app

COPY ./package.json /app
COPY ./yarn.lock /app

WORKDIR /app

RUN yarn global add typescript && yarn
COPY . .

CMD ["yarn", "start"]
EXPOSE 3000
