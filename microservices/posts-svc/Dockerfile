FROM node:14.19.1-alpine as build

WORKDIR /usr/share/posts-svc

ADD dist package.json ./

RUN apk add --virtual builds-deps build-base python3

RUN apk add make g++ python3 postgresql-dev \
  && npm install --production

FROM node:14-alpine

RUN apk add libpq

ADD https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.3.2/grpc_health_probe-linux-amd64 /bin/grpc_health_probe

RUN chmod +x /bin/grpc_health_probe

WORKDIR /usr/share/posts-svc

COPY --from=build /usr/share/posts-svc .

EXPOSE 50051

CMD ["node", "main.js"]
