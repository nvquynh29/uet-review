FROM node:16-alpine as builder

ARG REACT_APP_API_URL
ARG REACT_APP_SOCKET_URL

RUN mkdir /app

COPY ./package.json /app
COPY ./yarn.lock /app

WORKDIR /app

RUN yarn global add typescript && yarn
COPY . .

RUN yarn build

FROM nginx:1.19.0
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
