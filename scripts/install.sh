#!/bin/bash

cd api-gateway && npm install && cd -
cd microservices/savings-svc && npm install && cd -
cd microservices/task-scheduling-svc && npm install && cd -
cd microservices/users-svc && npm install && cd -
cd microservices/workers-svc && npm install && cd -
