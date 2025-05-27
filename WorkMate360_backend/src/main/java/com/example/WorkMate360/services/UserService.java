package com.example.WorkMate360.services;

import com.example.WorkMate360.models.Login;
import com.example.WorkMate360.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    AuthenticationManager authenticationManager;



    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Login register(Login user) {
        // Logic to save the user to the database
        // For now, just return the user object
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public Login findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public String verify(Login user) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if(auth.isAuthenticated()) {
            return jwtService.generateToken(user.getUsername());
        } else {
            return "Login failed";
        }
    }

    public String getUserRole(String username) {
        Login user = userRepo.findByUsername(username);
        if (user != null) {
            return user.getRole();
        }
        return null;
    }


    public Login changePassword(Login user) {
        Optional<Login> existingUser = userRepo.findById(user.getProfile().getIndex());
        existingUser.get().setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(existingUser.get());

    }
}
