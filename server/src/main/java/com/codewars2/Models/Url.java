package com.codewars2.Models;

import jakarta.persistence.*;

import java.time.LocalDate;

import static com.codewars2.Utils.Utils.generateId;

@Entity
@Table(name = "urls")
public class Url {
    
    //Fields
    @Id
    private String id;
    
    @Column(nullable = false)
    private String longUrl;
    
    @Column(unique = true)
    private String shortUrl;
    
    @Column(nullable = false)
    private int clicks;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @Column(nullable = true)
    private String expirationDate;
    
    @Column(nullable = false)
    private boolean isExpired;
    
    //PrePersist method (called before the entity is persisted)
    @PrePersist
    public void prePersist() {
     setId(generateId());
     setClicks(0);
     setDate(java.time.LocalDate.now());
     setExpired(false);
    }
    
    //Getters and Setters
    public String getId() {
        return id;
    }
    
    private void setId(String id) {
        this.id = id;
    }
    
    public String getLongUrl() {
        return longUrl;
    }
    
    public void setLongUrl(String url) {
        this.longUrl = url;
    }
    
    public String getShortUrl() {
        return shortUrl;
    }
    
    public void setShortUrl(String shortUrl) {
        this.shortUrl = shortUrl;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    public int getClicks() {
        return clicks;
    }
    
    public void setClicks(int clicks) {
        this.clicks = clicks;
    }
    
    public String getExpirationDate() {
        return expirationDate;
    }
    
    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }
    
    public boolean isExpired() {
        return isExpired;
    }
    
    public void setExpired(boolean expired) {
        isExpired = expired;
    }
    
}
