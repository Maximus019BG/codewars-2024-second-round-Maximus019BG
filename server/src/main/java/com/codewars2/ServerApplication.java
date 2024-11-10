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
		
        System.setProperty("DB_URL", Objects.requireNonNull(dotenv.get("DB_URL")));
        System.setProperty("DB_USER", Objects.requireNonNull(dotenv.get("DB_USER")));
        System.setProperty("DB_PASS", Objects.requireNonNull(dotenv.get("DB_PASS")));
        System.setProperty("SECRET_JWT", Objects.requireNonNull(dotenv.get("SECRET_JWT")));

        SpringApplication.run(ServerApplication.class, args);
    }
}