package com.codewars2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
		
		// Environment Variables
		System.setProperty("db-url",System.getenv("DB_URL"));
		System.setProperty("db-username",System.getenv("DB_USERNAME"));
		System.setProperty("db-password",System.getenv("DB_PASSWORD"));
	}

}
