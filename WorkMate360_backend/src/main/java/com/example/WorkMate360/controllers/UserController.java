package com.example.WorkMate360.controllers;

import com.example.WorkMate360.models.Login;
import com.example.WorkMate360.models.Profile;
import com.example.WorkMate360.services.JWTService;
import com.example.WorkMate360.services.ProfileService;
import com.example.WorkMate360.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private ProfileService profileService;
    @Autowired
    private JWTService jWTService;


    @PostMapping("/register")
    public Login register(@RequestBody Login user) {
        return userService.register(user);
    }

//    @PostMapping("/changepassword")
//    public Login changePassword(@RequestBody Login user) {
//        return userService.changePassword(user);
//    }
//@PostMapping("/changepassword")
//public ResponseEntity<?> changePassword(@RequestBody Login user) {
//    try {
//        Login updatedUser = userService.changePassword(user);
//        Map<String, String> response = new HashMap<>();
//        response.put("message", "Password changed successfully");
//        return ResponseEntity.ok(response);
//    } catch (RuntimeException e) {
//        Map<String, String> errorResponse = new HashMap<>();
//        errorResponse.put("error", e.getMessage());
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
//    }
//}
//@PostMapping("/changepassword")
//public ResponseEntity<?> changePassword(@RequestBody Map<String, String> requestBody) {
//    try {
//        // Get username from JWT token
//        //String username = authentication.getName();
//
//        // Create Login object
//        Login user = new Login();
//        //user.setUsername(username);
//        user.setPassword(requestBody.get("password"));
//
//        Login updatedUser = userService.changePassword(user);
//        Map<String, String> response = new HashMap<>();
//        response.put("message", "Password changed successfully");
//        return ResponseEntity.ok(response);
//    } catch (RuntimeException e) {
//        Map<String, String> errorResponse = new HashMap<>();
//        errorResponse.put("error", e.getMessage());
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
//    }
//}


@PostMapping("/changepassword")
public ResponseEntity<?> changePassword(
        @RequestBody Map<String, String> requestBody
        ) { // No JWT dependency
    try {

        String username = requestBody.get("username"); // Get username from request
        String newPassword = requestBody.get("password"); // New password

        if (!userService.isValidPassword(newPassword)) {
            return ResponseEntity.badRequest().body(
                    Map.of("error", "Password must be at least 6 characters long and include an uppercase letter and special character.")
            );
        }

        Login user = new Login();
        user.setUsername(username);
        user.setPassword(newPassword);

        userService.changePassword(user); // Update password in DB

        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }
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
        response.put("firstLogin", "true"); // Default value, can be changed later
        response.put("username", user.getUsername());
        Login loginUser = userService.findByUsername(user.getUsername());
        if (loginUser != null && loginUser.getProfile() != null) {
            Profile profile = loginUser.getProfile();
            response.put("name", profile.getName());
            response.put("email", profile.getEmail());
            response.put("profileId", profile.getIndex().toString());
            response.put("imageUrl", profile.getImageUrl());
            response.put("Index" , profile.getIndex().toString());

            // Add other profile fields as needed
        } else {
            // Include a flag or default values when profile doesn't exist
            response.put("profileExists", "false");
        }



        return ResponseEntity.ok(response);
    }
}