package com.example.WorkMate360.services;

import com.example.WorkMate360.dao.ProfileDao;
import com.example.WorkMate360.models.Profile;
import com.example.WorkMate360.models.AuthResponse;
import com.example.WorkMate360.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private ProfileDao profileDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JWTService jwtService;

    public ResponseEntity<?> authenticate(String username, String password) {
        Profile profile = (Profile) profileDao.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(password, profile.getTemporaryPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        if (profile.isPasswordResetRequired()) {
            String tempToken = jwtUtil.generateTempToken(username);
            return ResponseEntity.status(HttpStatus.RESET_CONTENT)
                    .body(new AuthResponse(tempToken, true));
        }

        // Normal authentication flow
        String token = jwtUtil.generateToken(username);
        return ResponseEntity.ok(new AuthResponse(token, false));
    }
}