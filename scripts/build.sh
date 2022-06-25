#!/bin/bash

cd api-gateway && npm run copy:protos && npm run build && npm run copy:graph && cd -
# cd microservices/comments-svc && npm run copy:protos && npm run build && cd -
# cd microservices/posts-svc && npm run copy:protos && npm run build && cd -
cd microservices/users-svc && npm run copy:protos && npm run build && cd -
cd microservices/wallets-svc && npm run copy:protos && npm run build && cd -
# cd microservices/mailer-svc && npm run copy:protos && npm run build && cd -
docker-compose build
