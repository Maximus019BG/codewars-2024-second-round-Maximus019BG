package com.codewars2.Repositories;
import com.codewars2.Enums.TokenType;
import com.codewars2.Models.Token;
import com.codewars2.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TokenRepo extends JpaRepository<Token, String> {
    Token findByToken(String token);
    Token findByTokenType(TokenType tokenType);
    
    
    @Query("SELECT COUNT(t) > 0 FROM Token t WHERE t.subject = :subject")
    boolean existsByUser(@Param("subject") User user);
    
    List<Token> findAllBySubject(User user);
    
    User findSubjectByToken(String token);
    
    void deleteBySubject(User user);
}
