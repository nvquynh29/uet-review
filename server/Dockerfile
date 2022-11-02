FROM node:16-alpine as builder

ENV PORT=5500

RUN mkdir /app

COPY ./package.json /app
COPY ./yarn.lock /app
COPY . /app

WORKDIR /app

RUN yarn global add typescript
RUN yarn
CMD ["sh", "-c", "yarn dev"]
EXPOSE 5500
