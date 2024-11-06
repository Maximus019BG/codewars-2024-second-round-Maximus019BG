package com.codewars2;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Objects;

@SpringBootApplication
public class ServerApplication {

    public static void main(String[] args) {
        //ENV
        Dotenv dotenv = Dotenv.configure().load();
		
        System.setProperty("db-url", Objects.requireNonNull(dotenv.get("DB_URL")));
        System.setProperty("db-username", Objects.requireNonNull(dotenv.get("DB_USER")));
        System.setProperty("db-password", Objects.requireNonNull(dotenv.get("DB_PASS")));
        System.setProperty("secretJWT", Objects.requireNonNull(dotenv.get("SECRET_JWT")));

        SpringApplication.run(ServerApplication.class, args);
    }
}