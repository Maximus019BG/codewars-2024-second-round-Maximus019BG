package com.codewars2.Utils;

import org.apache.commons.validator.routines.EmailValidator;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {
    
    //ID generator with date and uuid
    public static String generateId() {
        SimpleDateFormat formatter = new SimpleDateFormat("ddMMyyyyHHmmss");
        Date date = new Date();
        String id = formatter.format(date);
        String uuid = java.util.UUID.randomUUID().toString();
        
        //Remove dashes
        uuid = uuid.replaceAll("-", "");
        
        return id + uuid;
    }
    
    //Email validator
    public static boolean isValidEmail(String email) {
        EmailValidator emailValidator = EmailValidator.getInstance();
        return emailValidator.isValid(email);
    }
    
}
