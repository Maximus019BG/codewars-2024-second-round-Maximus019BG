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
        String shortUrl = longUrl.substring(8, 11) + uuid.substring(0, 3);
        
        // Check if short url already exists
        if (shortUrlExists(shortUrl)) {
            return generateShortUrl(longUrl);
        }
        return shortUrl;
    }
    
    //Access long URL from short URL (get the long url)
    public String accessUrl(String shortUrl) {
        Url url = mainRepo.findByShortUrl(shortUrl).orElse(null);
        
        if (url != null) {
            url.setClicks(url.getClicks() + 1);
            incrementClicks(shortUrl);
            mainRepo.save(url);
        } else {
            throw new RuntimeException("URL not found");
        }
        return url.getLongUrl();
    }
    
    //Create URL entity
    public String createUrl(String longUrl, String shortUrl, String expirationDate, String password) {
        Url url = new Url();
        url.setLongUrl(longUrl);
        
        if (shortUrl == null) {
            if(password != null) {
               url.setPassword(password);
            }
            url.setShortUrl(generateShortUrl(longUrl));
        } else {
            if(password != null) {
                url.setPassword(password);
            }
            url.setShortUrl(shortUrl);
        }
        url.setExpirationDate(expirationDate);
        mainRepo.save(url);
        return url.getShortUrl();
    }
    
    //Helpers
    //Helper method to check if short url already exists
    private boolean shortUrlExists(String shortUrl) {
        return mainRepo.findByShortUrl(shortUrl).isPresent() && mainRepo.findByShortUrl(shortUrl).get().getShortUrl().equals(shortUrl);
    }
    
    //Helper method to check if URL is expired
    private boolean isExpired(Url url) {
        return url.isExpired();
    }
    
    //Helper method to increment clicks on URL (takes short URL)
    private void incrementClicks(String shortUrl) {
        Url url = mainRepo.findByShortUrl(shortUrl).orElse(null);
        if(url == null) {
            throw new RuntimeException("URL not found");
        }
        url.setClicks(url.getClicks() + 1);
        mainRepo.save(url);
    }
}
