package com.codewars2.Models;

import jakarta.persistence.*;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

import static com.codewars2.Utils.Utils.generateId;

@Entity
@Table(name = "users")
public class User {
    
    //Fields
    @Id
    private String id;
    
    @Column(name = "email", unique = true, nullable = false)
    private String email;
    
    @Column(name = "password", nullable = false)
    private String password;
    
    @OneToMany
    @JoinColumn(name = "user_id")
    private List<Url> urls;
    
    
    @PrePersist
    public void prePersist() {
        setId(generateId());
    }
    
    //Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(password);
    }
    
    public List<Url> getUrls() {
        return urls;
    }
    
    public void setUrls(List<Url> urls) {
        this.urls = urls;
    }
    
}
