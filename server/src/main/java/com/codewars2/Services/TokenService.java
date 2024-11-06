package com.codewars2.Services;

import com.codewars2.Enums.TokenType;
import com.codewars2.Models.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.codewars2.Models.User;
import com.codewars2.Repositories.TokenRepo;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.UUID;

import static com.codewars2.Enums.TokenType.ACCESS_TOKEN;
import static com.codewars2.Enums.TokenType.REFRESH_TOKEN;

@Service
@Slf4j
public class TokenService {
    
    private final TokenRepo tokenRepo;
    
    @Autowired
    public TokenService(TokenRepo tokenRepo) {
        this.tokenRepo = tokenRepo;
    }
    //Generate token for user
    public String generateToken(TokenType tokenType, User user, String issuer) {
        String token = "";
        String token_type = tokenType.toString(); //REFRESH_TOKEN or ACCESS_TOKEN
        String secret = System.getProperty("secretJWT"); //Secret key for JWT
        Long time = 0L;
        
        //Time based on token type
        if (tokenType == REFRESH_TOKEN) {
            time = 60 * 60 * 24 * 1000 * 5L;//5 days
            
        } else if (tokenType == ACCESS_TOKEN) {
            time = 60 * 15 * 1000L;//15 minutes
        }
        
        //Create token
        try {
            Token tokenObj = new Token();
            //setToken() is lower in code
            tokenObj.setTokenType(tokenType); //Token type
            tokenObj.setSubject(user); //User
            tokenObj.setIssuedAt(new Date(System.currentTimeMillis())); //Current time
            Algorithm algorithm = Algorithm.HMAC512(secret); //Secret for JWT
            
            token = JWT.create()
                    .withIssuer(issuer)
                    .withJWTId(token_type.toLowerCase() + "_" + UUID.randomUUID().toString().replace("-", "")) //Unique token id
                    .withSubject(tokenObj.getSubject().getId()) //User id
                    .withIssuedAt(tokenObj.getIssuedAt()) //Current time
                    .withExpiresAt(new Date(System.currentTimeMillis() + time)) //Expiration time (Current time + 5 min or 5 days depending on token type)
                    .sign(algorithm); //Sign token
            
            tokenObj.setToken(token);
            tokenRepo.save(tokenObj);
        } catch (JWTCreationException exception) {
        
        }
        return token;
    }
    
    //Session check for user
    public String sessionCheck(String refreshToken, String accessToken) {
        //Check if tokens exist
        Token tokenObjA = tokenRepo.findByToken(accessToken); //Access token
        Token tokenObjR = tokenRepo.findByToken(refreshToken); //Refresh token
        //Validate tokens
        if (tokenObjA != null && tokenObjR != null) {
            User user = tokenObjA.getSubject();
            if (tokenObjA.getSubject().getId().equals(tokenObjR.getSubject().getId())) {
                //Check if tokens are expired
                if (isAccessTokenOutOfDate(accessToken) && isRefreshTokenOutOfDate(refreshToken)) {
                    deleteTokens(accessToken, refreshToken);
                    //Delete all tokens for user if both are expired
                    while (tokenRepo.existsByUser(user)) {
                        tokenRepo.deleteBySubject(user);
                    }
                    log.debug("Both tokens are expired. Please log in again.");
                    return "false"; //Return false if both tokens are expired
                } else if (isAccessTokenOutOfDate(accessToken) && !isRefreshTokenOutOfDate(refreshToken)) {
                    //Generate new access token if access token is expired
                    log.debug("Access token is expired. Generating new access token.");
                    return "newAccessToken"; //Return new access token is needed
                } else if (!isAccessTokenOutOfDate(accessToken) && !isRefreshTokenOutOfDate(refreshToken)) {
                    //Check if both tokens are valid
                    if (validateToken(accessToken) && validateToken(refreshToken)) {
                        log.debug("Both tokens are valid.");
                        return "true"; //Return true if both tokens are valid
                    } else {
                        //Delete all tokens for user if both are invalid
                        deleteTokens(accessToken, refreshToken);
                        log.debug("Both tokens are invalid. Please log in again.");
                        return "false"; //Return false if both tokens are invalid
                    }
                }
            }
        }
        return "false";
    }
    
    //Validate token
    public boolean validateToken(String token) {
        //Get secret key
        String secret = System.getProperty("secretJWT");
        Token tokenObj = null;
        boolean isValid = false;
        //Check if token is valid
        try {
            Algorithm algorithm = Algorithm.HMAC512(secret);
            tokenObj = tokenRepo.findByToken(token);
            JWT.require(algorithm).build().verify(token);
            isValid = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isValid;
    }
    //Delete tokens
    public void deleteTokens(String tokenA, String tokenR) {
        Token tokenObjA = tokenRepo.findByToken(tokenA);
        Token tokenObjR = tokenRepo.findByToken(tokenR);
        if (tokenObjA != null && tokenObjR != null) {
            tokenObjA.setSubject(null);
            tokenObjR.setSubject(null);
            tokenRepo.save(tokenObjA);
            tokenRepo.save(tokenObjR);
            tokenRepo.delete(tokenObjA);
            tokenRepo.delete(tokenObjR);
        } else if (tokenObjA != null && tokenObjR == null) {
            tokenObjA.setSubject(null);
            tokenRepo.save(tokenObjA);
            tokenRepo.delete(tokenObjA);
        } else if (tokenObjA == null && tokenObjR != null) {
            tokenObjR.setSubject(null);
            tokenRepo.save(tokenObjR);
            tokenRepo.delete(tokenObjR);
        }
        
    }
    //Check if access token is expired
    public boolean isAccessTokenOutOfDate(String token) {
        Token tokenObj = tokenRepo.findByToken(token);
        DecodedJWT jwt = JWT.decode(token);
        if (tokenObj.getTokenType() == ACCESS_TOKEN && jwt.getExpiresAt().getTime() <= System.currentTimeMillis()) {
            return true;
        } else return tokenObj.getTokenType() != ACCESS_TOKEN || jwt.getExpiresAt().getTime() <= System.currentTimeMillis();
    }
    
    //Check if refresh token is expired
    public boolean isRefreshTokenOutOfDate(String token) {
        Token tokenObj = tokenRepo.findByToken(token);
        DecodedJWT jwt = JWT.decode(token);
        //Expression Check
        if (tokenObj.getTokenType() == REFRESH_TOKEN && jwt.getExpiresAt().getTime() <= System.currentTimeMillis()) {
            return true;
        } else return tokenObj.getTokenType() != REFRESH_TOKEN || jwt.getExpiresAt().getTime() <= System.currentTimeMillis();
    }
    
    //Get user from token
    public User getUserFromToken(String token) {
        Token tokenObj = tokenRepo.findByToken(token);
        return tokenObj.getSubject();
    }
}

