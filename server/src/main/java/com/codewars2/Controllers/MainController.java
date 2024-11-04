package com.codewars2.Controllers;

import com.codewars2.Models.Url;
import com.codewars2.Repositories.MainRepo;
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
    private final MainRepo mainRepo;
    
    //Constructor
    @Autowired
    public MainController(MainService mainService, MainRepo mainRepo) {
        this.mainService = mainService;
        this.mainRepo = mainRepo;
    }
    
    //Create short URL
    @PostMapping("/create")
    public ResponseEntity<String> createShortUrl(@RequestBody Map<Object, String> url) {
        String longUrl = url.get("url");
        String shortUrl = url.get("customShortUrl") != null ? url.get("customShortUrl").describeConstable().orElse(null) : null;
        String expirationDate = url.get("expirationDate") != null ? url.get("expirationDate").describeConstable().orElse(null) : null;
        
        // Create the URL object
        String finalUrl = mainService.createUrl(longUrl, shortUrl, expirationDate);
        
        // Return 200
        return ResponseEntity.ok().body(finalUrl);
    }
    
    //Get long URL
    @GetMapping("/get/{shortUrl}")
    public ResponseEntity<String> getLongUrl(@PathVariable String shortUrl) {
        Url url = mainRepo.findByShortUrl(shortUrl).orElse(null);
        
        String longUrl = mainService.accessUrl(shortUrl);
        
        //Return 200
        return ResponseEntity.ok().body(longUrl);
    }
}
