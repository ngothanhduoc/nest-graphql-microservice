FROM node:14.19.3-alpine as build

WORKDIR /usr/share/api-gateway

ADD src tsconfig.json tsconfig.build.json package.json _proto ./

RUN apk add --virtual builds-deps build-base python3

RUN npm install --force
RUN npm run copy:protos && npm run copy:graph
RUN npm run build



FROM node:14-alpine

WORKDIR /usr/share/api-gateway

COPY --from=build /usr/share/api-gateway .

EXPOSE 3000

CMD ["npm", "run", "start"]
