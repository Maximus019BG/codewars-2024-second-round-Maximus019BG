package com.codewars2.Services;

import com.codewars2.Models.Url;
import com.codewars2.Repositories.MainRepo;
import org.springframework.stereotype.Service;

@Service
public class MainService {
    
    //Dependency Injection
    private final MainRepo mainRepo;
    
    //Constructor
    public MainService(MainRepo mainRepo) {
        this.mainRepo = mainRepo;
    }
    
    //Generates short URL (called if there isn't short url from the user)
    public String generateShortUrl(String longUrl) {
        String uuid = java.util.UUID.randomUUID().toString();
        uuid = uuid.replaceAll("-", "");
        String shortUrl = longUrl.substring(0, 2) + uuid.substring(0, 2);
        
        // Check if short url already exists
        if (shortUrlExists(shortUrl)) {
            return generateShortUrl(longUrl);
        }
        return shortUrl;
    }
    
    public void createUrl(String longUrl, String shortUrl, String expirationDate) {
        Url url = new Url();
        url.setUrl(longUrl);
        
        if (shortUrl == null) {
            url.setShortUrl(generateShortUrl(longUrl));
        } else {
            url.setShortUrl(shortUrl);
        }
        url.setExpirationDate(expirationDate);
        
        mainRepo.save(url);
    }
    
    //Helper method to check if short url already exists
    public boolean shortUrlExists(String shortUrl) {
        return mainRepo.findByShortUrl(shortUrl).isPresent() && mainRepo.findByShortUrl(shortUrl).get().getShortUrl().equals(shortUrl);
    }
}
