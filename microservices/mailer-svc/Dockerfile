FROM node:14.19.1 as build

WORKDIR /usr/share/mailer-svc

ADD dist package.json ./

RUN npm install --production

FROM node:14-alpine

ADD https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.3.2/grpc_health_probe-linux-amd64 /bin/grpc_health_probe

RUN chmod +x /bin/grpc_health_probe

WORKDIR /usr/share/mailer-svc

COPY --from=build /usr/share/mailer-svc .

EXPOSE 50051

CMD ["node", "main.js"]
