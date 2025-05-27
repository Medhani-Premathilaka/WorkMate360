package com.example.WorkMate360.controllers;

import com.example.WorkMate360.models.Login;
import com.example.WorkMate360.models.Profile;
import com.example.WorkMate360.services.ProfileService;
import com.example.WorkMate360.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private ProfileService profileService;



    @PostMapping("/register")
    public Login register(@RequestBody Login user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login user) {
        // Get the JWT token from service
        String jwtToken = userService.verify(user);
        String role = userService.getUserRole(user.getUsername());
        //String name = user.getProfile().getName();
        // Default role

        // Check if authentication was successful
        if (jwtToken == null || jwtToken.isEmpty()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid username or password");
            return ResponseEntity.status(401).body(errorResponse);
        }

        // Create response with token
        Map<String, String> response = new HashMap<>();
        response.put("token", jwtToken);
        response.put("role", role);
        Login loginUser = userService.findByUsername(user.getUsername());
        if (loginUser != null && loginUser.getProfile() != null) {
            Profile profile = loginUser.getProfile();
            response.put("name", profile.getName());
            response.put("email", profile.getEmail());
            response.put("profileId", profile.getIndex().toString());
            response.put("imageUrl", profile.getImageUrl());
            // Add other profile fields as needed
        } else {
            // Include a flag or default values when profile doesn't exist
            response.put("profileExists", "false");
        }



        return ResponseEntity.ok(response);
    }
}