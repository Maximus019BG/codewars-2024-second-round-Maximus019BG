package com.codewars2.Services;

import com.codewars2.Models.User;
import com.codewars2.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

import static com.codewars2.Enums.TokenType.ACCESS_TOKEN;
import static com.codewars2.Enums.TokenType.REFRESH_TOKEN;

@Service
public class AuthService {
    
    private final UserRepo userRepo;
    private final TokenService tokenService;
    private final BCryptPasswordEncoder encoder;
    
    @Autowired
    public AuthService(UserRepo userRepo, TokenService tokenService){
        this.userRepo = userRepo;
        this.tokenService = tokenService;
        this.encoder = new BCryptPasswordEncoder();
    }
    
    public Map<String, String> register(String email, String password) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        //Save the user
        userRepo.save(user);
        
        //Generate tokens
        String accessToken = tokenService.generateToken(ACCESS_TOKEN, user, user.getEmail());
        String refreshToken = tokenService.generateToken(REFRESH_TOKEN, user, user.getEmail());
        
        //Return tokens
        Map<String, String> tokens = Map .of("accessToken", accessToken, "refreshToken", refreshToken);
        return tokens;
    }
    
    public Map<String, String> login(String email, String password) {
        User user = userRepo.findByEmail(email);
        // Check if user exists
        if (user == null) {
            return null;
        }
        
        // Verify the input password
        if (!encoder.matches(password, user.getPassword())) {
            return null;
        }
        
        // Generate tokens
        String accessToken = tokenService.generateToken(ACCESS_TOKEN, user, user.getEmail());
        String refreshToken = tokenService.generateToken(REFRESH_TOKEN, user, user.getEmail());
        
        // Return tokens
        Map<String, String> tokens = Map.of("accessToken", accessToken, "refreshToken", refreshToken);
        return tokens;
    }
    
    //Logout
    public void logout(String accessToken, String refreshToken) {
        // Delete the tokens
        tokenService.deleteTokens(accessToken, refreshToken);
    }
    
    // Check the session
    public Map<String, String> checkSession(String accessToken, String refreshToken) {
        // Check if tokens exist
        if (accessToken == null || refreshToken == null) {
            return null;
        }
        
        //Calling the sessionCheck method from TokenService
        //And returning based on the result
        String result = tokenService.sessionCheck(refreshToken, accessToken);
        if (result == null) {
            return null;
        }
        else if(result.equals("true")) {
            return Map.of("result", "true");  //Return true (session is valid)
        }
        else if(result.equals("false")) {
            return null;
        }
        else if(result.equals("newAccessToken")) {
            User user = tokenService.getUserFromToken(accessToken);//Get user from access token
            String newAccessToken = tokenService.generateToken(ACCESS_TOKEN, user, user.getPassword()); //Generate new access token
            return Map.of("result", "newAccessToken", "accessToken", newAccessToken); //Return new access token
        }
        return null;
    }
    
}
