package com.example.WorkMate360.controllers;


import com.example.WorkMate360.models.Login;
import com.example.WorkMate360.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Login register(@RequestBody  Login user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Login user) {
        // Logic to authenticate the user
        // For now, just return a success message
        return userService.verify(user);
    }
}
