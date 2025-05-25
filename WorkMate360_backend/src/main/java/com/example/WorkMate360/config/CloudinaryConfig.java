package com.example.WorkMate360.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        final Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dg9elczll");
        config.put("api_key", "375927392936965");
        config.put("api_secret", "PuFqfKyCiiPB8WbwvcQsMTPW0Tw");
        return new Cloudinary(config);
    }
}