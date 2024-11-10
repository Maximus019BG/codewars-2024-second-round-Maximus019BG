package com.codewars2.Services;

import com.codewars2.Models.Url;
import com.codewars2.Models.User;
import com.codewars2.Repositories.UrlRepo;
import com.codewars2.Repositories.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MainService {
    
    //Dependency Injection
    private final UrlRepo urlRepo;
    private final TokenService tokenService;
    private final UserRepo userRepo;
    
    
    //Constructor
    @Autowired
    public MainService(UrlRepo urlRepo, TokenService tokenService, UserRepo userRepo) {
        this.urlRepo = urlRepo;
        this.tokenService = tokenService;
        this.userRepo = userRepo;
    }
    
    //Generates short URL (called if there isn't short url from the user)
    public String generateShortUrl(String longUrl) {
        String uuid = java.util.UUID.randomUUID().toString();
        uuid = uuid.replaceAll("-", "");
        String shortUrl = longUrl.substring(8, 10) + uuid.substring(0, 9);
        
        // Check if short url already exists
        if (shortUrlExists(shortUrl)) {
            return generateShortUrl(longUrl);
        }
        return shortUrl;
    }
    
    //Fixer Method for SQL Error: 1063
    private String generateUniqueShortUrl(String longUrl, int length) {
        String shortUrl;
        do {
            shortUrl = generateShortUrl(longUrl);
        } while (shortUrlExists(shortUrl));
        
        if(length == 0) {
            return shortUrl.substring(0, 6);
        }
        return shortUrl.substring(0, length);
    }
    
    //Access long URL from short URL (get the long url)
    public String accessUrl(String shortUrl) {
        Url url = urlRepo.findByShortUrl(shortUrl).orElse(null);
        
        if (url != null) {
            if (isExpired(url)) {
                throw new RuntimeException("URL is expired");
            }
            incrementClicks(shortUrl);
            urlRepo.save(url);
        } else {
            throw new RuntimeException("URL not found");
        }
        if(checkClicks(shortUrl)){
             return url.getLongUrl();
        }
        else{
            urlRepo.delete(url);
            throw new RuntimeException("URL has reached max clicks");
        }
    }
    
    
    //Create URL entity
    public String createUrl(String longUrl, String shortUrl, String expirationDate, String password, String token, int length, int maxClicks) {
        User user = tokenService.getUserFromToken(token);//Get user from token
        Url url = new Url();
        url.setLongUrl(longUrl);
        
        if (shortUrl == null || shortUrl.isEmpty() || shortUrl.isBlank() || shortUrl.equals("")) {
            shortUrl = generateUniqueShortUrl(longUrl, length);
        }
        url.setShortUrl(shortUrl);
        
        if (password != null && !password.isEmpty() && !password.isBlank() && !password.equals("")) {
            url.setPassword(password);
        }
        
        if(maxClicks > 0 ) {
            url.setMaxClicks(maxClicks);
        }
        else{
            url.setMaxClicks(-1);
        }
        
        List<Url> urls = user.getUrls();
        urls.add(url); //Add URL to user
        user.setUrls(urls);
        
        if (expirationDate != null && !expirationDate.isEmpty() && !expirationDate.isBlank() && !expirationDate.equals("")) {
            url.setExpirationDate(LocalDate.parse(expirationDate));
        }
        
        urlRepo.save(url);
        userRepo.save(user);
        
        return url.getShortUrl();
    }
    
    //Delete URL entity
    @Transactional
    public void deleteUrl(String shortUrl, String token) {
        Url url = urlRepo.findByShortUrl(shortUrl).orElse(null);
        if (url == null) {
            throw new RuntimeException("URL not found");
        }
        //Validation
        User user = tokenService.getUserFromToken(token);
        if (!user.getUrls().contains(url)) {
            throw new RuntimeException("User does not have access to this URL");
        }
        
        deleteUrlHelper(url, user);   //Delete the URL
    }
    
    //Update URL entity
    public void updateUrl(String shortUrl, String expirationDate, String password, String token, String oldShortUrl) {
        //Token validation
        if (!tokenService.validateToken(token)) {
            throw new RuntimeException("Invalid token");
        }
        User user = tokenService.getUserFromToken(token);
        Url url = urlRepo.findByShortUrl(oldShortUrl).orElse(null);
        
        List<Url> listOfUrls = user.getUrls();
        
        //Check if user has access to this URL
        if (!listOfUrls.contains(url)) {
            throw new RuntimeException("User does not have access to this URL");
        }
        
        //Other checks
        if (url == null) {
            throw new RuntimeException("URL not found");
        }
        
        if (password != null && !password.isEmpty() && !password.isBlank() && !password.equals("")) {
            if (password.equals("<null>")) {
                url.setPassword(null);
            } else {
                url.setPassword(password);
            }
        }
        
        if (expirationDate != null && !expirationDate.isEmpty() && !expirationDate.isBlank() && !expirationDate.equals("")) {
            if (LocalDate.parse(expirationDate).isBefore(LocalDate.now())) {
                url.setExpirationDate(null);
            } else {
                url.setExpirationDate(LocalDate.parse(expirationDate));
                url.setExpired(false); //Expire the URL
            }
        }
        
        if (shortUrl != null && !shortUrl.isEmpty() && !shortUrl.isBlank() && !shortUrl.equals("")) {
            url.setShortUrl(shortUrl);
        }
        
        urlRepo.save(url);  //Save the URL
    }
    
    //Get all URLs for a user
    public List<Url> getAllUrls(String token) {
        User user = tokenService.getUserFromToken(token);
        return user.getUrls();
    }
    
    //Check if URL password is the same as the provided
    public boolean checkPasswordForUrl(String shortUrl, String password) {
        Url url = urlRepo.findByShortUrl(shortUrl).orElse(null);
        if (url == null) {
            throw new RuntimeException("URL not found");
        }
       return BCrypt.checkpw(password, url.getPassword());
    }
    
    //Check if there is a password for a URL!!!!
    public boolean checkPasswordForPassword(String shortUrl) {
        Url url = urlRepo.findByShortUrl(shortUrl).orElse(null);
        if (url == null) {
            throw new RuntimeException("URL not found");
        }
        else if(!checkClicks(shortUrl)){
            urlRepo.delete(url);    //Delete URL if max clicks reached
            return false;
        }
        return url.getPassword() != null;   // Return true if there is a password and false if there isn't
    }
    
    //Helpers
    //Helper method to check if short url already exists
    private boolean shortUrlExists(String shortUrl) {
        return urlRepo.findByShortUrl(shortUrl).isPresent() && urlRepo.findByShortUrl(shortUrl).get().getShortUrl().equals(shortUrl);
    }
    
    //Helper method to check if URL is expired
    private boolean isExpired(Url url) {
        if (url.getExpirationDate() == null) {
            return false;
        } else if (url.getExpirationDate() != null && url.getExpirationDate().isBefore(LocalDate.now().plusDays(1))) {
            url.setExpired(true);//Set URL to expired
            urlRepo.save(url);
            return false;
        }
        return url.isExpired();
    }
    
    //Helper method to increment clicks on URL (takes short URL)
    private void incrementClicks(String shortUrl) {
        Url url = urlRepo.findByShortUrl(shortUrl).orElse(null);
        if (url == null) {
            throw new RuntimeException("URL not found");
        }
        url.setClicks(url.getClicks() + 1);
    }
    
    //Helper method for deleting URL
    private void deleteUrlHelper(Url url, User user) {
        List<Url> urls = user.getUrls();
        urls.remove(url);
        user.setUrls(urls);
        urlRepo.delete(url);
    }
    
    //Helper method: Check clicks
    private boolean checkClicks(String shortUrl) {
        Url url = urlRepo.findByShortUrl(shortUrl).orElse(null);
        assert url != null; //Check if URL is null
        //if no max clicks return true
        if(url.getMaxClicks() < 0 ) {
            return true;
        }
        //Get bought clicks
        int clicks = url.getClicks();
        int maxClicks = url.getMaxClicks();
        
        return clicks <= maxClicks; //Return true if clicks are less than max
    }
}
