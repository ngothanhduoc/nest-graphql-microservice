#!/bin/bash

cd api-gateway && npm install && cd -
cd microservices/comments-svc && npm install && cd -
cd microservices/mailer-svc && npm install && cd -
cd microservices/posts-svc && npm install && cd -
cd microservices/users-svc && npm install && cd -
