package com.codewars2.Repositories;

import com.codewars2.Models.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MainRepo extends JpaRepository<Url, String> {
    //Find URL by short URL
    @Query("SELECT u FROM Url u WHERE u.shortUrl = ?1")
    Optional<Url> findByShortUrl(String shortUrl);
}