package com.codewars2.Models;

import jakarta.persistence.*;

import java.time.LocalDate;

import static com.codewars2.Utils.Utils.generateId;

@Entity
@Table(name = "urls")
public class Url {
    
    @Id
    private String id;
    
    @Column(nullable = false)
    private String url;
    
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
    
    @PrePersist
    public void prePersist() {
     setId(generateId());
     setClicks(0);
     setDate(java.time.LocalDate.now());
     setExpired(false);
    }
    
    public String getId() {
        return id;
    }
    
    private void setId(String id) {
        this.id = id;
    }
    
    public String getUrl() {
        return url;
    }
    
    public void setUrl(String url) {
        this.url = url;
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
