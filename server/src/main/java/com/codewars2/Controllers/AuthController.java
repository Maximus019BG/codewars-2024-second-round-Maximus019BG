package com.codewars2.Controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import com.codewars2.Services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
        
        //Dependency Injection
        private final AuthService authService;
        
        //Constructor
        @Autowired
        public AuthController(AuthService authService) {
            this.authService = authService;
        }
        
        //Register
        @PostMapping("/register")
        public ResponseEntity<?> register(@RequestBody Map<Object, String> user) {
            //Extract the email and password
            String email = user.get("email");
            String password = user.get("password");
            
            Map<String,String> tokens = authService.register(email, password); // Register the user
            
            return ResponseEntity.ok().body(tokens); // Return 200
        }
        
        //Login
        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody Map<Object, String> user) {
            //Extract the email and password
            String email = user.get("email");
            String password = user.get("password");
            
            Map<String,String> tokens = authService.login(email, password); // Login the user
            if(tokens == null) {
                return ResponseEntity.status(401).body("Unauthorized: Wrong email and password combination"); // Return 401
            }
            
            return ResponseEntity.ok().body(tokens); // Return 200
        }
        
        //Check Session
        @PostMapping("/session/check")
        public ResponseEntity<?> checkSession(@RequestBody Map<Object, Object> request) {
            //Extract the tokens
            String accessToken = (String) request.get("accessToken");
            String refreshToken = (String) request.get("refreshToken");
            
            // Check the session
            Map<String,String> tokens = authService.checkSession(accessToken, refreshToken); //Check if the session is valid
            if(tokens == null) {
                return ResponseEntity.status(401).body("Unauthorized"); //Return 401
            }
            else if("newAccessToken".equals(tokens.get("result"))) {
                Map<String,String> newTokens = Map.of("accessToken", tokens.get("accessToken"));
                return ResponseEntity.ok().body(newTokens); //Return new access token + 200
            }
            return ResponseEntity.ok().body("Session is valid");//Return 200
        }
        
        @PutMapping("/logout")
        public ResponseEntity<?> logout(@RequestBody Map<Object, Object> request) {
            //Extract the tokens
            String accessToken = (String) request.get("accessToken");
            String refreshToken = (String) request.get("refreshToken");
            
            authService.logout(accessToken, refreshToken); //Logout the user
     
            return ResponseEntity.ok().body("Loged out");//Return 200
        }
}
