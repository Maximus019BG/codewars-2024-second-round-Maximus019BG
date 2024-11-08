package com.codewars2.Controllers;

import com.codewars2.Models.Url;
import com.codewars2.Repositories.UrlRepo;
import com.codewars2.Services.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/url")
public class MainController {
    
    //Dependency Injection
    private final MainService mainService;
    private final UrlRepo urlRepo;
    
    //Constructor
    @Autowired
    public MainController(MainService mainService, UrlRepo urlRepo) {
        this.mainService = mainService;
        this.urlRepo = urlRepo;
    }
    
    //Create short URL
    @PostMapping("/create")
    public ResponseEntity<String> createShortUrl(@RequestBody Map<Object, String> req, @RequestHeader("authorization") String user) {
        String longUrl = req.get("url");
        String shortUrl = req.get("customShortUrl") != null ? req.get("customShortUrl").describeConstable().orElse(null) : null;
        String expirationDate = req.get("expirationDate") != null ? req.get("expirationDate").describeConstable().orElse(null) : null;
        String password = req.get("password") != null ? req.get("password").describeConstable().orElse(null) : null;
        int length = req.get("length") != null ? Integer.parseInt(req.get("length").describeConstable().orElse(null)) : 0;
        // Create the URL object
        String finalUrl = mainService.createUrl(longUrl, shortUrl, expirationDate, password, user, length);
        
        return ResponseEntity.ok().body(finalUrl);    // Return 200
    }
    
    //Get long URL
    @GetMapping("/get/{shortUrl}")
    public ResponseEntity<String> getLongUrl(@PathVariable String shortUrl) {
        Url url = urlRepo.findByShortUrl(shortUrl).orElse(null);
        
        String longUrl = mainService.accessUrl(shortUrl);
        
        return ResponseEntity.ok().body(longUrl);     //Return 200
    }
    
    //Get all URLs for a user
    @GetMapping("/get/all")
    public ResponseEntity<?> getAllUrls(@RequestHeader("authorization") String user) {
        return ResponseEntity.ok().body(mainService.getAllUrls(user));    //Return 200
    }
    
    @PutMapping("/update")
    public ResponseEntity<?> updateUrl(@RequestBody Map<Object, String> url, @RequestHeader("authorization") String user) {
        String shortUrl = url.get("shortUrl");
        String expirationDate = url.get("expirationDate");
        String password = url.get("password");
        String oldShortUrl = url.get("oldShortUrl");
        
        mainService.updateUrl(shortUrl, expirationDate, password, user, oldShortUrl);
        
        return ResponseEntity.ok().body("URL updated successfully");    //Return 200
    }
}
