FROM node:latest as builder

ARG APP_HOME=/node-app
ARG CGO_ENABLED=0
ARG GOOS=linux
ARG GOARCH=amd64

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR $APP_HOME
COPY . $APP_HOME

RUN chmod +x wait-for-db.sh