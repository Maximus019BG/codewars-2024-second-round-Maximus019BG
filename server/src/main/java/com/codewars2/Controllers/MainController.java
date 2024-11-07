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
    public ResponseEntity<String> createShortUrl(@RequestBody Map<Object, String> url, @RequestHeader("authorization") String user) {
        String longUrl = url.get("url");
        String shortUrl = url.get("customShortUrl") != null ? url.get("customShortUrl").describeConstable().orElse(null) : null;
        String expirationDate = url.get("expirationDate") != null ? url.get("expirationDate").describeConstable().orElse(null) : null;
        String password = url.get("password") != null ? url.get("password").describeConstable().orElse(null) : null;
        
        // Create the URL object
        String finalUrl = mainService.createUrl(longUrl, shortUrl, expirationDate, password, user);
        
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
}
