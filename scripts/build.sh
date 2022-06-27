#!/bin/bash

cd api-gateway && npm run copy:protos && npm run copy:graph && cd -
cd microservices/users-svc && npm run copy:protos &&  cd -
cd microservices/savings-svc && npm run copy:protos &&  cd -
cd microservices/task-schedulings-svc && cd -
cd microservices/workers-svc  && cd -
docker-compose build
