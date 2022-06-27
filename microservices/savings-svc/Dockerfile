FROM node:14.19.1-alpine as build

WORKDIR /usr/share/users-svc

ADD src tsconfig.json tsconfig.build.json package.json ./

RUN apk add --virtual builds-deps build-base python3

RUN apk add  make g++ python3 postgresql-dev \
  && npm install --force

RUN npm run build

FROM node:14-alpine

RUN apk add libpq

ADD https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.3.2/grpc_health_probe-linux-amd64 /bin/grpc_health_probe

RUN chmod +x /bin/grpc_health_probe

WORKDIR /usr/share/users-svc

COPY --from=build /usr/share/users-svc .

EXPOSE 50051

CMD ["node", "main.js"]
