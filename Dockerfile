FROM ubuntu:latest

RUN apt-get update && apt-get install -y maven openjdk-21-jdk

WORKDIR /app

COPY ./server /app

ENTRYPOINT ["mvn", "spring-boot:run"]