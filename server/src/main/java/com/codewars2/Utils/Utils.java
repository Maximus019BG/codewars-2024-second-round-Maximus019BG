package com.codewars2.Utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {
    
    //ID generator with date and uuid
    public static String generateId(){
        SimpleDateFormat formatter = new SimpleDateFormat("ddMMyyyyHHmmss");
        Date date = new Date();
        String id = formatter.format(date);
        String uuid = java.util.UUID.randomUUID().toString();
        
        //Remove dashes
        uuid = uuid.replaceAll("-", "");
        
        return id + uuid;
    }
    
}
