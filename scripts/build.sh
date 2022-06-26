#!/bin/bash

cd api-gateway && npm run copy:protos && npm run build && npm run copy:graph && cd -
cd microservices/users-svc && npm run copy:protos && npm run build && cd -
cd microservices/savings-svc && npm run copy:protos && npm run build && cd -
cd microservices/task-schedulings-svc && npm run build && cd -
cd microservices/workers-svc && npm run build && cd -
docker-compose build
