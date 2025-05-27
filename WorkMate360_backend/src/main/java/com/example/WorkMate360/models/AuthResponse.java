package com.example.WorkMate360.models;

public class AuthResponse {
    private String token;
    private boolean passwordResetRequired;

    public AuthResponse(String token, boolean passwordResetRequired) {
        this.token = token;
        this.passwordResetRequired = passwordResetRequired;
    }

    // Getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isPasswordResetRequired() {
        return passwordResetRequired;
    }

    public void setPasswordResetRequired(boolean passwordResetRequired) {
        this.passwordResetRequired = passwordResetRequired;
    }
}