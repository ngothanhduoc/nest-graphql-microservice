#!/bin/bash

cd api-gateway && npm run lint:fix && cd -
cd microservices/savings-svc && npm run lint:fix && cd -
cd microservices/task-scheduling-svc && npm run lint:fix && cd -
cd microservices/users-svc && npm run lint:fix && cd -
